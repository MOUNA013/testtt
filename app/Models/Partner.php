<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'Responsable',
        'Tele_Responsable',
        'email',
        'address',
        'company_name',
        
    ];
    public function contrats(): HasMany
    {
        return $this->hasMany(Contrat::class);
    }
}
