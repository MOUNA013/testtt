@extends('layouts.back')

@section('content')
<div class="card mb-2 user-select-none" style="background-color: white; border-radius: 7px; padding: 2px;">
    <div class="card-header">
        <h3 class="card-title">Modifier le Contrat</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div>
    <div class="card-body text-center item-user border-bottom-0">
        <form action="{{ route('contrats.update', $contrat->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="partners_id">Partenaire</label>
                <select name="partners_id" id="partners_id" class="form-control" required>
                    <option value="">Sélectionner un partenaire</option>
                    @foreach ($partenaires as $partenaire)
                        <option value="{{ $partenaire->id }}" {{ $contrat->partners_id == $partenaire->id ? 'selected' : '' }}>
                            {{ $partenaire->name }}
                        </option>
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
                <label for="Nombre_des_seances">Nombre de séances</label>
                <input type="number" name="Nombre_des_seances" id="Nombre_des_seances" class="form-control" value="{{ $contrat->Nombre_des_seances }}" min="1" required>
            </div>

            <div class="form-group">
                <label for="Nombre_des_etudiants">Nombre d'étudiants</label>
                <input type="number" name="Nombre_des_etudiants" id="Nombre_des_etudiants" class="form-control" value="{{ $contrat->Nombre_des_etudiants }}" min="1" required>
            </div>

            <div class="form-group">
                <label for="Prix_par_seances">Prix par séance</label>
                <input type="number" name="Prix_par_seances" id="Prix_par_seances" class="form-control" value="{{ $contrat->Prix_par_seances }}" step="0.01" min="0" required>
            </div>

            <div class="form-group">
                <label for="Prix_totale">Prix total</label>
                <input type="number" name="Prix_totale" id="Prix_totale" class="form-control" value="{{ $contrat->Prix_totale }}" step="0.01" min="0" required>
            </div>

            <button type="submit" class="btn btn-primary mt-3">Mettre à jour</button>
        </form>
    </div>    
    </div>
@endsection
