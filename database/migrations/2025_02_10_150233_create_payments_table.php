<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->engine = 'InnoDB'; 
            $table->id();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');

            $table->unsignedBigInteger('numero_contrat')->nullable();

          

            // Autres colonnes
            $table->decimal('montant', 10, 2);
            $table->date('payment_date');
            $table->string('payment_method');
            $table->string('num_transaction')->nullable();
            $table->boolean('recu')->default(true);
            $table->string('month')->nullable();
            $table->string('sender')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->unsignedBigInteger('verified_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->text('update_justification')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Clés étrangères supplémentaires
            $table->foreign('verified_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}