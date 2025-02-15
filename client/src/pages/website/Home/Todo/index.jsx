import Todo from "./todo";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePublicContext } from "providers/PublicContextProvider";
import { getTodosUser } from "../../../../queries/getQueryFns";
import { createTask } from "queries/postQueryFns";
import { toast } from "react-toastify";
import AddTask from "./addTask";

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsLoading } = usePublicContext();

  const { data: todos, refetch } = useQuery({
    queryKey: ['todos'],
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
      console.error("Creation error:", error);
    },
  });

  return (
    <>
      {showAddTask && (
        <AddTask 
          onCancel={() => setShowAddTask(false)}
          onSave={(data) => createTaskMutate({ createData: data })}
        />
      )}
      <Todo 
        todos={todos}
        handleAddClick={() => setShowAddTask(true)}
      />
    </>
  );
};

export default Home;
