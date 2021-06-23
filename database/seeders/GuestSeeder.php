<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // make guest seeder
        DB::table('guests')->insert([
            'name' => 'Malika Vondro',
            'email' => 'malika@email.com',
            'birthday' => Carbon::parse('2000-01-01'),
            'id_token' => 1
        ]);
    }
}
