<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

            return response()->json([
                'message' => 'Task created successfully',
                'Task' => $task,
            ], 201);
        } catch (Exception $e) {
            Log::error('Task creation error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to create Task',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    function index()
    {
        try {
            $Tasks = Tasks::getTasks();

            return response()->json([
                'message' => 'Tasks retrieved successfully',
                'Tasks' => $Tasks
            ], 200);
        } catch (Exception $e) {
            Log::error('Tasks retrieval error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to retrieve Tasks',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    function show($id)
    {
        try {
            $Task = Tasks::getTaskByID($id);
            return response()->json([
                'message' => 'Task retrieved By ID successfully',
                'category' => $Task
            ], 200);
        } catch (Exception $e) {
            Log::error('Task retrieval by id error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to retrieve Task by id',
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
            return response()->json([
                'message' => 'Task Updated successfully',
                'Task' => $updatedTask
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
            Tasks::DeleteTask($id);

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
