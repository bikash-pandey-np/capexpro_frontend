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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('pair');
            $table->enum('type', ['crypto', 'stock']);
            $table->boolean('is_active')->default(true);
            $table->string('chart_symbol')->nullable();
            $table->float('min_trade_amount', 15, 2)->nullable();
            $table->float('max_trade_amount', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
