import React, { useState, useEffect } from 'react';
import { IoCubeOutline, IoConstructOutline, IoDocumentTextOutline, IoWineOutline, IoLeafOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const statusTabs = [
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'completed', label: 'Completed' },
];

const categoryIcons = {
  plastic: <IoCubeOutline size={28} className="text-[#4C862D]" />,
  metal: <IoConstructOutline size={28} className="text-[#4C862D]" />,
  paper: <IoDocumentTextOutline size={28} className="text-[#4C862D]" />,
  glass: <IoWineOutline size={28} className="text-[#4C862D]" />,
  organic: <IoLeafOutline size={28} className="text-[#4C862D]" />,
};

const CARD_HEIGHT = 90; // px, adjust as needed

const PickupStatusTabs = () => {
  const token = useSelector((state) => state.auth.token);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchPickups = async () => {
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
    if (token) fetchPickups();
  }, [token]);

  const filteredPickups = pickups.filter(p => p.status === activeTab);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 flex flex-col">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4 overflow-x-auto no-scrollbar">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-2 font-semibold transition border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-[#8CA566] text-[#8CA566] bg-[#e6f2d9]'
                : 'border-transparent text-gray-500 bg-transparent'
            }`}
            style={{
              minWidth: 100,
              borderRadius: '8px 8px 0 0',
              fontWeight: activeTab === tab.key ? 700 : 500,
              boxShadow: activeTab === tab.key ? '0 2px 8px #e6f2d9' : 'none',
            }}
          >
            {tab.label}
            <span className="ml-1 text-xs font-bold">
              ({pickups.filter(p => p.status === tab.key).length})
            </span>
          </button>
        ))}
      </div>
      {/* Pickup List - vertical scroll, only two cards visible at a time */}
      <div
        className="flex-1 overflow-y-auto space-y-3"
        style={{
          maxHeight: `${CARD_HEIGHT * 2 + 16}px`, // 2 cards + gap
          minHeight: `${CARD_HEIGHT * 2 + 16}px`,
        }}
      >
        {loading ? (
          [1, 2].map(idx => (
            <div key={idx} className="w-full h-[80px] bg-[#f8faf5] rounded-lg animate-pulse" />
          ))
        ) : filteredPickups.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No {activeTab} pickups.</div>
        ) : (
          filteredPickups.map(pickup => (
            <div
              key={pickup.id}
              className="w-full bg-[#f8faf5] rounded-lg p-3 flex items-center gap-3 min-w-0"
              style={{ minHeight: CARD_HEIGHT, maxHeight: CARD_HEIGHT, overflow: 'hidden' }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#e6f2d9] rounded-full flex items-center justify-center">
                {categoryIcons[(pickup.category_name || '').toLowerCase()] || <IoCubeOutline size={28} className="text-[#4C862D]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#4C862D] truncate">{pickup.category_name}</div>
                <div className="text-xs text-gray-500">
                  {new Date(pickup.date).toLocaleDateString()} &bull; {pickup.time}
                </div>
                <div className="text-xs text-gray-500 truncate">{pickup.location}</div>
              </div>
              <div className="text-xs text-gray-600 text-right min-w-[60px]">
                {pickup.status === 'completed' && (
                  <span className="bg-[#e6f2d9] text-[#4C862D] px-2 py-1 rounded font-bold">+{pickup.points_assigned} pts</span>
                )}
                {pickup.status === 'pending' && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">Pending</span>
                )}
                {pickup.status === 'accepted' && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">Accepted</span>
                )}
                {pickup.status === 'rejected' && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">Rejected</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* If more than 2, show a scroll indicator */}
      {!loading && filteredPickups.length > 2 && (
        <div className="flex justify-center mt-2">
          <span className="text-gray-400 text-xs">Scroll for more</span>
        </div>
      )}
    </div>
  );
};

export default PickupStatusTabs;