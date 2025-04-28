import React from 'react';
import OrdersTable from './components/OrdersTable';

const OrderManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>
      <OrdersTable />
    </div>
  );
};

export default OrderManagement;