<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];
    
    //this function to handle reqeust 
    //to verify if CSRF token has been expired
    public function handle($request, Closure $next)
    {
        if(!Auth::check() && $request->route()->named('logout')) {

            $request->session()->flash('tokenExp', 'Token has been Expired');
            $this->except[] = route('logout');

        }

        // $request->session()->flash('tokenExp', 'Token has been Expired');
        return parent::handle($request, $next);
    }
}
