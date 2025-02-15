import Todo from "./todo";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePublicContext } from "providers/PublicContextProvider";
import { getTodosUser } from "queries/getQueryFns";
import { createTask } from "queries/postQueryFns";
import { toast } from "react-toastify";
import AddTask from "./addTask";
import { updateTask } from "queries/patchQueryFns";
import UpdateTask from "./updateTask";

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { setIsLoading } = usePublicContext();

  const { data: todos, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosUser,
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

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setShowUpdateTask(true);
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

      <Todo
        todos={todos}
        handleAddClick={() => setShowAddTask(true)}
        handleUpdateClick={handleUpdateClick}
      />
    </>
  );
};

export default Home;
