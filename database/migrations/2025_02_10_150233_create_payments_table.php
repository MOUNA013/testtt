<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // Utilisateur associé au paiement
            $table->unsignedBigInteger('contrat_id')->nullable(); // Contrat associé au paiement
            $table->decimal('montant', 10, 2); // Montant du paiement
            $table->date('payment_date'); // Date du paiement
            $table->string('payment_method'); // Méthode de paiement (ex: carte, virement, etc.)
            $table->string('num_transaction')->nullable(); // Numéro de transaction
            $table->boolean('recu')->default(false); // Paiement reçu ou non
            $table->string('month')->nullable(); // Mois concerné par le paiement
            $table->string('sender')->nullable(); // Expéditeur du paiement
            $table->timestamp('verified_at')->nullable(); // Date de validation du paiement
            $table->unsignedBigInteger('verified_by')->nullable(); // Utilisateur qui a validé le paiement
            $table->unsignedBigInteger('updated_by')->nullable(); // Utilisateur qui a mis à jour le paiement
            $table->text('update_justification')->nullable(); // Justification de la mise à jour
            $table->text('notes')->nullable(); // Notes supplémentaires
            $table->timestamps();
            $table->softDeletes(); // Suppression douce

            // Clés étrangères
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('contrat_id')->references('id')->on('contrats')->onDelete('set null');
            $table->foreign('verified_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}