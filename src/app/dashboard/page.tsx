"use client";

import { motion } from "framer-motion";
import {
  IconPackage,
  IconTruck,
  IconAlertCircle,
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyDollar,
  IconUsers,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useTheme } from "../providers";
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
import Image from 'next/image';
import { useState } from "react";

// Dummy data for demonstration
const stats = [
  {
    title: "Total Products",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: IconPackage,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
  },
  {
    title: "Active Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: IconShoppingCart,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "-3.1%",
    trend: "down",
    icon: IconAlertCircle,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: IconCurrencyDollar,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
  },
  {
    title: "Active Customers",
    value: "1,234",
    change: "+15.3%",
    trend: "up",
    icon: IconUsers,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
  },
  {
    title: "Pending Deliveries",
    value: "45",
    change: "-2.4%",
    trend: "down",
    icon: IconTruck,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    bgColor: "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20",
  },
];

const recentItems = [
  // Electronics
  { name: "Laptop Pro X1", stock: 15, status: "In Stock", category: "Electronics", price: "$1,299.99" },
  { name: "4K Monitor", stock: 8, status: "In Stock", category: "Electronics", price: "$399.99" },
  { name: "Tablet Pro", stock: 11, status: "In Stock", category: "Electronics", price: "$499.99" },
  { name: "Smart Watch", stock: 0, status: "Out of Stock", category: "Electronics", price: "$199.99" },
  { name: "Gaming PC", stock: 5, status: "Low Stock", category: "Electronics", price: "$1,999.99" },
  { name: "Smartphone X", stock: 20, status: "In Stock", category: "Electronics", price: "$899.99" },
  { name: "Smart TV 55\"", stock: 7, status: "In Stock", category: "Electronics", price: "$699.99" },
  { name: "Gaming Console", stock: 3, status: "Low Stock", category: "Electronics", price: "$499.99" },
  { name: "Wireless Earbuds Pro", stock: 25, status: "In Stock", category: "Electronics", price: "$249.99" },
  { name: "Smart Home Hub", stock: 12, status: "In Stock", category: "Electronics", price: "$129.99" },
  
  // Accessories
  { name: "Wireless Mouse", stock: 5, status: "Low Stock", category: "Accessories", price: "$49.99" },
  { name: "Mechanical Keyboard", stock: 0, status: "Out of Stock", category: "Accessories", price: "$129.99" },
  { name: "USB-C Hub", stock: 3, status: "Low Stock", category: "Accessories", price: "$39.99" },
  { name: "Monitor Stand", stock: 4, status: "Low Stock", category: "Accessories", price: "$29.99" },
  { name: "Gaming Mouse", stock: 9, status: "In Stock", category: "Accessories", price: "$69.99" },
  { name: "Wireless Charger", stock: 8, status: "In Stock", category: "Accessories", price: "$39.99" },
  { name: "Laptop Bag", stock: 12, status: "In Stock", category: "Accessories", price: "$59.99" },
  { name: "Screen Protector", stock: 30, status: "In Stock", category: "Accessories", price: "$19.99" },
  { name: "Cable Organizer", stock: 15, status: "In Stock", category: "Accessories", price: "$14.99" },
  { name: "Desk Lamp", stock: 6, status: "Low Stock", category: "Accessories", price: "$34.99" },
  
  // Audio
  { name: "Gaming Headset", stock: 12, status: "In Stock", category: "Audio", price: "$89.99" },
  { name: "Wireless Earbuds", stock: 20, status: "In Stock", category: "Audio", price: "$159.99" },
  { name: "Bluetooth Speaker", stock: 6, status: "Low Stock", category: "Audio", price: "$99.99" },
  { name: "Studio Headphones", stock: 4, status: "Low Stock", category: "Audio", price: "$199.99" },
  { name: "Sound Bar", stock: 3, status: "Low Stock", category: "Audio", price: "$249.99" },
  { name: "Microphone", stock: 8, status: "In Stock", category: "Audio", price: "$79.99" },
  { name: "Audio Interface", stock: 5, status: "Low Stock", category: "Audio", price: "$149.99" },
  
  // Storage
  { name: "External SSD 1TB", stock: 7, status: "In Stock", category: "Storage", price: "$149.99" },
  { name: "USB Flash Drive 256GB", stock: 15, status: "In Stock", category: "Storage", price: "$39.99" },
  { name: "External HDD 4TB", stock: 5, status: "Low Stock", category: "Storage", price: "$129.99" },
  { name: "SD Card 512GB", stock: 10, status: "In Stock", category: "Storage", price: "$89.99" },
  { name: "NAS Drive 8TB", stock: 3, status: "Low Stock", category: "Storage", price: "$299.99" },
  
  // Video
  { name: "Webcam HD", stock: 0, status: "Out of Stock", category: "Video", price: "$79.99" },
  { name: "Action Camera", stock: 8, status: "In Stock", category: "Video", price: "$299.99" },
  { name: "Video Camera", stock: 3, status: "Low Stock", category: "Video", price: "$599.99" },
  { name: "Streaming Camera", stock: 6, status: "In Stock", category: "Video", price: "$199.99" },
  { name: "Video Capture Card", stock: 4, status: "Low Stock", category: "Video", price: "$149.99" },
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
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recentItems.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.slice(0, 6).map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-full p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
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

      {/* Inventory Table */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-neutral-800">
        <div className="px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Inventory Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current stock levels and status
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Price
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
              {currentItems.map((item) => (
                <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.price}
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
        <div className="px-6 py-4 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, recentItems.length)} of {recentItems.length} items
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                    disabled={pageNum === '...'}
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${
                      pageNum === currentPage
                        ? 'bg-blue-600 text-white'
                        : pageNum === '...'
                        ? 'text-gray-500 cursor-default'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700"
              >
                Last
              </button>
            </div>
          </div>
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

      <div className="relative h-48 w-full">
        <Image
          src="/dashboard-bg.jpg"
          alt="Dashboard Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
} 