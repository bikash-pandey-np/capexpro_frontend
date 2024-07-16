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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('txt_password');
            $table->foreignId('country_code_id')->constrained('country_codes');
            $table->string('contact_no');
            $table->string('customer_code')->unique();
            $table->boolean('is_email_verified')->default(false);
            $table->longText('user_remark')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('kyc_id')->nullable()->constrained('kycs');
            $table->boolean('is_kyc_verified')->default(false);
            $table->dateTime('kyc_verified_at')->nullable();
            $table->float('balance_usdt', 15, 2)->default(0.00);
            $table->float('total_deposit', 15, 2)->default(0.00);
            $table->float('pending_deposit', 15, 2)->default(0.00);
            $table->float('total_withdraw', 15, 2)->default(0.00);
            $table->float('freezed', 15, 2)->default(0.00);
            $table->float('traded_amount', 15, 2)->default(0.00);
            $table->float('credit_score', 15, 2)->default(0.00);
            $table->foreignId('currency_id')->constrained('currencies');
            $table->rememberToken();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
