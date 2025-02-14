<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|min:3|max:30',
                'email' => 'required|email|min:3|max:40',
                'password' => 'required|min:6|max:30',
            ]);

            if (User::checkEmail($validatedData['email'])) {
                return response()->json(['Email Already Exists'], 400);
            };
            $user = User::register($validatedData);
            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

            return response()->json(['message' => 'User Added Successfully', 'access_token' => $token], 201);
        } catch (Exception $e) {
            Log::error('Error thorough registration process' . $e->getMessage());

            // Return error based on server environment [Production or development]
            return response()->json([
                'error' => 'Failed to register',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function login(Request $req)
    {
        try {
            $validated = $req->validate([
                'email' => 'required|email|min:3|max:40',
                'password' => 'required|min:6|max:30',
            ]);

            $user = User::checkEmail($validated['email']);
            if (!$user || !User::checkPassword($validated['password'], $user->password)) {
                return response()->json(['message' => 'Invalid Email or Password'], 400);
            }

            $user->tokens->each->delete();
            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

            return response()->json(['message' => 'LoggedIn Successfully', 'access_token' => $token], 200);
        } catch (Exception $e) {
            Log::error('Error thorough log in process' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to log in',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function show()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }
           return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role_id
            ]
        ], 200);
        } catch (Exception $e) {
            Log::error('Error thorough getting user data process' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to get user data',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

}
