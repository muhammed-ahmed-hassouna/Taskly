import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "components/ui/Loader/Loader";
import { getUserCookies, deleteUserCookies } from "../utils/methods";
import { usePublicContext } from "./PublicContextProvider";
import Notifications from "pages/shared/Notifications/Notifications";

const useAuthProvider = () => {
  const { isLog } = usePublicContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userData = getUserCookies();

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      if (!userData || (userData.role !== 2 && userData.role !== 1) || !isLog) {
        deleteUserCookies();
        navigate("/unauthorized", { replace: true });
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingDelay);
  }, [userData, isLog, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Outlet />
      <Notifications userId={userData.id} />
    </>
  );
};

export default useAuthProvider;
