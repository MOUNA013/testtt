@extends('layouts.back')

@section('content')
    <style>
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
            color: black;
            font-size: 16px;
            font-weight: 600;
        }

        .partners-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .partners-table tr:hover {
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
<div  style="background-color: white; border-radius: 7px; padding: 2px;">
    
    <div class="card-header">
        <h3 class="card-title">{{__('Liste des Partenaires')}}</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div>
  <div class="card-body text-start item-user border-bottom-0">

    <a href="{{ route('partners.create') }}" class="add-partner-link">Ajouter un Partenaire</a>
    <table class="partners-table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Responsable</th>
                <th>Tele_Responsable</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($partners as $partner)
                <tr>
                    <td>{{ $partner->name }}</td>
                    <td>{{ $partner->Responsable }}</td>
                    <td>{{ $partner->Tele_Responsable }}</td>
                    <td>{{ $partner->email }}</td>
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
  </div>  
</div>
@endsection
