const phoneInputField = document.querySelector("#phone");
/*const phoneInput = window.intlTelInput(phoneInputField, {
                    initialCountry: "auto",
                    geoIpLookup: getIp,
                    utilsScript:
                    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                    });*/
const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["ma", "fr", "nl", "be"],
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function RecoverPassword() {
    var email = document.getElementById('email_rec').value;
    $.post('/ForgetPassword', { email: email, _token }, function (data) {
        if (data == 1) {
            swal('email envoyé', '', 'success');
        } else if (data == 0) {
            swal('email non enregisté', '', 'warning');
        } else {
            swal('{{__("oops")}}', '', 'warning');
        }
    });
}

 // Fetch Villes JSON file
document.addEventListener('DOMContentLoaded', function () {
    const villeSelect = document.getElementById('ville');
    
    // Fetch the JSON file
    fetch('../../assets/js/villes.json')
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
                villeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Optional: handle error by showing a message to the user
        });
});


function Register() {
    grecaptcha.ready(function () {
        grecaptcha.execute('6Lfvq-opAAAAAL0VtGCzIPU8FI0ZNHN5sDcbJzGP', { action: 'submit' }).then(function (token) {
            // Add your logic to submit to your backend server here.
            // grecaptchaToken = token
            document.getElementById('recaptcha-token').value = token

            var inputPassword = document.getElementById('password1').value;
            var PasswordCheck = document.getElementById('password2').value;
            var inputEmail = document.getElementById('ins_email').value;
            var Nom = document.getElementById('Nom').value;
            var Prenom = document.getElementById('Prenom').value;
            var coupon = document.getElementById('coupon').value;

            var phone = phoneInput.getNumber();
            var ville = document.getElementById('ville').value;

            var test = 0;


            if (Nom === "") {
                document.getElementById("Nom").style.borderColor = "#dc3545";
                document.getElementById("Nom").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("Nom").style.borderWidth = "thin";
                document.getElementById("Nom").style.borderColor = "#F07F19";
            }

            if (Prenom === "") {
                document.getElementById("Prenom").style.borderColor = "#dc3545";
                document.getElementById("Prenom").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("Prenom").style.borderWidth = "thin";
                document.getElementById("Prenom").style.borderColor = "#F07F19";
            }

            if (inputEmail === "") {
                document.getElementById("ins_email").style.borderColor = "#dc3545";
                document.getElementById("ins_email").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("ins_email").style.borderWidth = "thin";
                document.getElementById("ins_email").style.borderColor = "#F07F19";
            }
            if (ville === "") {
                document.getElementById("ville").style.borderColor = "#dc3545";
                document.getElementById("ville").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("ville").style.borderWidth = "thin";
                document.getElementById("ville").style.borderColor = "#F07F19";
            }

            if (!phone.includes('+')) {
                document.getElementById("phone").style.borderColor = "#dc3545";
                document.getElementById("phone").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("phonenumber").value = phone;
                document.getElementById("phone").style.borderWidth = "thin";
                document.getElementById("phone").style.borderColor = "#F07F19";
            }


            if (inputPassword != PasswordCheck) {
                document.getElementById("password1").style.borderColor = "#dc3545";
                document.getElementById("password2").style.borderColor = "#dc3545";
                document.getElementById("password1").style.borderWidth = "medium";
                document.getElementById("password2").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("password1").style.borderColor = "#F07F19";
                document.getElementById("password1").style.borderWidth = "thin";
                document.getElementById("password2").style.borderWidth = "thin";
                document.getElementById("password2").style.borderColor = "#F07F19";
            }
            if (inputPassword === "") {
                document.getElementById("password1").style.borderColor = "#dc3545";
                document.getElementById("password1").style.borderWidth = "medium";
                test = 1;
            } else {
                document.getElementById("password1").style.borderWidth = "thin";
                document.getElementById("password1").style.borderColor = "#F07F19";
            }
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

            if (strongRegex.test(inputPassword)) {
                document.getElementById("regex").style.display = 'none';

            } else {
                document.getElementById("regex").style.display = 'flex';
                test = 1;
            }

            if (coupon != '') {
                $.post('/CheckCoupon', { coupon: coupon, _token }, function (data) {
                    if (data == 1) {
                        document.getElementById("coupon").style.borderWidth = "thin";
                        document.getElementById("coupon").style.borderColor = "#05cc16";
                        document.getElementById("couponalert").style.display = 'none';
                        if (test == 0) {
                            document.getElementById("submit").click();
                        }
                    } else {
                        document.getElementById("coupon").style.borderColor = "#dc3545";
                        document.getElementById("coupon").style.borderWidth = "medium";
                        document.getElementById("couponalert").style.display = 'flex';
                    }
                });
            } else {
                if (test == 0) {
                    document.getElementById("submit").click();
                }
            }
        });
    });
}


function getIp(callback) {
    fetch('https://ipinfo.io/json?token=<your token>', { headers: { 'Accept': 'application/json' } })
        .then((resp) => resp.json())
        .catch(() => {
            return {
                country: 'ma',
            };
        })
        .then((resp) => callback(resp.country));
}

function SetCoupon() {
    var val = document.getElementById('checkcoupon');
    if (val.checked) {
        document.getElementById('coupondiv').style.display = 'flex';
    } else {
        document.getElementById('coupondiv').style.display = 'none';
    }
}

function ShowSignUp() {
    document.getElementById("home").classList.remove("active");
    document.getElementById("profile").classList.add("active");
}

function ShowLogin() {
    document.getElementById("home").classList.add("active");
    document.getElementById("profile").classList.remove("active");
}