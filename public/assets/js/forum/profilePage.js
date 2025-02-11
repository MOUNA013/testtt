const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

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
                // move to page forum to reflect the changes
                location.reload();
            })
            .catch(error => {
                // Handle error
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    });
}

// follow & unfollow button action
function toggleFollow(button, userId, isFollowing) {
    fetch(`/api/forum/follow/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        // Handle success
        alert(data.message);
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
    var postLink = location.host + '/forum/posts/' + postSlug;
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

// Function to show a specific container and hide others
function showContainer(containerId) {
    const containers = ['post-container', 'followers-container', 'following-container'];
    containers.forEach((container) => {
        const element = document.getElementById(container);
        if (container === containerId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Function to add 'active' class to clicked link and remove it from others
function setActiveLink(linkId) {
    const links = ['posts-link', 'followers-link', 'following-link'];
    links.forEach((link) => {
        const element = document.getElementById(link);
        if (link === linkId) {
            element.classList.add('nav_link_active');
        } else {
            element.classList.remove('nav_link_active');
        }
    });
}

// Add event listeners to navigation links
document.getElementById('posts-link').addEventListener('click', function() {
    showContainer('post-container');
    setActiveLink('posts-link');
});

document.getElementById('followers-link').addEventListener('click', function() {
    showContainer('followers-container');
    setActiveLink('followers-link');
});

document.getElementById('following-link').addEventListener('click', function() {
    showContainer('following-container');
    setActiveLink('following-link');
});

function fetchFollowers(endpoint) {
    console.log(endpoint)
    $.ajax({
        url: endpoint,
        datatype: "html",
        type: 'GET',
    
        success: function (response) {
            // Handle success response
            $('#followers-container').html(response.html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error response
            console.error('Error fetching followers:', errorThrown);
        },
        complete: function () {
            // This will be called regardless of success or failure
            // You can hide loading indicator here if shown earlier
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
        $.ajax({
            url: `/api/forum/posts/${postId}/save`, // Specify the route to save the post
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken
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