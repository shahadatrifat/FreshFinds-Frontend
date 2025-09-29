import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Home/Footer";
import PageWrapper from "../pages/shared/PageWrapper/PageWrapper";

const DashboardLayout = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <PageWrapper>
        <div className="flex flex-col lg:flex-row h-screen">
        <Sidebar />
        <div className="flex-1 p-8 bg-offwhite overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer></Footer>
      </PageWrapper>
    </>
  );
};

export default DashboardLayout;
