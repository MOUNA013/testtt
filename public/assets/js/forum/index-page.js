const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

function dropdownFunction_posts(postId) {
    var dropdown = document.getElementById("myDropdown-" + postId);
    dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.dropdown-post')) {
        var dropdowns = document.querySelectorAll('.crayons-dropdown');
        dropdowns.forEach(function(dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}


function copyPostLink(postSlug) {
    var postLink = `${window.location.host}/forum/posts/${postSlug}`;
    
    navigator.clipboard.writeText(postLink)
        .then(function() {
            // Update the UI to indicate successful copy
            var copiedLinkHtml = document.getElementById('copiedLinkHtml-'+ postSlug);
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

function calculateReadingTime($title, $body) {
    // Calculate the total number of words in the title and body
    $totalWords = str_word_count($title) + str_word_count($body);
    
    // Assuming average reading speed of 200 words per minute
    $wordsPerMinute = 200;
    
    // Calculate the estimated reading time in minutes
    $readingTime = ceil($totalWords / $wordsPerMinute);

    // Ensure the minimum reading time is 1 minute
    $readingTime = max($readingTime, 1);

    // Format the reading time for display
    if ($readingTime == 1) {
        return "1 min read";
    } else {
        return "$readingTime mins read";
    }
}



// -------- links  ------------
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav_link");
    const path = window.location.pathname;

    // Determine the active link based on the current pathname
    let activeLinkId;
    if (path === '/forum') {
        activeLinkId = 'all-link';
    } else if (path === '/forum/home/top') {
        activeLinkId = 'top-link';
    } else if (path === '/forum/home/follow') {
        activeLinkId = 'follow-link';
    } else if (path === '/forum/manage-content') {
        activeLinkId = 'manage-content';
    }

    // If an active link ID is determined, apply 'nav_link_active' class to it
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.classList.add("nav_link_active");
        }
    }

    // Attach click event listeners to update the active class on click
    links.forEach(link => {
        link.addEventListener("click", function() {
            // Remove 'nav_link_active' class from all links
            links.forEach(link => {
                link.classList.remove("nav_link_active");
            });

            // Add 'nav_link_active' class to the clicked link
            this.classList.add("nav_link_active");
        });
    });
});

// delete post function
function deletePost(userId) {
    Swal.fire({
        width: 400,
        title: "tu es sûr ?",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Oui, supprimez-le !",
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
                // reload the page to reflect the changes
                location.reload();
            })
            .catch(error => {
                // Handle error
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    });
}

$(document).on('click', '.save', function() {
    var $saveBtn = $(this);
    var postId = $saveBtn.data('post-id');
    var unsavedIcon = $saveBtn.find('#unsavedIcon');
    var savedIcon = $saveBtn.find('#savedIcon');
    console.log(postId)
    // Disable the save button to prevent multiple clicks
    $saveBtn.prop('disabled', true);

    // Send AJAX request to save the post
    
});

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
        url: `/api/forum/posts/${postId}/save`,
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