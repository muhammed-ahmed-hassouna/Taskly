import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { getUserCookies } from "utils/methods";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const userData = getUserCookies();

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-user.${userId}`);
    channel.bind("App\\Events\\TaskNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);

  const dismissNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="animate-slide-in-right bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-72 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800 text-base">
              {notification.message}
            </span>
            <button
              onClick={() => dismissNotification(index)}
              className="text-gray-500 hover:text-gray-700 text-lg w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium capitalize">
              {notification.task.status}
            </span>
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium capitalize">
              {notification.task.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
