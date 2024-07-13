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
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->float('request_amount', 15, 2);
            $table->string('transaction_code')->unique();
            $table->foreignId('currency_id')->constrained('currencies');
            $table->string('type');
            $table->foreignId('requested_by')->constrained('customers');
            $table->dateTime('requested_at');
            $table->string('wallet_addr')->nullable();
            $table->string('bank_info')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->enum('status', ['Processing', 'Approved', 'Rejected']);
            $table->dateTime('approved_at')->nullable();
            $table->dateTime('rejected_at')->nullable();
            $table->string('reject_reason')->nullable();
            $table->longText('user_remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraws');
    }
};


