<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class TasksController extends Controller
{
    function store(Request $request)
    {
        try {
            $validateData = $request->validate([
                'title' => 'required|string|max:255|min:3',
                'description' => 'required|string|max:1000|min:10',
                'status' => 'required|in:In progress,Completed,Deferred,Open',
                'priority' => 'required|in:High,Medium,Low',
                'due_date' => 'nullable|date|after_or_equal:today',
            ]);

            $user_id = Auth::user()->id;
            $validateData['user_id'] = $user_id;

            $task = Tasks::createTask($validateData);

            Cache::forget("user_tasks_{$user_id}");

            return response()->json([
                'message' => 'Task created successfully',
                'Task' => [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'status' => $task->status,
                    'priority' => $task->priority,
                    'due_date' => $task->due_date,
                ],
            ], 201);
        } catch (Exception $e) {
            Log::error('Task creation error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to create Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    function getUserTasks()
    {
        try {
            $userId = Auth::id();

            $Task = Cache::remember("user_tasks_{$userId}", 3600, function () use ($userId) {
                return Tasks::getUserTasks($userId);
            });
            return response()->json([
                'message' => 'User Task retrieved successfully',
                'Tasks' => $Task
            ], 200);
        } catch (Exception $e) {
            Log::error('User Task retrieval error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to retrieve User Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    function update(Request $request, $id)
    {
        try {
            $validateData = $request->validate([
                'title' => 'nullable|string|min:3|max:255',
                'description' => 'nullable|string|min:10|max:1000',
                'status' => 'nullable|in:In progress,Completed,Deferred,Open',
                'priority' => 'nullable|in:High,Medium,Low',
                'due_date' => 'nullable|date|after_or_equal:today',
            ]);

            $updatedTask = Tasks::updateTask($id, $validateData);

            Cache::forget("user_tasks_{$updatedTask->user_id}");

            return response()->json([
                'message' => 'Task Updated successfully',
                'Task' => [
                    'id' => $updatedTask->id,
                    'title' => $updatedTask->title,
                    'description' => $updatedTask->description,
                    'status' => $updatedTask->status,
                    'priority' => $updatedTask->priority,
                    'due_date' => $updatedTask->due_date,
                ]
            ], 200);
        } catch (Exception $e) {
            Log::error('Task Update error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'error' => 'Failed to Update Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    function destroy($id)
    {
        try {
            $task = Tasks::DeleteTask($id);
            $user_id = $task->user_id;

            Cache::forget("user_tasks_{$user_id}");

            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully',
            ], 200);
        } catch (Exception $e) {
            Log::error('Task delete error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'error' => 'Failed to delete Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }
}
