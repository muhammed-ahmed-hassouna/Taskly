import { Link, useNavigate } from "react-router-dom";
import { usePublicContext } from "providers/PublicContextProvider";
import { deleteUserCookies } from "utils/methods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "providers/AuthContext";

const TopNav = () => {
  const { isLog } = usePublicContext();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    deleteUserCookies();
    setUser(null);
    toast.success("Logged out successfully!");
    navigate('/login')
  };

  // Array containing navigation items
  const navItems = [
    isLog ? { id: 1, text: "Todos", path: "/" } : null,
    isLog
      ? { id: 2, text: "Logout", onClick: handleLogout }
      : { id: 2, text: "Login", path: "/login" },
    isLog ? null : { id: 3, text: "SignUp", path: "/signup" },
  ].filter((item) => item);

  return (
    <div className='mx-auto flex h-24 max-w-[1980px] items-center justify-between bg-white px-4 text-black shadow-lg'>
      <h1 className='w-full text-3xl font-bold text-primary'>Taskly</h1>

      <ul className='flex'>
        {navItems?.map((item) => (
          <li
            key={item.id}
            className='m-2 cursor-pointer rounded-xl p-4 duration-300 hover:bg-buttonHover hover:text-white'
          >
            {item.path ? (
              <Link to={item.path}>{item.text}</Link>
            ) : (
              <button onClick={item.onClick}>{item.text}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopNav;
