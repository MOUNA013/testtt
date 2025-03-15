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

            $table->bigIncrements('numero_contrat');  

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
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *s
     * @return void
     */
    public function down()
    {
        // Supprimer la table `contrats`
        Schema::dropIfExists('contrats');
    }
}