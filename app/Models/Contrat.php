<?php
// Contrat.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contrat extends Model
{
    protected $fillable = [
        'numero_contrat',
        'partners_id',
        'date_debut',
        'date_fin',
        'montant',
        'description',
    ];
   // In Contrat.php (the Contrat model)
// Contrat.php (Model)
public function Partner()
{
    return $this->belongsTo(Partner::class, 'partners_id');
}

}