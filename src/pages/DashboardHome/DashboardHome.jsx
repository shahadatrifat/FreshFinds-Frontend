import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import CartLoader from "../../pages/shared/loaders/CartLoader";
import { getUserOrders } from "../../Services/productService";
import axiosInstance from "../../Hooks/useAxiosInstance";

// Import role-specific chart components
import UserPieChart from "./UserPieChart";
import VendorChart from "./VendorChart";
import AdminChart from "./AdminChart";

// Small stat card component
const StatCard = ({ title, value }) => (
  <div className="p-4 border rounded-lg shadow flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  // Fetch stats depending on role
  const fetchStats = async () => {
    if (!user) return;

    // Regular user: fetch orders
    if (user.role === "user") {
      const orders = await getUserOrders(user.uid);
      return {
        orders,
        totalOrders: orders.length,
        completedOrders: orders.filter(o => o.status === "delivered").length,
        pendingOrders: orders.filter(o => o.status !== "delivered").length,
      };
    }

    // Vendor: fetch stats
    if (user.role === "vendor") {
      const res = await axiosInstance.get(`/api/v1/vendor/stats/${user._id}`);
      return {
        ...res.data,
        approvedProducts: res.data.approvedProducts,
        pendingProducts: res.data.pendingProducts,
        totalProducts: res.data.totalProducts,
        totalAds: res.data.totalAds,
        approvedAds: res.data.approvedAds,
        pendingAds: res.data.pendingAds,
      };
    }

    // Admin: fetch stats
    if (user.role === "admin") {
      const res = await axiosInstance.get("/api/v1/user/admin/stats");
      return {
        ...res.data,
        totalUsers: res.data.totalUsers,
        totalVendors: res.data.totalVendors,
        totalProducts: res.data.totalProducts,
        totalAds: res.data.totalAds,
        approvedProducts: res.data.approvedProducts,
        pendingProducts: res.data.pendingProducts,
        approvedAds: res.data.approvedAds,
        pendingAds: res.data.pendingAds,
      };
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats", user?.role],
    queryFn: fetchStats,
    enabled: !!user,
  });

  useEffect(() => {
    if (data) setStats(data);
  }, [data]);

  if (isLoading || !stats) return <CartLoader />;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-lora text-emerald font-semibold">Dashboard Overview</h2>

      {/* Render charts and stats cards based on role */}
      {user.role === "admin" && <AdminChart stats={stats} />}
      {user.role === "vendor" && <VendorChart stats={stats} />}
      {user.role === "user" && <UserPieChart stats={stats} />}
    </div>
  );
};

export default DashboardHome;
