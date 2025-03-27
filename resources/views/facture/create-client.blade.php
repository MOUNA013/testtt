@extends('layouts.back')

@section('content')
<div class="card mb-5  user-select-none" style="background-color: white; border-radius: 7px; padding: 2px;">
<div class="container">
    <div class="card-header p-1">
    <h2 class="mb-4">Facture Client</h2>
    </div>
<div class="card-body text-start item-user border-bottom-0">

    <div class="mb-3">
        <label for="client" class="form-label">Sélectionner un Client</label>
        <select id="client" class="form-select">
            <option value="">-- Choisir un client --</option>
            @foreach ($clients as $client)
                <option value="{{ $client->id }}">{{ $client->name }}</option>
            @endforeach
        </select>
    </div>
    
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Produit / Service</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>TVA (%)</th>
                <th>Réduction (%)</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="facture-body">
            <tr>
                <td><input type="text" class="form-control produit"></td>
                <td><input type="number" class="form-control quantite" value="1" min="1"></td>
                <td><input type="number" class="form-control prix" value="0" min="0"></td>
                <td><input type="number" class="form-control tva" value="20" min="0"></td>
                <td><input type="number" class="form-control reduction" value="0" min="0"></td>
                <td class="total">0</td>
                <td><button class="btn btn-danger remove"></button></td>
            </tr>
        </tbody>
    </table>
    
    <button class="btn btn-primary mb-3" id="add-row">Ajouter</button>
    
    <div class="mb-3">
        <h4>Total à payer : <span id="total-facture">0</span> MAD</h4>
    </div>
    
    <div class="mb-3">
        <label for="mode_paiement" class="form-label">Mode de Paiement</label>
        <select id="mode_paiement" class="form-select">
            <option value="Carte bancaire">Carte bancaire</option>
            <option value="Espèces">Espèces</option>
            <option value="Virement">Virement</option>
        </select>
    </div>
    
    <button class="btn btn-success"> Générer PDF</button>
    <button class="btn btn-info">Envoyer par Email</button>
    <button class="btn btn-warning">Marquer comme Payée</button>
    <button class="btn btn-secondary"> Modifier</button>
    <button class="btn btn-danger">Annuler</button>
</div>
</div>
<script>
    document.getElementById('add-row').addEventListener('click', function() {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="form-control produit"></td>
            <td><input type="number" class="form-control quantite" value="1" min="1"></td>
            <td><input type="number" class="form-control prix" value="0" min="0"></td>
            <td><input type="number" class="form-control tva" value="20" min="0"></td>
            <td><input type="number" class="form-control reduction" value="0" min="0"></td>
            <td class="total">0</td>
            <td><button class="btn btn-danger remove"></button></td>
        `;
        document.getElementById('facture-body').appendChild(row);
        attachListeners();
    });
    
    function attachListeners() {
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', function() {
                this.parentElement.parentElement.remove();
                calculerTotal();
            });
        });
        document.querySelectorAll('.quantite, .prix, .tva, .reduction').forEach(input => {
            input.addEventListener('input', calculerTotal);
        });
    }
    
    function calculerTotal() {
        let totalFacture = 0;
        document.querySelectorAll('#facture-body tr').forEach(row => {
            let quantite = parseFloat(row.querySelector('.quantite').value) || 0;
            let prix = parseFloat(row.querySelector('.prix').value) || 0;
            let tva = parseFloat(row.querySelector('.tva').value) || 0;
            let reduction = parseFloat(row.querySelector('.reduction').value) || 0;
            let total = quantite * prix * (1 + tva / 100) * (1 - reduction / 100);
            row.querySelector('.total').textContent = total.toFixed(2);
            totalFacture += total;
        });
        document.getElementById('total-facture').textContent = totalFacture.toFixed(2);
    }
    
    attachListeners();
</script>
@endsection
