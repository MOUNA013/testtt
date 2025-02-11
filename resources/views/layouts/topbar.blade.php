{{-- <div class="top-bar top-bar-light" style="border-bottom: 1px solid #0000001a;">
    <div class="container">
        <div class="row">
           <div class="col-xl-8 col-lg-8 col-sm-4 col-12">
                <div class="top-bar-start d-flex">
                    <div class="clearfix">
                        <ul class="socials">
                            <li>
                                <a class="social-icon text-dark" href="javascript:void(0)"><i class="fe fe-facebook"></i></a>
                            </li>
                            <li>
                                <a class="social-icon text-dark" href="javascript:void(0)"><i class="fe fe-twitter"></i></a>
                            </li>
                            <li>
                                <a class="social-icon text-dark" href="javascript:void(0)"><i class="fe fe-linkedin"></i></a>
                            </li>
                            <li>
                                <a class="social-icon text-dark" href="javascript:void(0)"><i class="fe fe-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-sm-8 col-12">
                <div class="top-bar-end">
                    <ul class="custom">
                        @if (session('id')==null)
                            <li>
                                <a href="/SignUp"  class="text-dark"><i class="fe fe-user me-1"></i> <span style="display: contents;">Register</span></a>
                            </li>
                            <li>
                                <a href="/Login" class="text-dark"><i class="fe fe-log-in me-1"></i> <span style="display: contents;">Login</span></a>
                            </li>
                        @else
                            <li class="dropdown">
                                <a href="javascript:void(0)" class="text-dark" data-bs-toggle="dropdown"><i class="fe fe-home me-1"></i><span  style="display: contents;"> {{session('name')}}<i class="fe fe-chevron-down  ms-1"></i></span></a>
                                <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <a href="/UserProfile" class="dropdown-item" >
                                        <i class="dropdown-icon icon icon-user"></i> My Profile
                                    </a>
                                    <a class="dropdown-item" href="/MyCourses">
                                        <i class="dropdown-icon icon icon-speech"></i> My Courses
                                    </a>
                                    <a class="dropdown-item" href="/Calendar">
                                        <i class="dropdown-icon icon icon-bell"></i> My Calendar
                                    </a>
                                    <a class="dropdown-item" href="/Logout">
                                        <i class="dropdown-icon icon icon-power"></i> Log out
                                    </a>
                                </div>
                            </li>
                        @endif
                        
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div> --}}