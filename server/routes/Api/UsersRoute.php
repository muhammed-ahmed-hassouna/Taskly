<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['throttle:global'])->post('/user/register', [UserController::class, 'register'])->name('register');
Route::middleware(['throttle:global'])->post('/user/login', [UserController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum', 'role:2', 'throttle:global'])->group(function () {
    Route::get('/user/get', [UserController::class, 'show']);
});
