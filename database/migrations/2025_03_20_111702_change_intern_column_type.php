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
        $table->string('intern')->change();  // Change to string if it's currently an integer
    });
}

public function down()
{
    Schema::table('factures', function (Blueprint $table) {
        $table->integer('intern')->change();  // Rollback to integer type if needed
    });
}

};
