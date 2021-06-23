<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Guest;
use App\Mail\InviteGuest;
use App\Models\GuestToken;
use ReallySimpleJWT\Token;
use Illuminate\Http\Request;
use App\Models\DesignerFavorite;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\InviteRequest;
use App\Http\Traits\verifyToken;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class GuestController extends Controller
{
    use verifyToken;  //trait to verify guest token

    //index function
    //this function is used to get list guest with tokens
    //this function will return in json format
    public function index()
    {
        $data = Guest::with('tokens')->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function create()
    {
        return view('dashboard.guest.create');
    }


    //post function
    //this function is used to invite guest
    //this function is used to get create guest and send email to guest
    //this function will return in json format
    public function post(InviteRequest $request)
    {

        $valGuest = Guest::where('email', $request->get('email'))->first();
        if ($valGuest) {
            return response()->json([
                'success' => false,
                'message' => 'An email address you enter already on the Guest List'
            ]);
        }

        $userId = 99;
        $secret = 'sec!ReT423*&';
        $expiration = time() * 3600;
        $issuer = 'HuntBazzar';

        $token = Token::create($userId, $secret, $expiration, $issuer);

        $guestToken = new GuestToken;
        $guestToken->token_invitation = $token;
        $guestToken->save();

        $guest = new Guest;
        $guest->id_token = $guestToken->id;
        $guest->email = $request->get('email');
        $guest->save();

        $arr = [
            'token' => $guestToken->token_invitation,
            'email' => $guest->email
        ];

        try {
            Mail::to($request->get('email'))->send(new InviteGuest($arr));
            return response()->json([
                'success' => true,
                'message' => 'An email has been sent to your adrress'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    //destroy function
    //this function is used to delete guest
    //this function will return in json format
    public function destroy($id)
    {
        $data = Guest::findOrFail($id);
        $data->delete();
        if ($data) {
            redirect('/guest/list');
            return response()->json([
                'success' => true,
                'message' => 'The data has been successful deleted'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data is nowhere to be found'
            ]);
        }
    }

    //detail function
    //this function is used to get guest designer favourite by id guest
    //this function will return in json format
    public function detail($id)
    {
        $data = Guest::with('designers', 'tokens')->where('id', $id)->get();
        $response = array(
            'data' => $data
        );

        return json_encode($response);
    }

    //verify function
    //this function is used to get verify guest token
    //this function will return in json format
    public function verify($id)
    {
        try {

            $data = $this->verifyInvitationToken($id);
            $status = true;
            if ($data === null) {
                $status = false;
                $data = "Invalid Token Invitation";
            }

            return response()->json([
                "success" => $status,
                "data" => $data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "error_message" => $e->getMessage()
            ], 500);
        }
    }

    //update function
    //this function is used to update guest
    //this function will return in json format
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email|unique:guests,email,".$id,
            "birthday" => "date",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 400);
        }

        try {
            DB::beginTransaction();

            $guest = Guest::find($id);
            $guest->email = $request->input('email');
            $guest->name = $request->input('name');
            $guest->birthday = $request->input('birthday');
            $guest->save();
            DB::commit();
            return response()->json([
                "success" => true,
                "message" => "Guest successfully updated"
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                "success" => false,
                "error_message" => $e->getMessage()
            ], 500);
        }
    }
}
