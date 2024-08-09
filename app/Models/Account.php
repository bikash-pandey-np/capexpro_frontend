<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Currency;
use App\Models\Deposit;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'currency_id',
        'deposit_instruction',
        'is_active',
        'wallet_addr',
        'bank_name',
        'acc_no',
        'acc_name',
    ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function deposits()
    {
        return $this->hasMany(Deposit::class);
    }
}