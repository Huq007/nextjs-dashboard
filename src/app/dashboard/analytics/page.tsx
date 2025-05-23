"use client";

import { motion } from "motion/react";
import {
  IconGauge,
  IconTrendingUp,
  IconCurrencyDollar,
  IconPackage,
} from "@tabler/icons-react";
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
const analyticsData = [
  {
    title: "Total Revenue",
    value: "$1,545,890",
    trend: "+12.5%",
    icon: IconCurrencyDollar,
  },
  {
    title: "Total Orders",
    value: "8,230",
    trend: "+8.1%",
    icon: IconTrendingUp,
  },
  {
    title: "Average Order Value",
    value: "$187.84",
    trend: "+3.2%",
    icon: IconGauge,
  },
  { title: "Items Sold", value: "25,120", trend: "+10.9%", icon: IconPackage },
];

const salesData = [
  { date: "Jan 23", Sales: 980, Profit: 232 },
  { date: "Feb 23", Sales: 456, Profit: 150 },
  { date: "Mar 23", Sales: 390, Profit: 280 },
  { date: "Apr 23", Sales: 340, Profit: 200 },
  { date: "May 23", Sales: 450, Profit: 180 },
  { date: "Jun 23", Sales: 600, Profit: 250 },
];

const inventoryValueData = [
  { name: "Electronics", value: 450000 },
  { name: "Accessories", value: 120000 },
  { name: "Storage", value: 80000 },
  { name: "Furniture", value: 150000 },
  { name: "Other", value: 50000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View your business analytics and performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((stat) => {
          const Icon = stat.icon;
          return (
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
                <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {stat.trend}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  from last month
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Sales & Profit Trends
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Sales"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="Profit"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
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
    </div>
  );
}
