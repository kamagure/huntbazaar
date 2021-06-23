<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Guest;
use App\Models\GuestToken;
use Illuminate\Http\Request;

class GuestValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    //this function used to handle incoming request 
    //to verify email and token from guest invitation link that send through email
    public function handle(Request $request, Closure $next)
    {
        $email = $request->query('email');
        $token = $request->query('token');

        $emailGuest = Guest::where('email', $email)->first();
        $tokenGuest = GuestToken::where('token_invitation', $token)->first();

        if (!$emailGuest || !$email || !$tokenGuest || !$token) {
            return redirect('/login');
        } else {
            if ($tokenGuest->register_code) {
                return redirect("/registration?code=$tokenGuest->register_code");
            }
            return $next($request);
        }
    }
}
