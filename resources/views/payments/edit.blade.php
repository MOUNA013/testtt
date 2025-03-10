<!-- resources/views/payments/edit.blade.php -->

@extends('layouts.back')

@section('content')
<div class="container">
    <h1>Modifier le Paiement</h1>
    <form action="{{ route('payments.update', $payment->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="user_id">Utilisateur</label>
            <select name="user_id" id="user_id" class="form-control">
                <option value="">Sélectionnez un utilisateur</option>
                @foreach ($users as $user)
                    <option value="{{ $user->id }}" {{ $payment->user_id == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="contrat_id">Contrat</label>
            <select name="contrat_id" id="contrat_id" class="form-control">
                <option value="">Sélectionnez un contrat</option>
                @foreach ($contrats as $contrat)
                    <option value="{{ $contrat->id }}" {{ $payment->contrat_id == $contrat->id ? 'selected' : '' }}>{{ $contrat->id }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="montant">Montant</label>
            <input type="number" step="0.01" name="montant" id="montant" class="form-control" value="{{ $payment->montant }}" required>
        </div>
        <div class="form-group">
            <label for="payment_date">Date de Paiement</label>
            <input type="date" name="payment_date" id="payment_date" class="form-control" value="{{ $payment->payment_date }}" required>
        </div>
        <div class="form-group">
            <label for="payment_method">Méthode de Paiement</label>
            <input type="text" name="payment_method" id="payment_method" class="form-control" value="{{ $payment->payment_method }}" required>
        </div>
        <div class="form-group">
            <label for="num_transaction">Numéro de Transaction</label>
            <input type="text" name="num_transaction" id="num_transaction" class="form-control" value="{{ $payment->num_transaction }}">
        </div>
        <div class="form-group">
            <label for="recu">Reçu</label>
            <select name="recu" id="recu" class="form-control">
                <option value="0" {{ $payment->recu == 0 ? 'selected' : '' }}>Non</option>
                <option value="1" {{ $payment->recu == 1 ? 'selected' : '' }}>Oui</option>
            </select>
        </div>
        <div class="form-group">
            <label for="month">Mois</label>
            <input type="text" name="month" id="month" class="form-control" value="{{ $payment->month }}">
        </div>
        <div class="form-group">
            <label for="sender">Expéditeur</label>
            <input type="text" name="sender" id="sender" class="form-control" value="{{ $payment->sender }}">
        </div>
        <div class="form-group">
            <label for="notes">Notes</label>
            <textarea name="notes" id="notes" class="form-control">{{ $payment->notes }}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
</div>
@endsection