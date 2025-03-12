@extends('layouts.back')

@section('content')
   
<div class="card mb-2 user-select-none" style="background-color: white; border-radius: 7px; padding: 2px;">
    <div class="card-header">
        <h3 class="card-title">Détails du Contrat</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div>
    <div class="card-body text-start item-user border-bottom-0">
    <p><strong>Partenaire:</strong> {{ $contrat->partner?->name ?? 'Aucun partenaire' }}</p>
    <p><strong>Date de début:</strong> {{ $contrat->date_debut }}</p>
    <p><strong>Date de fin:</strong> {{ $contrat->date_fin }}</p>
    <p><strong>Nombre de séances:</strong> {{ $contrat->Nombre_des_seances }}</p>
    <p><strong>Nombre d'étudiants:</strong> {{ $contrat->Nombre_des_etudiants }}</p>
    <p><strong>Prix par séance:</strong> {{ $contrat->Prix_par_seances }} DH</p>
    <p><strong>Prix total:</strong> {{ $contrat->Prix_totale }} DH</p>
    </div>
</div>
@endsection
