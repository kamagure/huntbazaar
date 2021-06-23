<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignerFavorite extends Model
{
    use HasFactory;

    protected $table = 'guest_favorite_designer';

    //this function is to get guest based on id_guest from guest favotite designer
    public function guest()
    {
        return $this->hasOne(Guest::class, 'id', 'id_guest');
    }
}
