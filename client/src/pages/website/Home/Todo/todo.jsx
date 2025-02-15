import FilledButton from "components/ui/buttons/FilledButton";
import {
  FiEdit,
  FiEye,
  FiTrash,
  FiPlus,
  FiAlertCircle,
  FiArrowDown,
  FiMinus,
} from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";

const Todo = ({
  todos,
  handleAddClick,
  handleUpdateClick,
  handleShowDetails,
}) => {
  const status = {
    "In progress": { bg: "bg-yellow-100", text: "text-yellow-800"},
    Completed: { bg: "bg-green-100", text: "text-green-800" },
    Deferred: { bg: "bg-gray-100", text: "text-gray-800" },
    Open: { bg: "bg-blue-100", text: "text-blue-800" },
  };

  const priority = {
    High: {
      color: "text-red-600",
      icon: <FiAlertCircle className="inline mr-1" />,
    },
    Medium: {
      color: "text-orange-600",
      icon: <FiMinus className="inline mr-1" />,
    },
    Low: {
      color: "text-green-600",
      icon: <FiArrowDown className="inline mr-1" />,
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          <FilledButton
            text="Add Task"
            icon={<FiPlus className="mr-2" />}
            onClick={handleAddClick}
            buttonType="submit"
            isButton={true}
            className="bg-primary hover:bg-opacity-80 text-white px-4 py-2 rounded-lg transition-colors"
          />
        </div>

        <div className="space-y-3">
          {todos?.Tasks?.length > 0 ? (
            todos.Tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Details">
                      <FiEye
                        onClick={() => handleShowDetails(task)}
                        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                      />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <FiEdit
                        onClick={() => handleUpdateClick(task)}
                        className="text-gray-500 hover:text-green-600 cursor-pointer transition-colors"
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <FiTrash className="text-gray-500 hover:text-red-600 cursor-pointer transition-colors" />
                    </Tooltip>
                  </div>
                </div>

                <div className="flex items-center mt-2 space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      status[task.status]?.bg
                    } ${status[task.status]?.text}`}
                  >
                    {status[task.status]?.icon} {task.status}
                  </span>

                  <span
                    className={`flex items-center text-sm font-medium ${
                      priority[task.priority]?.color
                    }`}
                  >
                    {priority[task.priority]?.icon}
                    {task.priority}
                  </span>

                  <span className="text-sm text-gray-500 flex items-center">
                    📅 {new Date(task.due_date).toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Start by creating a new task!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
