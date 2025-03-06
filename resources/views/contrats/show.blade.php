@extends('layouts.back')

@section('content')
   <!-- contrats/show.blade.php -->
<div>
    <h1>Détails du Contrat</h1>
    <p>Numéro de contrat: {{ $contrat->id }}</p>
    <p>Partenaire: {{ $contrat->Partner?->name ?? 'No Partner Assigned' }}</p>    <p>Date de début: {{ $contrat->date_debut }}</p>
    <p>Date de fin: {{ $contrat->date_fin }}</p>
    <p>Montant: {{ $contrat->montant }}</p>
    <p>Description: {{ $contrat->description }}</p>
</div>
@endsection
