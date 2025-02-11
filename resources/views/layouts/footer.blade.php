
<footer id="about" class="bg-secondary">
    <div class="footer-main footer-main1 border-0">
        <div class="container">
            <div class="row">

                <div class="col-lg-3 col-md-3">
                    <h6 class="text-white">{{ __('Informations') }}</h6>
                    <ul class="list-unstyled mb-lg-0 mb-5">
                        <li><a href="/ConditionGenerale" class="text-white"><i class="fe fe-chevron-right"></i>
                                {{ __('terms_services') }}</a></li>
                        <li><a href="/PolitiqueConfidentialite" class="text-white"><i class="fe fe-chevron-right"></i>
                                {{ __('privacy_policy') }}</a></li>
                        <li><a href="/PolitiqueCookies" class="text-white"><i class="fe fe-chevron-right"></i>
                                {{ __('cookie_policy') }}</a></li>
                        <li><a href="/Politique-annulation" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Politique d\'annulation') }}</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-3">
                    <h6 class="text-white">{{ __('Company') }}</h6>
                    <ul class="list-unstyled mb-5 mb-lg-0">
                        <li><a href="/" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('home') }}</a></li>
                        <li><a href="/blog" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Blog') }}</a></li>
                        <li><a href="/a-propos" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('about') }}</a></li>
                        <li><a href="/devenir-professeur" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Devenir Professeur') }}</a></li>
                    </ul>
                </div>

                <div class="col-lg-3 col-md-3">
                    <h6 class="text-white">{{ __('Support et Ressources') }}</h6>
                    <ul class="list-unstyled mb-5 mb-lg-0">
                        <li><a href="/contactez-nous" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Contact Support') }}</a></li>
                        <li><a href="/Foire-aux-questions" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Aide & FAQ') }}</a></li>
                        <li><a href="/library" class="text-white"><i class="fe fe-chevron-right"></i> {{ __('Library') }}</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-3 mb-3 mb-lg-0">
                    <h6 class="text-white">{{ __('subscribe') }}</h6>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control br-7" id="name" placeholder="Nom et Prenom">
                    </div>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control br-7" id="email" placeholder="Email">
                    </div>
                    <div class="input-group">
                        <button onclick="Subscribe()" class="btn btn-white fw-bold br-7 me-2">{{ __('subscribe') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-3 mt-6 mt-md-0">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center flex-column py-5 col-10 col-lg-6 mx-auto border-top">
                <div class="mt-2 mb-5 text-left text-white">
                    <h6 class="text-center text-white mb-4 fs-6">{{ __('Suivez-nous') }}</h6>
                    <ul class="list-unstyled list-inline">

                        <li class="list-inline-item">
                            <a href="https://www.facebook.com/yool.education" target="_blank"
                                class="social-icons btn-sm rgba-white-slight waves-effect waves-light bg-white">
                                <i class="fa fa-facebook text-secondary"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://instagram.com/yool.education" target="_blank"
                                class="social-icons btn-sm rgba-white-slight waves-effect waves-light bg-white">
                                <i class="fa fa-instagram text-secondary"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a 
                            href="https://www.tiktok.com/@yool.education?_t=8hR0wHc7hv4&_r=1" 
                            target="_blank"
                            class="social-icons btn-sm rgba-white-slight waves-effect waves-light bg-white text-center pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" class="bi bi-tiktok text-secondary" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.linkedin.com/company/yool-education-livelearning/" target="_blank"
                                class="social-icons btn-sm rgba-white-slight waves-effect waves-light bg-white">
                                <i class="fa fa-linkedin text-secondary"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a 
                            href="https://www.youtube.com/@yool.education" 
                            target="_blank"
                            class="social-icons btn-sm rgba-white-slight waves-effect waves-light bg-white text-center pt-2 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z"/>
                              </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="mt-2 mb-3 text-white text-start text-md-end">
                    Copyright © {{ date('Y') }} <a href="/"
                        class="fs-14 text-primary text-uppercase">YSCHOOL</a>.
                </div>
                <div class="payment-methods d-flex">
                   <img src="{{ asset('assets/images/payments/visa.svg') }}" alt="visa" class="me-1 payment_visa">
                   <img src="{{ asset('assets/images/payments/mastercard.svg') }}" alt="mastercard" class="me-1 payment_mastercard">
                   <img src="{{ asset('assets/images/payment/logo_cmi.png') }}" alt="CMI MAROC" class="me-1 payment_cmi">
                   <img src="{{ asset('assets/images/payment/wafacash.webp') }}" alt="Wafacash" class="me-1 payment_wafacash">
                </div>
            </div>
        </div>
    </div>
</footer>
<script>
    // if (document.getElementById('start-chat')) {
    //     document.getElementById('start-chat').addEventListener('click', e => {
    //         e.preventDefault()
    //         openNewTicket('<?= csrf_token() ?>')
    //     })
    // }
    // const conversationInput = document.getElementById('conversation-input')
    // if (conversationInput) {
    //     document.getElementById('conversation-input').addEventListener('keyup', e => {
    //         if (e.key === 'Enter') sendMessage(e.target, e.target.getAttribute('data-ticket-id'),
    //             '<?= csrf_token() ?>')
    //     })
    // }
    async function setCookie(type) {
        const response = await fetch('/setCookie/'+type, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '<?= csrf_token() ?>'
            },
            method: 'POST'
        })
        if (response.status === 201) {
            document.getElementById('gdpr-cookie-message').remove()
        }
    }

    document.getElementById('gdpr-cookie-advanced')?.addEventListener('click', () => setCookie('all'))
    document.getElementById('gdpr-cookie-accept')?.addEventListener('click', () => setCookie('necessary'))
    
</script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    function Subscribe() {
        var test = 0;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        if (name === "") {
            document.getElementById("name").style.borderColor = "#dc3545";
            document.getElementById("name").style.borderWidth = "medium";
            test = 1;
        } else {
            document.getElementById("name").style.borderWidth = "thin";
            document.getElementById("name").style.borderColor = "#FFFDFD";
        }

        if (email === "") {
            document.getElementById("email").style.borderColor = "#dc3545";
            document.getElementById("email").style.borderWidth = "medium";
            test = 1;
        } else {
            document.getElementById("email").style.borderWidth = "thin";
            document.getElementById("email").style.borderColor = "#FFFDFD";
        }

        if (test == 0) {
            $.post('/subscribe', {
                name: name,
                email: email,
                _token: "{{ csrf_token() }}"
            }, function(data) {
                if (data == 1) {
                    // console.log('GOOD')
                    Swal.fire({
                        // position: "top-end",
                        icon: "success",
                        title: "{{ __('subscribed_success') }}.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    swal('OOooPs', data, 'warning');
                }
            });
        }
    }
</script>
