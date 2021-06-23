<?php

namespace App\Http\Controllers;

use App\Http\Traits\verifyToken;
use App\Models\Designer;
use Exception;
use Illuminate\Http\Request;

class DesignerController extends Controller
{

    //index function
    //this function is used to get all designer list
    //this function will return in json format
    public function index(){
        try{
            $path = public_path('data/designer.json');
            $data = json_decode(file_get_contents($path), true);
            return response()->json([
                "success" => true,
                "data" => $data,
            ],200);
        }catch(Exception $e){
            return response()->json([
                "success" => false,
                "error_message" => $e->getMessage()
            ],500);
        }
    }

}
