<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContratsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contrats', function (Blueprint $table) {
            // Colonne ID (clé primaire)
            $table->id();

            // Colonne pour le numéro de contrat (unique)
            $table->string('numero_contrat')->unique();

            // Clé étrangère pour l'utilisateur (user_id)
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Supprime les contrats si l'utilisateur est supprimé

            // Colonne pour le partenaire (partners_id)
            $table->unsignedBigInteger('partners_id');
            $table->foreign('partners_id')
                  ->references('id')
                  ->on('partners')
                  ->onDelete('cascade'); // Supprime les contrats si le partenaire est supprimé

            // Colonnes pour les dates de début et de fin
            $table->date('date_debut');
            $table->date('date_fin');

            // Colonne pour le montant
            $table->decimal('montant', 10, 2); // 10 chiffres au total, 2 décimales

            // Colonne pour la description (nullable)
            $table->text('description')->nullable();

            // Colonnes pour les timestamps (created_at et updated_at)
            $table->timestamps();

            // Colonne pour le soft delete (deleted_at)
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
        // Supprimer la table `contrats`
        Schema::dropIfExists('contrats');
    }
}