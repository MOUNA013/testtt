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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('num_transaction');
            $table->double('montant');
            $table->integer('month');
            $table->string('recu')->nullable();
            $table->string('sender');
            $table->string('payment_method');
            $table->foreignId('verified_by')->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->text('update_justification')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paiments');
    }
};
