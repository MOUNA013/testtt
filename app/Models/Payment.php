<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'contrat_id',
        'montant',
        'payment_date',
        'payment_method',
        'num_transaction',
        'recu',
        'month',
        'sender',
        'verified_at',
        'verified_by',
        'updated_by',
        'update_justification',
        'notes',
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relation avec le contrat
    public function contrat()
    {
        return $this->belongsTo(Contrat::class, 'contrat_id');
    }

    // Relation avec la facture
    public function facture()
    {
        return $this->hasOne(Facture::class);
    }

    // Relation avec l'utilisateur qui a vérifié le paiement
    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    // Relation avec l'utilisateur qui a mis à jour le paiement
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}