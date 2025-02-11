<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facture extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'facture_num',
        'user_id',
        'payment_id',
        'intern',
        'montant_enlettre',
        'client_name',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
