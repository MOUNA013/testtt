<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    // Afficher la liste des partenaires
    public function index()
    {
        $partners = Partner::all();
        return view('Partenaires.Show', compact('partners')); // Vue Show.blade.php
    }

    // Afficher le formulaire de création
    public function create()
    {
        return view('Partenaires.CreatePartenairs'); // Vue CreatePartenairs.blade.php
    }

    // Enregistrer un nouveau partenaire
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:partners,email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'company_name' => 'nullable|string',
            'contact_person' => 'nullable|string',
        ]);

        Partner::create($validatedData);

        return redirect()->route('partners.index')->with('success', 'Partenaire enregistré avec succès.');
    }

    // Afficher les détails d'un partenaire
    public function show(Partner $partner)
    {
        return view('Partenaires.DetailsPartner', compact('partner')); // Vue DetailsPartner.blade.php
    }

    // Afficher le formulaire de modification
    public function edit(Partner $partner)
    {
        return view('Partenaires.edit', compact('partner')); // Vue edit.blade.php (si elle existe)
    }

    // Mettre à jour un partenaire
    public function update(Request $request, Partner $partner)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:partners,email,' . $partner->id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'company_name' => 'nullable|string',
            'contact_person' => 'nullable|string',
        ]);

        $partner->update($validatedData);

        return redirect()->route('partners.index')->with('success', 'Partenaire mis à jour avec succès.');
    }

    // Supprimer un partenaire
    public function destroy(Partner $partner)
    {
        $partner->delete();
        return redirect()->route('partners.index')->with('success', 'Partenaire supprimé avec succès.');
    }
}