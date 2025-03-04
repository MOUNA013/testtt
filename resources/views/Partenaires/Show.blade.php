@extends('layouts.app')

@section('content')
    <style>
        /* Style général de la page */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            color: #333;
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            margin-top: 30px;
            color: #e67e22; /* Couleur orange */
            font-size: 32px;
            font-weight: 600;
        }

        /* Style du lien pour ajouter un partenaire */
        .add-partner-link {
            display: block;
            width: 200px;
            margin: 20px auto;
            text-align: center;
            color: #fff;
            background-color: #e67e22; /* Couleur orange */
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        .add-partner-link:hover {
            background-color: #d35400; /* Couleur orange foncé au survol */
        }

        /* Style du tableau */
        .partners-table {
            width: 90%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .partners-table th, .partners-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        .partners-table th {
            background-color: #e67e22; /* Couleur orange pour l'en-tête */
            color: #fff;
            font-size: 16px;
            font-weight: 600;
        }

        .partners-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .partners-table tr:hover {
            background-color: #f1f1f1;
        }

        /* Style des boutons d'action */
        .action-button {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        .view-button {
            background-color: #e67e22; /* Couleur orange pour le bouton Voir */
            color: white;
        }

        .view-button:hover {
            background-color: #d35400; /* Couleur orange foncé au survol */
        }

        .edit-button {
            background-color: #2ecc71;
            color: white;
        }

        .edit-button:hover {
            background-color: #27ae60;
        }

        .delete-button {
            background-color: #e74c3c;
            color: white;
        }

        .delete-button:hover {
            background-color: #c0392b;
        }

        /* Style des liens d'action */
        .action-link {
            padding: 6px 12px;
            margin: 0 5px;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        .action-link:hover {
            text-decoration: none;
        }
    </style>

    <h1>Liste des Partenaires</h1>
    <a href="{{ route('partners.create') }}" class="add-partner-link">Ajouter un Partenaire</a>
    <table class="partners-table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Entreprise</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($partners as $partner)
                <tr>
                    <td>{{ $partner->name }}</td>
                    <td>{{ $partner->email }}</td>
                    <td>{{ $partner->phone }}</td>
                    <td>{{ $partner->company_name }}</td>
                    <td>
                        <a href="{{ route('partners.show', $partner->id) }}" class="action-link view-button">Voir</a>
                        <a href="{{ route('partners.edit', $partner->id) }}" class="action-link edit-button">Modifier</a>
                        <form action="{{ route('partners.destroy', $partner->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="action-button delete-button">Supprimer</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{-- @include('layouts.footer') --}}

@endsection
