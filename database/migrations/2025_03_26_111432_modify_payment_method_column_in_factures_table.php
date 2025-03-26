<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Ensure no NULL values before applying the change
        DB::table('factures')
            ->whereNull('payment_method')
            ->update(['payment_method' => 'Unknown']); // Replace with a default value

        Schema::table('factures', function (Blueprint $table) {
            $table->string('payment_method')->nullable(false)->change(); // Remove the 'nullable' constraint
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
            $table->string('payment_method')->nullable()->change(); // Add the 'nullable' constraint back
        });
    }
};
