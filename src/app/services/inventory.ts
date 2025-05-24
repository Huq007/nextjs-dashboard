const API_URL = 'http://localhost:5000/api';

export interface InventoryItem {
  id: number;
  product_name: string;
  sku: string;
  category: string;
  quantity: number;
  unit_price: number;
  supplier: string;
  location: string;
  min_stock_level: number;
  created_at: string;
  updated_at: string;
  last_restock_date: string;
  description: string;
  // Computed fields
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

export const getInventory = async (token: string): Promise<InventoryItem[]> => {
  try {
    if (!token) {
      console.error('No token provided to getInventory');
      throw new Error('Authentication token is missing');
    }

    // Remove 'Bearer ' prefix if it exists
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    console.log('Fetching inventory with token:', cleanToken.substring(0, 10) + '...');
    
    const response = await fetch(`${API_URL}/inventory`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    console.log('Inventory response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch inventory';
      try {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        console.error('Error parsing error response:', e);
        errorMessage = response.statusText || errorMessage;
      }
      
      // Handle specific error cases
      if (response.status === 401 || response.status === 422) {
        console.error('Authentication error:', errorMessage);
        throw new Error('Authentication failed. Please log in again.');
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Received inventory data:', data);
    
    // Transform the data to include computed fields
    return data.map((item: any) => ({
      ...item,
      status: item.quantity > item.min_stock_level 
        ? 'In Stock' 
        : item.quantity > 0 
          ? 'Low Stock' 
          : 'Out of Stock',
      image: `https://picsum.photos/seed/${item.id}/200/200` // Placeholder image
    }));
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
}; 