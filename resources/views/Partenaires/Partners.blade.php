@extends('layouts.back')

@section('content')
<div class="container mt-5">
    <div class="row">
        <div class="col-lg-6">
            <h2 class="mb-4 text-primary">Gestion des Partenaires</h2>
            <p>
                Gérez vos partenaires facilement. Ajoutez de nouveaux partenaires ou consultez la liste actuelle. 
                Un partenariat solide est essentiel pour la réussite de votre activité.
            </p>
            <p class="text-muted">
                Découvrez comment optimiser votre réseau de partenaires grâce à notre interface simplifiée.
            </p>
        </div>
        <div class="col-lg-6 text-center">
            <img src="https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Partenaires" class="img-fluid" style="max-width: 80%; border-radius: 10px;">
        </div>
    </div>

    <div class="d-flex gap-4 justify-content-start mt-5">
        <a href="{{ route('partners.create') }}" class="btn btn-success d-flex align-items-center">
            <i class="bi bi-person-plus fs-4 me-2"></i> Ajouter un partenaire
        </a>
        <a href="{{ route('partners.index') }}" class="btn btn-info d-flex align-items-center">
            <i class="bi bi-list fs-4 me-2"></i> Voir la liste des partenaires
        </a>
    </div>

    
</div>
@endsection
