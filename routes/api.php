<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SettingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DesignerController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\GuestTokenController;
// use App\Http\Controllers\SettingController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/guest/list', [GuestController::class, 'index']);
    Route::get('/guest/favorites/{id}', [GuestController::class, 'detail']);
    Route::delete('/guest/delete/{id}', [GuestController::class, 'destroy']);
    Route::post('/guest/invite', [GuestController::class, 'post']);
    Route::get('/dashboard', [SettingController::class, 'dashboard'])->name('dashboard');
    Route::get('/setting', [SettingController::class, 'setting']);
    Route::put('/change-time', [SettingController::class, 'changeTime']);
});

Route::get('/check/auth', function () {
    return response()->json([
        'is_auth' => \Auth::check()
    ]);
});

Route::put('/guest/fill', [GuestTokenController::class, 'postGuest']);
Route::get('/date', [SettingController::class, 'triggerTime']);
Route::get('/designer', [DesignerController::class, 'index']);
Route::get('/guest/verify/{id}', [GuestController::class, 'verify']);
Route::put('/guest/update/{id}', [GuestController::class, 'update']);
