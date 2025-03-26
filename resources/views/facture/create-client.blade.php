@extends('layouts.back')

@section('content')
<div class="card mb-5 user-select-none" style="background-color: white; border-radius: 7px; padding: 2px;">
    <div class="container">
        <div class="card-header p-1">
            <h2 class="mb-4">Facture Client</h2>
        </div>
        <div class="card-body text-start item-user border-bottom-0">
            
            <form id="facture-form" action="{{ route('factures.store') }}" method="POST">
                @csrf

                <!-- Sélection du Client -->
                <div class="mb-3">
                    <label for="client" class="form-label">Sélectionner un Particulier</label>
                    <select id="client" name="user_id" class="form-select" required>
                        <option value="">-- Choisir un client --</option>
                        @foreach ($clients as $client)
                            <option value="{{ $client->id }}">{{ $client->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Mode de Paiement -->
                <div class="mb-3">
                    <label for="payment_id" class="form-label">Mode de Paiement</label>
                    <select id="payment_id" name="payment_id" class="form-select" required>
                        <option value="">-- Choisir un paiement --</option>
                        @foreach ($payements as $payement)
                            <option value="{{ $payement->id }}">{{ $payement->payment_method }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Date de Facture -->
                <div class="mb-3">
                    <label for="date_facture" class="form-label">Date de Facture</label>
                    <input type="date" id="date_facture" name="payment_date" class="form-control" required>
                </div>


      <!-- Facturation Type Information -->
<div class="mb-3">
    <label for="factureable_type" class="form-label">Type de Facturation</label>
    <select id="factureable_type" name="factureable_type" class="form-control" required>
        <option value="PARCOURS">Parcours</option>
        <option value="COURS">Cours</option>
        <option value="DESIGNATION">Désignation</option>
    </select>
</div>


                <!-- Code -->
                <div class="mb-3">
                    <label for="code" class="form-label">Code de Facture</label>
                    <input type="text" id="code" name="numero_contrat" class="form-control" required>
                </div>

                <!-- Prix -->
                <div class="mb-3">
                    <label for="prix" class="form-label">Prix</label>
                    <input type="number" id="prix" name="montant" class="form-control" required min="0">
                </div>

               

                <button type="submit" class="btn btn-primary mb-3">Générer</button>
            </form>
        </div>
    </div>
</div>

<script>
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
        });
    });

    document.getElementById('facture-form').addEventListener('submit', function(event) {
        event.preventDefault();
        this.submit();
    });
</script>

@endsection
