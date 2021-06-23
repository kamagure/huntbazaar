<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Models\DesignerFavorite;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{   
    //triggerTime function
    //this function get first setting from database
    //this function will return in json format
    public function triggerTime()
    {
        $data = Setting::all()->first();

        return response()->json($data);
    }

    //dashboard function
    //this function will get designer favourites from database
    //this function will get guests from database
    //this function will return in json format
    public function dashboard()
    {
        $data = Guest::with('tokens')->get();

        $arrDesign = DesignerFavorite::groupBy('name_designer')->select('name_designer', DB::raw('count(*) as total'))->get();

        $response = array(
            "guests" => $data,
            "designers" => $arrDesign
        );
    
        return response()->json($response);
    }


    //change time function
    //this function will change date and time of settings
    //this function will return in json format
    public function changeTime(Request $request)
    {
        // kalo seandainya datetime pada request berniali null
        $request->validate([
            'datetime' => 'required'
        ]);
  
        $data = Setting::all()->first();

        $arr = explode(' ', $data->datetime);
        $clock = $arr[0].' '.$arr[1];

        if ($clock == $request->get('datetime') ) {
            return response()->json([
                "success" => false,
                "message" => "notChange"
            ]);
        } else {
            $data->datetime = $request->get('datetime');
            $data->save();

            return response()->json([
                "success" => true,
                "message" => "update"
            ]);  
        }

    }

    //setting function
    //this function get first setting from database
    //this function will return in json format
    public function setting()
    {
        $data = Setting::all()->first();
        return response()->json([
            "data" => $data
        ]);
    }
}
