<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $message;
    public $action;
    public $task;

    /**
     * Create a new event instance.
     */
    public function __construct($userId, $action, $task)
    {
        $this->userId = $userId;
        $this->action = $action;
        $this->task = $task;
        $this->message = "Task {$action}: " . $task->title;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->userId);
    }

    public function broadcastWith()
    {
        return [
            'action' => $this->action,
            'task' => $this->task,
            'message' => $this->message
        ];
    }
}
