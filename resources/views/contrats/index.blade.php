<!-- resources/views/contrats/index.blade.php -->
@extends('layouts.back') <!-- Assuming you have a layout file -->

@section('content')
    <div class="container">
        <h1>Liste des Contrats</h1>
        <a href="{{ route('contrats.create') }}" class="btn btn-primary mb-3">Créer un nouveau contrat</a>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Numéro de contrat</th>
                    <th>Partenaire</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Montant</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($contrats as $contrat)
                    <tr>
                        <td>{{ $contrat->numero_contrat }}</td>
                        <td>{{ $contrat->partenaire_id }}</td>
                        <td>{{ $contrat->date_debut }}</td>
                        <td>{{ $contrat->date_fin }}</td>
                        <td>{{ $contrat->montant }}</td>
                        <td>
                            <a href="{{ route('contrats.show', $contrat->id) }}" class="btn btn-info btn-sm">Voir</a>
                            <a href="{{ route('contrats.edit', $contrat->id) }}" class="btn btn-warning btn-sm">Modifier</a>
                            <form action="{{ route('contrats.destroy', $contrat->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection