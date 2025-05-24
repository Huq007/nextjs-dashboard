'use client';

import { useEffect, useState } from 'react';
import { getInventory, InventoryItem } from '../services/inventory';
import { useAuth } from '../context/AuthContext';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token found');
        }
        const data = await getInventory(token);
        setInventory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token]);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Product Name</th>
              <th className="px-6 py-3 border-b text-left">SKU</th>
              <th className="px-6 py-3 border-b text-left">Category</th>
              <th className="px-6 py-3 border-b text-right">Quantity</th>
              <th className="px-6 py-3 border-b text-right">Unit Price</th>
              <th className="px-6 py-3 border-b text-left">Location</th>
              <th className="px-6 py-3 border-b text-right">Min Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{item.product_name}</td>
                <td className="px-6 py-4 border-b">{item.sku}</td>
                <td className="px-6 py-4 border-b">{item.category}</td>
                <td className="px-6 py-4 border-b text-right">
                  <span className={`${item.quantity <= item.min_stock_level ? 'text-red-500' : 'text-green-500'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 border-b text-right">
                  ${item.unit_price.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">{item.location}</td>
                <td className="px-6 py-4 border-b text-right">{item.min_stock_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 