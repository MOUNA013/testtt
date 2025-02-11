document.addEventListener('DOMContentLoaded', function () {
    const villeSelect = document.getElementById('ville');
    const userVille = villeSelect.getAttribute('data-user-ville');  // Fetch user's current ville from data attribute

    // Fetch the JSON file containing villes
    fetch('../assets/js/villes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Clear existing options
            villeSelect.innerHTML = '<option value="">Choisissez votre ville</option>';

            // Create options for the select element
            data.forEach(ville => {
                const option = document.createElement('option');
                option.value = ville.ville;
                option.text = ville.ville;

                // Check if the user's ville matches the current option
                if (userVille && userVille === ville.ville) {
                    option.selected = true;  // Preselect user's ville
                }

                villeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Optional: handle error by showing a message to the user
        });
});

$('#editSubmitBtn').click(function () {
    var email = $('#email').val();
    var phone = $('#phone').val();
    var ville = $('#ville').val();
    var editSubmitBtn = $('#editSubmitBtn');
    var buttonText = editSubmitBtn.find('.button-text');
    var spinner = editSubmitBtn.find('.spinner-border');

    var test = 0;

    editSubmitBtn.prop('disabled', true);
    buttonText.text('');
    spinner.removeClass('d-none');

    function setValidationState(element, condition) {
        if (condition) {
            element.removeClass('is-invalid').addClass('is-valid');
        } else {
            element.removeClass('is-valid').addClass('is-invalid');
        }
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        setValidationState($('#email'), false);
        test = 1;
    } else {
        setValidationState($('#email'), true);
    }

    if (ville === "") {
        setValidationState($('#ville'), false);
        test = 1;
    } else {
        setValidationState($('#ville'), true);
    }

    if (phone === "" || phone.length < 7) {
        setValidationState($('#phone'), false);
        test = 1;
    } else {
        setValidationState($('#phone'), true);
    }

    if (test === 0) {
        $('#editProfileForm').submit();
    } else {
        editSubmitBtn.prop('disabled', false);
        buttonText.text('Sauvegarder');
        spinner.addClass('d-none');
    }
});