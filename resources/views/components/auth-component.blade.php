<div class="row login p-0">
    <div class="col-xl-12 col-md-12 col-md-12 register-right">

        <ul class="nav nav-tabs d-none" id="myTab" role="tablist">

            <li class="nav-item">
                <a class="btn btn-outline btn-gray active m-0" id="signin-tab" data-bs-toggle="tab" href="#signin"
                    role="tab" aria-controls="signin" aria-selected="true"
                    style="font-size: larger;">{{ __('login') }}</a>
            </li>
            <li class="nav-item">
                <a class="btn btn-outline btn-gray m-0" id="signup-tab" data-bs-toggle="tab" href="#signup"
                    role="tab" aria-controls="signup" aria-selected="false">{{ __('register') }}</a>
            </li>
            <li class="nav-item">
                <a class="btn btn-outline btn-gray m-0" id="pass-tab" data-bs-toggle="tab" href="#RecPass"
                    role="tab" aria-controls="reset-password-tab"
                    aria-selected="false">{{ __('resset password') }}</a>
            </li>

        </ul>

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                <div class="card shadow-none border-0 p-0">
                    <div class="card-body p-0">
                        <div class="single-page customerpage">
                            <div class="wrapper wrapper2 box-shadow-0">
                                <form id="login" action="/Login" method="POST" class="" tabindex="500">
                                    @csrf
                                    <div class="mail">
                                        <input type="email" placeholder="{{ __('email') }}" class="form-control"
                                            name="log_email" required>
                                    </div>
                                    <div class="passwd">
                                        <input type="password" placeholder="{{ __('password') }}" class="form-control" name="log_password" required>
                                        @if ($errors->has('password'))
                                            <p class="text-danger text-lowercase mt-2" role="alert">{{ __($errors->first()) }}</p>
                                        @endif
                                    </div>
                                    <div class="submit">
                                        <button class="btn btn-primary btn-block fs-14" type="submit">{{ __('login') }}</button>
                                    </div>
                                    <div class="d-flex mb-0 flex-column flex-md-row justify-content-md-between">
                                        <p class="text-dark mb-0">{{ __('New_on_our_plateform?') }}
                                            <a href="javascript: document.getElementById('signup-tab').click();" class="text-primary ms-1 fw-bold text-decoration-underline">{{ __('create_acc') }}</a>
                                        </p>
                                        <p class="mb-1 mb-md-0">
                                            <a href="javascript: document.getElementById('pass-tab').click();">{{ __('forgot_password') }}?</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0 border-top-0 mt-5">
                        <div class="row mb-4">
                            <div class="col-12">
                                <p class="text-dark mb-0 ms-auto text-center">{{ __('or connect with') }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="submit">
                                    <a class="btn btn-block border shadow btnGoogle" href="/auth/google{{ $handleRedirection ? '?r='.request()->path() : '' }}">
                                        <img src="{{ asset('assets/images/svg/google-icon.svg') }}" alt="google icon"
                                            class="me-1" style="width: 23px;">
                                        <span class="fw-bold opacity-7">Google</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade show" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                <div class="card shadow-none border-0 p-0">
                    <div class="text-center">
                        <h2 class="mb-4">{{ __('Créez votre compte') }}</h2>
                        <p class="fs-16">{{ __('Remplissez le formulaire ci-dessous pour créer votre compte') }}</p>
                    </div>
                    <div class="card-body p-0">
                        <div class="single-page customerpage">
                            <div class="wrapper wrapper2 box-shadow-0">
                                <form id="register" action="/Register" method="POST" class="" tabindex="500">
                                    @csrf
                                    <div class="mb-3">
                                        <div class="form-row">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <input type="text" placeholder="{{ __('first_name') }}"
                                                    class="form-control" id="Nom" name="firstname" required>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" placeholder="{{ __('last-name') }}"
                                                    class="form-control" id="Prenom" name="lastname" required>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <input type="email" class="form-control "
                                            placeholder="{{ __('email') }}" id="ins_email" name="email"
                                            required>
                                            @if ($errors->has('email'))
                                                <p class="text-danger text-lowercase mt-2" role="alert">{{ $errors->first('email') }}</p>
                                            @endif
                                    </div>

                                    <div class="mb-3">
                                        <div class="form-row">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <input type="password" placeholder="{{ __('enter_pass') }}"
                                                    class="form-control" name="password1" id="password1" required>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="password" placeholder="{{ __('confirm_pass') }}"
                                                    class="form-control" name="password2" id="password2" required>
                                            </div>
                                        </div>
                                        <div class="form-row" style="color: rgb(206, 14, 14); display: none;"
                                            id="regex">
                                            <div class="col-12">
                                                {{ __('pass_regex') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-row">
                                            <div class="col-md-6 mb-3 mb-md-0 input-group telephone-input">
                                                <input id="phone" type="tel" class="form-control"
                                                    placeholder="e.g. 0612345678">
                                                <input name="phone" type="hidden" id="phonenumber">
                                            </div>
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <select name="ville" id="ville" class="form-control select2-ville" data-placeholder="Choisissez votre ville" required></select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <div class="form-row">
                                            <div class="col-md-6 d-flex align-items-center">
                                                <div class="checkbox checkbox-info">
                                                    <label class="custom-control mt-4 form-checkbox">
                                                        <input type="checkbox" onclick="SetCoupon()" id="checkcoupon" class="custom-control-input" checked />
                                                        <span class="custom-control-label text-dark ps-2">{{ __('use_partner_code') }}</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6" id="coupondiv">
                                                <input type="text" placeholder="{{ __('COUPON') }}"
                                                    class="form-control" name="coupon" id="coupon">
                                            </div>
                                        </div>
                                        <div class="form-row" style="color: rgb(206, 14, 14); display: none;"
                                            id="couponalert">
                                            <div class="col-12">
                                                {{ __('partner_code_invalid') }}
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <p class="fs-10 text-muted text-justify mb-0" style="padding: 6px;">
                                                <strong>YSCHOOL SARL</strong> collecte vos données personnelles pour la gestion de ses clients pour la formation et l’accompagnement scolaire en live. Ce traitement a fait l’objet d’une demande d’autorisation auprès de la CNDP sous le numéro (en cours). <br>Les données collectées sont hébergées à l'étranger conformément à une demande déposée auprès de la CNDP sous le numéro (en cours). <br>Pour exercer vos droits d'accès, de rectification ou d'opposition, vous pouvez nous contacter par email à l’adresse <a href="mailto:pdp@yool.education">pdp@yool.education</a>, conformément aux dispositions de la loi 09-08.
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="checkbox checkbox-info">
                                                <label class="custom-control mt-4 form-checkbox">
                                                    <input type="checkbox" id="AcceptTerms" class="custom-control-input" />
                                                    <span class="custom-control-label text-dark ps-2">
                                                        {{ __("J'ai lu et j'accepte ") }} 
                                                        <a class="text-primary" href='/ConditionGenerale' target="_blank">
                                                            {{ __("les termes et conditions") }}
                                                        </a>
                                                    </span>
                                                </label>    
                                            </div>
                                        </div>
                                        <div class="form-row" style="color: rgb(206, 14, 14); display: none;"
                                            id="AcceptTermsAlert">
                                            <div class="col-12">
                                                {{ __('Vous devez accepter les termes et conditions.') }}
                                            </div>
                                        </div>                           
                                    </div>

                                    <input type="hidden" id="recaptcha-token" name="recaptcha_token">
                                    <div class="submit">
                                        <a class="btn btn-primary btn-block fs-14 disabled" id="registerBtn" onclick="Register(event)" disabled>{{ __('register') }}</a>
                                        <button class="btn btn-primary btn-block" type="submit" id="submit" style="display: none;" >Register</button>
                                    </div>

                                    <p class="text-dark mb-0">
                                        {{ __('already-have-an-account?') }}<a
                                            href="javascript: document.getElementById('signin-tab').click();"
                                            class="text-primary ms-1 fw-bold text-decoration-underline">{{ __('sign-in') }}</a>
                                    </p>
                                     
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0 border-top-0 mt-5">
                        <div class="row mb-4">
                            <div class="col-12">
                                <p class="text-dark mb-0 ms-auto text-center">
                                    {{ __('or connect with') }}</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <div class="submit">
                                    <a class="btn btn-block border shadow btnGoogle" href="/auth/google{{ $handleRedirection ? '?r='.request()->path() : '' }}">
                                        <img src="{{ asset('assets/images/svg/google-icon.svg') }}" alt="google icon"
                                            class="me-1" style="width: 23px;">
                                        <span class="fw-bold opacity-7">Google</span>
                                    </a>
                                </div>
                            </div>
                            {{-- <div class="col">
                                    <div class="submit">
                                        <a  class="btn btn-block" href="/auth/facebook" style="border-color: #3a589a">
                                            <i class="fa fa-facebook-f fa-lg" style="color: #3a589a"></i>                                                           </a>
                                    </div>
                                </div> --}}
                        </div>
                       

                    </div>
                </div>
            </div>

            <div class="tab-pane fade show" id="RecPass" role="tabpanel" aria-labelledby="reset-password-tab">
                <div class="card border-0 shadow-none p-0">
                    <div class="card-body p-0">
                        <div class="single-page customerpage">
                            <div class="wrapper wrapper2 box-shadow-0">

                                <div class="mail mb-3">
                                    <input type="email" placeholder="{{ __('email') }}" id="email_rec"
                                        class="form-control ">
                                </div>

                                <div class="submit mb-3">
                                    <button class="btn btn-primary btn-block fs-14"
                                        onclick="RecoverPassword()">{{ __('Recover') }}</button>
                                </div>
                                <div class="d-flex mb-0">
                                    <p class="text-dark mb-0">{{ __('already-have-an-account?') }}
                                        <a href="javascript: document.getElementById('signin-tab').click();"
                                            class="text-primary ms-1 text-decoration-underline">{{ __('sign-in') }}</a>
                                    </p>
                                    <p class="text-dark mb-0 ms-auto">{{ __('New_on_our_plateform?') }}
                                        <a href="javascript: document.getElementById('signup-tab').click();"
                                            class="text-primary ms-1 fw-bold text-decoration-underline">{{ __('create_acc') }}</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
