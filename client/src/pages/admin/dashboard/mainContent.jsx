import { usePage } from "../context/SelectedPageContext";
import TaskManager from "../tables/tasks";
import AllUsers from "../tables/users";

const MainContent = () => {
  const { page } = usePage();

  switch (page) {
    case "users":
      return <AllUsers />;
    case "tasks":
      return <TaskManager />;
    default:
      return <AllUsers />;
  }
};

export default MainContent;
