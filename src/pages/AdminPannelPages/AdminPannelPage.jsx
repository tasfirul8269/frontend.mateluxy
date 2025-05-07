import { createSampleNotifications } from "@/services/notificationService";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AdminPannelPage = () => {
  // Initialize notification system when admin panel loads
  useEffect(() => {
    // This will add sample notifications if none exist yet
    console.log("Initializing notification system");
    createSampleNotifications();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}

export default AdminPannelPage; 