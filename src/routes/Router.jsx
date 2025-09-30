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
import RoleRoute from "../components/Routes/RoleRoute";
import PrivateRoute from "../components/Routes/PrivateRoute";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import ErrorPage from "../pages/Error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/category/:categoryName",
        element: <Category></Category>,
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/apply-vendor",
        element: <VendorApplication></VendorApplication>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },

      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <PrivateRoute></PrivateRoute>,
      },
      {
        path:"*",
        element:<ErrorPage></ErrorPage>
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashBoardLayout,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user-management",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <UserManagement></UserManagement>
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/applications",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <VendorApplicationAction></VendorApplicationAction>
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/pending-products",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <PendingProduct></PendingProduct>
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/add-management",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <PendingAds></PendingAds>
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/vendor/add-product",
        element: (
          <RoleRoute allowedRoles={["vendor"]}>
            <AddProduct></AddProduct>
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/vendor/my-products",
        element: <PrivateRoute><RoleRoute allowedRoles={["vendor"]}><MyProducts></MyProducts></RoleRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/request-for-ad",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["vendor"]}>
              <AdRequestForm></AdRequestForm>
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
