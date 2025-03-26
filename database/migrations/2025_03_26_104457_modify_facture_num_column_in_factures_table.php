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
            $table->string('facture_num')->change();  // Changing facture_num to string type
        });
    }
    
    public function down()
    {
        Schema::table('factures', function (Blueprint $table) {
            $table->bigInteger('facture_num')->unsigned()->change(); // Revert to original type if rollback
        });
    }
    
};
