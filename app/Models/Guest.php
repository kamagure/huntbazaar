<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    //this function is to get token based on id_token from guest
    public function tokens()
    {
        return $this->hasOne(GuestToken::class, 'id','id_token');
    }

    //this function is to get list favorite designer that have been vote by guest
    public function designers()
    {
        return $this->belongsToMany(DesignerFavorite::class, 'guests', 'id', 'id', 'id', 'id_guest');
    }
}
