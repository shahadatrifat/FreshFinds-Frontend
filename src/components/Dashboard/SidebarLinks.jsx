import {
  Home,
  Users,
  Activity,
  PlusCircle,
  BarChart2,
  Settings,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import { RiDashboardHorizontalLine } from "react-icons/ri"; 

// Common Links
export const commonLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: Home,
    gradient: "from-emerald-600 to-emerald-500", 
  },
];

// Admin Links
export const adminLinks = [
  {
    to: "/dashboard/user-management",
    label: "Manage Users",
    icon: Users, 
    gradient: "from-teal-600 to-teal-500",
  },
  {
    to: "/dashboard/admin/pending-products",
    label: "Pending Products",
    icon: PlusCircle,
    gradient: "from-amber-600 to-amber-500", // Amber (Gold) gradient
  },
  {
    to: "/dashboard/applications",
    label: "Vendor Applications",
    icon: RiDashboardHorizontalLine,
    gradient: "from-indigo-600 to-indigo-500", // Indigo gradient
  },
  {
    to: "/dashboard/admin/add-management",
    label: "Pending Ads",
    icon: Activity,
    gradient: "from-orange-600 to-orange-500", // Orange gradient
  },
];

// Vendor Links
export const vendorLinks = [
  {
    to: "/dashboard/vendor/add-product",
    label: "Add Product",
    icon: PlusCircle,
    gradient: "from-yellow-600 to-yellow-500", // Gold (Yellow) gradient
  },
  {
    to: "/dashboard/vendor/my-products",
    label: "My Products",
    icon: Activity,
    gradient: "from-emerald-600 to-emerald-500", // Emerald green gradient
  },
  {
    to: "/dashboard/request-for-ad",
    label: "Request Ad",
    icon: RiDashboardHorizontalLine,
    gradient: "from-rose-600 to-rose-500", // Rose gradient for a unique touch
  },
];

// User Links
export const userLinks = [
  {
    to: "/dashboard/my-orders",
    label: "My Orders",
    icon: ShoppingBag,
    gradient: "from-teal-600 to-teal-500",
  },
  {
    to: "/dashboard/my-wishlist",
    label: "My Wishlist",
    icon: Heart,
    gradient: "from-pink-600 to-pink-500", 
  },
];
