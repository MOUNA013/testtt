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
            $table->string('sender')->nullable();  // Adds the 'sender' column as a string
        });
    }
    
    public function down()
    {
        Schema::table('factures', function (Blueprint $table) {
            $table->dropColumn('sender');  // Drops the 'sender' column if the migration is rolled back
        });
    }
    
};
