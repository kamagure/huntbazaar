<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GuestValidationCodeTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testMustShowInvalidToken()
    {
        $token = "invalidtoken";
        $this->json('GET', 'api/guest/verify/'.$token)
            ->assertStatus(200)
            ->assertJson([
                "success" => false,
                "data" => "Invalid Token Invitation"
            ]);
    }

    public function testMustShowValidToken(){
        $token = "xyx4fph";
        $this->json('GET', 'api/guest/verify/'.$token)
            ->assertStatus(200)
            ->assertJson([
                "success" => false,
                "data" => "Invalid Token Invitation"
            ]);
    }

}
