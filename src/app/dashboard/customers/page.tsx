"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconFilter,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBuilding,
  IconEdit,
  IconTrash,
  IconPlus,
  IconX,
  IconCalendar,
  IconShoppingCart,
  IconCreditCard,
  IconHistory,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: "Active" | "Inactive";
  lastOrder: string;
  totalOrders: number;
  avatar: string;
}

interface Order {
  id: string;
  date: string;
  amount: number;
  status: string;
  items: number;
}

// Sample customer data
const customers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    address: "123 Business Ave, San Francisco, CA",
    status: "Active",
    lastOrder: "2024-03-15",
    totalOrders: 12,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    company: "Digital Innovations",
    address: "456 Tech Street, New York, NY",
    status: "Active",
    lastOrder: "2024-03-10",
    totalOrders: 8,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 456-7890",
    company: "Global Services",
    address: "789 Corporate Blvd, Chicago, IL",
    status: "Inactive",
    lastOrder: "2024-02-28",
    totalOrders: 5,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 234-5678",
    company: "Creative Solutions",
    address: "321 Design Street, Los Angeles, CA",
    status: "Active",
    lastOrder: "2024-03-12",
    totalOrders: 15,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 345-6789",
    company: "Global Tech",
    address: "789 Innovation Ave, Seattle, WA",
    status: "Active",
    lastOrder: "2024-03-14",
    totalOrders: 9,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 456-7890",
    company: "Digital Marketing Pro",
    address: "456 Market Street, Boston, MA",
    status: "Inactive",
    lastOrder: "2024-02-25",
    totalOrders: 6,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  }
];

// Sample order history data
const orderHistory: Order[] = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    amount: 299.99,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-03-01",
    amount: 199.99,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-02-15",
    amount: 499.99,
    status: "Delivered",
    items: 5,
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Customers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your customer information and interactions
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <IconPlus className="w-5 h-5 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search customers..."
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

        {/* Customers List */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                            <Image
                              src={customer.avatar}
                              alt={customer.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-700 ${
                            customer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <IconMail className="w-4 h-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <IconPhone className="w-4 h-4 mr-2" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <IconBuilding className="w-4 h-4 mr-2" />
                          {customer.company}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <IconMapPin className="w-4 h-4 mr-2" />
                          {customer.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total: {customer.totalOrders}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Last: {customer.lastOrder}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit action
                          }}
                        >
                          <IconEdit className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete action
                          }}
                        >
                          <IconTrash className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Details Dialog */}
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-4xl">
            {selectedCustomer && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Customer Details
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCustomer(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <IconX className="w-5 h-5" />
                    </Button>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Profile Section */}
                  <div className="md:col-span-1">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                          <Image
                            src={selectedCustomer.avatar}
                            alt={selectedCustomer.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-700 ${
                          selectedCustomer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedCustomer.name}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {selectedCustomer.company}
                      </p>
                      <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedCustomer.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}>
                        {selectedCustomer.status}
                      </span>
                    </div>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <IconMail className="w-5 h-5" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <IconPhone className="w-5 h-5" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <IconMapPin className="w-5 h-5" />
                        <span>{selectedCustomer.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <IconBuilding className="w-5 h-5" />
                        <span>{selectedCustomer.company}</span>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                      >
                        <IconEdit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
                      >
                        <IconTrash className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Order History Section */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Order History
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                        >
                          <IconPlus className="w-4 h-4 mr-2" />
                          New Order
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {orderHistory.map((order) => (
                          <div
                            key={order.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <IconShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {order.id}
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                  <IconCalendar className="w-4 h-4" />
                                  {order.date}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  ${order.amount.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {order.items} items
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {order.status}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <IconShoppingCart className="w-5 h-5" />
                          <span className="text-sm">Total Orders</span>
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                          {selectedCustomer.totalOrders}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <IconCreditCard className="w-5 h-5" />
                          <span className="text-sm">Total Spent</span>
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                          $1,299.97
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <IconHistory className="w-5 h-5" />
                          <span className="text-sm">Last Order</span>
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                          {selectedCustomer.lastOrder}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 