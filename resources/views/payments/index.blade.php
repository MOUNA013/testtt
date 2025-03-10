<!-- resources/views/payments/index.blade.php -->

@extends('layouts.back')

@section('content')
<div class="container">
    <h1>Liste des Paiements</h1>
    <a href="{{ route('payments.create') }}" class="btn btn-primary mb-3">Créer un Paiement</a>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Contrat</th>
                <th>Montant</th>
                <th>Date de Paiement</th>
                <th>Méthode</th>
                <th>Reçu</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($payments as $payment)
                <tr>
                    <td>{{ $payment->id }}</td>
                    <td>{{ $payment->user->name ?? 'N/A' }}</td>
                    <td>{{ $payment->contrat->id ?? 'N/A' }}</td>
                    <td>{{ $payment->montant }}</td>
                    <td>{{ $payment->payment_date }}</td>
                    <td>{{ $payment->payment_method }}</td>
                    <td>{{ $payment->recu ? 'Oui' : 'Non' }}</td>
                    <td>
                        <a href="{{ route('payments.show', $payment->id) }}" class="btn btn-info btn-sm">Voir</a>
                        <a href="{{ route('payments.edit', $payment->id) }}" class="btn btn-warning btn-sm">Modifier</a>
                        <form action="{{ route('payments.destroy', $payment->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')">Supprimer</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection