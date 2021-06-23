<?php

namespace Tests\Feature;

use App\Models\DesignerFavorite;
use App\Models\Guest;
use App\Models\GuestToken;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use ReallySimpleJWT\Token;
use Tests\TestCase;

class GuestVoteTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use WithFaker;

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function testMustShowRegistrationCode()
    {

        // generate random string for token and register code
        $userId = 99;
        $secret = 'sec!ReT423*&';
        $expiration = time() * 3600;
        $issuer = 'HuntBazzar';
        $token = Token::create($userId, $secret, $expiration, $issuer);
        
        $guestToken = new GuestToken();
        $guestToken->token_invitation = $token;
        $guestToken->register_code = $this->generateRandomString(10);
        $guestToken->status = 'FINISH';
        $guestToken->save();

        $email = $this->generateRandomString(4)."@mailtrap.io";
        $guest = new Guest();
        $guest->email = $email;
        $guest->id_token = $guestToken->id;
        $guest->save();

        $listDesigner = ["Adidas"];
        foreach ($listDesigner as $value) {
            $designFav = new DesignerFavorite();
            $designFav->id_guest = $guest->id;
            $designFav->name_designer = $value;
            $designFav->save();
        }
        $tokenGuest = GuestToken::where('token_invitation', $token)->first();
        $this->assertEquals($tokenGuest->registration_code, $guestToken->registration_code);

    }

}
