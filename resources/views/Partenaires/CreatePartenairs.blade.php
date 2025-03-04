<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire de Partenaire</title>
    <style>
        /* Formulaire */
        .partner-form {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Labels */
        .form-label {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            display: block;
        }

        /* Champs de saisie */
        .form-control {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            transition: border-color 0.3s ease-in-out;
        }

        .form-control:focus {
            border-color: #007bff;
            outline: none;
        }

        /* Texte d'information */
        .form-text {
            font-size: 14px;
            color: #888;
        }

        /* Bouton */
        .btn-submit {
            padding: 12px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }

        .btn-submit:hover {
            background-color: #0056b3;
        }

        /* Espacement entre les éléments */
        .form-group {
            margin-bottom: 20px;
        }

        /* Effet d'ombre portée sur le formulaire */
        .partner-form {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Petites améliorations */
        small {
            font-size: 13px;
            color: #777;
        }
    </style>
</head>
<body>

    <form action="{{ route('partners.store') }}" method="POST" class="partner-form">
        @csrf

        <div class="form-group">
            <label for="name" class="form-label">Nom du Partenaire :</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="email" class="form-label">Email :</label>
            <input type="email" name="email" id="email" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="phone" class="form-label">Téléphone :</label>
            <input type="text" name="phone" id="phone" class="form-control">
        </div>

        <div class="form-group">
            <label for="address" class="form-label">Adresse :</label>
            <input type="text" name="address" id="address" class="form-control">
        </div>

        <div class="form-group">
            <label for="company_name" class="form-label">Nom de l'Entreprise (si applicable) :</label>
            <input type="text" name="company_name" id="company_name" class="form-control">
            <small class="form-text text-muted">Si vous représentez une entreprise ou avez une activité professionnelle, veuillez indiquer son nom.</small>
        </div>
        <button type="submit" class="btn-submit">Enregistrer</button>
    </form>
    {{-- @include('layouts.footer') --}}
</body>
</html>
