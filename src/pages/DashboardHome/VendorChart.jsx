import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CountUp from "../../components/CountUp"; 

const VendorChart = ({ stats }) => {
  const approvedProducts = stats?.approvedProducts || 0;
  const pendingProducts = stats?.pendingProducts || 0;
  const approvedAds = stats?.approvedAds || 0;
  const pendingAds = stats?.pendingAds || 0;
  const totalProducts = stats?.totalProducts || 0;
  const totalAds = stats?.totalAds || 0;

  const barData = [
    { name: "Products", Approved: approvedProducts, Pending: pendingProducts },
  ];

  const pieData = [
    { name: "Approved Ads", value: approvedAds },
    { name: "Pending Ads", value: pendingAds },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-6"
      initial="hidden"
      animate="visible"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Total Products", value: totalProducts },
          { title: "Approved Products", value: approvedProducts },
          { title: "Total Ads", value: totalAds },
          { title: "Approved Ads", value: approvedAds },
        ].map((card, i) => (
          <motion.div key={i} variants={fadeUp}>
            <StatCard title={card.title} value={card.value} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Bar Chart */}
        <motion.div
          variants={fadeUp}
          className="p-4 bg-offwhite border rounded-lg shadow"
        >
          <h3 className="font-semibold mb-2">Products Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Approved" fill={COLORS[0]} />
              <Bar dataKey="Pending" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ads Pie Chart */}
        <motion.div
          variants={fadeUp}
          className="p-4 bg-offwhite border rounded-lg shadow"
        >
          <h3 className="font-semibold mb-2">Ads Status</h3>
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
      </div>
    </motion.div>
  );
};

// Reusable Stat Card with CountUp
const StatCard = ({ title, value }) => (
  <div className="p-4 border rounded-lg shadow flex flex-col items-center justify-center bg-white">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold">
      <CountUp from={0} to={value} duration={1} separator="," />
    </p>
  </div>
);

export default VendorChart;
