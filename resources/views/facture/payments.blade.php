@extends('layouts.back')

@section('content')
<div class="card mb-0" style="margin-bottom: 2% !important">
    <div class="card-header">
        <h3 class="card-title">{{ __('Suivi Paiements') }}</h3>
    </div>
    <div class="card-body">
        <div class="manged-ad table-responsive userprof-tab">
            <form method="GET" action="{{ route('payment') }}">
                <div class="row mb-3">
                    <div class="col-12 col-md-6 col-lg-4 mb-2">
                        <label for="from"> Date de debut </label>
                        <input type="date" id="from" name="from" class="form-control" value="{{ $fromDate }}">
                    </div>

                    <div class="col-12 col-md-6 col-lg-4 mb-2">
                        <label for="to">Date de fin</label>
                        <input type="date" id="to" name="to" class="form-control" value="{{ $toDate }}">
                    </div>

                    <div class="col-12 col-md-4 mb-2">
                        <label for="payment_method">Méthode de Paiement</label>
                        <select id="payment_method" name="payment_method" class="form-control select2-show-search">
                            <option value="">Toutes</option>
                            @foreach ($paymentMethods as $payment)
                            <option value="{{ $payment->payment_method }}" {{ request('payment_method') == $payment->payment_method ? 'selected' : '' }}>
                                {{ ucfirst($payment->payment_method) }}
                            </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-12 col-md-4 mb-2">
                        <label for="verifier_name">Vérificateur</label>
                        <select id="verifier_name" name="verifier_name" class="form-control select2-show-search">
                            <option value="">Tous</option>
                            @foreach ($verifiers as $verifier)
                            <option value="{{ $verifier->name }}" {{ request('verifier_name') == $verifier->name ? 'selected' : '' }}>
                                {{ $verifier->id }} - {{ $verifier->name }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-12 col-md-4 mb-2">
                        <label for="month">Mois</label>
                        <select id="month" name="month" class="form-control select2-show-search">
                            <option value=""></option>
                            <option value="1" @selected(request('month')==1)>Janvier</option>
                            <option value="2" @selected(request('month')==2)>Fevrier</option>
                            <option value="3" @selected(request('month')==3)>Mars</option>
                            <option value="4" @selected(request('month')==4)>Avril</option>
                            <option value="5" @selected(request('month')==5)>Mai</option>
                            <option value="6" @selected(request('month')==6)>Juin</option>
                            <option value="7" @selected(request('month')==7)>Juillet</option>
                            <option value="8" @selected(request('month')==8)>Aout</option>
                            <option value="9" @selected(request('month')==9)>Septembre</option>
                            <option value="10" @selected(request('month')==10)>Octobre</option>
                            <option value="11" @selected(request('month')==11)>Novembre</option>
                            <option value="12" @selected(request('month')==12)>Décembre</option>
                        </select>
                    </div>

                </div>
                <div class="row mb-3">
                    <div class="col-12 col-md-8 align-self-end mb-2">
                        <button type="submit" class="btn btn-primary w-100">Filtrer</button>
                    </div>

                    <div class="col-12 col-md-4 align-self-end mb-2">
                        <a href="{{ route('payment') }}" class="btn btn-secondary w-100">Réinitialiser</a>
                    </div>
                </div>
            </form>
            <div class="tab-content border-0 my-5 bg-white details-tab-content">

                <table class="data-table-example table table-bordered table-hover mb-0 ">
                    <thead>
                        <tr style="text-align: center;">
                            <th>{{ __('Paiements Details') }}</th>
                            <th>{{ __('Status') }}</th>
                            <th>{{ __('Recu') }}</th>
                            <th>{{ __('action') }}</th>
                        </tr>
                    </thead>
                    <tbody>

                        @foreach($factures as $facture)

                        <tr>
                            <td>
                                <div class="row">
                                    <div class="col-6 pe-0">
                                        <b class="text-lowercase">{{ __('Responsable') }} :</b> {{ $facture->responsable_name }} <br>
                                        <b class="text-lowercase">{{ __('date de creation') }} :</b> {{ $facture->created_at ?? ''}} <br>
                                        <b class="text-lowercase">{{ __('Mois') }} :</b> {{ $french_months[$facture->month] ?? ''}} <br>
                                    </div>
                                    <div class="col-6 pe-0">
                                        <b class="text-lowercase">{{ __('code') }} &nbsp;:</b> {{ $facture->num_transaction }} <br>
                                        <b class="text-lowercase">{{ __('prix') }} :</b> {{ $facture->montant }} {{ __('MAD') }} <br>
                                        <b class="text-lowercase">{{ __('mode paiement') }} :</b> {{ __($facture->payment_method) ?? __('vir')}} <br>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                @if($facture->verified_at )
                                <span class="badge badge-success">{{ __('Vérifier') }}</span>
                                @else
                                <span class="badge badge-warning">{{ __('Non Vérifier') }}</span>
                                @endif
                            </td>
                            <td class="text-center">
                                <div>
                                    <div>
                                        @if ($facture->recu)
                                        <a href="/payments/{{ encrypt($facture->payment_id) }}/recu" target="_blank" class="btn btn-outline-secondary btn-sm me-1 mb-1">{{ __('voir reçu') }}</a>
                                        @else
                                        <p>Sans reçu</p>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <div>
                                    @if($facture->facture_id)
                                    <i class="fas fa-check-square me-1 text-success fa-2x"></i>
                                    @elseif($facture->verified_at)
                                    <button id="generate-facture" data-id="{{ encrypt($facture->payment_id) }}" class="btn-sm btn-primary d-flex" onclick="generateFacture(this)">
                                        <i class="fas fa-file-invoice-dollar me-1"></i> Générer
                                    </button>
                                    @elseif($facture->verified_at == null)
                                    <button id="generate-facture" data-id="{{ $facture->payment_id }}" class="btn-sm btn-primary d-flex" onclick="verify_payment(this)">
                                        <i class="fas fa-check-square me-1"></i> Verify
                                    </button>
                                    @endif
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
@endsection

@section('js')

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

    function generateFacture(button) {
        // Get the payment ID from the button's data-id attribute
        var paymentId = $(button).data('id');

        // Show a loading state or disable the button to prevent multiple clicks
        $(button).prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Générer');

        // Send an AJAX request to generate the facture
        $.ajax({
            url: '/factures/generate/' + paymentId, // Adjust the route to match your URL
            method: 'GET',
            success: function(response) {
                // Check if the facture was generated successfully
                if (response.status === 'success') {
                    // Replace the button with the success icon
                    $(button).replaceWith('<i class="fas fa-check-square me-1 text-success fa-2x"></i>');
                } else {
                    // Handle error, if any
                    alert('Failed to generate facture: ' + response.message);
                    $(button).prop('disabled', false).html('<i class="fas fa-file-invoice-dollar me-1"></i> Générer');
                }
            },
            error: function() {
                // Handle the error (in case of server issues)
                alert('Error generating facture. Please try again.');
                $(button).prop('disabled', false).html('<i class="fas fa-file-invoice-dollar me-1"></i> Générer');
            }
        });
    }

    function verify_payment(button) {
        // Get the payment ID from the button's data-id attribute
        var paymentId = $(button).data('id');

        // Show a loading state or disable the button to prevent multiple clicks
        $(button).prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-1"></i> Verify');

        // Send an AJAX request to generate the facture
        $.ajax({
            url: '/payment/' + paymentId + '/validate', // Adjust the route to match your URL
            method: 'GET',
            success: function(response) {
                // Check if the facture was generated successfully
                if (response.status === 'success') {
                    // Replace the button with the success icon
                    $(button).replaceWith('<i class="fas fa-check-square me-1 text-success fa-2x"></i>');
                } else {
                    // Handle error, if any
                    alert('Failed to generate facture: ' + response.message);
                    $(button).prop('disabled', false).html('<i class="fas fa-file-invoice-dollar me-1"></i> Verify');
                }
            },
            error: function() {
                // Handle the error (in case of server issues)
                alert('Error generating facture. Please try again.');
                $(button).prop('disabled', false).html('<i class="fas fa-file-invoice-dollar me-1"></i> Verify');
            }
        });
    }
</script>
@endsection