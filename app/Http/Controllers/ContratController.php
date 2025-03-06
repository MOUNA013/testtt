<?php
namespace App\Http\Controllers;

use App\Models\Contrat;
use App\Models\Partner;
use Illuminate\Http\Request;

class ContratController extends Controller
{
    public function index()
    {
        $contrats = Contrat::all();
        return view('contrats.index', compact('contrats'));
    }

// ContratController.php
public function create()
{
    // Fetch the list of partners from the database
    $partenaires = Partner::all(); // Assuming you have a Partenaire model

    // Pass the partners to the view
    return view('contrats.create', compact('partenaires'));
}
public function store(Request $request)
{
    $validatedata = $request->validate([
        'numero_contrat' => 'required|unique:contrats',
        'partners_id' => 'required',
        'date_debut' => 'required|date',
        'date_fin' => 'required|date|after:date_debut',
        'montant' => 'required|numeric',
        'description' => 'nullable|string',
    ]);

    // Add the authenticated user to the validated data
    $validatedata['user_id'] = auth()->id();

    Contrat::create($validatedata);

    return redirect()->route('contrats.index')
        ->with('success', 'Contrat créé avec succès.');
}


   // In ContratController.php
   public function show($id)
{
    $contrat = Contrat::with('Partner')->findOrFail($id);
    return view('contrats.show', compact('contrat'));
}


public function edit(Contrat $contrat)
{
    $partenaires = Partner::all(); // Fetch all partners
    return view('contrats.edit', compact('contrat', 'partenaires')); // Pass both contrat and partenaires to the view
}


    public function update(Request $request, Contrat $contrat)
    {
        $request->validate([
            'numero_contrat' => 'required|unique:contrats,numero_contrat,' . $contrat->id,
            'partners_id' => 'required',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'montant' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $contrat->update($request->all());

        return redirect()->route('contrats.index')
                         ->with('success', 'Contrat mis à jour avec succès.');
    }

    public function destroy(Contrat $contrat)
    {
        $contrat->delete();

        return redirect()->route('contrats.index')
                         ->with('success', 'Contrat supprimé avec succès.');
    }
}