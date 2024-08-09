<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\Customer;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'symbol',
        'rate_per_usdt',
    ];

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'currency_id');
    }
}