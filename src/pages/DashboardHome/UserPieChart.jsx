import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const UserCharts = ({ stats }) => {
  // Extract order stats
  const completed = stats.orders.filter((o) => o.status === "delivered").length;
  const pending = stats.orders.filter((o) => o.status === "pending").length;
  const cancelled = stats.orders.filter((o) => o.status === "cancelled").length;
  const processing = stats.orders.filter((o) => o.status === "processing").length;

  // Pie Data (Completion overview)
  const pieData = [
    { name: "Delivered", value: completed },
    { name: "Pending", value: pending },
    { name: "Processing", value: processing },
    { name: "Cancelled", value: cancelled },
  ];
  const COLORS = ["#22C55E", "#EAB308", "#3B82F6", "#EF4444"];

  // Bar Data (Orders by Status)
  const barData = [
    { name: "Orders", Delivered: completed, Pending: pending, Processing: processing, Cancelled: cancelled },
  ];

  // Line Data (Orders Over Time)
  const ordersByMonth = stats.orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.entries(ordersByMonth).map(([month, count]) => ({ month, Orders: count }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* KPI Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: stats.orders.length, color: "text-gray-900" },
          { label: "Delivered", value: completed, color: "text-green-600" },
          { label: "Pending", value: pending, color: "text-yellow-600" },
          { label: "Cancelled", value: cancelled, color: "text-red-600" },
        ].map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-4 bg-white border rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <h4 className="text-gray-500 text-sm">{card.label}</h4>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-4 border rounded-xl shadow-lg bg-white"
      >
        <h3 className="font-semibold mb-2">Orders Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border rounded-xl shadow-lg bg-white"
      >
        <h3 className="font-semibold mb-2">Orders by Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Delivered" fill="#22C55E" />
            <Bar dataKey="Pending" fill="#EAB308" />
            <Bar dataKey="Processing" fill="#3B82F6" />
            <Bar dataKey="Cancelled" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="col-span-1 lg:col-span-2 p-4 border rounded-xl shadow-lg bg-white"
      >
        <h3 className="font-semibold mb-2">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Orders" stroke="#6366F1" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default UserCharts;
