<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->integer('facture_num')->nullable();

            // Clé étrangère vers la table partenaires
            $table->foreignId('partner_id')->constrained('partners')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('cascade');
            // Autres colonnes
            $table->string('code')->nullable(); 
            $table->string('désignation')->nullable(); 
            $table->string('mode_paiement')->nullable(); 
            $table->string('emetteur')->nullable(); 
            $table->decimal('prix', 8, 2)->nullable(); 

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factures');
    }
};
