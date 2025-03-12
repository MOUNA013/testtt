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

    <!-- Favicon -->
    <link rel="icon" href="{{asset('assets/images/brand/favicon.ico')}}" type="image/x-icon" />
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/images/brand/favicon.ico')}}" />

    <!-- Title -->
    <title> {{ __('home_title') }}</title>

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
                    <div class="card mb-0" style="margin-bottom: 2% !important">
                        <div class="card-header">
                            <h3 class="card-title">{{ __('Factures') }}</h3>
                        </div>



                        
                        <div class="menu-item text-end p-2 me-3 {{ request()->routeIs('factures.*') ? 'active' : '' }}">
                            <a class="menu-link" data-bs-toggle="collapse" href="#facturesMenu" role="button" aria-expanded="false">
                                <i class="fa fa-file-invoice me-2"></i>
                                <span class="menu-label text-success">{{ __('Créer une Factures') }}</span>
                                <i class="fa fa-angle-down text-success"></i>
                            </a>
                        </div>
                        
                        <div class="collapse  {{ request()->routeIs('Creer une facture.*') ? 'show' : '' }}" id="facturesMenu">
                            <div class="menu-item text-end pe-1 {{ request()->routeIs('factures.partenaire.create') ? 'active' : '' }}">
                                <a class="menu-link" href="{{ route('factures.partenaire.create') }}">
                                    <i class="fa fa-plus me-2 text-dark"></i>
                                    <span class="menu-label text-dark">{{ __('Facture Partenaire') }}</span>
                                </a>
                            </div>
                        
                            <div class="menu-item text-end pe-6 {{ request()->routeIs('factures.client.create') ? 'active' : '' }}">
                                <a class="menu-link" href="{{ route('factures.client.create') }}">
                                    <i class="fa fa-plus me-2 text-dark"></i>
                                    <span class="menu-label text-dark">{{ __('Facture Client') }}</span>
                                </a>
                            </div>
                        </div>

                        


                        <div class="card-body">
                            <div class="manged-ad table-responsive userprof-tab">
                                <form method="GET" action="{{ route('factures.index') }}">
                                    <div class="row mb-3">
                                        <div class="col-12 col-md-6 col-lg-4 mb-2">
                                            <label for="from">Date de début</label>
                                            <input type="date" id="from" name="from" class="form-control" value="{{ request('from') }}">
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-4 mb-2">
                                            <label for="to">Date de fin</label>
                                            <input type="date" id="to" name="to" class="form-control" value="{{ request('to') }}">
                                        </div>
                                        <div class="col-12 col-md-12 col-lg-4 align-self-end mb-2">
                                            <button type="submit" class="btn btn-primary w-100">Filtrer</button>
                                        </div>
                                    </div>
                                </form>
                                <table class="table table-bordered mb-0" id="factures">
                                    <thead>
                                        <tr role="row">
                                            <th>{{ __('#') }}</th>
                                            <th class="col-2">{{ __('date de vérification') }}</th>
                                            <th class="col-1">{{ __('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($factures as $facture)
                                        <tr class="{{ !is_null($facture->intern) ? 'treated' : ''  }}" id="ID{{ $facture->id }}">
                                            <td class="align-middle">
                                                <div class="row align-items-center">
                                                    <div class="col-lg-6 pe-0">
                                                        <b class="text-uppercase">{{ __('id') }} :</b> {{ $facture->id  }} <br>
                                                        <b class="text-uppercase">{{ __('N') }} :</b> {{ $facture->facture_num ?: ''  }} <br>
                                                        <b class="text-lowercase">{{ __('client') }} &nbsp;:</b> <span class="text-truncate">{{ $facture->user->name }}</span> <br>
                                                        <b class="text-lowercase">{{ __('article') }} &nbsp;:</b> <span class="text-primary">{{ $facture->factureable_type === 'App\Models\Cours' ? 'cours' : 'parcours'}} ({{ $facture->factureable_id }})</span> <br>
                                                        <b class="text-lowercase">{{ __('Responsable de point') }} :</b> {{ $facture->verifier_name }}
                                                    </div>
                                                    <div class="col-lg-6 pe-0">
                                                        <b class="text-lowercase">{{ __('code') }} &nbsp;:</b> {{ $facture->payment->num_transaction }} <br>
                                                        <b class="text-lowercase">{{ __('prix') }} :</b> {{ $facture->payment->montant }} {{ __('MAD') }} <br />
                                                        <b class="text-lowercase">{{ __('mode paiement') }} :</b> {{ __($facture->payment->payment_method) ?? __('vir')}} <br />
                                                        <b class="text-lowercase">{{ __('emetteur') }} :</b> {{ __($facture->payment->sender)}}
                                                        @if($facture->category) <br /><b class="text-lowercase">{{ __('partenaire') }} :</b> {{ $facture->category->prefix }} @endif
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="align-middle">{{ date('Y-m-d', strtotime($facture->payment->verified_at ?? $facture->payment->created_at)) }}</td>

                                            <td data-facture-id="{{ encrypt($facture->id) }}" class="text-center align-middle">
                                                <div class="d-flex flex-wrap justify-content-center">
                                                    @if(!is_null($facture->intern) ? 'treated' : '')
                                                    <form action="{{ route('factures.reset', $facture->id) }}" method="POST" class="d-inline mb-1">
                                                        @csrf
                                                        @method('PATCH')
                                                        <button class="btn btn-outline-warning btn-sm"><i class="fa fa-rotate-left"></i></button>
                                                    </form>
                                                    @endif
                                                    @if($facture->payment->recu)
                                                    <a href="/payments/{{ encrypt($facture->payment->id) }}/recu" target="_blank" class="btn btn-outline-secondary btn-sm me-1 mb-1">{{ __('voir reçu') }}</a>
                                                    @endif
                                                    <div class="w-100"></div>
                                                    <div class="d-flex">
                                                        <button class="btn btn-outline-secondary btn-sm me-1" onclick="editFacture({{$facture->id}})"><i class="fa fa-edit"></i></button>
                                                        @if($facture->facture_num)
                                                        <a href="/factures/print?id={{ encrypt($facture->id) }}" target="_blank" class="btn btn-outline-secondary btn-sm me-1"><i class="fa fa-download"></i></a>
                                                        @endif
                                                        <form action="{{ route('factures.delete', $facture->id) }}" method="POST" class="d-inline">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button class="btn btn-outline-danger btn-sm" onclick="deleteFacture(event)"><i class="fa fa-trash"></i></button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </section>
    <!--/User Dashboard-->

    <!-- Edit Facture Modal -->
    <div class="modal fade" id="editFacture" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('factures.update') }}" id="editFactureForm" method="POST">
                        @csrf
                        @method('PATCH')
                        <input type="hidden" name="facture" value="">
                        <div class="d-flex mb-3">
                            <div class="col-md-6 px-0">
                                <label for="factureNum" class="form-labem">{{ __('numéro') }}</label>
                                <input type="number" class="form-control" min="1" id="factureNum" name="num">
                                <span class="text-danger d-none">{{ __('le numéro de facture existe déjà') }}</span>
                            </div>
                        </div>

                        <div class="d-flex mb-3">
                            <div class="px-0 w-100">
                                <label for="clientname" class="form-labem">{{ __('Nom client') }}</label>
                                <input type="text" class="form-control" id="clientname" name="clientName">
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div class="px-0 w-100">
                                <label for="mantantEnLettre" class="form-labem">{{ __('Mantant En lettre') }}</label>
                                <input type="text" class="form-control" id="mantantEnLettre" name="mantantEnLettre">
                            </div>
                        </div>

                        <div class="d-flex mb-3">
                            <div class="col-6 ps-0">
                                <label for="payment-date" class="form-labem">{{ __('date') }}</label>
                                <input type="date" class="form-control" id="payment-date" name="date">
                            </div>
                            <div class="col-6 px-0">
                                <label for="payment-montant" class="form-labem">{{ __('prix') }}</label>
                                <input type="text" class="form-control" min="1" id="payment-montant" name="montant">
                            </div>
                        </div>

                        <div>
                            <textarea name="justification" id="justification" rows="3" class="form-control" placeholder="motif de la modification"></textarea>
                        </div>

                        <hr class="my-4">

                        <div class="d-flex">
                            <div class="form-check me-4">
                                <input class="form-check-input" type="radio" id="avecTva" name="tva" value="1">
                                <label class="form-check-label" for="avecTva">{{ __('avec tva') }}</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="sansTva" name="tva" value="0">
                                <label class="form-check-label" for="sansTva">{{ __('sans tva') }}</label>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer py-1">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ __('Fermer') }}</button>
                    <button type="button" class="btn btn-primary" id="submitEditFacture">{{ __('Sauvegarder') }}</button>
                </div>
            </div>
        </div>
    </div>

    <!--Footer Section-->
    @include('layouts.footer')
    <!--Footer Section-->

    <!-- Back to top -->
    <a href="#top" id="back-to-top"><i class="fa fa-long-arrow-up"></i></a>

    <!-- JQuery js-->
    <script src="{{asset('assets/js/jquery.min.js')}}"></script>

    <!-- Bootstrap js -->
    <script src="{{asset('assets/plugins/bootstrap/js/popper.min.js')}}"></script>
    <script src="{{asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>

    <!--Horizontal Menu js-->
    <script src="{{asset('assets/plugins/horizontal-menu/horizontal-menu.js')}}"></script>

    <!--JQuery TouchSwipe js-->
    <script src="{{asset('assets/js/jquery.touchSwipe.min.js')}}"></script>

    <!-- Data tables -->
    <script src="{{asset('assets/plugins/datatable/js/jquery.dataTables.min.js')}}"></script>
    <script src="{{asset('assets/plugins/datatable/js/dataTables.bootstrap5.min.js')}}"></script>
    <script src="{{asset('assets/js/datatable.js')}}"></script>

    <!--Select2 js -->
    <script src="{{asset('assets/plugins/select2/select2.full.min.js')}}"></script>
    <script src="{{asset('assets/js/select2.js')}}"></script>

    <!-- Internal:: side-menu Js-->
    <script src="{{asset('assets/plugins/toggle-sidebar/sidemenu.js')}}"></script>

    <!-- Custom js-->
    <script src="{{asset('assets/js/custom.js')}}"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#factures').DataTable({
                "paging": false,
                /// "ordering": false,
                "info": false,
                "order": [
                    [1, 'asc']
                ]
            });
        });

        function deleteFacture(e) {
            e.preventDefault()
            Swal.fire({
                title: 'Es-tu sûr?',
                text: "Vous ne pourrez pas revenir en arrière !",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Annuler',
                confirmButtonText: 'Oui!'
            }).then((result) => {
                if (result.isConfirmed) {
                    e.target.closest('form').submit()
                }
            })
        }


        async function editFacture($id) {
            $('#editFacture').modal('show');
            document.querySelector('input[name="facture"]').value = $id
            const response = await fetch('/factures/status?f=' + $id)
            const facture = await response.json()

            document.getElementById('factureNum').value = facture.factureNum
            document.getElementById('payment-montant').value = facture.montant
            document.getElementById('justification').value = facture.justification
            document.getElementById('mantantEnLettre').value = facture.mantantEnLettre
            document.getElementById('clientname').value = facture.clientname

            document.getElementById('payment-date').value = facture.date
            // console.log('--> ',document.getElementById('payment-date'), new Date(facture.date))
            if (facture.tva == 1) document.getElementById('avecTva').checked = true
            if (facture.tva == 0) document.getElementById('sansTva').checked = true

            document.querySelector('select[name="category"]').value = facture.category
        }


        document.getElementById('submitEditFacture').addEventListener('click', async function() {

            const factureNumInput = document.getElementById('factureNum')
            const factureId = document.querySelector('input[name="facture"]').value

            const response = await fetch(`/factures/check-num?v=${factureNumInput.value}&f=${factureId}`)
            const factureNumAlreadyExits = await response.json()

            if (factureNumAlreadyExits) {
                factureNumInput.classList.add('is-invalid');
                factureNumInput.nextElementSibling.classList.remove('d-none');
                return null
            } else {
                factureNumInput.classList.remove('is-invalid');
                factureNumInput.nextElementSibling.classList.add('d-none');
                document.getElementById('editFactureForm').submit()
            }

        })
    </script>
</body>

</html>