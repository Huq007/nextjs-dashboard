"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  IconSearch,
  IconFilter,
  IconX,
  IconEdit,
  IconTrash,
  IconPackage,
  IconCalendar,
  IconTruck,
  IconUser,
  IconCreditCard,
  IconMapPin,
} from "@tabler/icons-react";
import Image from 'next/image';

// Dummy data for orders
const orders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    customer: "John Doe",
    items: [
      {
        id: "ITEM-001",
        name: "Laptop Pro 15",
        quantity: 2,
        price: 1200.00,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww"
      },
      {
        id: "ITEM-002",
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 85.00,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D"
      }
    ],
    status: "Delivered",
    total: 2758.50,
    shipping: {
      address: "123 Main Street, Suite 100",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
      method: "Express Delivery",
      tracking: "1Z999AA10123456789"
    },
    payment: {
      method: "Credit Card",
      cardType: "Visa",
      last4: "4242",
      status: "Paid",
      date: "2024-03-15"
    }
  },
  {
    id: "ORD-002",
    date: "2024-03-10",
    customer: "Jane Smith",
    items: [
      {
        id: "ITEM-003",
        name: "Wireless Mouse",
        quantity: 1,
        price: 25.00,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2V8ZW58MHx8MHx8fDA%3D"
      }
    ],
    status: "In Transit",
    total: 25.00,
    shipping: {
      address: "456 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
      method: "Standard Shipping",
      tracking: "1Z999AA10234567890"
    },
    payment: {
      method: "PayPal",
      status: "Paid",
      date: "2024-03-10"
    }
  },
  {
    id: "ORD-003",
    date: "2024-03-05",
    customer: "Mike Johnson",
    items: [
      {
        id: "ITEM-004",
        name: "External SSD 1TB",
        quantity: 3,
        price: 95.00,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3NkJTIwZHJpdmV8ZW58MHx8MHx8fDA%3D"
      }
    ],
    status: "Processing",
    total: 285.00,
    shipping: {
      address: "789 Mission Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
      method: "Standard Shipping",
      tracking: "1Z999AA10345678901"
    },
    payment: {
      method: "Credit Card",
      cardType: "Mastercard",
      last4: "5678",
      status: "Paid",
      date: "2024-03-05"
    }
  }
];

// Slide Drawer Component
function SlideDrawer({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur and fade effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          />
          
          {/* Drawer with enhanced animations */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 0.5,
            }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden bg-white shadow-2xl dark:bg-neutral-800"
          >
            {/* Drawer Header with gradient border */}
            <div className="relative border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-neutral-700 dark:from-neutral-900 dark:to-neutral-800">
              <div className="flex items-center justify-between">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  Order Details
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500 dark:hover:bg-neutral-700 dark:hover:text-gray-400"
                >
                  <IconX className="h-6 w-6" />
                </motion.button>
              </div>
            </div>

            {/* Drawer Content with scroll and fade effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-[calc(100%-80px)] overflow-y-auto p-6"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function OrdersPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track customer orders
          </p>
        </div>
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
            placeholder="Search orders..."
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

      {/* Orders Table */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Total
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
              {currentOrders.map((order) => (
                <tr 
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                        <IconPackage className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <IconCalendar className="mr-2 h-4 w-4" />
                      {order.date}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <IconUser className="mr-2 h-4 w-4" />
                      {order.customer}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {order.items.length} items
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "In Transit"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      >
                        <IconEdit className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      >
                        <IconTrash className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide Drawer */}
      <SlideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedOrder.id}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedOrder.date}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    selectedOrder.status === "Delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : selectedOrder.status === "In Transit"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
            >
              <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Order Items
              </h4>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any, index: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
            >
              <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Shipping Information
              </h4>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <IconMapPin className="h-4 w-4" />
                  <span>{selectedOrder.shipping.address}</span>
                </div>
                <p className="ml-6">{selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}</p>
                <p className="ml-6">{selectedOrder.shipping.country}</p>
                <div className="mt-3 flex items-center space-x-2">
                  <IconTruck className="h-4 w-4" />
                  <span>{selectedOrder.shipping.method}</span>
                </div>
                <p className="ml-6 text-xs">Tracking: {selectedOrder.shipping.tracking}</p>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
            >
              <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Payment Information
              </h4>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <IconCreditCard className="h-4 w-4" />
                  <span>
                    {selectedOrder.payment.method}
                    {selectedOrder.payment.last4 && ` ending in ${selectedOrder.payment.last4}`}
                  </span>
                </div>
                <p className="ml-6">Status: <span className="text-green-600 dark:text-green-400">{selectedOrder.payment.status}</span></p>
                <p className="ml-6">Date: {selectedOrder.payment.date}</p>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
            >
              <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 dark:border-neutral-700">
                  <span className="font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700"
              >
                Update Status
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Cancel Order
              </motion.button>
            </div>
          </div>
        )}
      </SlideDrawer>
    </div>
  );
} 