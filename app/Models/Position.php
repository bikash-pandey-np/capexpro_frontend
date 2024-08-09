<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;
use App\Models\Customer;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'type',
        'entry_price',
        'identifier',
        'traded_by',
        'traded_datetime',
        'trade_duration',
        'trade_close_price',
        'will_close_at',
        'closed_at',
        'is_crypto',
        'symbol',
        'outcome',
        'status',
        'pnl',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

 
    public function tradedBy()
    {
        return $this->belongsTo(Customer::class, 'traded_by');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($position) {
            $position->identifier = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'TRD' . strtoupper(substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 4));
        } while (self::where('identifier', $code)->exists());

        return $code;
    }
}
