import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { getUsersTask } from "queries/getQueryFns";
import { assignTask } from "queries/postQueryFns";
import { dsUpdateTask } from "queries/patchQueryFns";
import { dsDeleteTask } from "queries/deleteQueryFns";
import AssignTask from "../forms/assignTask";
import UpdateTaskForm from "../forms/udateTask";

const TaskManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddFrom, setShowAddFrom] = useState(false);
  const [showUpdateFrom, setShowUpdateFrom] = useState(false);

  const itemsPerPage = 5;
  const queryClient = useQueryClient();

  const TABLE_HEAD = [
    "Title",
    "Assignee",
    "Status",
    "Priority",
    "Due Date",
    "Actions",
  ];

  const { data: dashboardData = [], isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getUsersTask,
    onError: () => toast.error("Error fetching tasks"),
  });

  const createMutation = useMutation({
    mutationFn: (newTask) => assignTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
      toast.success("Task created successfully");
      handleAddClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedTask) => dsUpdateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
      toast.success("Task updated successfully");
      handleUpdateClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId) => dsDeleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
      toast.success("Task deleted successfully");
    },
  });

  const handleAddOpen = (task = null) => {
    setSelectedTask(task);
    setShowAddFrom(true);
  };

  const handleUpdateOpen = (task = null) => {
    setSelectedTask(task);
    setShowUpdateFrom(true);
  };

  const handleAddClose = () => {
    setShowAddFrom(false);
    setSelectedTask(null);
  };

  const handleUpdateClose = () => {
    setShowUpdateFrom(false);
    setSelectedTask(null);
  };
  const users = [
    ...new Map(dashboardData.map((task) => [task.user_id, task])).values(),
  ];

  // Pagination
  const paginatedTasks = dashboardData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(dashboardData?.length / itemsPerPage);

  return (
    <Card className="p-2 m-5 w-4/5 mx-auto border border-primary bg-primary3">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-primary3"
      >
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Task Management For Users
            </Typography>
          </div>
          <Button
            className="flex items-center gap-3 bg-primary hover:bg-buttonHover"
            size="sm"
            onClick={() => handleAddOpen()}
          >
            <PlusIcon className="h-4 w-4" /> Add Task
          </Button>
        </div>
      </CardHeader>

      <CardBody className="px-0 h-[400px] mb-auto overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-primary text-white">
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 p-4">
                  <Typography
                    variant="small"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTasks?.map((task, index) => {
              const isLast = index === paginatedTasks.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={task?.id}
                  className={
                    index % 2 !== 0
                      ? "bg-second-color"
                      : "bg-transparent-first-color"
                  }
                >
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {task?.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal opacity-70"
                    >
                      {task.user?.name || "Unassigned"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task?.status}
                      className={`capitalize ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.status === "Deferred"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    />
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task?.priority}
                      className={`capitalize ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "Medium"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {new Date(task.due_date).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-2">
                      <Tooltip content="Edit Task">
                        <button
                          variant="text"
                          onClick={() => handleUpdateOpen(task)}
                        >
                          <PencilIcon className="w-5 h-5 text-blue-500" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Delete Task">
                        <button
                          variant="text"
                          onClick={() => deleteMutation.mutate(task?.id)}
                        >
                          <TrashIcon className="w-5 h-5 text-red-500" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>

      {showAddFrom && (
        <AssignTask
          onCancel={() => handleAddClose()}
          onSave={(data) => createMutation.mutate(data)}
          users={users}
        />
      )}

      {showUpdateFrom && (
        <UpdateTaskForm
          data={selectedTask}
          onCancel={() => handleUpdateClose()}
          onSave={(data) =>
            updateMutation.mutate({ id: selectedTask.id, updatedTask: data })
          }
        />
      )}
    </Card>
  );
};

export default TaskManager;
