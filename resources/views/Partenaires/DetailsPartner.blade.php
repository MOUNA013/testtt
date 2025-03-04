@extends('layouts.app')

@section('content')
    <style>
        /* Style général de la page */
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }

        h1 {
            font-size: 32px;
            font-weight: bold;
            color: #e67e22; /* Couleur orange */
            text-align: center;
            margin-top: 40px;
        }

        p {
            font-size: 18px;
            line-height: 1.6;
            margin: 10px 0;
        }

        /* Style de la section principale */
        .details-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .details-container p {
            background-color: #f4f7fc;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .details-container p strong {
            color: #e67e22; /* Couleur orange pour le texte en gras */
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            text-align: center;
            padding: 12px 20px;
            font-size: 18px;
            background-color: #e67e22; /* Couleur orange pour le bouton */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .back-link:hover {
            background-color: #d35400; /* Couleur orange foncé au survol */
        }

    </style>

    <div class="details-container">
        <h1>{{ $partner->name }}</h1>
        <p><strong>Email:</strong> {{ $partner->email }}</p>
        <p><strong>Téléphone:</strong> {{ $partner->phone }}</p>
        <p><strong>Adresse:</strong> {{ $partner->address }}</p>
        <p><strong>Entreprise:</strong> {{ $partner->company_name }}</p>
        <a href="{{ route('partners.index') }}" class="back-link">Retour à la liste</a>
    </div>
    {{-- @include('layouts.footer') --}}

@endsection
