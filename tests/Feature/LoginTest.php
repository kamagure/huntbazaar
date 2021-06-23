<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testMustEnterEmailAndPassword()
    {
        $this->json('POST', 'login')
            ->assertStatus(422)
            ->assertJson([
                "message" => "The given data was invalid.",
                "errors" => [
                    'email' => ["The email field is required."],
                    'password' => ["The password field is required."]
                ],
            ]);
    }
    
    public function testSuccessfulLogin()
    {
        $loginData = ['email' => 'admin@admin.com', 'password' => 'admin123'];

        $this->json('POST', 'login', $loginData, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure([
                "two_factor",
            ]);

        $this->assertAuthenticated();
    }

}
