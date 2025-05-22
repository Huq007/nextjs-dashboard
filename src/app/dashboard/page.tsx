"use client";

import { motion } from "motion/react";
import {
  IconPackage,
  IconAlertCircle,
  IconTruck,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data for demonstration
const stats = [
  {
    title: "Total Items",
    value: "1,234",
    change: "+12.3%",
    trend: "up",
    icon: IconPackage,
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "-5.2%",
    trend: "down",
    icon: IconAlertCircle,
  },
  {
    title: "Pending Orders",
    value: "45",
    change: "+8.1%",
    trend: "up",
    icon: IconTruck,
  },
  {
    title: "Total Value",
    value: "$45,678",
    change: "+15.3%",
    trend: "up",
    icon: IconTrendingUp,
  },
  {
    title: "Monthly Sales",
    value: "$12,345",
    change: "+18.5%",
    trend: "up",
    icon: IconTrendingUp,
  },
  {
    title: "Return Rate",
    value: "2.3%",
    change: "-0.5%",
    trend: "down",
    icon: IconTrendingDown,
  },
];

const recentItems = [
  { name: "Laptop Pro X1", stock: 15, status: "In Stock" },
  { name: "Wireless Mouse", stock: 5, status: "Low Stock" },
  { name: "4K Monitor", stock: 8, status: "In Stock" },
  { name: "Mechanical Keyboard", stock: 0, status: "Out of Stock" },
];

// Chart data
const stockLevelData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
];

const inventoryValueData = [
  { name: "Electronics", value: 400 },
  { name: "Furniture", value: 300 },
  { name: "Office Supplies", value: 300 },
  { name: "Other", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Additional chart data
const stockMovementData = [
  { name: "Jan", incoming: 400, outgoing: 240 },
  { name: "Feb", incoming: 300, outgoing: 139 },
  { name: "Mar", incoming: 200, outgoing: 980 },
  { name: "Apr", incoming: 278, outgoing: 390 },
  { name: "May", incoming: 189, outgoing: 480 },
  { name: "Jun", incoming: 239, outgoing: 380 },
];

const topSellingItems = [
  { name: "Laptop Pro X1", sales: 45, revenue: 58499.55 },
  { name: "4K Monitor", sales: 32, revenue: 12799.68 },
  { name: "Wireless Mouse", sales: 28, revenue: 1399.72 },
  { name: "Mechanical Keyboard", sales: 25, revenue: 3249.75 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome to your inventory management dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "rounded-full p-3",
                  stat.trend === "up"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={cn(
                  "text-sm font-medium",
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                from last month
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Items Table */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-neutral-800">
        <div className="px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {recentItems.map((item) => (
                <tr key={item.name}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.stock}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Stock Level Trends
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stockLevelData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Inventory Value Distribution
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryValueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {inventoryValueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Stock Movement Trends
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stockMovementData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="incoming"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="outgoing"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Top Selling Items
          </h3>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-neutral-900">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Item
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Sales
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {topSellingItems.map((item) => (
                    <tr key={item.name}>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        {item.sales}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        ${item.revenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 