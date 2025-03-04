import Todo from "./todo";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePublicContext } from "providers/PublicContextProvider";
import { getUserTask } from "queries/getQueryFns";
import { createTask } from "queries/postQueryFns";
import { toast } from "react-toastify";
import AddTask from "./addTask";
import { updateTask } from "queries/patchQueryFns";
import UpdateTask from "./updateTask";
import ShowDetailsTask from "./showDetailsTask";
import { deleteTask } from "queries/deleteQueryFns";

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { setIsLoading } = usePublicContext();

  const { data: todos, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getUserTask,
    onError: () => toast.error("Error fetching data"),
    onSettled: () => setIsLoading(false),
  });

  const { mutateAsync: createTaskMutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      refetch();
      setShowAddTask(false);
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      toast.error("Error creating task");
    },
  });

  const { mutateAsync: updateTaskMutate } = useMutation({
    mutationFn: ({ id, updatedData }) => updateTask({ id, updatedData }),
    onSuccess: () => {
      refetch();
      setShowUpdateTask(false);
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.error("Error updating task");
    },
  });

  const { mutateAsync: deleteTaskMutate } = useMutation({
    mutationFn: ({ id }) => deleteTask({ id }),
    onSuccess: () => {
      refetch();
      setShowUpdateTask(false);
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      toast.error("Error deleting task");
    },
  });

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setShowUpdateTask(true);
  };

  const handleShowDetails = (details) => {
    setSelectedTask(details);
    setShowDetails(true);
  };
  return (
    <>
      {showAddTask && (
        <AddTask
          onCancel={() => setShowAddTask(false)}
          onSave={(data) => createTaskMutate({ createData: data })}
        />
      )}

      {showUpdateTask && (
        <UpdateTask
          data={selectedTask}
          onCancel={() => setShowUpdateTask(false)}
          onSave={(data) =>
            updateTaskMutate({ id: selectedTask.id, updatedData: data })
          }
        />
      )}

      {showDetails && (
        <ShowDetailsTask
          details={selectedTask}
          onCancel={() => setShowDetails(false)}
        />
      )}

      <Todo
        todos={todos}
        handleAddClick={() => setShowAddTask(true)}
        handleUpdateClick={handleUpdateClick}
        handleShowDetails={handleShowDetails}
        handleDeleteTask={(id) => deleteTaskMutate({ id })}
        />
    </>
  );
};

export default Home;
