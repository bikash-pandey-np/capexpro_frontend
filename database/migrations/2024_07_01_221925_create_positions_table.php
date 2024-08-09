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
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->float('amount', 15, 2);
            $table->string('symbol');
            $table->enum('type', ['long', 'short']);
            $table->float('entry_price', 15, 2);
            $table->boolean('is_crypto')->default(true);
            $table->string('identifier')->unique();
            $table->foreignId('traded_by')->constrained('customers');
            $table->dateTime('traded_datetime');
            $table->integer('trade_duration');
            $table->float('trade_close_price', 15, 2)->nullable();
            $table->dateTime('will_close_at')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->enum('outcome', ['Positive', 'Negative'])->nullable();
            $table->string('status')->default('Not Settled');
            $table->decimal('pnl', 10, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
