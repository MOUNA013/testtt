let XCSRFTOKEN = document.querySelector('meta[name="csrf-token"]').content;

// Fetch and display session analytics
async function getSessionAnalytics(classId, date) {
    try {
        const response = await fetch(`/classes/${classId}/analytics?date=${date}`);
        const modalBody = document.querySelector('#sessionAnalytics .modal-body');
        const data = await response.json();
        modalBody.innerHTML = data;
    } catch (err) {
        console.error('Error fetching session analytics:', err);
    }
}

// Fetch and display attendance list
async function getAttendList(classId, date) {
    try {
        const response = await fetch(`/sessions/attendancelist?classId=${classId}&date=${date}`);
        const attendanceListTable = document.querySelector('#attendanceList tbody');
        const attendanceList = await response.json();
        attendanceListTable.innerHTML = '';
        attendanceList.forEach(item => {
            attendanceListTable.innerHTML += `<tr>
                <td>${item.name}</td>
                <td>${item.entree}</td>
                <td>${item.score ?? '..'}<small>/10</small></td>
                <td>${item.remarque ?? '-'}</td>
            </tr>`;
        });
    } catch (err) {
        console.error('Error fetching attendance list:', err);
    }
}

// Display remark modal and fetch remark data
function showRemarkModal(classId, sessionDate) {
    document.getElementById('classId').value = classId;
    document.getElementById('sessionDate').value = sessionDate;

    fetch(`/sessions/get-remark?class=${classId}&date=${sessionDate}`)
        .then(response => response.json())
        .then(function (data) {
            document.getElementById('sessionRemark').value = data.remark || '';
        })
        .catch(err => console.error('Error fetching remark:', err));
}

// Display seance modal and fetch seance data
function editSeance(classId, sessionDate) {
    document.getElementById('editSeanceClassId').value = classId;
    document.getElementById('editSeanceDate').value = sessionDate;

    // Fetch seance data
    fetch(`/sessions/get-seance?class=${classId}&date=${sessionDate}`)
        .then(response => response.json())
        .then(function (data) {
            if (data.error) {
                return;
            }
            document.getElementById('heureDebut').value = data.session.heureDebut || '';
            document.getElementById('heureFin').value = data.session.heureFin || '';
        })
        .catch(err => console.error('Error fetching seance data:', err));
}

// Handle user search in modal using select2
$(function() {
    $('.signalerPar-search-ajax').select2({
        dropdownParent: $('#incidentModal'),
        placeholder: "Signaler par",
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
});

// Show incident modal and set form action
function ShowAddIncidentModal(action, classId = null, date = null, incidentId = null) {
    const form = document.getElementById('incidentForm');
    if (action === 'add') {
        form.action = "/sessions/addIncident";
        document.getElementById('seanceClassId').value = classId;
        document.getElementById('seanceDate').value = date;
        document.getElementById('dateIncident').value = '';
        document.getElementById('mesurePrise').value = '';
        document.getElementById('descIncident').value = '';
        document.getElementById('signalerPar').value = ''; 
    }
    $('#incidentModal').modal('show');
}

// Submit incident form via AJAX
$(document).ready(function () {
    $('#incidentForm').on('submit', function (e) {
        e.preventDefault();
        $('#incidentModal').modal('hide');
        $('#modalSubmitBtn').prop('disabled', true);

        let formData = $(this).serialize();
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Incident ajouté',
                        text: 'L\'incident a été ajouté avec succès !',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Close the modal
                    $('#incidentModal').modal('hide');
                    // location.reload();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de l\'ajout de l\'incident.'
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de l\'ajout de l\'incident.'
                });
            },
            complete: function () {
                $('#modalSubmitBtn').prop('disabled', false);
            }
        });
    });
});

// Submit remark form via AJAX and show success message
document.getElementById('remarkForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let formData = new FormData(this);
    let classId = document.getElementById('classId').value;
    let sessionDate = document.getElementById('sessionDate').value;
    let remark = document.getElementById('sessionRemark').value;
    
    fetch(`/sessions/update-remark`, {
        method: 'PATCH',
        headers: {
            'X-CSRF-TOKEN': XCSRFTOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: classId,
            sessionDate: sessionDate,
            remark: remark
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Remarque mise à jour',
                text: 'Votre remarque a été mise à jour avec succès !',
                showConfirmButton: false,
                timer: 1500
            });

            document.querySelector('#addRemark').classList.remove('show');
            document.querySelector('body').classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue. Veuillez réessayer.'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur inattendue est survenue.'
        });
    });
});

// Validate session and update UI
function validerSession(classId, sessionDate) {
    
    swal({
        title: "tu es sûr ?",
        text: "Est-ce que tu veux vraiment valider la session?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {

            var button = $('.valider-session-btn');
            var originalContent = button.html();
            button.html('<i class="fa fa-spinner fa-spin"></i>');

            fetch(`/sessions/valider-session?classId=${classId}&sessionDate=${sessionDate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': XCSRFTOKEN
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    button.html(originalContent);
                    Swal.fire({
                        icon: 'success',
                        title: 'Session validée',
                        text: 'La session a été validée avec succès !',
                        showConfirmButton: false,
                        timer: 1500
                    });
        
                    let sessionRow = document.querySelector(`tr[data-session-date="${sessionDate}"]`);
                    let validerButton = sessionRow.querySelector('.valider-session-btn');
                    let remarkButton = sessionRow.querySelector('.remark-session-btn');
                    let incidentButton = sessionRow.querySelector('.incident-session-btn');
                    let editButton = sessionRow.querySelector('.edit-session-btn');
                    validerButton.classList.add('d-none');
                    remarkButton.classList.add('d-none');
                    incidentButton.classList.add('d-none');
                    editButton.classList.add('d-none');
                    sessionRow.style.backgroundColor = '#d4edda';
                } else {
                    button.html(originalContent);
                    Swal.fire({
                        icon: 'error',
                        title: 'Session non validée',
                        text: 'La session n\'a pas pu être validée. Veuillez vérifier les informations et réessayer.',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        timer: 3000
                    });
                }
            })
            .catch(error => {
                button.html(originalContent);
                console.error('Error:', error)
            });
        }
    })
    
}


// Invalidate session function
function invaliderSession(classId, sessionDate) {

    swal({
        title: "invalider la session ?",
        text: "Une fois que cette session sera invalidée, elle sera définitivement supprimée d’ici!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            fetch(`/sessions/invalider-session?classId=${classId}&sessionDate=${sessionDate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': XCSRFTOKEN
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Session invalidée',
                        text: 'Votre session a bien été invalidée.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    let sessionRow = document.querySelector(`tr[data-session-date="${sessionDate}"]`);
                    sessionRow.remove();
                    
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Échec de l\'invalidation de la session.'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur inattendue est survenue.'
                });
            });
        }
    })
}

document.getElementById('seanceHeureForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let classId = document.getElementById('editSeanceClassId').value;
    let sessionDate = document.getElementById('editSeanceDate').value;
    let heureDebut = document.getElementById('heureDebut').value;
    let heureFin = document.getElementById('heureFin').value;

    fetch(`/sessions/edit-session?classId=${classId}&sessionDate=${sessionDate}`, {
        method: 'PATCH',
        headers: {
            'X-CSRF-TOKEN': XCSRFTOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: classId,
            sessionDate: sessionDate,
            heure_from: heureDebut,
            heure_to: heureFin
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Seance heure mise à jour',
                text: 'La seance a été mise à jour avec succès !',
                showConfirmButton: false,
                timer: 1500
            });

            // Close the modal
            document.querySelector('#updateSeanceModal').classList.remove('show');
            document.querySelector('body').classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();
        } else {
            // Close the modal
            document.querySelector('#updateSeanceModal').classList.remove('show');
            document.querySelector('body').classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: data.message || 'Une erreur est survenue. Veuillez réessayer.'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur inattendue est survenue.'
        });
    });
});
