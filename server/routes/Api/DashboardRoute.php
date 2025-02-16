<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::get('/dashboard/getUsersTask', [DashboardController::class, 'index']);
    Route::post('/dashboard/assignTask', [DashboardController::class, 'assignTask']);
    Route::patch('/dashboard/updateTask/{id}', [DashboardController::class, 'updateTask']);
    Route::delete('/dashboard/deleteTask/{id}', [DashboardController::class, 'deleteTask']);
});
