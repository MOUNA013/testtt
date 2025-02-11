<style>
    .bg-background-1:before,
    .banner1:before {
        background: white !important;
    }

    @media((max-width: 991px)) {
        .horizontalMenu>.horizontalMenu-list>li>a.active {
            color: white !important;
        }
    }

    .dropdown-menu-end .dropdown-item:hover {
        color: #1a4080;
    }

    .headerProfileImg {
        width: 25px;
        height: 25px;
        background-image: url("/{{ session('picture') ?: 'storage/users/avatar.jpg;' }}");
        object-fit: cover;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 50%;
        /* Optional: to make it circular */
        transition: all 0.2s ease-in-out;
        /* Smooth transition for hover and click effects */
        outline: 2px solid white;
    }

    /* Hover effect: white outline and subtle shadow */
    .headerProfileImg:hover {
        /* White outline */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        /* Subtle shadow */
    }

    /* Active effect: scale down slightly to mimic click */
    .headerProfileImg:active {
        transform: scale(0.9);
        /* Slight scale down for click effect */
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        /* Slightly reduced shadow on click */
    }

    .header-main {
        height: 79px;
        z-index: 9998 !important;
    }

    @media only screen and (max-width: 992px) {
        .header-main {
            height: 54px;
        }
    }

    .scrollShadow {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15), 0px 0px 2px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease-in-out;
    }
</style>

<link rel="stylesheet" href="{{asset('assets/css/notifications.css?v=0.2')}}">

<div class="header-main bg-white">
    <!-- Mobile Header -->
    <div class="position-fixed fixed-top bg-white shadow">
        <div class="horizontal-header d-flex justify-content-center d-lg-none clearfix bg-white">
            <a id="horizontal-navtoggle" class="animated-arrow bg-secondary">
                <span></span>
            </a>
            <a href="/" class="smllogo">
                <img
                    src="{{asset('assets/images/brand/logo.svg')}}"
                    width="110"
                    alt="YOOL EDUCATION" />
            </a>
            <a href="/" class="smllogo-white">
                <img src="{{asset('assets/images/brand/logo.svg')}}" width="110" alt="YOOL EDUCATION" />
            </a>
            @if (session('id') == null)
            <a href="/connexion" class="callusbtn bg-secondary"><i class="fa fa-sign-in" aria-hidden="true"></i></a>
            @else



            <a href="/" data-bs-toggle="dropdown" class="callusbtn header-icons-link1 bg-secondary"><i class="icon icon-graduation"></i> </a>
            <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="/MyCourses">
                    <i class="dropdown-icon fe fe-layers"></i> {{ __('my_courses') }}
                </a>
                <a class="dropdown-item" href="/calendar">
                    <i class="dropdown-icon icon icon-calendar"></i> {{ __('my_calendar') }}
                </a>
                <a class="dropdown-item" href="/Logout">
                    <i class="dropdown-icon icon icon-power"></i> {{ __('logout') }}
                </a>
            </div>
            @endif
        </div>
    </div>
    <!-- /Mobile Header -->

    <!--Horizontal-main -->
    <div class="position-fixed fixed-top">
        <div class="horizontal-main header-style1 bg-dark-transparent clearfix p-0 py-lg-2 bg-white">
            <div class="horizontal-mainwrapper container position-relative">
                <div class="w-100 d-flex justify-content-between align-items-center bg-white">
                    <div class="desktoplogo">
                        <a href="/">
                            <img src="{{asset('assets/images/brand/logo.svg')}}" style="width: 120px;" alt="YOOL EDUCATION">
                            <img src="{{asset('assets/images/brand/logo.svg')}}" style="width: 120px;" class="header-brand-img header-white" alt="YOOL EDUCATION">
                        </a>
                    </div>
                    <div class="desktoplogo-1">
                        <a href="/"><img src="{{asset('assets/images/brand/logo_yool.png')}}" width="120"
                                alt="img"></a>
                    </div>
                    <nav class="horizontalMenu clearfix d-md-flex justify-content-between text-capitalize">
                        <ul class="horizontalMenu-list">
                            <li aria-haspopup="true">
                                <a href="/" class="text-dark">{{ __('home') }} </a>
                            </li>

                            <li aria-haspopup="true">
                                <a href="javascript:void(0)" class="text-dark">{{ __('accompagnement scolaire') }}
                                    <span class="fe fe-chevron-down mt-1 ms-1"></span>
                                </a>
                                <ul class="sub-menu">
                                    <li aria-haspopup="true"><a href="/accompagnement-scolaire/soutien-scolaire">{{ __('Soutien scolaire') }}</a></li>
                                    <li aria-haspopup="true"><a href="/accompagnement-scolaire/preparation-Intensive-aux-examens">{{ __('Préparation intensive aux examens') }}</a></li>
                                    <li aria-haspopup="true"><a href="/accompagnement-scolaire/preparation-aux-concours-post-bac">{{ __('Préparation aux concours post bac') }}</a></li>
                                </ul>
                            </li>

                            <li aria-haspopup="true">
                                <a href="javascript:void(0)" class="text-dark">{{ __('ressources') }} <span
                                        class="fe fe-chevron-down mt-1 ms-1"></span></a>
                                <ul class="sub-menu">
                                    <li aria-haspopup="true"><a href="/blog">{{ __('Blog') }}</a></li>
                                    <li aria-haspopup="true"><a href="/library">{{ __('Library') }}</a></li>
                                    <li aria-haspopup="true"><a href="/forum">{{ __('Forum') }}</a></li>
                                    <li aria-haspopup="true"><a href="/ressources-pour-étudiant">{{ __('Ressources pour l\'élève') }}</a></li>
                                </ul>
                            </li>

                            <li aria-haspopup="true">
                                <a href="/contactez-nous" class="text-dark">{{ __('Contact') }} </a>
                            </li>
                            <li aria-haspopup="true">
                                <a href="/a-propos" class="text-dark">{{ __('about') }} </a>
                            </li>

                        </ul>
                    </nav>

                    <div class="d-flex justify-content-around gap-4">
                        <ul class="horizontalMenu-list d-none d-lg-block">
                            @if (session('id') == null)
                            <a class="btn btn-primary text-white" href="/connexion"
                                style="width: 155px;">
                                {{ __('Connexion') }}
                            </a>
                            <!-- <li aria-haspopup="true" class="dropdown">
                                    <ul class="dropdown-menu">
                                        <li aria-haspopup="true"><a href="/connexion">{{ __('login') }}</a></li>
                                        <li aria-haspopup="true"><a href="/inscription">{{ __('register') }}</a></li>
                                    </ul>
                                </li> -->
                            @else
                            <li class="dropdown">
                                <a href="javascript:void(0)" class="text-dark d-flex align-items-center" data-bs-toggle="dropdown">
                                    <div class="position-relative rounded-circle img-fluid headerProfileImg" style="">
                                        <i class="fa fa-angle-down fw-lighter text-black position-absolute bottom-0 end-0 bg-white rounded-circle" style="width: 10px; height: 10px; display: flex; align-items: center; justify-content: center;"></i>
                                    </div>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end p-1">
                                    <a class="dropdown-item" href="/MyCourses">
                                        <i class="dropdown-icon fe fe-layers"></i> {{ __('my_courses') }}
                                    </a>
                                    <a class="dropdown-item" href="/calendar">
                                        <i class="dropdown-icon icon icon-calendar"></i> {{ __('my_calendar') }}
                                    </a>
                                    <a class="dropdown-item" href="/Logout">
                                        <i class="dropdown-icon icon icon-power"></i> {{ __('logout') }}
                                    </a>
                                </div>
                            </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Get the navbar div element
        const navbar = document.querySelector('.horizontal-main');

        // Function to handle scroll event and adjust the padding
        function handleScroll() {
            // Check if the page is scrolled down more than 50px (you can adjust this value)
            if (window.scrollY > 50) {
                // Remove py-lg-2 and add py-lg-1 when scrolling down
                // if (navbar.classList.contains('py-lg-2')) {
                //     navbar.classList.remove('py-lg-2');
                //     navbar.classList.add('py-lg-0');
                //     navbar.classList.add('shadow-sm');
                // }
                if (!navbar.classList.contains('scrollShadow')) {
                    navbar.classList.add('scrollShadow');
                }
            } else {
                // Add py-lg-2 back when scrolling to the top
                // if (navbar.classList.contains('py-lg-0')) {
                //     navbar.classList.remove('py-lg-0');
                //     navbar.classList.add('py-lg-2');
                //     navbar.classList.remove('shadow-sm');
                // }
                if (navbar.classList.contains('scrollShadow')) {
                    navbar.classList.remove('scrollShadow');
                }
            }
        }

        // Attach the scroll event listener to the window
        window.addEventListener('scroll', handleScroll);
    });
</script>