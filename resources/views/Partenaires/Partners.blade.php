@extends('layouts.back')

@section('content')
<div class="card mb-2 user-select-none" style="border-radius: 7px; padding: 2px;">
    <div class="card-header">
        <h3 class="card-title">{{__('Gestion des Partenaires')}}</h3>
        <i class="fa fa-caret-down ms-auto d-xl-none" id="aside-control" role="button"></i>
    </div>
    <div class="card-body text-center item-user border-bottom-0">
          
            <p>
                Gérez vos partenaires facilement. Ajoutez de nouveaux partenaires ou consultez la liste actuelle. 
                Un partenariat solide est essentiel pour la réussite de votre activité.
            </p>
            <p class="text-muted">
                Découvrez comment optimiser votre réseau de partenaires grâce à notre interface simplifiée.
            </p>
            <div class="d-flex gap-4 justify-content-center mt-5">
                <a href="{{ route('partners.create') }}" class="btn btn-success d-flex align-items-center">
                    <i class="bi bi-person-plus fs-4 me-2"></i> Ajouter un partenaire
                </a>
                <a href="{{ route('partners.index') }}" class="btn btn-info d-flex align-items-center">
                    <i class="bi bi-list fs-4 me-2"></i> Voir la liste des partenaires
                </a>
            </div>
    </div>
    
</div>
@endsection
