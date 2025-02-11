const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

$(document).ready(function() {
    // --------------------------
    // Function to change comment send icon fill color when user typing
    function changeSVGFill(input) {
        // Get the input value
        var inputValue = input.val().trim();
        // Get the SVG element
        var commentIcon = input.closest('.comment_input_grp').find("#commentIcon");

        // Check if the input value is not empty
        if (inputValue !== "") {
            // Change the SVG fill color to #4049ec
            commentIcon.css("fill", "#4049ec");
            // input.closest('.comment_input_grp').css("border-color", "#4049ec");
        } else {
            // Change the SVG fill color back to #000 if input is empty
            commentIcon.css("fill", "");
            // input.closest('.comment_input_grp').css("border-color", "rgb( 212, 212, 212 )");
        }
    }

    // Attach input event listener to the comment input fields
    $("#comment-body").on("input", function() {
        changeSVGFill($(this));
    });

    $(".reply-comment-body").on("input", function() {
        changeSVGFill($(this));
    });
    // -------------------------




    // ----------------------------------
    // Function to auto-adjust textarea height
    function adjustTextareaHeight() {
        const textarea = document.getElementById('comment-body');
        textarea.style.height = '25px'; // Reset height to auto
        textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
    }

    // Attach input event listener to the textarea
    document.getElementById('comment-body').addEventListener('input', adjustTextareaHeight);

    // Call the function initially to set the textarea height
    adjustTextareaHeight()
    // ------------------------------



    // --------------------------------
    // Event delegation for creating reply form
    $(document).on('click', '#reply-btn', function(event) {
        // Get the reply button element
        const replyBtn = event.target.closest('#reply-btn');
        if (!replyBtn) return; // Exit if reply button not found
    
        // Get the comment ID from the data attribute
        const commentId = replyBtn.getAttribute('data-comment-id');
        console.log(commentId);
    
        // Find the corresponding comment element
        const comment = document.querySelector(`[data-comment-id="${commentId}"]`);
        if (!comment) return; // Exit if comment not found
    
        // Get the user comment div within the comment element
        const userCommentDiv = comment.closest('#user-comment');
        if (!userCommentDiv) return; // Exit if user comment div not found
    
        // Check if the reply form already exists for this comment
        const existingForm = $('#replay-comment-form-' + commentId);
        if (existingForm.length) {
            // Toggle the visibility of the existing form
            existingForm.toggle();
        } else {
            // Create the input comment form
            const replyInputForm = document.createElement('form');
            replyInputForm.id = 'replay-comment-form-' + commentId;
    
            // Set the authenticated user's imgUrl dynamically
            const userImgUrl = replyBtn.getAttribute('data-user-img-url');
            const userDisplayName = replyBtn.getAttribute('data-user-name');
            replyInputForm.innerHTML = `
            <div class='d-flex w-100 align-items-center flex-row gap-3 mb-2'>
                <img class="rounded-circle" src="${userImgUrl}" data-user-img-url="${userImgUrl}" alt="profile" width="40" height="40" style='object-fit: cover;' />
                <div class="comment_input_grp">
                    <textarea class='comment_input reply-comment-body' id="replay-comment-body-${commentId}" name="body" placeholder="Tap your reply..." rows="1" required ></textarea>
                    <button type="submit" class='comment_icon_hover'>
                        <svg id="commentIcon" width="25px" height="25px" viewBox="-4.2 -4.2 36.40 36.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)">
                            <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.7030903,13.9775798 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z M3.63522914,4.36121177 L6.058,13.249 L17,13.25 C17.3796958,13.25 17.693491,13.5321539 17.7431534,13.8982294 L17.75,14 C17.75,14.3796958 17.4678461,14.693491 17.1017706,14.7431534 L17,14.75 L6.046,14.749 L3.63522914,23.5939479 L23.7421805,13.9775798 L3.63522914,4.36121177 Z" id="🎨-Color"> </path> 
                        </svg>
                    </button>
                </div>
            </div>
            `;
    
            // Append the input comment form to the user-comment div
            userCommentDiv.appendChild(replyInputForm);
    
            // Prevent default form submission
            replyInputForm.addEventListener('submit', function(event) {
                event.preventDefault();
    
                // Get form data
                const body = $('#replay-comment-body-' + commentId).val();
                const commentableType = "App\\Models\\Comment"; // Set commentable_type to "App\\Models\\Comment"
    
                // AJAX request
                $.ajax({
                    url: "/api/forum/comment/post",
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-TOKEN": csrfToken
                    },
                    data: JSON.stringify({
                        body: body,
                        commentable_id: commentId,
                        commentable_type: commentableType
                    }),
                    success: function(data) {
                        // Handle success response
                        console.log("comment" , data);
    
                        $('#replay-comment-form-' + commentId).prepend(`
                        
                        <div id="comment-container">
                            <div id='comment-list' class='d-flex w-100 flex-row justify-content-between align-items-start gap-3 '>
                                <img class="rounded-circle" src="${userImgUrl}" data-user-img-url="${userImgUrl}" alt="profile"  width="40" height="40" style='object-fit: cover;' />
                                <div id='user-comment'  class='flex-grow-1 mb-5'>
                                    <div class="comment_grp">
                                        <div class="comment_content">
                                            <div class="d-flex flex-row align-items-center justify-content-between">
                                                <h6 class='mb-0 text-black'>${userDisplayName}</h6> 
                                                <span class="comment_icon_hover">
                                                    <svg width="25px" height="25px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <line x1="5.99" y1="12" x2="6" y2="12" stroke-linecap="round" stroke-width="2.4"></line><line x1="11.99" y1="12" x2="12" y2="12" stroke-linecap="round" stroke-width="2.4"></line><line x1="17.99" y1="12" x2="18" y2="12" stroke-linecap="round" stroke-width="2.4"></line></g></svg>                                
                                                </span>
                                            </div>
                                        </div>
                                        <!-- comment text -->
                                        <p class='mb-0'>${data.comment.body}</p>
                                    </div>
                                </div>   
                            </div>
                        </div>
                       `);
                        // Clear the comment form
                        $('#replay-comment-body-' + commentId).val('');
                    },
                    error: function(xhr, status, error) {
                        // Handle error response
                        console.error('Error creating comment:', error.message);
                        console.log('Error creating comment: ' + error.message);
                    }
                });
            });
        }
    });
    // --------------------------
    // --------------------------
    
});



// --------------------------
// Event delegation for voting on comments
// --------------------------


 // Event delegation for voting on comments
 $(document).on('click', 'button[data-vote-comment]', function() {
    let commentId = $(this).data('commentid'); // Corrected attribute name to 'commentid'
    let voteType = $(this).data('vote-comment');
    // console.log({ id: commentId, type: voteType });
    voteComment(commentId, voteType, this);
});



////////////==============================================
function voteComment(commentId, voteType, button) {
    // Check if the button is disabled to prevent multiple clicks
    if ($(button).hasClass('disabled')) {
        return;
    }

    // Disable the button to prevent multiple clicks
    $(button).addClass('disabled');

    fetch('/api/forum/vote/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            voteable_id: commentId,
            voteable_type: 'App\\Models\\Comment',
            type_vote: voteType
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to vote for the comment');
        }
        // console.log(response)
        // Update the SVG fill and stroke based on the voteType
        let svgElement = button.querySelector('svg');
        if (svgElement) {
            if (response.status === 201) {
                svgElement.setAttribute('fill', '#FF3131');
                svgElement.setAttribute('stroke', '#FF3131');
            } else if (response.status === 200) {
                svgElement.setAttribute('fill', 'none');
                svgElement.setAttribute('stroke', '#6b7280');
            }
        }
        return response.json();
    })
    .then(data => {
        // Update the like count on the button
        let likeCountElement = button.querySelector('#likeCount');
        let btnComment = $(button);

        if (likeCountElement) {
            likeCountElement.textContent = data.like;
        }

        // Update the button's data-vote-comment attribute to match the latest data received
        button.dataset.voteComment = voteType;

        // Re-enable the button
        $(button).removeClass('disabled');
    })
    .catch(error => {
        console.log(error.message);

        // Re-enable the button in case of an error
        $(button).removeClass('disabled');
    });
}



// ---------------------------

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.dropdown-post')) {
        var dropdowns = document.getElementsByClassName("crayons-dropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// ------------------
// copyPostLink
function copyPostLink() {
    // Get the current URL
    var postLink = window.location.href;

    // Create a temporary input element
    navigator.clipboard.writeText(postLink)
        .then(function() {
            // Update the UI to indicate successful copy
            var copiedLinkHtml = document.getElementById('copiedLinkHtml');
            copiedLinkHtml.textContent = 'Lien copié!';
            setTimeout(function() {
                copiedLinkHtml.textContent = 'Copier le lien';
            }, 3000); // Reset after 3 seconds
        })
        .catch(function(err) {
            // Handle error
            console.error('Unable to copy post link: ', err);
        });
}

// post reactions annimation
document.addEventListener("DOMContentLoaded", function() {
    const iconContainers = document.querySelectorAll(".crayons_icon_container");

    iconContainers.forEach(iconContainer => {
        iconContainer.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior if needed
            this.classList.add("clicked");

            // Remove the class after animation ends
            setTimeout(() => {
                this.classList.remove("clicked");
            }, 300);
        });
    });
});


function toggleFollow(button, userId, isFollowing) {
    fetch(`/api/forum/follow/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json, text-plain, */*",
            'X-CSRF-TOKEN': csrfToken
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        // Update the follow button UI
        const newIsFollowing = !isFollowing;
        button.innerText = newIsFollowing ? 'Désabonner' : 'Suivre';
        button.onclick = function() { toggleFollow(this, userId, newIsFollowing); };
    })
    .catch(error => {
        // Handle error
        console.error('There was a problem with the fetch operation:', error);
    });
}

// delete post function
function deletePost(userId) {
    Swal.fire({
        width: 400,
        title: 'tu es sûr ?',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Oui, supprimez-le !',
        customClass: {
            title: 'swal-title',
            confirmButton: 'btn btn-danger me-2',
            cancelButton: 'btn btn-secondary',
            title: 'fs-4'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform the delete operation
            fetch(`/api/forum/post/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text-plain, */*",
                    'X-CSRF-TOKEN': csrfToken
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Optionally, you can reload the page to reflect the changes
                window.location.href = `/forum`;
            })
            .catch(error => {
                // Handle error
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    });
}

$(document).ready(function() {
    $(document).on('click', '.save', function() {
        var $saveBtn = $(this);
        var postId = $saveBtn.data('post-id');
        var unsavedIcon = $saveBtn.find('#unsavedIcon');
        var savedIcon = $saveBtn.find('#savedIcon');
        console.log(postId)
        // Disable the save button to prevent multiple clicks
        $saveBtn.prop('disabled', true);

        // Send AJAX request to save the post
        $.ajax({
            url: `/api/forum/posts/${postId}/save`, // Specify the route to save the post
            type: 'POST',
            headers: {
                        "X-CSRF-TOKEN": csrfToken
                    },
            success: function(response, status, xhr) {
                // Handle success response
                if (xhr.status === 204) {
                    unsavedIcon.css('display', 'block');
                    savedIcon.css('display', 'none');
                } else if (xhr.status === 201) {
                    unsavedIcon.css('display', 'none');
                    savedIcon.css('display', 'block');
                }
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Error saving post:', error);
            },
            complete: function() {
                // Re-enable the save button after the request is complete
                $saveBtn.prop('disabled', false);
            }
        });
    });
});

// ___________copyCommentText__________
function copyCommentText(text) {
    navigator.clipboard.writeText(text)
}
// ___________copyCommentText__________

// ___________deleteComment__________
function deleteComment(commentId) {
    Swal.fire({
        width: 400,
        title: 'tu es sûr ?',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Oui, supprimez-le !',
        customClass: {
            title: 'swal-title',
            confirmButton: 'btn btn-danger me-2',
            cancelButton: 'btn btn-secondary',
            title: 'fs-4'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/forum/comments/${commentId}`)
                .then(response => {
                    if (response.status === 200) {
                        // Remove the comment from the DOM
                        const commentElement = document.querySelector(`[grp-comment-data="grp-comment-${commentId}"]`);
                        if (commentElement) {
                            commentElement.remove();
                        }
                    }
                })
                .catch(error => {
                    console.error('Error deleting comment:', error);
                });
        }
    });
}
// ___________deleteComment__________

// ___________replyToComment__________
function replyToComment(commentId) {
    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    commentElement.click();
}
// ___________replyToComment__________