"use client";

import { motion } from "motion/react";
import {
  IconArrowLeft,
  IconPackage,
  IconCalendar,
  IconUser,
  IconTruck,
  IconCreditCard,
  IconMapPin,
  IconPrinter,
  IconDownload,
} from "@tabler/icons-react";
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for demonstration
const orderDetails = {
  id: "ORD-001",
  date: "2024-03-15",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  },
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
  },
  summary: {
    subtotal: 2485.00,
    tax: 248.50,
    shipping: 25.00,
    total: 2758.50
  }
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-700"
            >
              <IconArrowLeft className="h-5 w-5" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order Details
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Order #{orderDetails.id}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <IconPrinter className="mr-2 h-4 w-4" />
            Print
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <IconDownload className="mr-2 h-4 w-4" />
            Download
          </motion.button>
        </div>
      </div>

      {/* Order Status and Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <IconPackage className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Status</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{orderDetails.status}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
              <IconCalendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Date</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{orderDetails.date}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
              <IconUser className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{orderDetails.customer.name}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Items</h2>
        <div className="space-y-4">
          {orderDetails.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
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

      {/* Shipping and Payment Information */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Shipping Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <IconMapPin className="mt-1 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{orderDetails.shipping.address}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zip}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{orderDetails.shipping.country}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <IconTruck className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{orderDetails.shipping.method}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Tracking: {orderDetails.shipping.tracking}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <IconCreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {orderDetails.payment.method} ending in {orderDetails.payment.last4}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status: <span className="text-green-600 dark:text-green-400">{orderDetails.payment.status}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date: {orderDetails.payment.date}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-900 dark:text-white">${orderDetails.summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white">${orderDetails.summary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white">${orderDetails.summary.shipping.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 dark:border-neutral-700">
            <span className="text-base font-medium text-gray-900 dark:text-white">Total</span>
            <span className="text-base font-medium text-gray-900 dark:text-white">
              ${orderDetails.summary.total.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 