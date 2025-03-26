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
            $table->string('facture_num')->change();  // Change the column type to string
        });
    }
    
    public function down()
    {
        Schema::table('factures', function (Blueprint $table) {
            $table->integer('facture_num')->change();  // Rollback to integer type if needed
        });
    }
    
};
