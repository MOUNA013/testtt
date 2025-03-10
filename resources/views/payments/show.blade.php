<!-- resources/views/payments/show.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Détails du Paiement</h1>
    <div class="card">
        <div class="card-body">
            <p><strong>ID:</strong> {{ $payment->id }}</p>
            <p><strong>Utilisateur:</strong> {{ $payment->user->name ?? 'N/A' }}</p>
            <p><strong>Contrat:</strong> {{ $payment->contrat->id ?? 'N/A' }}</p>
            <p><strong>Montant:</strong> {{ $payment->montant }}</p>
            <p><strong>Date de Paiement:</strong> {{ $payment->payment_date }}</p>
            <p><strong>Méthode de Paiement:</strong> {{ $payment->payment_method }}</p>
            <p><strong>Numéro de Transaction:</strong> {{ $payment->num_transaction ?? 'N/A' }}</p>
            <p><strong>Reçu:</strong> {{ $payment->recu ? 'Oui' : 'Non' }}</p>
            <p><strong>Mois:</strong> {{ $payment->month ?? 'N/A' }}</p>
            <p><strong>Expéditeur:</strong> {{ $payment->sender ?? 'N/A' }}</p>
            <p><strong>Notes:</strong> {{ $payment->notes ?? 'N/A' }}</p>
            <p><strong>Validé le:</strong> {{ $payment->verified_at ?? 'N/A' }}</p>
            <p><strong>Validé par:</strong> {{ $payment->verifiedBy->name ?? 'N/A' }}</p>
            <p><strong>Mis à jour par:</strong> {{ $payment->updatedBy->name ?? 'N/A' }}</p>
        </div>
    </div>
    <a href="{{ route('payments.index') }}" class="btn btn-secondary mt-3">Retour à la liste</a>
</div>
@endsection