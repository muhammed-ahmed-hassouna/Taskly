<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin2@gmail.com',
            'password' => Hash::make('Admin123#@'),
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);

        // Create Regular User
        User::create([
            'name' => 'User One',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('User123#@'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
    }
}
