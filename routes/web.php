<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\GuestTokenController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
//     Route::get('/guest/list', [GuestController::class, 'index']);
//     Route::get('/guest/add', [GuestController::class, 'create']);
//     Route::post('/guest/invite', [GuestController::class, 'post']);
//     Route::delete('/guest/delete/{id}', [GuestController::class, 'destroy']);
//     Route::get('/guest/favorites/{id}', [GuestController::class, 'detail']);
//     // Route::get('/dashboard', [SettingController::class, 'dashboard'])->name('dashboard');
//     // Route::put('/change-time', [SettingController::class, 'changeTime']);
//     // Route::get('/setting', [SettingController::class, 'setting']);
//     Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
// });

// Route::get('/', [GuestTokenController::class, 'inviteForm'])->middleware('guest.verified');
// Route::put('/guest/fill', [GuestTokenController::class, 'postGuest']);

// // Route::get('/date', [SettingController::class, 'triggerTime']);
// // Route::get('/designer', [SettingController::class, 'designerList']);

// Route::get('/registeration/{code}', [GuestTokenController::class, 'codeRegisteration']);
Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
    Route::view('/dashboard', 'welcome')->name('dashboard');
    Route::view('/setting', 'welcome')->name('setting');
    Route::view('/guest/list', 'welcome');
    Route::view('/guest/favorites/{id}', 'welcome');
    Route::view('/guest/add', 'welcome');
});

Route::view('/', 'welcome')->middleware('guest.verified');
Route::view('/registration', 'welcome');
Route::view('/login', 'welcome')->middleware(['guest:'.config('fortify.guard')])->name('login');
Route::view('/forgot-password', 'welcome')->middleware(['guest:'.config('fortify.guard')])->name('password.request');
Route::view('/reset-password', 'welcome')->middleware(['guest:'.config('fortify.guard')])->name('password.reset');
Route::view('/logout', 'welcome')->name('logout');