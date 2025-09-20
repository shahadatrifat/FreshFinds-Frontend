import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="flex flex-col lg:flex-row h-screen">
        <Sidebar />
        <div className="flex-1 p-8 bg-offwhite overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
