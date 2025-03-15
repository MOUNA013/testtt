<?php
namespace App\Http\Controllers;

use App\Models\Contrat;
use App\Models\Partner;
use Illuminate\Http\Request;
use Ramsey\Uuid\Guid\Guid;

class ContratController extends Controller
{
    public function index()
    {
        $contrats = Contrat::with('Partner')->get(); // Chargez la relation 'partner'
        return view('contrats.index', compact('contrats'));
    }
public function create()
{
    $partenaires = Partner::all(); // Assuming you have a Partenaire model

    return view('contrats.create', compact('partenaires'));
}
public function store(Request $request)
{
    $validatedata = $request->validate([
        'partners_id' => 'required|exists:partners,id',
        'Nombre_des_seances' => 'required|integer|min:1',
        'Nombre_des_etudiants' => 'required|integer|min:1',
        'Prix_par_seances' => 'required|numeric|min:0',
        'Prix_totale' => 'required|numeric|min:0',
        'date_debut' => 'required|date',
        'date_fin' => 'required|date|after:date_debut',
    ]);

    $validatedata['user_id'] = auth()->id();
    
    Contrat::create($validatedata);
    
    return redirect()->route('contrats.index')->with('success', 'Contrat créé avec succès.');
}




public function show(Contrat $contrat)
{
    return view('contrats.show', compact('contrat'));
}




public function edit(Contrat $contrat)
{
    $partenaires = Partner::all(); 
    return view('contrats.edit', compact('contrat', 'partenaires')); // Pass both contrat and partenaires to the view
}


    public function update(Request $request, Contrat $contrat)
    {
        $validatedata = $request->validate([
            'partners_id' => 'required|exists:partners,id',
            'Nombre_des_seances' => 'required|integer|min:1',
            'Nombre_des_etudiants' => 'required|integer|min:1',
            'Prix_par_seances' => 'required|numeric|min:0',
            'Prix_totale' => 'required|numeric|min:0',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
        ]);
        

        $contrat->update($validatedata);

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