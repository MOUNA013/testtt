<div class="col-xl-3 col-lg-12 col-md-12">
    <div class="card mb-2 user-select-none">
        <div class="card-header">
            <h3 class="card-title">{{__('Dashboard')}}</h3>
            <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
        </div>
        <div class="card-body text-center item-user border-bottom-0">
            <div class="profile-pic">
                <div class="profile-pic-img" style="background-image: url(/{{ session('picture') ?: 'storage/users/avatar.jpg' }})">
                    <span class="bg-success dots" data-bs-toggle="tooltip" data-bs-placement="top" title="online"></span>
                </div>
                <a href="/UserProfile" class="text-dark">
                    <h4 class="mt-3 mb-0 font-weight-semibold">{{session('name')}}</h4>
                </a>
                <p class="mb-0 mt-1 text-muted">{{ __(session('type')) }}</p>
            </div>
        </div>
        <aside class="app-sidebar doc-sidebar my-dash">
            <div class="app-sidebar__user clearfix">
                <ul class="side-menu">
                    <li>
                        <a class="side-menu__item" href="{{ route('payment') }}">
                            <i class="fa fa-sticky-note-o me-2"></i>
                            <span class="side-menu__label">{{ __('Paiements') }}</span>
                        </a>
                    </li>
                    <li>
                        <a class="side-menu__item" href="{{ route('factures.index') }}">
                            <i class="fa fa-sticky-note-o me-2"></i>
                            <span class="side-menu__label">{{ __('Factures') }}</span>
                        </a>
                    </li>
                   
                    @if (!is_null(session('id')))
                    <li>
                        <a class="side-menu__item" href="/Logout"><i class="side-menu__icon fe fe-power"></i><span class="side-menu__label">{{__('logout')}}</span></a>
                    </li>
                    @else
                    <li>
                        <a class="side-menu__item" href="/Login"><i class="side-menu__icon fa fa-sign-in"></i><span class="side-menu__label">{{__('Se connecter')}}</span></a>
                    </li>
                    @endif
                </ul>
            </div>
        </aside>
    </div>
</div>