<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facture extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'factures';


    protected $fillable = [
        'facture_num', 'partner_id', 'user_id', 'payment_id', 'code', 
        'désignation', 'responsable_de_point', 'mode_paiement', 'emetteur', 'prix'
    ];
    public function partner()
    {
        return $this->belongsTo(Partner::class,'partner_id');
    }

    public function User()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function payment()
{
    return $this->belongsTo(Payment::class, 'payment_id');
}

    public function factureable()
    {
        return $this->morphTo();
    }

}
