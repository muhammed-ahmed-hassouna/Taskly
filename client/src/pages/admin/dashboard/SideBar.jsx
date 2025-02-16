import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePage } from "../context/SelectedPageContext";
import { deleteUserCookies } from "utils/methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartPie,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const { page, onSelectedPage } = usePage();
  const navigate = useNavigate();
  const sidebarLinks = [
    { label: "Dashboard", link: "dashboard", icon: faChartPie },
    { label: "Users", link: "users", icon: faUser },
    { label: "Tasks", link: "tasks", icon: faTasks },
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // handle logout
  function logout() {
    deleteUserCookies();
    navigate("/login");
  }

  // to handle open and close sidebar
  const toggleSidebar = (event) => {
    event.stopPropagation();
    setSidebarOpen(!isSidebarOpen);
  };

  // to handle closing sidebar when clicking anywhere but the sidebar itself
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close the sidebar if it is open and the click is outside the sidebar
      if (isSidebarOpen && !event.target.closest("#default-sidebar")) {
        setSidebarOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div>
        <nav className="bg-primary lg:hidden flex justify-start gap-4 py-2 px-3 w-full">
          <button
            onClick={(e) => toggleSidebar(e)}
            className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden hover:bg-primary hover:text-buttonHover focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <Link
            to="/dashboard"
            className="flex items-center"
            onClick={() => {
              onSelectedPage("dashboard");
            }}
          >
            <img
              src={"/tasklyapp_logo.jpeg"}
              className="h-8 mr-3"
              alt="EcoVoyage Logo"
            />
            <span className="self-center text-2xl font-semibold font-grape-nuts whitespace-nowrap text-white">
              Taskly
            </span>
          </Link>
        </nav>
      </div>
      <aside
        id="default-sidebar"
        className={`fixed h-screen top-0 left-0 z-[55] w-64 transition-transform ${
          !isSidebarOpen ? "-translate-x-full lg:translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-primary">
          <div className="w-auto justify-start gap-5 items-center mx-3 flex my-5">
            <img
              className="w-1/4"
              src={"/tasklyapp_logo.jpeg"}
              alt="EcoVoyage Logo"
            />
            <h1 className="text-2xl font-bold text-white font-grape-nuts">
              Taskly
            </h1>
          </div>
          <ul class="space-y-2 font-medium">
            {sidebarLinks.map((sideLink, id) => (
              <li key={id}>
                <button
                  className={`w-full flex items-center px-3 text-white transition-colors duration-300 transform rounded-lg hover:bg-buttonHover hover:text-black ${
                    page === sideLink.link ? "bg-buttonHover text-black" : ""
                  }`}
                  onClick={() => {
                    onSelectedPage(sideLink.link);
                    setSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <FontAwesomeIcon className="p-3" icon={sideLink.icon} />
                  <span className="mx-2 text-sm font-medium">
                    {sideLink.label}
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                className={`w-full flex items-center px-3 text-white transition-colors duration-300 transform rounded-lg hover:bg-buttonHover hover:text-black`}
                onClick={() => logout()}
              >
                <FontAwesomeIcon
                  className="p-3"
                  icon={faArrowRightFromBracket}
                />
                <span className="mx-2 text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
