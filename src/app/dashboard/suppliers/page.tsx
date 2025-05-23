"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPackage,
  IconTruck,
  IconStar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, Column } from "@/components/ui/data-table";

interface Supplier {
  id: number;
  name: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  rating: number;
  status: "Active" | "Inactive";
  lastOrder: string;
  totalOrders: number;
}

// Sample supplier data
const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "contact@techsolutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, San Francisco, CA",
    category: "Electronics",
    rating: 4.5,
    status: "Active",
    lastOrder: "2024-03-15",
    totalOrders: 45,
  },
  {
    id: 2,
    name: "Global Electronics",
    logo: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sales@globalelectronics.com",
    phone: "+1 (555) 987-6543",
    address: "456 Tech Street, New York, NY",
    category: "Electronics",
    rating: 4.2,
    status: "Active",
    lastOrder: "2024-03-10",
    totalOrders: 32,
  },
  {
    id: 3,
    name: "Office Supplies Co.",
    logo: "https://randomuser.me/api/portraits/men/67.jpg",
    email: "info@officesupplies.com",
    phone: "+1 (555) 456-7890",
    address: "789 Corporate Blvd, Chicago, IL",
    category: "Office Supplies",
    rating: 4.0,
    status: "Inactive",
    lastOrder: "2024-02-28",
    totalOrders: 18,
  },
  {
    id: 4,
    name: "Furniture World",
    logo: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "contact@furnitureworld.com",
    phone: "+1 (555) 234-5678",
    address: "321 Design Street, Los Angeles, CA",
    category: "Furniture",
    rating: 4.8,
    status: "Active",
    lastOrder: "2024-03-12",
    totalOrders: 27,
  },
  {
    id: 5,
    name: "Digital Solutions",
    logo: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "sales@digitalsolutions.com",
    phone: "+1 (555) 345-6789",
    address: "789 Innovation Ave, Seattle, WA",
    category: "Software",
    rating: 4.6,
    status: "Active",
    lastOrder: "2024-03-14",
    totalOrders: 39,
  },
];

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Column<Supplier>[] = [
    {
      header: "Supplier",
      accessorKey: "name",
      cell: (supplier) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
            <Image
              src={supplier.logo}
              alt={supplier.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {supplier.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {supplier.category}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      cell: (supplier) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <IconMail className="w-4 h-4 mr-2" />
            {supplier.email}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <IconPhone className="w-4 h-4 mr-2" />
            {supplier.phone}
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "address",
      cell: (supplier) => (
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <IconMapPin className="w-4 h-4 mr-2" />
          {supplier.address}
        </div>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (supplier) => (
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <IconStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(supplier.rating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill={i < Math.floor(supplier.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {supplier.rating}
          </span>
        </div>
      ),
    },
    {
      header: "Orders",
      accessorKey: "totalOrders",
      cell: (supplier) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <IconPackage className="w-4 h-4 mr-2" />
            Total: {supplier.totalOrders}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last: {supplier.lastOrder}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (supplier) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            supplier.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
          }`}
        >
          {supplier.status}
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
              Suppliers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your supplier relationships and orders
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <IconPlus className="w-5 h-5 mr-2" />
            Add Supplier
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search suppliers..."
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

        {/* Suppliers Table */}
        <DataTable
          columns={columns}
          data={suppliers}
          onEdit={(supplier) => {
            console.log("Edit supplier:", supplier);
          }}
          onDelete={(supplier) => {
            console.log("Delete supplier:", supplier);
          }}
          actions={[
            {
              label: "View Details",
              icon: <IconBuilding className="w-4 h-4 mr-2" />,
              onClick: (supplier) => {
                console.log("View supplier details:", supplier);
              },
              className: "text-blue-600 dark:text-blue-400",
            },
            {
              label: "Place Order",
              icon: <IconTruck className="w-4 h-4 mr-2" />,
              onClick: (supplier) => {
                console.log("Place order with:", supplier);
              },
              className: "text-green-600 dark:text-green-400",
            },
          ]}
        />
      </div>
    </div>
  );
} 