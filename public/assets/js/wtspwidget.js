
document.addEventListener('DOMContentLoaded', function () {
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    const whatsappForm = document.querySelector('.whatsapp-form');

    whatsappIcon.addEventListener('click', function (event) {
        event.stopPropagation(); 
        if (whatsappForm.style.display === 'block') {
            whatsappForm.style.display = 'none';
            whatsappForm.style.opacity = '0';
        } else {
            whatsappForm.style.display = 'block';
            void whatsappForm.offsetWidth; 
            whatsappForm.style.opacity = '1';
        }
    });

    document.addEventListener('click', function (event) {
        if (whatsappIcon.contains(event.target) || !whatsappForm.contains(event.target)) {
            whatsappForm.style.display = 'none';
            whatsappForm.style.opacity = '0';
        }
    });

    $('#form').on('submit', function (e) {
        e.preventDefault();

        $('.invalid-feedback').empty();
        $('.form-control').removeClass('is-invalid');

        let button = $('button');
        button.prop('disabled', true);
        button.text('Envoi en cours...');

        $.ajax({
            url: '/programmes-soutien-scolaire-2025/fr',
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                $('#success-message').text('Votre demande a été envoyée avec succès!').fadeIn();
                setTimeout(function () {
                    $('#success-message').fadeOut();
                }, 5000);

                $('#form')[0].reset();
                button.prop('disabled', false);
                button.text('Envoyer!');
            },
            error: function (xhr) {
                if (xhr.status === 422) {
                    let errors = xhr.responseJSON.errors;
                    $.each(errors, function (key, value) {
                        $(`.${key}-error`).text(value[0]);
                        $(`[name=${key}]`).addClass('is-invalid');
                    });
                } else {
                    alert('Une erreur est survenue, veuillez réessayer.');
                }
                button.prop('disabled', false);
                button.text('Envoyer!');
            }
        });
    });
});


document.querySelector('#sendMessage').addEventListener('click', function () {
    const message = document.querySelector('#whatsappMessage').value;
    const number = '+212663473417';
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});
