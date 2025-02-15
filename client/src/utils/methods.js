import Cookies from "js-cookie";

export const getUserSession = () => {
  try {
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    return userData;
  } catch (error) {
    return null;
  }
};

export const getUserCookies = () => {
  try {
    const userData = Cookies.get("userData");
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Error parsing userData cookie:", error);
    return null;
  }
};

export const deleteUserCookies = () => {
  try {
    Cookies.remove("userData");
  } catch (error) {
    console.error("Error deleting user cookies:", error);
  }
};
export const updateUserSession = (newUserData) => {
  try {
    const userData = getUserSession();
    const updatedUserData = { ...userData, ...newUserData };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  } catch (error) {
    console.error("Error updating userData in sessionStorage:", error);
  }
};

export const deleteUserSession = () => {
  try {
    localStorage.removeItem("userData");
  } catch (error) {
    console.error("Error updating userData in sessionStorage:", error);
  }
};