<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestToken extends Model
{
    use HasFactory;

    protected $table = 'guest_tokens';
}

