@extends('layouts.back')

@section('content')
    <div class="container mt-5">
        <h2 class="mb-4 text-center">Modifier le Partenaire</h2>

        <form action="{{ route('partners.update', $partner->id) }}" method="POST" class="partner-form shadow p-4 rounded bg-light">
            @csrf
            @method('PUT')

            <div class="form-group mb-3">
                <label for="name" class="form-label">Nom du Partenaire :</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $partner->name) }}" required>
            </div>

            <div class="form-group mb-3">
                <label for="email" class="form-label">Email :</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $partner->email) }}" required>
            </div>

            <div class="form-group mb-3">
                <label for="phone" class="form-label">Téléphone :</label>
                <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone', $partner->phone) }}">
            </div>

            <div class="form-group mb-3">
                <label for="address" class="form-label">Adresse :</label>
                <input type="text" name="address" id="address" class="form-control" value="{{ old('address', $partner->address) }}">
            </div>

            <div class="form-group mb-3">
                <label for="company_name" class="form-label">Nom de l'Entreprise (si applicable) :</label>
                <input type="text" name="company_name" id="company_name" class="form-control" value="{{ old('company_name', $partner->company_name) }}">
                <small class="form-text text-muted">Si vous représentez une entreprise ou avez une activité professionnelle, veuillez indiquer son nom.</small>
            </div>

           

            <button type="submit" class="btn btn-primary btn-block mt-4">Mettre à jour</button>
        </form>
    </div>
@endsection
