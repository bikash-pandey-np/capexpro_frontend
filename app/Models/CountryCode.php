<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class CountryCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_name',
        'code',
    ];

    // Define relationship with Customer
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
