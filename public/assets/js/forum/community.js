const CSRFTOKEN = document.querySelector('meta[name="csrf-token"]').content;
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
                    'X-CSRF-TOKEN': CSRFTOKEN
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

$(document).on('click', '.save', function() {
    var $saveBtn = $(this);
    var postId = $saveBtn.data('post-id');
    var unsavedIcon = $saveBtn.find('#unsavedIcon');
    var savedIcon = $saveBtn.find('#savedIcon');
    console.log(postId);
    // Disable the save button to prevent multiple clicks
    $saveBtn.prop('disabled', true);

    // Send AJAX request to save the post
    $.ajax({
        url: `/api/forum/posts/${postId}/save`,
        type: 'POST',
        headers: {
            "X-CSRF-TOKEN": CSRFTOKEN
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

$(document).ready(function() {
    $(document).on('click', '#join-community-btn', function() {
        var button = $(this);
        var communityId = button.data('community-id');
        var roleId = button.data('role-id');
        toggleJoinCommunity(button, communityId, roleId);
    });

    function toggleJoinCommunity(button, communityId, roleId) {
        fetch(`/api/forum/ReqMemberShip/${communityId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': CSRFTOKEN
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
            console.log(data);
            if (data.canceled) {
                // If the server canceled the pending request, update the button state to "Join Community"
                updateButtonState(null, button);
            } else if (data && data.membership && data.membership.member_role_id) {
                var newRoleId = data.membership.member_role_id;
                updateButtonState(newRoleId, button);
            } else {
                console.error('Error: Invalid response structure');
                // Handle the error or show a message to the user
            }
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    function updateButtonState(roleId, button) {
        if (roleId === 2 || roleId === 1) {
            button.text('Quitter');
        } else if (roleId === 3) {
            button.text('En attente');
    
        } else {
            button.text('Rejoindre');
        }
    }
})