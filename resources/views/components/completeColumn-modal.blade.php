<style>
    .mandatory-modal {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    
    .mandatory-modal .modal-content {
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .mandatory-modal .modal-header {
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
        padding: 1.5rem;
    }
    
    .mandatory-modal .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2c3e50;
    }
    
    .mandatory-modal .modal-body {
        padding: 2rem;
    }
    
    .mandatory-modal .info-icon {
        width: 80px;
        height: 80px;
        background: #e3f2fd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }
    
    .mandatory-modal .info-icon i {
        font-size: 40px;
        color: #1976d2;
    }
    

    
    .mandatory-modal .submit-btn {
        height: 48px;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: #1976d2;
        border: none;
        transition: all 0.2s;
    }
    
    .mandatory-modal .submit-btn:hover {
        background: #1565c0;
        transform: translateY(-1px);
    }
    
    .mandatory-modal .submit-btn:disabled {
        background: #90caf9;
        cursor: not-allowed;
    }

    .error-feedback {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
    }
    .iti {
    width: 100% !important;
    }
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css" />
<div class="modal fade mandatory-modal" id="completeColumnModal" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Informations requises') }}</h5>
            </div>
            <div class="modal-body">
                <div class="info-icon">
                    <i class="fa fa-info-circle"></i>
                </div>
                
                <p class="text-center mb-4">Pour continuer, veuillez compléter ces informations importantes</p>
                
                <form class="row text-start" id="mandatoryInfoForm" novalidate>
                    <div class="col-12 col-md-6 mb-4">
                        <label class="form-label" for="phone">Numéro de téléphone</label>
                        <div class="telephone-input">
                            <input id="phone" type="tel" class="form-control"
                                    placeholder="ex: 0612345678" required>
                            <input name="phone" type="hidden" id="phonenumber">
                            <div class="error-feedback">Veuillez entrer un numéro de téléphone valide</div>
                        </div>
                    </div>
                    
                    <div class="col-12 col-md-6 mb-4">
                        <label class="form-label" for="ville">{{__('Ville')}}</label>
                        <div class="ville-input-wrapper">
                            <select name="ville" id="ville" class="form-control select2-ville" required>
                                <option value="">Choisissez votre ville</option>
                            </select>
                            <div class="error-feedback">Veuillez sélectionner une ville</div>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary submit-btn w-100 mt-4" id="submitMandatoryInfo">
                        {{__('Confirmer')}}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('mandatoryInfoForm');
        const phoneInput = document.getElementById('phone');
        const villeSelect = document.getElementById('ville');
        const submitBtn = document.getElementById('submitMandatoryInfo');
        
        // Get user data from session
        const ville = "{{ session('ville') }}";
        const phone = "{{ session('phone') }}";

        // console.log(ville, phone);
        const moroccoPhoneRegex = /^(?:\+212|0)(5|6|7)\d{8}$/;
        
        
        // Initialize phone input with intl-tel-input
        const phoneInputInstance = window.intlTelInput(phoneInput, {
            preferredCountries: ["ma", "fr", "nl", "be"],
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });


        // Set phone if exists
        if (phone) {
            phoneInput.value = phone;
            phoneInput.disabled = true;
            phoneInput.classList.add('bg-light');
            const phoneWrapper = phoneInput.closest('.telephone-input');
            if (phoneWrapper) {
                const flagContainer = phoneWrapper.querySelector('.iti__flag-container');
                if (flagContainer) {
                    flagContainer.style.pointerEvents = 'none';
                }
            }
        }
        

        // Load cities and handle existing ville
        fetch('../../assets/js/villes.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(cityData => {
                    const option = new Option(cityData.ville, cityData.ville);
                    villeSelect.add(option);
                });
                
                if (ville) {
                    villeSelect.value = ville;
                    villeSelect.disabled = true;
                    villeSelect.classList.add('bg-light');
                }
            })
            .catch(error => console.error('Error loading cities:', error));

        // Form validation
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Only validate phone if it's not already set
            if (!phone) {
                const phoneErrorElement = phoneInput.closest('.telephone-input').querySelector('.error-feedback');
                const enteredPhone = phoneInputInstance.getNumber();

                if (!moroccoPhoneRegex.test(enteredPhone)) {
                    phoneErrorElement.style.display = 'block';
                    phoneErrorElement.textContent = "Le numéro doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
                    isValid = false;
                } else {
                    phoneErrorElement.style.display = 'none';
                }
            }
            
            // Only validate ville if it's not already set
            if (!ville) {
                const villeErrorElement = villeSelect.closest('.ville-input-wrapper').querySelector('.error-feedback');
                if (!villeSelect.value) {
                    villeErrorElement.style.display = 'block';
                    isValid = false;
                } else {
                    villeErrorElement.style.display = 'none';
                }
            }
            
            if (isValid) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enregistrement...';
                

                const updateData = {};
                if (!phone) updateData.phone = phoneInputInstance.getNumber();
                if (!ville) updateData.ville = villeSelect.value;
                
                try {
                    const response = await fetch('/complete-user-info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        },
                        body: JSON.stringify(updateData)
                    });

                    if (response.ok) {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('completeColumnModal'));
                        modal.hide();
                        console.log(response);
                    } else {
                        throw new Error('Erreur lors de la sauvegarde');
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Confirmer';
                }
            }
        });

        // Show modal if needed
        const userId = "{{ session('id') }}";
        const userType = "{{ session('type') }}";
        if (userId && (!ville || !phone) && userType !== "STD" && userType !== "PR") {
            new bootstrap.Modal(document.getElementById('completeColumnModal')).show();
        }
    });
</script>