<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    // Si le nom de ta table n'est pas le pluriel du modèle, définis-le ici
    protected $table = 'factures';

    // Définir les colonnes autorisées pour l'attribution de masse (mass assignment)
    protected $fillable = [
        'user_id', 
        'payment_id', 
        'facture_num', 
        'intern', 
        'montant_enlettre', 
        'client_name', 
        'payment_date', 
        'payment_method',
        'sender',
        'factureable_type', // Utilisation de factureable_type au lieu de facturation_type
        'category_id', // Ajouter category_id si tu veux l'inclure
        'factureable_id',  // Ajouter factureable_id si nécessaire
        'numero_contrat',  // Le numéro du contrat
        'montant' // Le montant de la facture
    ];

    // Si tu veux utiliser des timestamps
    public $timestamps = true;

    // Optionally specify the primary key
    protected $primaryKey = 'id'; 

    // Corrected relationship names
    public function user()
    {
        return $this->belongsTo(User::class,"user_id");
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id'); // 'payment_id' is the foreign key in the 'factures' table
    }
}
