import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import PageWrapper from "../pages/shared/PageWrapper/PageWrapper";
import Footer from "../components/Home/Footer";
import BackToTop from "../pages/shared/BackToTop";

const RootLayout = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Navbar></Navbar>
      <PageWrapper>
        <Outlet></Outlet>
        <Footer></Footer>
        <BackToTop></BackToTop>
      </PageWrapper>
    </div>
  );
};

export default RootLayout;
