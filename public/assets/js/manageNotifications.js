$(document).ready(function() {
    // Fetch notifications in table
    if (window.isCORUser) {
        $('#manageNotifications').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": window.getNotificationsUrl,
                "type": "POST",
                "data": function(d) {
                    d._token = window.csrfToken;
                },
                "error": function(xhr, error, thrown) {
                    if (xhr.status === 401) {
                        alert('Unauthorized: You need to log in.');
                    } else if (xhr.status === 403) {
                        alert('Forbidden: You do not have the necessary permissions.');
                    } else {
                        alert('An error occurred while fetching notifications. Please try again.');
                    }
                }
            },
            "columns": [
                { "data": "notifiable_name" },
                { "data": "message" },
                { "data": "created_at" },
                { "data": "read_at" },
                {
                    "data": "action",
                    "orderable": false,
                    "searchable": false
                }
            ],
            "order": [[2, "desc"]],
            "language": {
                "emptyTable": window.noNotificationsMessage
            }
        });
    }

    // Select2 for user search
    $('.users-search-ajax').select2({
        dropdownParent: $('#notifyUserModal'),
        placeholder: window.selectDestinationPlaceholder,
        ajax: {
            minimumInputLength: 3,
            url: function(params) {
                const searchInput = $('.select2-search__field').val();
                return `/api/users?q=${searchInput}&type=all`;
            },
            dataType: 'json',
            delay: 250,
            processResults: function(data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });

    // Send notification
    $('#sendNotification').on('click', function(e) {
        e.preventDefault();

        var userId = $('select[name="user_id"]').val();
        var message = $('input[name="message"]').val();

        if (!userId || !message) {
            swal({
                title: "Erreur",
                text: "Veuillez sélectionner un utilisateur et entrer un message.",
                icon: "warning",
                buttons: true
            });
            return;
        }

        var formData = {
            user_id: userId,
            message: message,
            url: $('input[name="url"]').val(),
            _token: window.csrfToken
        };

        $.ajax({
            url: window.sendNotificationUrl,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    $('#notifyUserModal').modal('hide');
                    swal({
                        title: "Notification envoyée avec succès!",
                        icon: "success",
                        buttons: true
                    });
                } else {
                    $('#notifyUserModal').modal('hide');
                    swal({
                        title: "Échec de l’envoi de la notification.",
                        icon: "error",
                        buttons: false
                    });
                }
            },
            error: function(response) {
                alert('An error occurred.');
            }
        });
    });

    // Resend notification
    $(document).on('click', '.resend-notification', function(e) {
        e.preventDefault();

        var notificationId = $(this).data('notification-id');

        swal({
            title: "tu es sûr ?",
            text: "Voulez-vous vraiment envoyer cette notification?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willResend) => {
            if (willResend) {
                $.ajax({
                    url: window.resendNotificationUrl,
                    type: 'POST',
                    data: {
                        notification_id: notificationId,
                        _token: window.csrfToken
                    },
                    success: function(response) {
                        if (response.success) {
                            swal("Notification reenvoyé avec succès!", "", "success");
                        } else {
                            swal("Failed to resend.", "", "warning");
                        }
                    },
                    error: function() {
                        swal("An error occurred while resending the notification.", "", "error");
                    }
                });
            }
        });
    });

    // Fetch user notifications
    let nextPageUrl = window.getUserNotificationsUrl;

    function loadNotifications(url) {
        $.ajax({
            url: url,
            type: 'POST',
            data: { _token: window.csrfToken },
            success: function(response) {
                let notifications = response.data;
                var notificationHtml = '';

                if (notifications.length === 0) {
                    if ($('#notificationList').children().length === 0) {
                        notificationHtml = `
                            <div class="text-center user-select-none">
                                <img src="../../assets/images/no-notification.svg" alt="No notifications" style="width: 100px; height: 100px;">
                                <p class="mt-2">Aucune notification</p>
                            </div>`;
                        $('#loadMoreNotifications').hide();
                        $('#markAllAsRead').hide();
                        $('#notificationList').append(notificationHtml);
                    }
                } else {
                    notifications.forEach(function(notification) {
                        let readClass = notification.read_at ? 'read' : '';
                        notificationHtml += `
                            <div class="dropdown-item notification-item text-wrap ${readClass}" data-id="${notification.id}" data-toggle="tooltip" data-user="${notification.data.user_id ?? null}">
                                <a href="${notification.data.url || '#'}" class="notification-text">${notification.data.message}</a>
                                <div class="d-flex flex-row justify-content-between">
                                    <div class="notification-date">${timeSince(notification.created_at)}</div>`;

                        if (!notification.read_at) {
                            notificationHtml += `
                                <div class='d-flex justify-content-end'>`;

                            if (notification.data.user_id && window.isCORUser) {
                                notificationHtml += `
                                    <button onclick="copyEmail('${notification.data.user_id}')" class="btn btn-link px-1">Email</button>
                                    <button onclick="copyPhone('${notification.data.user_id}')" class="btn btn-link px-1">Phone</button>`;
                            }

                            notificationHtml += `
                                    <button class="mark-as-read btn btn-link px-1" data-id="${notification.id}">Marquer comme lu</button>
                                </div>`;

                        }

                        notificationHtml += `</div></div>`;
                    });

                    $('#notificationList').append(notificationHtml);
                    nextPageUrl = response.next_page_url;

                    if (nextPageUrl) {
                        $('#loadMoreNotifications').show();
                    } else {
                        $('#loadMoreNotifications').hide();
                    }
                    attachTooltipEvent();
                }
            },
            error: function() {
                alert('Une erreur est survenue lors de la récupération des notifications.');
            }
        });
    }

    loadNotifications(nextPageUrl);

    $('#loadMoreNotifications').on('click', function() {
        loadNotifications(nextPageUrl);
    });

    $(document).on('click', '.mark-as-read', function() {
        let notificationId = $(this).data('id');
        $.ajax({
            url: `/api/forum/notifications/${notificationId}/read`,
            type: 'POST',
            data: { _token: window.csrfToken },
            success: function() {
                $(`div[data-id="${notificationId}"]`).addClass('read');
                $(this).remove();
            }.bind(this)
        });
    });

    $('#markAllAsRead').on('click', function() {
        $.ajax({
            url: `/api/forum/notifications/allRead`,
            type: 'POST',
            data: { _token: window.csrfToken },
            success: function() {
                $('#notificationList .notification-item').addClass('read');
                $('#notificationList .mark-as-read').remove();
            }
        });
    });

    function timeSince(date) {
        let now = new Date();
        let notificationDate = new Date(date);
        let seconds = Math.floor((now - notificationDate) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) return interval + " ans";
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + " mois";
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return interval + " jours";
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return interval + " heures";
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + " minutes";
        return Math.floor(seconds) + " secondes";
    }
});

const userCache = new Map(); 
let fetchTimeout; 

function attachTooltipEvent() {
    $('.notification-item[data-user]').hover(
        function () {
            const element = $(this);
            const userId = element.data('user');

            if (userId) {
                clearTimeout(fetchTimeout);
                fetchTimeout = setTimeout(() => {
                    fetchUserInfo(userId, element);
                }, 300);
            }
        },
        function () {
            clearTimeout(fetchTimeout);
        }
    );
}

function fetchUserInfo(userId, element) {
    if (userCache.has(userId)) {
        const cachedUser = userCache.get(userId);
        displayTooltip(cachedUser, element);
    } else {
        $.ajax({
            url: `/api/get-user-info/${userId}`,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    const user = response.user;
                    userCache.set(userId, user);
                    
                    displayTooltip(user, element);
                } else {
                    displayErrorTooltip(element);
                }
            },
            error: function () {
                displayErrorTooltip(element);
            }
        });
    }
}

function displayTooltip(user, element) {
    const tooltipContent = 
`${user.name}
Email: ${user.email}
Phone: ${user.phone}`;
        // console.log(element);
    element.tooltip('hide') 
            .attr('title', tooltipContent)
            .tooltip('show'); 
}

function displayErrorTooltip(element) {
    const errorContent = 'Failed to fetch user info';
    element.tooltip('hide')
            .attr('title', errorContent)
            .tooltip('show');
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    attachTooltipEvent(); 
});


function copyEmail(userId) {
    fetchUserForCopy(userId, 'email', $(event.target));
}

function copyPhone(userId) {
    fetchUserForCopy(userId, 'phone', $(event.target));
}

function fetchUserForCopy(userId, type, element) {
    if (userId == '') return;
    if (userCache.has(userId)) {
        const user = userCache.get(userId);
        copyToClipboard(user[type]);
        updateButtonText(element, 'Copié!', type);
    } else {
        updateButtonText(element, 'Copie...', type);
        $.ajax({
            url: `/api/get-user-info/${userId}`,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    const user = response.user;
                    userCache.set(userId, user);
                    copyToClipboard(user[type]);
                    updateButtonText(element, 'Copié!', type);
                } else {
                    updateButtonText(element, 'Non copié!', type);
                }
            },
            error: function () {
                updateButtonText(element, 'Error!', type);
            }
        });
    }
}

function copyToClipboard(text) {
    if (!text) {
        // alert('No data available to copy.');
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            // alert(`${text} has been copied to the clipboard.`);
        })
        .catch(err => {
            // alert('Failed to copy to clipboard: ' + err);
        });
}

function updateButtonText(element, temporaryText, originalText) {
    element.text(temporaryText);
    setTimeout(() => {
        element.text(originalText.charAt(0).toUpperCase() + originalText.slice(1)); // Capitalize the text
    }, 2000);
}

