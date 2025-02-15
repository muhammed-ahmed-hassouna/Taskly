<?php

use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum', 'role:2'])->group(function () {
    Route::get('/tasks/get', [TasksController::class, 'index']);
    Route::get('/tasks/getUserTask', [TasksController::class, 'getUserTasks']);
    Route::post('/tasks/create', [TasksController::class, 'store']);
    Route::patch('/tasks/update/{id}', [TasksController::class, 'update']);
    Route::delete('/tasks/delete/{id}', [TasksController::class, 'destroy']);
});
