<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use Illuminate\Support\Str;
use App\Models\Currency;

class Withdraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_amount',
        'type',
        'transaction_code',
        'currency_id',
        'requested_by',
        'requested_at',
        'wallet_addr',
        'bank_info',
        'is_approved',
        'status',
        'approved_at',
        'rejected_at',
        'reject_reason',
        'user_remark'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($withdraw) {
            $withdraw->transaction_code = self::generateUniqueCode();
        });
    }
    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }


    public function requestedBy()
    {
        return $this->belongsTo(Customer::class, 'requested_by');
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'WD-' . Str::upper(Str::random(4));
        } while (self::where('transaction_code', $code)->exists());

        return $code;
    }
}
