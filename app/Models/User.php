<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relation with payments (A user can have many payments)
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // Relation with factures (A user can have many factures through payments)
    public function factures()
    {
        return $this->hasManyThrough(Facture::class, Payment::class);
    }

    // Relation with contrats (A user can have many contrats)
    public function contrats()
    {
        return $this->hasMany(Contrat::class);
    }

    // Relation with payments that were verified by the user
    public function verifiedPayments()
    {
        return $this->hasMany(Payment::class, 'verified_by');
    }

    // Relation with payments that were updated by the user
    public function updatedPayments()
    {
        return $this->hasMany(Payment::class, 'updated_by');
    }
}
