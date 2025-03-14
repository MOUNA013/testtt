<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index()
    {
        $partners = Partner::all();
        return view('Partenaires.Show', compact('partners')); 
    }

    public function create()
    {
        return view('Partenaires.CreatePartenairs'); 
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'Responsable' => 'required|string|max:255',
            'Tele_Responsable' => 'required|string|max:20',
            'email' => 'required|email|unique:partners,email',
            'address' => 'nullable|string',
            'company_name' => 'nullable|string',
        ]);
    
        try {
            Partner::create($validatedData);
            return redirect()->route('partners.index')->with('success', 'Partenaire enregistré avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur : ' . $e->getMessage());
        }
    }
    
    public function show(Partner $partner)
    {
        return view('Partenaires.DetailsPartner', compact('partner')); 
    }

public function edit(Partner $partner)
{
    return view('Partenaires.edit', compact('partner')); 
}

public function update(Request $request, Partner $partner)
{
    $validatedData = $request->validate([
        'name' => 'required|max:255',
        'Responsable' => 'required|string|max:255',
        'Tele_Responsable' => 'required|string|max:20', 
        'email' => 'required|email|unique:partners,email,' . $partner->id,
        'phone' => 'nullable|string',
        'address' => 'nullable|string',
        'company_name' => 'nullable|string',
    ]);

    $partner->update($validatedData);

    return redirect()->route('partners.index')->with('success', 'Partenaire mis à jour avec succès.');
}

    public function destroy(Partner $partner)
    {
        $partner->delete();
        return redirect()->route('partners.index')->with('success', 'Partenaire supprimé avec succès.');
    }
}