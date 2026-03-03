<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    // This allows Laravel to "mass assign" these fields from your form
    protected $fillable = [
        'user_id',
        'description',
        'amount',
        'type',
        'category',
        'entry_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}