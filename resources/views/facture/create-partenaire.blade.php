@extends('layouts.back')

@section('content')
<div class="container">
    <h2 class="mb-4">Créer une Facture Partenaire</h2>
    <form action="{{ route('factures.partenaire.create')}}"  method="POST">
        @csrf

        <div class="mb-3">
            <label for="partner_id" class="form-label">Sélectionner un partenaire</label>
            <select name="partner_id" id="partner_id" class="form-control" required>
                <option value="">-- Choisir un partenaire --</option>
                @foreach($partenaires as $partner)
                    <option value="{{ $partner->id }}">{{ $partner->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="type_partenariat" class="form-label">Type de Partenariat</label>
            <select name="type_partenariat" id="type_partenariat" class="form-control" required>
                <option value="Commission">Commission</option>
                <option value="Prestataire">Prestataire</option>
                <option value="Autre">Autre</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="periode_facturation" class="form-label">Période de Facturation</label>
            <input type="month" name="periode_facturation" id="periode_facturation" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="services" class="form-label">Liste des services fournis</label>
            <textarea name="services" id="services" rows="4" class="form-control" placeholder="Décrivez les services fournis" required></textarea>
        </div>

        <div class="mb-3">
            <label for="mode_paiement" class="form-label">Mode de Paiement</label>
            <select name="mode_paiement" id="mode_paiement" class="form-control" required>
                <option value="Virement Bancaire">Virement Bancaire</option>
                <option value="Chèque">Chèque</option>
                <option value="Espèces">Espèces</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="montant" class="form-label">Montant de la facture (MAD)</label>
            <input type="number" name="montant" id="montant" class="form-control" step="0.01" required>
        </div>

        <button type="submit" class="btn btn-primary">Créer Facture</button>
    </form>

    <hr>

    
</div>
@endsection





{{-- <h3 class="mt-4">Factures Partenaires</h3>
    <table class="table table-bordered mt-3">
        <thead>
            <tr>
                <th>ID</th>
                <th>Partenaire</th>
                <th>Période</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($factures as $facture)
            <tr>
                <td>{{ $facture->id }}</td>
                <td>{{ $facture->partner->name }}</td>
                <td>{{ $facture->periode_facturation }}</td>
                <td>{{ $facture->montant }} MAD</td>
                <td>{{ $facture->statut }}</td>
                <td>
                    <!-- Générer et télécharger en PDF -->
                    <a href="{{ route('factures.generate', $facture->id) }}" class="btn btn-secondary btn-sm">Télécharger PDF</a>

                    <!-- Envoyer par email -->
                    <form action="{{ route('factures.sendEmail', $facture->id) }}" method="POST" class="d-inline">
                        @csrf
                        <button type="submit" class="btn btn-info btn-sm">Envoyer Email</button>
                    </form>

                    <!-- Modifier -->
                    <a href="{{ route('factures.edit', $facture->id) }}" class="btn btn-warning btn-sm">Modifier</a>

                    <!-- Annuler -->
                    <form action="{{ route('factures.delete', $facture->id) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm">Annuler</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody> --}}
    </table>