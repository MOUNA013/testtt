<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_transaction',
        'montant',
        'recu',
        'month',
        'sender',
        'payment_method',
        'verified_at',
        'verified_by',
        'updated_by',
        'update_justification',
    ];

    public function Facture()
    {
        return $this->hasOne(Facture::class);
    }

    public function VerifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function UpdatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
