<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('currency_id')->constrained('currencies');
            $table->longText('deposit_instruction');
            $table->boolean('is_active')->default(true);
            $table->string('wallet_addr')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('acc_no')->nullable();
            $table->string('acc_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
