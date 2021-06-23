<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoriteDesignerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // make designer favorite for guest
        DB::table('guest_favorite_designer')->insert([
            'id_guest' => 1,
            'name_designer' => 'Adidas'
        ]);

        DB::table('guest_favorite_designer')->insert([
            'id_guest' => 1,
            'name_designer' => 'Nike'
        ]);
    }
}
