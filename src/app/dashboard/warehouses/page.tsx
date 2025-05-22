"use client";

import { motion } from "motion/react";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconMapPin,
  IconBox,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

// Dummy data for demonstration
const warehouses = [
  {
    id: "WH-001",
    name: "Main Distribution Center",
    location: "New York, NY",
    capacity: "50,000 sq ft",
    items: 1250,
    status: "Active",
  },
  {
    id: "WH-002",
    name: "West Coast Hub",
    location: "Los Angeles, CA",
    capacity: "35,000 sq ft",
    items: 850,
    status: "Active",
  },
  {
    id: "WH-003",
    name: "South Regional Center",
    location: "Miami, FL",
    capacity: "25,000 sq ft",
    items: 620,
    status: "Active",
  },
  {
    id: "WH-004",
    name: "North Storage Facility",
    location: "Chicago, IL",
    capacity: "20,000 sq ft",
    items: 480,
    status: "Maintenance",
  },
  {
    id: "WH-005",
    name: "East Coast Depot",
    location: "Boston, MA",
    capacity: "30,000 sq ft",
    items: 750,
    status: "Active",
  },
];

export default function WarehousesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Warehouses
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your warehouse locations and inventory
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add Warehouse
        </motion.button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Search warehouses..."
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <IconFilter className="mr-2 h-4 w-4" />
            Filter
          </motion.button>
        </div>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((warehouse) => (
          <motion.div
            key={warehouse.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {warehouse.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {warehouse.id}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  warehouse.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {warehouse.status}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <IconMapPin className="mr-2 h-4 w-4" />
                {warehouse.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <IconBox className="mr-2 h-4 w-4" />
                {warehouse.capacity}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <IconBox className="mr-2 h-4 w-4" />
                {warehouse.items} items in stock
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500 dark:hover:bg-neutral-700 dark:hover:text-gray-400"
              >
                <IconEdit className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500 dark:hover:bg-neutral-700 dark:hover:text-gray-400"
              >
                <IconTrash className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 