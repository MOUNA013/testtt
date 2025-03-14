@extends('layouts.back')

@section('content')
<div class="card mb-2 user-select-none" style="border-radius: 7px; padding: 2px;">
    <div class="card-header">
        <h3 class="card-title">{{__('Modifier le Partenaire')}}</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div> 
    <div class="card-body text-start item-user border-bottom-0">

        <form action="{{ route('partners.update', $partner->id) }}" method="POST" class="partner-form shadow p-4 rounded bg-light">
            @csrf
            @method('PUT')

            <div class="form-group mb-3">
                <label for="name" class="form-label">Nom du Partenaire :</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $partner->name) }}" required>
            </div>
            <div class="form-group mb-3">
                <label for="name" class="form-label">Nom du Responsable :</label>
                <input type="text" name="Responsable" id="Responsable" class="form-control" value="{{ old('name', $partner->Responsable) }}" required>
            </div> 
            <div class="form-group mb-3">
                <label for="Tele_Responsable" class="form-label">Tele_Responsable :</label>
                <input type="text" name="Tele_Responsable" id="Tele_Responsable" value="{{ old('name', $partner->Tele_Responsable) }}"  class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="email" class="form-label">Email :</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $partner->email) }}" required>
            </div>

            <div class="form-group mb-3">
                <label for="address" class="form-label">Adresse :</label>
                <input type="text" name="address" id="address" class="form-control" value="{{ old('address', $partner->address) }}">
            </div>

            <div class="form-group mb-3">
                <label for="company_name" class="form-label">Nom de l'Entreprise :</label>
                <input type="text" name="company_name" id="company_name" class="form-control" value="{{ old('company_name', $partner->company_name) }}">
                <small class="form-text text-muted">Si vous représentez une entreprise ou avez une activité professionnelle, veuillez indiquer son nom.</small>
            </div>

           

            <button type="submit" class="btn btn-primary btn-block mt-4">Mettre à jour</button>
        </form>
    </div>
</div>
@endsection