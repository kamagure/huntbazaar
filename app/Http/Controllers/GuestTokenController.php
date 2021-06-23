<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\Setting;
use App\Mail\GuestFilled;
use App\Models\GuestToken;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\DesignerFavorite;
use App\Http\Requests\GuestRequest;
use Illuminate\Support\Facades\Mail;

class GuestTokenController extends Controller
{
    //postGuest function
    //this function is used to show update guest
    //this function also to generate registration code for guest
    //this function return redirect to registration endpoint
    public function postGuest(GuestRequest $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
                'birthday' => 'required',
                'states' => 'required'
            ]);
    
            $dateSetting = Setting::all()->first();
            $now = Carbon::now();
            if ( $now >= $dateSetting) {
                return response()->json([
                    'success' => false,
                    'message' => "Not found"
                ], 404);
            }
    
            function generateRandomString($length = 10) {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < $length; $i++) {
                    $randomString .= $characters[rand(0, $charactersLength - 1)];
                }
                return $randomString;
            }
    
            $first_name = $request->get('first_name');
            $last_name = $request->get('last_name');
            $full_name = $first_name . ' ' . $last_name;
    
            $email = $request->get('email');
            $guest = Guest::where('email', $email)->first();
            $guest->name = $full_name;
            $guest->birthday = $request->get('birthday');
            $guest->save();
    
            $listDesigner = $request->get('states');
            foreach ($listDesigner as $value) {
                $designFav = new DesignerFavorite;
                $designFav->id_guest = $guest->id;
                $designFav->name_designer = $value;
                $designFav->save();
            }
    
            $id_token = $guest->id_token;
            $guestToken = GuestToken::findOrFail($id_token);
            $guestToken->register_code = generateRandomString(10);
            $guestToken->status = 'FINISH';
            $guestToken->save();
    
            $delay = now()->addMinutes(10);
            Mail::to($email)->later($delay, new GuestFilled($guest));
    
            return response()->json([
                "success" => true,
                "register_code" => $guestToken->register_code,
                "message" => "Guest successfully updated"
            ], 200);   
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "error_message" => $e->getMessage()
            ], 500);
        }
    }
}
