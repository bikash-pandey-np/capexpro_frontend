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
        Schema::create('deposits', function (Blueprint $table) {
            $table->id();
            $table->float('request_amount', 15, 2);
            $table->foreignId('currency_id')->constrained('currencies');
            $table->string('transaction_code')->unique();
            $table->foreignId('deposited_by')->constrained('customers');
            $table->foreignId('account_id')->nullable()->constrained('accounts');
            $table->enum('type', ['cash', 'account']);
            $table->boolean('is_approved')->default(false);
            $table->enum('status', ['Processing', 'Approved', 'Rejected']);
            $table->float('approved_amount', 15, 2)->nullable();
            $table->string('reject_reason')->nullable();
            $table->dateTime('requested_at');
            $table->dateTime('approved_at')->nullable();
            $table->dateTime('rejected_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposits');
    }
};
