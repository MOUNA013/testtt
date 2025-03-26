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
                $table->string('payment_method')->nullable(); // Add the 'payment_method' column
            });
        }
    
        public function down()
        {
            Schema::table('factures', function (Blueprint $table) {
                $table->dropColumn('payment_method'); // Remove the column if we rollback the migration
            });
        }
    };
    

