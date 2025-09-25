
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import VendorApplication from "../pages/Vendor/VendorApplication/VendorApplication";
import DashBoardLayout from "../layouts/DashBoardLayout";
import VendorApplicationAction from "../pages/Vendor/VendorApplication/VendorApplicationAction";
import AddProduct from "../pages/Vendor/Addproduct/AddProduct";
import PendingProduct from "../pages/Admin/PendingProduct/PendingProduct";
import MyProducts from "../pages/Vendor/MyProducts/MyProducts";
import AllProducts from "../pages/All-Products/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
        element: <AllProducts></AllProducts>
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
      },
      {
        path:"/product/:id",
        element:<ProductDetails></ProductDetails>
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
  },
  {
    path:"/dashboard",
    Component: DashBoardLayout,
    children: [
      {
        index:true,
        element:<h1>Dashboard</h1>
      },
      {
        path:"/dashboard/admin/applications",
        element:<VendorApplicationAction></VendorApplicationAction>
      },
      {
        path:"/dashboard/admin/pending-products",
        element:<PendingProduct></PendingProduct>
      },
      {
        path:"/dashboard/vendor/add-product",
        element:<AddProduct></AddProduct>
      },{
        path:"/dashboard/vendor/my-products",
        element:<MyProducts></MyProducts>
      }
    ]
  }
]);