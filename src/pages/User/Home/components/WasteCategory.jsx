import React, { useState } from 'react';
import { IoCubeOutline, IoConstructOutline, IoDocumentTextOutline, IoWineOutline, IoLeafOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: '1', name: 'Plastic', icon: <IoCubeOutline size={20} /> },
  { id: '2', name: 'Metal', icon: <IoConstructOutline size={20} /> },
  { id: '3', name: 'Paper', icon: <IoDocumentTextOutline size={20} /> },
  { id: '4', name: 'Glass', icon: <IoWineOutline size={20} /> },
  { id: '5', name: 'Organic', icon: <IoLeafOutline size={20} /> },
];

const WasteCategory = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(categories[0].id);
  const [lastClickedId, setLastClickedId] = useState(null);

  const handleClick = (item) => {
    if (item.id === activeId && item.id === lastClickedId) {
      navigate('/pickups');
      return;
    }
    setLastClickedId(activeId);
    setActiveId(item.id);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-4">
      <div
        className="flex gap-4 min-w-0 overflow-x-auto no-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`flex items-center rounded-lg transition-all duration-200 overflow-hidden
                ${isActive ? 'bg-[#4C862D] px-6' : 'bg-[#8CA566] justify-center'}
                shadow text-white`}
              style={{
                height: '44px',
                minWidth: isActive ? 220 : 64,
                maxWidth: isActive ? 260 : 64,
                width: isActive ? 'auto' : 64,
                fontSize: '1rem',
              }}
            >
              {item.icon}
              {isActive && (
                <span className="ml-3 font-medium whitespace-nowrap">{item.name}</span>
              )}
            </button>
          );
        })}
      </div>
      <style>{`
        .no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

export default WasteCategory;