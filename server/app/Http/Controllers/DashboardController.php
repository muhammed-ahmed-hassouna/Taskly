<?php

namespace App\Http\Controllers;

use App\Events\TaskNotification;
use App\Models\Tasks;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $tasks = Cache::remember('users_tasks', 3600, function () {
                return Tasks::getUsersTasks();
            });

            return response()->json([
                'message' => 'Tasks retrieved successfully',
                'Tasks' => $tasks
            ], 200);
        } catch (Exception $e) {
            Log::error('User Tasks retrieval error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to retrieve User Tasks',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function getAllUsers()
    {
        try {

            $users = User::getAllUsers();

            return response()->json([
                'message' => 'Users retrieved successfully',
                'Users' => $users
            ], 200);
        } catch (Exception $e) {
            Log::error('Users retrieval error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to retrieve Users',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function assignTask(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id'     => 'required|exists:users,id',
                'title' => 'required|string|max:255|min:3',
                'description' => 'required|string|max:1000|min:10',
                'status' => 'required|in:In progress,Completed,Deferred,Open',
                'priority' => 'required|in:High,Medium,Low',
                'due_date' => 'nullable|date|after_or_equal:today',
            ]);

            $task = Tasks::createTask($validatedData);

            Cache::forget('users_tasks');
            Cache::forget("user_tasks_{$validatedData['user_id']}");

            event(new TaskNotification($validatedData['user_id'], 'assigned', $task));

            return response()->json([
                'message' => 'Tasks assigned successfully',
                'Tasks' => $task
            ], 200);
        } catch (Exception $e) {
            Log::error('Assign Task error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to Assign the Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function updateTask(Request $request, $taskID)
    {
        try {
            $validatedData = $request->validate([
                'user_id'     => 'required|exists:users,id',
                'title' => 'nullable|string|min:3|max:255',
                'description' => 'nullable|string|min:10|max:1000',
                'status' => 'nullable|in:In progress,Completed,Deferred,Open',
                'priority' => 'nullable|in:High,Medium,Low',
                'due_date' => 'nullable|date|after_or_equal:today',
            ]);

            $task = Tasks::updateTask($taskID, $validatedData);

            Cache::forget("user_tasks_{$validatedData['user_id']}");
            event(new TaskNotification($validatedData['user_id'], 'updated', $task));

            return response()->json([
                'message' => 'Tasks updated successfully',
                'Tasks' => $task
            ], 200);
        } catch (Exception $e) {
            Log::error('Assign Task error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to Assign Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function deleteTask($taskID)
    {
        try {

            $task = Tasks::findOrFail($taskID);
            event(new TaskNotification($task->user_id, 'deleted', $task));
            Tasks::deleteTask($taskID);

            Cache::forget("user_tasks_{$task->user_id}");

            return response()->json([
                'message' => 'Task deleted successfully'
            ], 200);
        } catch (Exception $e) {
            Log::error('Delete Task error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to delete task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }
}
