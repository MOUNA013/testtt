@extends('layouts.back')

<style>
    .contrats-table {
        width: 90%;
        margin: 20px auto;
        border-collapse: collapse;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    .contrats-table th, .contrats-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    .contrats-table th {
        color: black;
        font-size: 16px;
        font-weight: 600;
    }

    .contrats-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .contrats-table tr:hover {
        background-color: #f1f1f1;
    }
    .edit-button {
        color: blue;
    }

    .delete-button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 4px 9px;
        border-radius: 15px;
    }

    .delete-button:hover {
        background-color: #c0392b;
    }

    .action-link {
        padding: 6px 12px;
        margin: 0 5px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 14px;
    }
</style>

@section('content')
    <div class="card mb-2 user-select-none" style="background-color: white; border-radius: 7px; padding: 2px;">
        <div class="card-header">
            <h3 class="card-title">Liste des Contrats</h3>
            <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
        </div>
        <a href="{{ route('contrats.create') }}" class=" text-start text-primary mb-3 mt-2 ps-5">Créer un nouveau contrat</a>
        <div class="card-body text-center item-user border-bottom-0">
            <table class="contrats-table">
                <thead>
                    <tr>
                        <th>Partenaire</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Nombre de séances</th>
                        <th>Nombre d'étudiants</th>
                        <th>Prix par séance</th>
                        <th>Prix total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($contrats as $contrat)
                        <tr>
                            <td>{{ $contrat->partner->name ?? 'Aucun partenaire' }}</td>
                            <td>{{ $contrat->date_debut }}</td>
                            <td>{{ $contrat->date_fin }}</td>
                            <td>{{ $contrat->Nombre_des_seances }}</td>
                            <td>{{ $contrat->Nombre_des_etudiants }}</td>
                            <td>{{ $contrat->Prix_par_seances }} DH</td>
                            <td>{{ $contrat->Prix_totale }} DH</td>
                            <td>
                                <a href="{{ route('contrats.show', $contrat->numero_contrat) }}" class="btn btn-info btn-sm">Voir</a>
                                <a href="{{ route('contrats.edit', $contrat->numero_contrat) }}" class="btn btn-warning btn-sm edit-button">Modifier</a>
                                <form action="{{ route('contrats.destroy', $contrat->numero_contrat) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm delete-button" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')">Supprimer</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
