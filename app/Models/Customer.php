<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\CountryCode;
use App\Models\Kyc;
use App\Models\Currency;
use App\Models\Deposit;
use App\Models\Withdraw;
use App\Models\Position;

class Customer extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'user_remark',
        'email',
        'password',
        'txt_password',
        'country_code_id',
        'contact_no',
        'customer_code',
        'is_email_verified',
        'is_active',
        'kyc_id',
        'is_kyc_verified',
        'kyc_verified_at',
        'balance_usdt',
        'total_deposit',
        'pending_deposit',
        'total_withdraw',
        'credit_score',
        'currency_id',
        'freezed',
        'traded_amount'
    ];

    protected $casts = [
        'is_email_verified' => 'boolean',
        'is_active' => 'boolean',
        'is_kyc_verified' => 'boolean',
        'kyc_verified_at' => 'datetime',
        'balance_usdt' => 'float',
        'total_deposit' => 'float',
        'pending_deposit' => 'float',
        'total_withdraw' => 'float',
        'credit_score' => 'float',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($customer) {
            $customer->customer_code = self::generateUniqueCustomerCode();
        });
    }

    private static function generateUniqueCustomerCode()
    {
        do {
            $code = 'CUS' . strtoupper(substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 4));
        } while (self::where('customer_code', $code)->exists());

        return $code;
    }

    public function countryCode()
    {
        return $this->belongsTo(CountryCode::class, 'country_code_id');
    }

    public function kyc()
    {
        return $this->belongsTo(Kyc::class, 'kyc_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }
   
    public function deposits()
    {
        return $this->hasMany(Deposit::class, 'deposited_by');
    }

    public function withdraws()
    {
        return $this->hasMany(Withdraw::class, 'requested_by');
    }

    public function positions()
    {
        return $this->hasMany(Position::class, 'traded_by');
    }
}
