import React from "react";
import { Link } from "react-router";

const DashboardLinks = ({ role }) => {
  const showAll = !role;
  return (
    <div className="space-y-4">
      {/* Admin Dashboard Links */}
{role === "admin" || (showAll && (
  <>
    <Link
      to="/admin/dashboard"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Home className="w-5 h-5" /> {/* Icon for Admin Dashboard */}
      <span>Admin Dashboard Overview</span>
    </Link>
    <Link
      to="/admin/manage-uin-o"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <User className="w-5 h-5" /> {/* Icon for Manage Users */}
      <span>Manage Users</span>
    </Link>
    <Link
      to="/admin/manage-products"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Box className="w-5 h-5" /> {/* Icon for Manage Products */}
      <span>Manage Products</span>
    </Link>
    <Link
      to="/admin/manage-orders"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <ShoppingCart className="w-5 h-5" /> {/* Icon for Manage Orders */}
      <span>Manage Orders</span>
    </Link>
    <Link
      to="/admin/reports"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <BarChart className="w-5 h-5" /> {/* Icon for Reports */}
      <span>Reports & Analytics</span>
    </Link>
    <Link
      to="/admin/settings"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Settings className="w-5 h-5" /> {/* Icon for Settings */}
      <span>Settings</span>
    </Link>
  </>
))}

{/* Vendor Dashboard Links */}
{role === "vendor" || (showAll && (
  <>
    <Link
      to="/vendor/dashboard"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Home className="w-5 h-5" /> {/* Icon for Vendor Dashboard */}
      <span>Vendor Dashboard Overview</span>
    </Link>
    <Link
      to="/vendor/manage-products"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Box className="w-5 h-5" /> {/* Icon for Manage Products */}
      <span>Manage Products</span>
    </Link>
    <Link
      to="/vendor/manage-orders"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <ShoppingCart className="w-5 h-5" /> {/* Icon for Manage Orders */}
      <span>Order Management</span>
    </Link>
    <Link
      to="/vendor/profile"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <User className="w-5 h-5" /> {/* Icon for Profile */}
      <span>Profile</span>
    </Link>
    <Link
      to="/vendor/analytics"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <BarChart className="w-5 h-5" /> {/* Icon for Analytics */}
      <span>Vendor Analytics</span>
    </Link>
  </>
))}

{/* User Dashboard Links */}
{role === "user" || (showAll && (
  <>
    <Link
      to="/user/dashboard"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Home className="w-5 h-5" /> {/* Icon for User Dashboard */}
      <span>User Dashboard Overview</span>
    </Link>
    <Link
      to="/user/orders"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <ShoppingCart className="w-5 h-5" /> {/* Icon for Orders */}
      <span>My Orders</span>
    </Link>
    <Link
      to="/user/wishlist"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Heart className="w-5 h-5" /> {/* Icon for Wishlist */}
      <span>Wishlist</span>
    </Link>
    <Link
      to="/user/settings"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <Settings className="w-5 h-5" /> {/* Icon for Settings */}
      <span>Account Settings</span>
    </Link>
    <Link
      to="/user/profile"
      className="flex items-center gap-3 p-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all duration-300 ease-in-out"
    >
      <User className="w-5 h-5" /> {/* Icon for Profile */}
      <span>My Profile</span>
    </Link>
  </>
))}

    </div>
  );
};

export default DashboardLinks;
