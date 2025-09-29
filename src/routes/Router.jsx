
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
import Payment from "../pages/Payment/Payment";
import Checkout from "../pages/Checkout/Checkout";
import MyOrders from "../pages/My-Orders/MyOrders";
import ProfilePage from "../pages/My-Profile/ProfilePage";
import Category from "../pages/category-dynamic/Category";
import AdRequestForm from "../pages/adRequest-vendor/AdRequest";
import PendingAds from "../pages/Admin/PendingAds/PendingAds";
import About from "../pages/About/About";
import Support from "../pages/Support/Support";
import UserManagement from "../pages/Admin/User-Management/UserManagement";

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
        path:"/category/:categoryName",
        element:<Category></Category>
      },
      {
        path: "/support",
        element: <Support></Support>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path:"/apply-vendor",
        element:<VendorApplication></VendorApplication>
      },
      {
        path:"/product/:id",
        element:<ProductDetails></ProductDetails>
      },
      
      {
        path:"/checkout",
        element:<Checkout></Checkout>
      },
      {
        path:"/profile",
        element:<ProfilePage></ProfilePage>
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
        path:"/dashboard/admin/user-management",
        element:<UserManagement></UserManagement>
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
        path:"/dashboard/admin/add-management",
        element:<PendingAds></PendingAds>
      },
      {
        path:"/dashboard/vendor/add-product",
        element:<AddProduct></AddProduct>
      },{
        path:"/dashboard/vendor/my-products",
        element:<MyProducts></MyProducts>
      },
      {
        path:"/dashboard/orders",
        element:<MyOrders></MyOrders>
      },
      {
        path:"/dashboard/profile",
        element:<ProfilePage></ProfilePage>
      },{
        path:"/dashboard/request-for-ad",
        element:<AdRequestForm></AdRequestForm>
      },
    ]
  }
]);