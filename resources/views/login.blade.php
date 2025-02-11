<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <!-- Meta data -->
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="title" content="{{ __('meta_about_title') }}">
    <meta name="description"
        content="{{ __("Connectez-vous à Yool.education pour accéder à nos séances de cours et formations à distance. Profitez d'une variété de formations et de cours de qualité.") }}">
    <meta name="author" content="Y SCHOOL">
    <meta name="keywords" content="{{ __('meta_about_keys') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Favicon -->
    <link rel="icon" href="../../assets/images/brand/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" type="image/x-icon" href="../../assets/images/brand/favicon.ico" />

    <!-- Title -->
    <title> {{ __('Login') }}</title>

    <!-- Bootstrap css -->
    <link href="../../assets/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />

    <!-- Style css -->
    <link href="../../assets/css/style.css?v=1" rel="stylesheet" />

    <!-- Font-awesome  css -->
    <link href="../../assets/css/icons.css" rel="stylesheet" />
    <!-- Color Skin css -->
    <link id="theme" rel="stylesheet" type="text/css" media="all" href="../../assets/color-skins/color.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>

    <script src="https://www.google.com/recaptcha/api.js?render=6Lfvq-opAAAAAL0VtGCzIPU8FI0ZNHN5sDcbJzGP"></script>

    <link rel="stylesheet" href="{{ asset('assets/css/login.css') }}">

    <!--Select2 css -->
    <link href="../../assets/plugins/select2/select2.css" rel="stylesheet" />

</head>

<body>

    {{-- <!--Loader-->
		<div id="global-loader">
			<img class="loader-img" width="175.614" src="/loader.gif">
		</div> 
		<!--/Loader--> --}}

    <!--Topbar-->
    <div class="header-main">
        @include('layouts.topbar')
        @include('layouts.header_new')
    </div>
    <!--/Topbar-->


    <!-- authentication section-->
    <section class="sptb-0 pb-0 pt-lg-7 pb-lg-5 bg-white d-flex justify-content-center align-items-center"  style="min-height : 90vh">
        <div class="customerpage w-100">
            <div class="row mx-0 ">
                <div class="col-md-9 col-lg-7 col-xl-6 bg-white mx-auto">
                  <x-auth-component :handleRedirection="false"></x-auth-component>
                </div>
            </div>
        </div>
    </section>
    <!--/ authentication section-->

    <!--Footer Section-->
    @include('layouts.footer')
    <!--Footer Section-->

    <!-- Back to top -->
    <a href="#top" id="back-to-top"><i class="fa fa-long-arrow-up"></i></a>

    <!-- JQuery js-->
    <script src="../../assets/js/jquery.min.js"></script>

    <!-- Bootstrap js -->
    <script src="../../assets/plugins/bootstrap/js/popper.min.js"></script>
    <script src="../../assets/plugins/bootstrap/js/bootstrap.min.js"></script>

    <!--Horizontal Menu-->
    <script src="../../assets/plugins/horizontal-menu/horizontal-menu.js"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- index js-->
    <script src="../../assets/js/index.js"></script>

    <!-- Custom js-->
    <script src="../../assets/js/custom.js"></script>

    <!-- login js-->
    <script src="../../assets/js/login.js"></script>

    <script src="../../assets/plugins/select2/select2.full.min.js"></script>
    <script src="../../assets/js/select2.js"></script>

    @isset($signup)
        <script>
            document.getElementById('signup-tab').click();
        </script>
    @endisset
</body>
</html>
