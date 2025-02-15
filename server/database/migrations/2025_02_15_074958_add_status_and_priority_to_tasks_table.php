<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('is_completed');

            $table->enum('status', ['In progress', 'Completed', 'Deferred', 'Open'])
                ->default('Open')
                ->after('description')
                ->index();

            $table->enum('priority', ['High', 'Medium', 'Low'])
                ->default('Medium')
                ->after('status')
                ->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->boolean('is_completed')->default(false);
            $table->dropColumn(['status', 'priority']);
        });
    }
};
