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
            $table->date('payment_date')->nullable();  // Add the column with nullable() if you want it to be optional
        });
    }
    
    public function down()
    {
        Schema::table('factures', function (Blueprint $table) {
            $table->dropColumn('payment_date');  // Rollback the column if the migration is reverted
        });
    }
    
};
