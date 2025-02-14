<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tasks extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_completed',
        'due_date',
    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function createTask($task)
    {
        try {
            return self::create($task);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getTasks()
    {
        try {
            return self::get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getTaskByID($id)
    {
        try {
            return self::findorfail($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function updateTask($id, $data)
    {
        try {
            $task = self::findorfail($id);
            $task->update($data);
            return $task;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deleteTask($id)
    {
        try {
            return self::findorfail($id)->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getUsersTasks()
    {
        try {
            return self::with('user')->get();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
