<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Position;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'pair',
        'type',
        'is_active',
        'chart_symbol',
        'min_trade_amount',
        'max_trade_amount',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Define relationship with Position
    public function positions()
    {
        return $this->hasMany(Position::class);
    }
}
