import React, { useEffect, useState } from 'react';
import Table from '../../../components/ui/Table';
import { getVendorOrders } from '../../../services/orderService';
import { Tag, ClipboardList, DollarSign, Calendar, Layers } from 'lucide-react';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getVendorOrders(token);
        setOrders(
          data.map((order) => ({
            id: order.id,
            customer: order.customer_name,
            total: `₦${order.total_price.toLocaleString()}`,
            date: new Date(order.order_date).toLocaleDateString(),
            status: order.status,
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
    { key: 'id', label: 'Order ID', icon: <Tag size={16} /> },
    { key: 'customer', label: 'Customer', icon: <ClipboardList size={16} /> },
    { key: 'total', label: 'Total Price', icon: <DollarSign size={16} /> },
    { key: 'date', label: 'Order Date', icon: <Calendar size={16} /> },
    { key: 'status', label: 'Status', icon: <Layers size={16} /> },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Orders</h2>
      <Table
        columns={columns}
        data={orders}
        loading={loading}
        rowsPerPage={5}
        icons={columns.reduce((acc, col) => {
          acc[col.key] = col.icon;
          return acc;
        }, {})}
      />
    </div>
  );
};

export default VendorOrders;