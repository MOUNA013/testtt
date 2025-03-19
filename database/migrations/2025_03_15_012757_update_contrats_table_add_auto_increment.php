<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateContratsTableAddAutoIncrement extends Migration
{
    public function up()
    {
        Schema::table('contrats', function (Blueprint $table) {
            $table->increments('numero_contrat')->change();
        });
    }

    public function down()
    {
        Schema::table('contrats', function (Blueprint $table) {
            // Revenir à l'état précédent si nécessaire
            $table->integer('numero_contrat')->change();
        });
    }
}