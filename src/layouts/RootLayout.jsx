import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import PageWrapper from "../pages/shared/PageWrapper/PageWrapper";

const RootLayout = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Navbar></Navbar>
      <PageWrapper>
        <Outlet></Outlet>
      </PageWrapper>
    </div>
  );
};

export default RootLayout;
