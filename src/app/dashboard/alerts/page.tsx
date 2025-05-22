"use client";

import { motion } from "motion/react";
import {
  IconBell,
  IconAlertTriangle,
  IconInfoCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";

// Dummy data for demonstration
const alerts = [
  {
    id: "ALT-001",
    type: "warning",
    message: "Low stock alert for product: Laptop Pro 15",
    date: "2024-03-31",
    status: "Pending",
  },
  {
    id: "ALT-002",
    type: "info",
    message: "New order received: ORD-006",
    date: "2024-03-31",
    status: "Acknowledged",
  },
  {
    id: "ALT-003",
    type: "danger",
    message: "Warehouse WH-004 requires maintenance",
    date: "2024-03-30",
    status: "Pending",
  },
  {
    id: "ALT-004",
    type: "success",
    message: "Inventory update completed successfully",
    date: "2024-03-29",
    status: "Resolved",
  },
  {
    id: "ALT-005",
    type: "warning",
    message: "Supplier SUP-003 is inactive",
    date: "2024-03-28",
    status: "Pending",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  acknowledged: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Alerts & Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View important alerts and notifications related to your inventory system
          </p>
        </div>
        {/* Add actions like Mark All Read if needed */}
      </div>

      {/* Alerts List */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        alert.type === "warning"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : alert.type === "info"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : alert.type === "danger"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      )}
                    >
                      {alert.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {alert.message}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {alert.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                     <span
                      className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                         statusColors[alert.status.toLowerCase() as keyof typeof statusColors] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      )}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      {/* Add action buttons like View Details, Dismiss, etc. */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 