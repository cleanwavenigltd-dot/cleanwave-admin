import React, { useState } from 'react';
import { IoCubeOutline, IoConstructOutline, IoDocumentTextOutline, IoWineOutline, IoLeafOutline } from 'react-icons/io5';

// Dummy data for demonstration
const dummyPickups = [
  {
    id: 6,
    user_id: 30,
    agent_id: 23,
    waste_category_id: 1,
    date: "2025-04-13T23:00:00.000Z",
    time: "21:23:00",
    status: "pending",
    points_assigned: null,
    location: "Mr. John Smith, 456 Main Street, Tarauni, Kano State, Nigeria",
    weight: "0.00",
    user_name: "Lamin Jajee",
    user_email: "laminubajajee@gmail.com",
    category_id: 1,
    category_name: "Plastic",
    icon: "plastic",
    description: "Waste made from plastic materials."
  },
  {
    id: 6,
    user_id: 30,
    agent_id: 23,
    waste_category_id: 1,
    date: "2025-04-13T23:00:00.000Z",
    time: "21:23:00",
    status: "pending",
    points_assigned: null,
    location: "Mr. John Smith, 456 Main Street, Tarauni, Kano State, Nigeria",
    weight: "0.00",
    user_name: "Lamin Jajee",
    user_email: "laminubajajee@gmail.com",
    category_id: 1,
    category_name: "Plastic",
    icon: "plastic",
    description: "Waste made from plastic materials."
  },
  {
    id: 7,
    user_id: 30,
    agent_id: 23,
    waste_category_id: 2,
    date: "2025-04-14T23:00:00.000Z",
    time: "10:00:00",
    status: "accepted",
    points_assigned: 10,
    location: "Mr. John Smith, 456 Main Street, Tarauni, Kano State, Nigeria",
    weight: "2.00",
    user_name: "Lamin Jajee",
    user_email: "laminubajajee@gmail.com",
    category_id: 2,
    category_name: "Metal",
    icon: "metal",
    description: "Waste made from metal materials."
  },
  {
    id: 8,
    user_id: 30,
    agent_id: 23,
    waste_category_id: 3,
    date: "2025-04-15T23:00:00.000Z",
    time: "12:00:00",
    status: "completed",
    points_assigned: 20,
    location: "Mr. John Smith, 456 Main Street, Tarauni, Kano State, Nigeria",
    weight: "5.00",
    user_name: "Lamin Jajee",
    user_email: "laminubajajee@gmail.com",
    category_id: 3,
    category_name: "Paper",
    icon: "paper",
    description: "Waste made from paper materials."
  },
  {
    id: 9,
    user_id: 30,
    agent_id: 23,
    waste_category_id: 4,
    date: "2025-04-16T23:00:00.000Z",
    time: "14:00:00",
    status: "rejected",
    points_assigned: null,
    location: "Mr. John Smith, 456 Main Street, Tarauni, Kano State, Nigeria",
    weight: "1.00",
    user_name: "Lamin Jajee",
    user_email: "laminubajajee@gmail.com",
    category_id: 4,
    category_name: "Glass",
    icon: "glass",
    description: "Waste made from glass materials."
  }
];

const statusTabs = [
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'completed', label: 'Completed' },
];

// Map icon string to real icon component
const categoryIcons = {
  plastic: <IoCubeOutline size={28} className="text-[#4C862D]" />,
  metal: <IoConstructOutline size={28} className="text-[#4C862D]" />,
  paper: <IoDocumentTextOutline size={28} className="text-[#4C862D]" />,
  glass: <IoWineOutline size={28} className="text-[#4C862D]" />,
  organic: <IoLeafOutline size={28} className="text-[#4C862D]" />,
};

const PickupStatusTabs = ({ pickups = dummyPickups }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const filteredPickups = pickups.filter(p => p.status === activeTab);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 max-h-[70vh] flex flex-col">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4 overflow-x-auto">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-2 font-semibold transition border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-[#8CA566] text-[#8CA566]'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs font-bold">
              ({pickups.filter(p => p.status === tab.key).length})
            </span>
          </button>
        ))}
      </div>
      {/* Pickup List */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredPickups.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No {activeTab} pickups.</div>
        ) : (
          <div className="space-y-3">
            {filteredPickups.map(pickup => (
              <div key={pickup.id} className="flex items-center gap-3 bg-[#f8faf5] rounded-lg p-3 min-w-0">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e6f2d9] rounded-full flex items-center justify-center">
                  {categoryIcons[pickup.icon] || <IoCubeOutline size={28} className="text-[#4C862D]" />}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupStatusTabs;