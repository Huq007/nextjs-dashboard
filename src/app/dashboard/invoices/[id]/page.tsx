"use client";

import { motion } from "framer-motion";
import {
  IconFileInvoice,
  IconDownload,
  IconPrinter,
  IconArrowLeft,
  IconCalendar,
  IconBuilding,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";

// Dummy data for demonstration
const invoice = {
  id: "INV-001",
  customer: {
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, New York, NY 10001",
  },
  items: [
    {
      description: "Web Development Services",
      quantity: 1,
      rate: 2000.00,
      amount: 2000.00,
    },
    {
      description: "UI/UX Design",
      quantity: 1,
      rate: 500.00,
      amount: 500.00,
    },
  ],
  subtotal: 2500.00,
  tax: 250.00,
  total: 2750.00,
  status: "paid",
  date: "2024-03-31",
  dueDate: "2024-04-30",
  notes: "Thank you for your business!",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export default function InvoiceViewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/invoices"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Invoice {invoice.id}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View invoice details
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
          >
            <IconDownload className="mr-2 h-4 w-4" />
            Download
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
          >
            <IconPrinter className="mr-2 h-4 w-4" />
            Print
          </motion.button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Status Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Status
                </h2>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(
                    invoice.status
                  )}`}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${invoice.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <IconBuilding className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invoice.customer.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {invoice.customer.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <IconMail className="mr-3 h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {invoice.customer.email}
                </p>
              </div>
              <div className="flex items-center">
                <IconPhone className="mr-3 h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {invoice.customer.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Invoice Details */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Invoice Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <IconFileInvoice className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Invoice Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invoice.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <IconCalendar className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invoice.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <IconCalendar className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {invoice.dueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Items
            </h2>
            <div className="space-y-4">
              {invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0 dark:border-neutral-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} × ${item.rate.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${item.amount.toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">
                    ${invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tax (10%)</span>
                  <span className="text-gray-900 dark:text-white">
                    ${invoice.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-neutral-700">
                  <span className="font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Notes
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {invoice.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 