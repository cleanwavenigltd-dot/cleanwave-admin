import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import { getPickupRequests } from '../../../services/pickupService';
import { User, MapPin, Calendar, Clock, Package, CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react';

const PickupRequestsTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPickupRequests = async () => {
      try {
        const pickups = await getPickupRequests(token);
        setData(pickups);
      } catch (error) {
        console.error('Failed to fetch pickup requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPickupRequests();
  }, [token]);

  const handleViewDetails = (pickup) => {
    setSelectedPickup(pickup);
    setIsModalOpen(true);
  };

  // Enhanced status styling
  const getStatusStyles = (status) => {
    const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-semibold capitalize';
    
    switch (status) {
      case 'pending':
        return `${baseStyles} bg-yellow-100 text-yellow-800`;
      case 'completed':
        return `${baseStyles} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseStyles} bg-red-100 text-red-800`;
      case 'in_progress':
        return `${baseStyles} bg-blue-100 text-blue-800`;
      case 'scheduled':
        return `${baseStyles} bg-purple-100 text-purple-800`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="text-yellow-500" size={10} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={10} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={10} />;
      case 'in_progress':
        return <Clock className="text-blue-500" size={10} />;
      case 'scheduled':
        return <Calendar className="text-purple-500" size={10} />;
      default:
        return <Package className="text-gray-500" size={10} />;
    }
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'User Name', key: 'user_name' },
    { label: 'Category', key: 'category_name' },
    {
      label: 'Status',
      key: 'status',
      render: (status) => (
        <div className="flex items-center gap-">
          {getStatusIcon(status)}
          <span className={getStatusStyles(status)}>
            {status.split('_').join(' ')}
          </span>
        </div>
      ),
    },
    { label: 'Date', key: 'date', render: (date) => new Date(date).toLocaleDateString() },
    { label: 'Location', key: 'location' },
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
      <Table columns={columns} data={data} loading={loading} actions={actions} rowsPerPage={5} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        {selectedPickup && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Pickup Request Details</h2>
              <p className="text-gray-500 text-sm">ID: {selectedPickup.id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-4 flex items-center gap-2">
                  <User className="text-gray-500 text-[12px]" size={18} />
                  User Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px] text-[12px]">Name:</span>
                    <span className="text-gray-800 text-[12px] font-medium text-[12px]">{selectedPickup.user_name}</span>
                  </div>
                </div>
              </div>

              {/* Pickup Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-4 flex items-center gap-2">
                  <Package className="text-gray-500" size={18} />
                  Pickup Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-[12px]">Status:</span>
                    <span className={getStatusStyles(selectedPickup.status)}>
                      {getStatusIcon(selectedPickup.status)}
                      {selectedPickup.status.split('_').join(' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Category:</span>
                    <span className="text-gray-800 font-medium text-[12px]">{selectedPickup.category_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Weight:</span>
                    <span className="text-gray-800 font-medium text-[12px]">{selectedPickup.weight}kg</span>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-4 flex items-center gap-2">
                  <MapPin className="text-gray-500" size={18} />
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Address:</span>
                    <span className="text-gray-800 font-medium text-[12px] text-right">{selectedPickup.location}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[12px] text-gray-700 mb-4 flex items-center gap-2">
                  <Calendar className="text-gray-500" size={18} />
                  Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Date:</span>
                    <span className="text-gray-800 font-medium text-[12px]">
                      {new Date(selectedPickup.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-[12px]">Time:</span>
                    <span className="text-gray-800 font-medium text-[12px]">{selectedPickup.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes or Actions can be added here */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition"
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

export default PickupRequestsTable;