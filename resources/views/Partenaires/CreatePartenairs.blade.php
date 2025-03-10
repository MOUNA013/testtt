@extends('layouts.back')

@section('content')
    <div class="container mt-5">
        <h2 class="mb-4 text-center">Ajouter un Partenaire</h2>

        <form action="{{ route('partners.store') }}" method="POST" class="partner-form shadow p-4 rounded bg-light">
            @csrf

            <div class="form-group mb-3">
                <label for="name" class="form-label">Nom du Partenaire :</label>
                <input type="text" name="name" id="name" class="form-control" required>
            </div>

            <div class="form-group mb-3">
                <label for="email" class="form-label">Email :</label>
                <input type="email" name="email" id="email" class="form-control" required>
            </div>

            <div class="form-group mb-3">
                <label for="phone" class="form-label">Téléphone :</label>
                <input type="text" name="phone" id="phone" class="form-control">
            </div>

            <div class="form-group mb-3">
                <label for="address" class="form-label">Adresse :</label>
                <input type="text" name="address" id="address" class="form-control">
            </div>

            <div class="form-group mb-3">
                <label for="company_name" class="form-label">Nom de l'Entreprise :</label>
                <input type="text" name="company_name" id="company_name" class="form-control">
                <small class="form-text text-muted">Si vous représentez une entreprise ou avez une activité professionnelle, veuillez indiquer son nom.</small>
            </div>

            <button type="submit" class="btn btn-primary btn-block mt-4">Enregistrer</button>
        </form>
    </div>
@endsection
