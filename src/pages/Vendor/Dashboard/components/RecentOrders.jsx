import React, { useEffect, useState } from 'react';
import Table from '../../../../components/ui/Table';
import { getVendorOrders } from '../../../../services/orderService';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getVendorOrders(token);
        setOrders(
          data.map((order) => ({
            order_id: `#${order.order_id}`,
            customer: order.items[0]?.product_name || 'Unknown',
            date: new Date(order.order_date).toLocaleDateString(),
            total: `₦${order.total_price.toLocaleString()}`,
            status: 'Completed', // Assuming all orders are completed for now
          }))
        );
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { key: 'order_id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    { key: 'total', label: 'Total' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
      <Table
        columns={columns}
        data={orders}
        loading={loading}
        rowsPerPage={5}
      />
    </div>
  );
};

export default RecentOrders;