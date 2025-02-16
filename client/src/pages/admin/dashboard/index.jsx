import AllUsers from "../tables/users";
import MainContent from "./mainContent";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 text-white lg:p-4 p-0">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mt-4 p-4 lg:p-10">
          <MainContent />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
