<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/user/register', [UserController::class, 'register'])->name('register');
Route::post('/user/login', [UserController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum', 'role:2'])->group(function () {
    Route::get('/user/get', [UserController::class, 'show']);
});
