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
                $table->string('Nombre_des_seances')->default(1)->after('partners_id');
                $table->string('Nombre_des_etudiants')->after('Nombre_des_seances');
                $table->string('Prix_par_seances')->after('Nombre_des_etudiants');
                $table->string('Prix_totale')->after('Prix_par_seances');

              
            });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contrats', function (Blueprint $table) {
            $table->dropColumn(columns: ['numero_contrat', 'montant','descreption']);        });
    }
};
