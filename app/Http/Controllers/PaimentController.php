<?php

namespace App\Http\Controllers;

use App\Models\Contrat;
use App\Models\Partner;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class PaimentController extends Controller
{
    /**
     * Affiche la liste des paiements.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Récupère tous les paiements avec les relations nécessaires
        $payments = Payment::with(['user', 'contrat', 'verifiedBy', 'updatedBy'])->get();
        return view('payments.index', compact('payments'));
    }

    /**
     * Affiche le formulaire de création d'un paiement.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $partenaires = Partner::all();
        $contrats = Contrat::all();

         // Assuming you have a Partenaire model

        return view('payments.create', compact('partenaires','contrats'));
    }

    /**
     * Enregistre un nouveau paiement dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validation des données du formulaire
        $validatedData = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'contrat_id' => 'nullable|exists:contrats,id',
            'montant' => 'required|numeric',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'num_transaction' => 'nullable|string',
            'recu' => 'nullable|boolean',
            'month' => 'nullable|string',
            'sender' => 'nullable|string',
            'verified_at' => 'nullable|date',
            'verified_by' => 'nullable|exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
            'update_justification' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // Crée un nouveau paiement
        Payment::create($validatedData);

        // Redirige vers la liste des paiements avec un message de succès
        return redirect::route('payments.index')->with('success', 'Paiement créé avec succès.');
    }

    /**
     * Affiche les détails d'un paiement spécifique.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        // Charge les relations nécessaires pour éviter les requêtes supplémentaires
        $payment->load(['user', 'contrat', 'verifiedBy', 'updatedBy']);
        return view('payments.show', compact('payment'));
    }

    /**
     * Affiche le formulaire de modification d'un paiement.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        // Charge les relations nécessaires pour éviter les requêtes supplémentaires
        $payment->load(['user', 'contrat', 'verifiedBy', 'updatedBy']);
        return view('payments.edit', compact('payment'));
    }

    /**
     * Met à jour un paiement dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        // Validation des données du formulaire
        $validatedData = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'contrat_id' => 'nullable|exists:contrats,id',
            'montant' => 'required|numeric',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'num_transaction' => 'nullable|string',
            'recu' => 'nullable|boolean',
            'month' => 'nullable|string',
            'sender' => 'nullable|string',
            'verified_at' => 'nullable|date',
            'verified_by' => 'nullable|exists:users,id',
            'updated_by' => 'nullable|exists:users,id',
            'update_justification' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // Met à jour le paiement
        $payment->update($validatedData);

        // Redirige vers la liste des paiements avec un message de succès
        return redirect::clearResolvedInstanceroute('payments.index')->with('success', 'Paiement mis à jour avec succès.');
    }

    /**
     * Supprime un paiement de la base de données.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        // Supprime le paiement
        $payment->delete();

        // Redirige vers la liste des paiements avec un message de succès
        return redirect::route('payments.index')->with('success', 'Paiement supprimé avec succès.');
    }
}