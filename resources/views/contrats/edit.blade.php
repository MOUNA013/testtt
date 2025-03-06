@extends('layouts.back')

@section('content')
    <div class="container">
        <h1>Modifier le Contrat</h1>
        <form action="{{ route('contrats.update', $contrat->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="numero_contrat">Numéro de contrat</label>
                <input type="text" name="numero_contrat" id="numero_contrat" class="form-control" value="{{ $contrat->numero_contrat }}" required>
            </div>
            <div class="form-group">
                <label for="partners_id">Partenaire</label>
                <select name="partners_id" id="partners_id"  class="form-control" required>
                    <option value="">Select a Partner</option>
                    @foreach ($partenaires as $partenaire)
                        <option value="{{ $partenaire->id }}">{{ $partenaire->name }}</option>
                    @endforeach
                </select>
            
            </div>
            <div class="form-group">
                <label for="date_debut">Date de début</label>
                <input type="date" name="date_debut" id="date_debut" class="form-control" value="{{ $contrat->date_debut }}" required>
            </div>
            <div class="form-group">
                <label for="date_fin">Date de fin</label>
                <input type="date" name="date_fin" id="date_fin" class="form-control" value="{{ $contrat->date_fin }}" required>
            </div>
            <div class="form-group">
                <label for="montant">Montant</label>
                <input type="number" name="montant" id="montant" class="form-control" value="{{ $contrat->montant }}" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="description" class="form-control">{{ $contrat->description }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </form>
    </div>
@endsection