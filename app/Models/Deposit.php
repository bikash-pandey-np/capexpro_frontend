<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Account;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_amount',
        'transaction_code',
        'deposited_by',
        'account_id',
        'type',
        'is_approved',
        'status',
        'approved_amount',
        'reject_reason',
        'requested_at',
        'approved_at',
        'rejected_at',
        'currency_id'
    ];
    public function currency()
    {
        return $this->belongsTo(\App\Models\Currency::class);
    }

 

    public function depositedBy()
    {
        return $this->belongsTo(Customer::class, 'deposited_by');
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($deposit) {
            $deposit->transaction_code = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'DEP' . strtoupper(substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 4));
        } while (self::where('transaction_code', $code)->exists());

        return $code;
    }
}
