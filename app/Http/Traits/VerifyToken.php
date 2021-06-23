<?php

namespace App\Http\Traits;

use App\Models\Guest;

trait verifyToken {

    //verifyInvitationToken function
    //this function is used to verify invitaion code
    //this function guest with tokens
    public function verifyInvitationToken($token){
        $data = Guest::whereHas('tokens', function ($query) use ($token) {
            $query->where('token_invitation', $token);
        })->first();
        return $data;
    }
}