<?php
// Contrat.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contrat extends Model
{
    use HasFactory;

    use HasFactory;

    protected $primaryKey = 'numero_contrat';
    public $incrementing = true; // Assurez-vous que cette ligne est présente
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'partners_id',
        'Nombre_des_seances',
        'Nombre_des_etudiants',
        'Prix_par_seances',
        'Prix_totale',
        'date_debut',
        'date_fin',
    ];
    

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'partners_id');
    }
    
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
