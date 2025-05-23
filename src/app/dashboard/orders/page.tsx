"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconShoppingCart,
  IconTruck,
  IconPackage,
  IconCheck,
  IconX,
  IconClock,
  IconPrinter,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCreditCard,
  IconEdit,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, Column } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  date: string;
  amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
  paymentMethod: string;
}

// Sample order data
const orders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "2024-03-15",
    amount: 299.99,
    status: "Delivered",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "2024-03-14",
    amount: 199.99,
    status: "Processing",
    items: 2,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Robert Johnson",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    date: "2024-03-13",
    amount: 499.99,
    status: "Shipped",
    items: 5,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    date: "2024-03-12",
    amount: 149.99,
    status: "Pending",
    items: 1,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    date: "2024-03-11",
    amount: 399.99,
    status: "Cancelled",
    items: 4,
    paymentMethod: "Credit Card",
  },
];

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Shipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }
};

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "Pending":
      return <IconClock className="w-4 h-4" />;
    case "Processing":
      return <IconPackage className="w-4 h-4" />;
    case "Shipped":
      return <IconTruck className="w-4 h-4" />;
    case "Delivered":
      return <IconCheck className="w-4 h-4" />;
    case "Cancelled":
      return <IconX className="w-4 h-4" />;
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: Column<Order>[] = [
    {
      header: "Order",
      accessorKey: "id",
      cell: (order) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
            <Image
              src={order.customer.avatar}
              alt={order.customer.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {order.id}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {order.customer.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (order) => (
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          ${order.amount.toFixed(2)}
        </div>
      ),
    },
    {
      header: "Items",
      accessorKey: "items",
      cell: (order) => (
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <IconShoppingCart className="w-4 h-4 mr-2" />
          {order.items} items
        </div>
      ),
    },
    {
      header: "Payment",
      accessorKey: "paymentMethod",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (order) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="ml-1">{order.status}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track your customer orders
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <IconPlus className="w-5 h-5 mr-2" />
            New Order
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <IconFilter size={20} />
            Filter
          </Button>
        </div>

        {/* Orders Table */}
        <DataTable
          columns={columns}
          data={orders}
          onEdit={(order) => {
            console.log("Edit order:", order);
          }}
          onDelete={(order) => {
            console.log("Delete order:", order);
          }}
          actions={[
            {
              label: "View Details",
              icon: <IconShoppingCart className="w-4 h-4 mr-2" />,
              onClick: (order) => setSelectedOrder(order),
              className: "text-blue-600 dark:text-blue-400",
            },
            {
              label: "Print Invoice",
              icon: <IconPrinter className="w-4 h-4 mr-2" />,
              onClick: (order) => {
                console.log("Print invoice for:", order);
              },
              className: "text-gray-600 dark:text-gray-400",
            },
          ]}
        />

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Order Details
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                      <Image
                        src={selectedOrder.customer.avatar}
                        alt={selectedOrder.customer.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedOrder.customer.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order #{selectedOrder.id}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1">{selectedOrder.status}</span>
                  </span>
                </div>

                {/* Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconMail className="w-5 h-5 mr-3" />
                      <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconPhone className="w-5 h-5 mr-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconMapPin className="w-5 h-5 mr-3" />
                      <span>123 Shipping St, City, Country</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconCreditCard className="w-5 h-5 mr-3" />
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconPackage className="w-5 h-5 mr-3" />
                      <span>{selectedOrder.items} items</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconTruck className="w-5 h-5 mr-3" />
                      <span>Standard Shipping</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Order Items
                  </h4>
                  <div className="space-y-4">
                    {[...Array(selectedOrder.items)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Product {index + 1}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {Math.floor(Math.random() * 3) + 1}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${(Math.random() * 100).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order Date
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedOrder.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Amount
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${selectedOrder.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log("Print invoice for:", selectedOrder);
                    }}
                  >
                    <IconPrinter className="w-4 h-4 mr-2" />
                    Print Invoice
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => {
                      console.log("Edit order:", selectedOrder);
                    }}
                  >
                    <IconEdit className="w-4 h-4 mr-2" />
                    Edit Order
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 