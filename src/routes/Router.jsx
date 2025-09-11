
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import VendorApplication from "../pages/Vendor/VendorApplication/VendorApplication";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/products",
        element: <h1>Products</h1>
      },
      {
        path: "/markets",
        element: <h1>Markets</h1>
      },
      {
        path: "/offers",
        element: <h1>Offers</h1>
      },
      {
        path:"/apply-vendor",
        element:<VendorApplication></VendorApplication>
      }
    ]
  },
  {
    path:"/",
    Component:AuthLayout,
    children: [
      {
        path:"/signin",
        element:<SignIn></SignIn>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      }
    ]
  }
]);