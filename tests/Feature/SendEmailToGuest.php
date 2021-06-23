<?php

namespace Tests\Feature;

use App\Mail\InviteGuest;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SendEmailToGuest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testMustValidateEmailAddress()
    {
        $requestData = ['email' => 'malika@mailtrap.io'];

        $this->json('POST', 'api/guest/invite', $requestData, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson([
                "success" => false,
                "message" => "An email address you enter already on the Guest List",
            ]);
    }

    public function testMustSuccessSendEmail()
    {
        $requestData = ['email' => 'foo@mailtrap.io'];

        $this->json('POST', 'api/guest/invite', $requestData, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'An email has been sent to your adrress'
            ]);
    }
}
