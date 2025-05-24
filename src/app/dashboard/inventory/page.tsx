"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  IconSearch,
  IconPlus,
  IconFilter,
  IconX,
  IconEdit,
  IconTrash,
  IconCategory,
  IconMenu2,
} from "@tabler/icons-react";
import Image from 'next/image';
import { getInventory, InventoryItem } from '../../services/inventory';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

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
                  Inventory Details
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

// Add Item Modal Component
function AddItemModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    product_name: "",
    sku: "",
    category: "",
    quantity: "",
    unit_price: "",
    supplier: "",
    location: "",
    min_stock_level: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-neutral-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              SKU
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Storage">Storage</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unit Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.unit_price}
              onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Supplier
            </label>
            <input
              type="text"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Min Stock Level
            </label>
            <input
              type="number"
              value={formData.min_stock_level}
              onChange={(e) => setFormData({ ...formData, min_stock_level: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, setToken } = useAuth();
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        if (!token) {
          console.log('No token available');
          router.push('/login');
          return;
        }

        // Clear any existing error
        setError(null);
        
        console.log('Using token:', token);
        const data = await getInventory(token);
        setInventory(data);
      } catch (err) {
        console.error('Error details:', err);
        if (err instanceof Error) {
          if (err.message.includes('Authentication failed') || err.message.includes('Invalid token')) {
            // Clear the invalid token
            setToken(null);
            localStorage.removeItem('token');
            router.push('/login');
          } else {
            setError(err.message);
          }
        } else {
          setError('Failed to fetch inventory');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token, router, setToken]);

  // Calculate pagination
  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = inventory.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your product inventory and stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <IconMenu2 className="mr-2 h-4 w-4" />
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <IconPlus className="mr-2 h-4 w-4" />
            Add Item
          </motion.button>
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
            placeholder="Search inventory..."
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

      {/* Inventory Table */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Price
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
              {currentItems.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.product_name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.product_name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.sku}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <IconCategory className="mr-2 h-4 w-4" />
                      {item.category}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ${item.unit_price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={
                        item.status === "In Stock"
                          ? "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.status === "Low Stock"
                          ? "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {item.status}
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, inventory.length)}
              </span>{" "}
              of <span className="font-medium">{inventory.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 dark:ring-neutral-700 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-white dark:ring-neutral-700 dark:hover:bg-neutral-700'
                  } ${page === '...' ? 'cursor-default' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 dark:ring-neutral-700 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Slide Drawer */}
      <SlideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {selectedItem && (
          <div className="space-y-8">
            {/* Product Image with hover effect */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-700"
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.product_name}
                width={400}
                height={400}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white"
                >
                  {selectedItem.product_name}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-1 text-sm text-gray-200"
                >
                  {selectedItem.sku}
                </motion.p>
              </div>
            </motion.div>

            {/* Details Grid with staggered animation */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "SKU", value: selectedItem.sku },
                { label: "Category", value: selectedItem.category },
                { label: "Stock", value: selectedItem.quantity },
                { label: "Price", value: `$${selectedItem.unit_price.toFixed(2)}` },
                { label: "Supplier", value: selectedItem.supplier || 'N/A' },
                { label: "Location", value: selectedItem.location || 'N/A' },
                { label: "Min Stock Level", value: selectedItem.min_stock_level },
                { label: "Description", value: selectedItem.description || 'No description available' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
                >
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Status Badge with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center"
            >
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                  selectedItem.status === "In Stock"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : selectedItem.status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {selectedItem.status}
              </span>
            </motion.div>

            {/* Action Buttons with hover effects */}
            <div className="flex justify-end space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsAddModalOpen(true);
                }}
                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700"
              >
                Edit Item
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Delete Item
              </motion.button>
            </div>
          </div>
        )}
      </SlideDrawer>

      {/* Add Item Modal */}
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
} 