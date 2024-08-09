<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'user_agent',
        'activity',
        'performed_by'
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->performed_by = Auth::id();
    }
}
