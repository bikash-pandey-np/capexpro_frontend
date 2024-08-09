<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class Kyc extends Model
{
    use HasFactory;

    protected $fillable = [
        'doc_type',
        'doc_front_img',
        'doc_back_img',
        'user_img',
        'submitted_at',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'kyc_id');
    }
}