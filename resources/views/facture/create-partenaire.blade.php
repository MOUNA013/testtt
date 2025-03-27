@extends('layouts.back')
@section('content')
<div class="card mb-2 user-select-none" style="border-radius: 7px; padding: 2px;"> 
    <div class="card-header">
        <h3 class="card-title">{{__('Créer une Facture Partenaire')}}</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div>
<div class="card-body text-start item-user border-bottom-0">
 
    <form action="{{ route('factures.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="facture_num" class="form-label">Numéro de Facture</label>
            <input type="text" name="facture_num" id="facture_num" class="form-control" value="{{ old('facture_num') }}">
            @error('facture_num')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="partner_id" class="form-label">Partenaire</label>
            <select name="partner_id" id="partner_id" class="form-control">
                @foreach ($partners as $partner)
                    <option value="{{ $partner->id }}" {{ old('partner_id') == $partner->id ? 'selected' : '' }}>{{ $partner->name }}</option>
                @endforeach
            </select>
            @error('partner_id')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>
        <div class="mb-3">
            <label for="payment_id" class="form-label">Mode de Paiement</label>
            <select name="payment_id" id="payment_id" class="form-control">
                @foreach ($payments as $payment)
                    <option value="{{ $payment->id }}" {{ old('payment_id') == $payment->id ? 'selected' : '' }}>{{ $payment->payment_method }}</option>
                @endforeach
            </select>
            @error('payment_id')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="désignation" class="form-label">Désignation</label>
            <select name="désignation" id="désignation" class="form-control">
                <option value="cours" {{ old('désignation') == 'cours' ? 'selected' : '' }}>Cours</option>
                <option value="parcours" {{ old('désignation') == 'parcours' ? 'selected' : '' }}>Parcours</option>
            </select>
            @error('désignation')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>
        
        

        <button type="submit" class="btn btn-primary">Créer la Facture</button>
    </form>
    

</div>  
</div>
@endsection





