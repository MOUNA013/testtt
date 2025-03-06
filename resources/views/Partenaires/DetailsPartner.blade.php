@extends('layouts.back')

@section('content')
    <style>
        /* Styles pour la page de détails du partenaire */
        .details-container {
            background-color: #fff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Style des titres */
        .details-container h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }

        /* Style des paragraphes */
        .partner-details p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 10px;
        }

        /* Style pour le bouton "Retour à la liste" */
        .btn-back {
            font-size: 1rem;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            display: inline-flex;
            align-items: center;
            margin-top: 20px;
        }

        .btn-back:hover {
            background-color: #2980b9;
            text-decoration: none;
        }

        .btn-back i {
            margin-right: 8px;
        }

        /* Gérer la mise en page sur différentes tailles d'écran */
        @media (max-width: 768px) {
            .partner-details p {
                font-size: 1rem;
            }

            .details-container {
                padding: 20px;
            }
        }
    </style>

    <div class="container mt-5">
        <div class="details-container card shadow-lg p-4 rounded bg-white">
            <h1>{{ $partner->name }}</h1>
            <div class="partner-details">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <p><strong>Email:</strong> {{ $partner->email }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Téléphone:</strong> {{ $partner->phone }}</p>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <p><strong>Adresse:</strong> {{ $partner->address }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Entreprise:</strong> {{ $partner->company_name }}</p>
                    </div>
                </div>
            </div>

            <a href="{{ route('partners.index') }}" class="btn btn-secondary btn-back">
                <i class="bi bi-arrow-left-circle"></i> Retour à la liste
            </a>
        </div>
    </div>
@endsection
