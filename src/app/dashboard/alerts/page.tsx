"use client";

import { motion } from "framer-motion";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconInfoCircle,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

// Dummy data for demonstration
const alerts = [
  {
    id: "ALT-001",
    type: "warning",
    title: "Low Stock Alert",
    message: "Product 'Laptop Pro X1' is running low on stock (5 units remaining)",
    timestamp: "2024-03-31 14:30:00",
    icon: IconAlertTriangle,
  },
  {
    id: "ALT-002",
    type: "error",
    title: "Order Processing Error",
    message: "Failed to process order #ORD-1234 due to payment gateway timeout",
    timestamp: "2024-03-31 13:15:00",
    icon: IconAlertCircle,
  },
  {
    id: "ALT-003",
    type: "info",
    title: "New Order Received",
    message: "New order #ORD-1235 has been received and is pending processing",
    timestamp: "2024-03-31 12:45:00",
    icon: IconInfoCircle,
  },
  {
    id: "ALT-004",
    type: "success",
    title: "Inventory Update",
    message: "Successfully updated inventory levels for 50 products",
    timestamp: "2024-03-31 11:30:00",
    icon: IconCheck,
  },
];

const getAlertStyles = (type: string) => {
  switch (type) {
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "info":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage system alerts and notifications
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <IconAlertCircle className="mr-2 h-4 w-4" />
          View All Alerts
        </motion.button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-white p-4 shadow-sm dark:bg-neutral-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`rounded-full p-2 ${getAlertStyles(alert.type)}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {alert.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <IconX className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 