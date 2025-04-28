import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import { getOrders } from '../../../services/orderService';
import { Eye, Package, User, Mail, DollarSign, CalendarDays } from 'lucide-react';

const OrdersTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(token);
        const ordersData = Array.isArray(response) ? response : response?.orders || [];
        setData(ordersData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const columns = [
    { label: 'ID', key: 'id', render: (id) => <span className="font-mono">#{id}</span> },
    { label: 'User Name', key: 'user_name', render: (name) => <span className="font-medium text-[12px]">{name || 'N/A'}</span> },
    { label: 'Email', key: 'email', render: (email) => <span className="text-gray-600 text-[12px]">{email}</span> },
    { label: 'Price', key: 'price', render: (price) => <span className="font-medium text-[12px] text-green-600">${price?.toFixed(2) || '0.00'}</span> },
    { label: 'Date', key: 'created_at', render: (date) => (
        <div className="flex items-center gap-1">
          <CalendarDays size={14} className="text-gray-400" />
          <span>{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
        </div>
      ) 
    },
  ];

  const actions = [
    {
      label: <Eye size={16} />,
      className: 'text-blue-500 hover:text-blue-700 transition',
      onClick: handleViewDetails,
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <Table 
          columns={columns} 
          data={data}
          loading={loading} 
          actions={actions} 
          rowsPerPage={5}
          emptyState={
            <div className="py-12 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-[12px] font-medium text-[12px] text-gray-900">No orders found</h3>
              <p className="text-gray-500 mt-1">There are currently no orders to display</p>
            </div>
          }
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="text-blue-500" size={20} />
                Order Details
              </h2>
              <p className="text-gray-500 text-sm">Order ID: #{selectedOrder.id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-3 flex items-center gap-2">
                  <User className="text-gray-500" size={18} />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Name:</span>
                    <span className="text-gray-800 font-medium text-[12px]">{selectedOrder.user_name}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign className="text-gray-500" size={18} />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Total Price:</span>
                    <span className="text-green-600 font-medium text-[12px]">₦{selectedOrder.price?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Date:</span>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} className="text-gray-400" />
                      <span className="text-gray-800 text-[12px]">
                        {new Date(selectedOrder.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="text-gray-500" size={18} />
                  Order Items
                </h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div
                      key={`${item.product_name}-${index}`}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium text-[12px]">{item.product_name}</span>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-gray-600 text-[12px]">Qty: {item.quantity}</span>
                        <span className="text-gray-800 font-medium text-[12px]">₦{item.total_price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition font-medium text-[12px]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersTable;