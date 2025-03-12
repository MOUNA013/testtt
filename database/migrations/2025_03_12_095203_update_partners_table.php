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
    public function up(): void
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->string('Responsable')->after('name');
            $table->string('Tele_Responsable')->after('Responsable');
            $table->dropColumn('phone');
        });
    }

        public function down(): void
        {
            Schema::table('partners', function (Blueprint $table) {
                $table->string('phone')->after('email');
                $table->dropColumn(['Responsable', 'Tele_Responsable']);
            });
        }

};
