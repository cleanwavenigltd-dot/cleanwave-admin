import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiClock, FiCheckCircle, FiXCircle, FiLoader, FiChevronLeft, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const STATUS_TABS = [
  { key: 'pending', label: 'Pending', icon: <FiLoader className="inline mr-1" /> },
  { key: 'accepted', label: 'Accepted', icon: <FiCheckCircle className="inline mr-1" /> },
  { key: 'rejected', label: 'Rejected', icon: <FiXCircle className="inline mr-1" /> },
  { key: 'completed', label: 'Completed', icon: <FiCheckCircle className="inline mr-1" /> },
];

const statusColors = {
  pending: 'text-yellow-600 bg-yellow-50',
  accepted: 'text-blue-600 bg-blue-50',
  rejected: 'text-red-600 bg-red-50',
  completed: 'text-green-600 bg-green-50',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

const PickupsHistory = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/pickups/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPickups(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error('Failed to load pickup history.');
        setPickups([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchHistory();
  }, [token]);

  const filteredPickups = pickups.filter((p) => p.status === activeTab);

  return (
    <div className="w-full min-h-screen bg-[#f8faf5] flex flex-col items-center py-4 px-1 sm:px-0">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-2 sm:p-4 md:p-8">
        {/* Back Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#f2f2f2] mb-2"
          onClick={() => navigate(-1)}
        >
          <FiChevronLeft size={20} className="text-[#8CA566]" />
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-[#8CA566] text-center mb-4">Pickup History</h2>

        {/* Scrollable Tabs */}
        <div className="w-full overflow-x-auto mb-4 sm:mb-6">
          <div className="flex gap-2 min-w-[400px] sm:min-w-0">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm flex items-center transition ${
                  activeTab === tab.key
                    ? 'bg-[#8CA566] text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#e6f2d9]'
                }`}
                onClick={() => setActiveTab(tab.key)}
                style={{ minWidth: 100 }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-10 text-[#8CA566]">
            <FiLoader className="animate-spin mx-auto mb-2" size={32} />
            Loading...
          </div>
        ) : filteredPickups.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No {activeTab} pickups found.
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredPickups.map((pickup) => (
              <div
                key={pickup.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-3 sm:p-4 shadow-sm ${statusColors[pickup.status] || ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base text-[#222] mb-1 truncate">
                    {pickup.category_name || 'Waste Pickup'}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-1 truncate">
                    <FiMapPin className="mr-1" /> {pickup.location}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-600">
                    <span>
                      <FiClock className="inline mr-1" />
                      {formatDate(pickup.date)} {pickup.time}
                    </span>
                    <span>
                      Status:{' '}
                      <span className="capitalize font-semibold">
                        {pickup.status}
                      </span>
                    </span>
                    {pickup.weight && (
                      <span>
                        Weight: <span className="font-semibold">{pickup.weight} kg</span>
                      </span>
                    )}
                    {pickup.points_assigned && (
                      <span>
                        Points: <span className="font-semibold">{pickup.points_assigned}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0 flex items-center justify-end">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      statusColors[pickup.status] || 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pickup.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupsHistory;