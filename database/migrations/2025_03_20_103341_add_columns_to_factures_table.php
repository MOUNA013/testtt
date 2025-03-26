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
    Schema::table('factures', function (Blueprint $table) {
        // Add new columns for article, code, prix, and mode_paiement
        $table->string('article')->nullable();
        $table->string('code')->nullable();
        $table->decimal('prix', 10, 2)->nullable();
        $table->string('mode_paiement')->nullable();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('factures', function (Blueprint $table) {
            //
        });
    }
};
