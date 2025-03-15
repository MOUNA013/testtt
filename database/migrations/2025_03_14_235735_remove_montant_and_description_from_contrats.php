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
    Schema::table('contrats', function (Blueprint $table) {
        $table->dropColumn('montant'); // Supprimer la colonne montant
        $table->dropColumn('description'); // Supprimer la colonne description
    });
}

public function down()
{
    Schema::table('contrats', function (Blueprint $table) {
        // Vous pouvez ajouter à nouveau les colonnes si vous voulez annuler cette migration
        $table->decimal('montant', 10, 2); // Créer à nouveau la colonne montant
        $table->text('description')->nullable(); // Créer à nouveau la colonne description
    });
}

};
