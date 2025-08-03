export const updateOrder = async (orderData: {
  id: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  shipping: {
    method: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  payment: {
    status: 'pending' | 'paid' | 'failed';
    method: string;
  };
  notes?: string;
}) => {
  try {
    const response = await fetch(`/api/orders/${orderData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}; 