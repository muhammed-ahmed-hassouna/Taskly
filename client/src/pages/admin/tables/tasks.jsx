import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { getUsersTask } from "queries/getQueryFns";
import { motion, AnimatePresence } from "framer-motion";
import Label from "components/ui/custom-inputs/Label";
import ErrorFormik from "components/ui/ErrorFormik";
import CustomInput from "components/ui/custom-inputs/CustomInput";
import CustomTextarea from "components/ui/custom-inputs/CustomTextarea";
import FilledButton from "components/ui/buttons/FilledButton";
import { FiSave } from "react-icons/fi";
import { assignTask } from "queries/postQueryFns";
import { addTaskSchema } from "utils/forms-schemas";
import { dsUpdateTask } from "queries/patchQueryFns";
import { dsDeleteTask } from "queries/deleteQueryFns";
import AssignTask from "../forms/assignTask";
import UpdateTaskForm from "../forms/udateTask";

const TaskManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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
      handleDialogClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedTask) => dsUpdateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
      toast.success("Task updated successfully");
      handleDialogClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId) => dsDeleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
      toast.success("Task deleted successfully");
    },
  });

  const handleDialogOpen = (task = null) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
              Task Management
            </Typography>
          </div>
          <Button
            className="flex items-center gap-3 bg-primary hover:bg-buttonHover"
            size="sm"
            onClick={() => handleDialogOpen()}
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
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    />
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task?.priority}
                      className={`capitalize ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
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
                          onClick={() => handleDialogOpen(task)}
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

      {/* Task Dialog */}
      {openDialog && (
        <AssignTask
          onCancel={() => handleDialogClose()}
          onSave={(data) => createMutation.mutate(data)}
          users={users}
        />
      )}

      {openDialog && (
        <UpdateTaskForm
          data={selectedTask}
          onCancel={() => handleDialogClose()}
          onSave={(data) =>
            updateMutation.mutate({ id: selectedTask.id, updatedTask: data })
          }
        />
      )}
    </Card>
  );
};

export default TaskManager;
