<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <!-- Meta data -->
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content=" YSCHOOL - Online Education & Learning Courses" name="description">
    <meta content="YSCHOOL" name="author">
    <meta name="keywords" content="" />


    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" href="{{asset('assets/images/brand/favicon.ico')}}" type="image/x-icon" />
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/images/brand/favicon.ico')}}" />

    <!-- Title -->
    <title> YOOL EDUCATION</title>

    <!-- Bootstrap css -->
    <link href="{{asset('assets/plugins/bootstrap/css/bootstrap.css')}}" rel="stylesheet" />

    <!-- Style css -->
    <link href="{{asset('assets/css/style.css')}}" rel="stylesheet" />

    <!-- Font-awesome  css -->
    <link href="{{asset('assets/css/icons.css')}}" rel="stylesheet" />

    <!--Select2 css -->
    <link href="{{asset('assets/plugins/select2/select2.css')}}" rel="stylesheet" />

    <!-- Data table css -->
    <link href="{{asset('assets/plugins/datatable/css/dataTables.bootstrap5.min.css')}}" rel="stylesheet" />
    <link href="{{asset('assets/plugins/datatable/css/jquery.dataTables.min.css')}}" rel="stylesheet" />

    <!-- Cookie css -->


    <!-- Owl Theme css-->
    <link href="{{asset('assets/plugins/owl-carousel/owl.carousel.css')}}" rel="stylesheet" />

    <!-- Color Skin css -->
    <link id="theme" rel="stylesheet" type="text/css" media="all" href="{{asset('assets/color-skins/color.css')}}" />
    <style>
        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #2178bd !important;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .nav-item .active {
            font-size: larger;
            border-radius: 0 !important;
            color: #f07f19 !important;
            background-color: white !important;
            font-weight: bold;
            border-color: white white orange white !important;
        }

        .nav-item .btn-gray {
            font-size: larger;
            border-radius: 0 !important;
            color: #5c5776;
            background-color: white !important;
            font-weight: bold;
            border-color: white white #5c5776 white;
        }

        .btn-gray:not(:disabled):not(.disabled).active:focus,
        .btn-gray:not(:disabled):not(.disabled):active:focus {
            box-shadow: none;
        }

        .cover {
            width: 110px;
        }

        .treated {
            background-color: #ebf8f3 !important;
        }

        /* .treated i {
            color: #383838;
            font-size: 15px;
        } */
    </style>



</head>

<body>

    <!--Loader-->
    <!-- <div id="global-loader">
        <img class="loader-img" width="175.614" src="/loader.gif">
    </div> -->
    <!--/Loader-->

    <!--Topbar-->
    <div class="header-main">
        @include('layouts.topbar')
        <!--/Topbar-->

        <!--Section-->
        <div class="cover-image bg-background-1" data-bs-image-src="{{asset('assets/images/banners/banner1.jpg')}}">

            <!--Topbar-->
            @include('layouts.header_new')
            <!--/Horizontal-main -->


        </div>
    </div>

    <!--User Dashboard-->
    <section class="sptb-1">
        <div class="container">
            <div class="row">
                @include('layouts.dashheader')
                <div class="col-xl-9 col-lg-12 col-md-12">
                    @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                    @endif

                    @if (session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                    @endif

                    @yield('content')

                </div>
            </div>
        </div>
    </section>
    <!--/User Dashboard-->

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

    <!--Horizontal Menu js-->
    <script src="../../assets/plugins/horizontal-menu/horizontal-menu.js"></script>

    <!--JQuery TouchSwipe js-->
    <script src="../../assets/js/jquery.touchSwipe.min.js"></script>

    <!-- Data tables -->
    <script src="../../assets/plugins/datatable/js/jquery.dataTables.min.js"></script>
    <script src="../../assets/plugins/datatable/js/dataTables.bootstrap5.min.js"></script>
    <script src="../../assets/js/datatable.js"></script>

    <!--Select2 js -->
    <script src="../../assets/plugins/select2/select2.full.min.js"></script>
    <script src="../../assets/js/select2.js"></script>

    <!-- Internal:: side-menu Js-->
    <script src="../../assets/plugins/toggle-sidebar/sidemenu.js"></script>

    <!-- Custom js-->
    <script src="../../assets/js/custom.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


    @yield('js')
</body>

</html>