import { Home, Users, Activity, PlusCircle, BarChart2, Settings, ShoppingBag, Heart } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { RiDashboardHorizontalLine } from "react-icons/ri";  // Admin related icon

// Common Links
export const commonLinks = [
  { to: "/dashboard", label: "Dashboard", icon: Home, gradient: "from-green-400 to-blue-500" },

 
];

// Admin Links
export const adminLinks = [
  { to: "/dashboard/user-management", label: "Manage Users", icon: Users, gradient: "from-pink-400 to-pink-600" },
  { to: "/dashboard/site-analytics", label: "Site Analytics", icon: BarChart2, gradient: "from-yellow-400 to-orange-500" },
  { to: "/dashboard/admin/pending-products", label: "Pending Products", icon: PlusCircle, gradient: "from-teal-400 to-cyan-500" },
  { to: "/dashboard/admin/add-management", label: "Pending Ads", icon: Activity, gradient: "from-purple-400 to-indigo-500" }, // Used Activity Icon for Pending Ads
];

// Vendor Links
export const vendorLinks = [
  { to: "/dashboard/vendor/add-product", label: "Add Product", icon: PlusCircle, gradient: "from-teal-400 to-cyan-500" },
  { to: "/dashboard/vendor/my-products", label: "My Products", icon: Activity, gradient: "from-purple-400 to-indigo-500" },
    { to: "/dashboard/request-for-ad", label: "Request Ad", icon: RiDashboardHorizontalLine, gradient: "from-green-400 to-blue-500" },  // Used RiDashboardHorizontalLine for Ad request

];

// User Links
export const userLinks = [
  { to: "/dashboard/my-orders", label: "My Orders", icon: ShoppingBag, gradient: "from-blue-400 to-indigo-600" },
  { to: "/dashboard/my-wishlist", label: "My Wishlist", icon: Heart, gradient: "from-red-400 to-pink-500" },
];

