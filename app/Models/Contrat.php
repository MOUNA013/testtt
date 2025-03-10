<?php
// Contrat.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
   
public function Partner()
{
    return $this->belongsTo(Partner::class, 'partners_id');
}
public function payments(): HasMany
{
    return $this->hasMany(Payment::class);
}
}