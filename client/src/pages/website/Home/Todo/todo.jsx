import FilledButton from "components/ui/buttons/FilledButton";
import { FiEdit, FiLogIn, FiPlus, FiTrash } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";

const Todo = ({ todos, handleAddClick }) => {
  console.log(todos);

  const getStatusColor = (status) => {
    switch (status) {
      case "In progress":
        return "border border-yellow-400 rounded-lg text-yellow-400";
      case "Completed":
        return "border border-green-400 rounded-lg text-green-400";
      case "Deferred":
        return "border border-gray-400 rounded-lg text-gray-400";
      case "Open":
        return "border border-blue-400 rounded-lg text-blue-400";
      default:
        return "border border-gray-200 rounded-lg text-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-primary2 rounded-sm shadow-md w-2/3 h-2/3 p-6 overflow-auto">
        <div>
          <p className="text-custom-4xl font-custom-bold ">Todo List</p>
        </div>

        <FilledButton
          text="Add Task"
          icon={
            <div className="m-1">
              <FiPlus />
            </div>
          }
          onClick={handleAddClick}
          buttonType="submit"
          isButton={true}
          className="self-start w-[20%] h-11 cursor-pointer rounded-md bg-primary p-4 text-white transition hover:bg-opacity-80"
        />
        <div className="w-full mt-4">
          {todos?.Tasks?.length > 0 ? (
            todos.Tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-md mb-2"
              >
                <p className="text-custom-lg">
                  {task?.title}
                  <span
                    className={`m-4 px-2 py-1 text-sm ${getStatusColor(
                      task?.status
                    )}`}
                  >
                    {task?.status}
                  </span>
                  <p className="font-light text-custom-sm text-gray-500 mt-1">
                    {" "}
                    {new Date(task?.due_date).toLocaleDateString("en-US")}
                  </p>
                </p>
                <div>
                  <Tooltip title="Update Task">
                    <span>
                      <FiEdit className="inline-block mr-2 cursor-pointer text-blue-600 hover:opacity-80" />
                    </span>
                  </Tooltip>

                  <Tooltip title="Delete Task">
                    <span>
                      <FiTrash className="inline-block cursor-pointer text-red-600 hover:opacity-80" />
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
