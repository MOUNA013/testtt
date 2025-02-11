<style>
    /* Add some padding to the modal body */
    .modal-body {
        text-align: center;
        padding: 20px;
    }

    /* Style the icon */
    .verification-icon {
        font-size: 50px;
        color: #007bff;
        margin-bottom: 20px;
    }

    /* Center the title */
    .modal-title {
        text-align: center;
        width: 100%;
    }

    /* Add some margin to the button */
    .btn-block {
        margin-top: 20px;
    }
</style>

<div class="modal fade" id="VerifyEmailModal" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{ __('Vérifier votre email') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="verification-icon mb-4">
                    <i class="fa fa-envelope"></i>
                </div>
                <p class="mb-4">Un lien de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.</p>
                <p class="text-muted mb-4">Le lien n'est valable que 24 heures.</p>
                <button id="resendEmail" class="btn btn-secondary w-100">
                    <i class="fa fa-paper-plane me-2"></i>{{ __("Renvoyer l'email de vérification") }}
                </button>
                <div id="resendTimer" class="mt-3 text-muted" style="display: none;">
                    Vous pourrez renvoyer un email dans <div id="timerCount" class="d-inline">60</div> secondes.
                </div>
            </div>
        </div>
    </div>
</div>



<script>
    document.addEventListener('DOMContentLoaded', function () {
        const verifyEmailModal = document.getElementById('VerifyEmailModal');
        const resendButton = document.getElementById('resendEmail');
        const resendTimer = document.getElementById('resendTimer');
        const timerCount = document.getElementById('timerCount');
        const hideModalText = document.getElementById('hideModalText');

        const userId = "{{ session('id') }}";
        const emailVerifiedAt = "{{ session('email_verified_at') }}";
        const ville = "{{ session('ville') }}";
        const phone = "{{ session('phone') }}";
        const lastSentTime = localStorage.getItem('verificationSentTime');
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (userId && ville !== "" && phone !== "") {
            console.log(ville, phone);
            
            if (userId && !emailVerifiedAt && (!lastSentTime || (currentTime - lastSentTime) > twentyFourHours)) {
                setTimeout(() => {
                    new bootstrap.Modal(verifyEmailModal).show();
                }, 3000);
            }
        }

        let countdownTimer;
        function startCountdown(duration) {
            resendButton.disabled = true;
            resendTimer.style.display = 'block';
            let timeLeft = duration;

            countdownTimer = setInterval(function() {
                timerCount.textContent = timeLeft;
                if (--timeLeft < 0) {
                    clearInterval(countdownTimer);
                    resendButton.disabled = false;
                    resendTimer.style.display = 'none';
                    resendButton.innerHTML = '<i class="fa fa-paper-plane me-2"></i>{{ __("Renvoyer l\'email de vérification") }}';
                }
            }, 1000);
        }

        resendButton.addEventListener('click', function () {
            $.post('/ResendVerifyEmail', {_token: "{{ csrf_token() }}"}, function(data) {
                if (data == 1) {
                    localStorage.setItem('verificationSentTime', Date.now());
                    startCountdown(60);
                    resendButton.innerHTML = '<i class="fa fa-check me-2"></i>Email envoyé';
                    hideModalText.style.display = 'block';
                }
                if (data == 0) {
                    localStorage.setItem('verificationSentTime', Date.now());
                    startCountdown(60);
                    resendButton.innerHTML = '<i class="fa fa-exclamation-triangle me-2"></i>Erreur, réessayez plus tard';
                    resendButton.classList.remove('btn-primary');
                    resendButton.classList.add('btn-danger');
                }
            })
        });

        // Event listener for modal close
        verifyEmailModal.addEventListener('hidden.bs.modal', function () {
            // Save the current time in local storage when modal is closed
            localStorage.setItem('verificationSentTime', Date.now());
        });
    });
</script>
