import React from 'react';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';

const placeholderImg = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const AgentCard = ({ agent, onClick }) => (
  <div
    className="flex items-center bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer px-3 py-3"
    style={{ minWidth: 0 }}
    onClick={onClick}
  >
    <img
      src={placeholderImg}
      alt={agent.name}
      className="w-12 h-12 rounded-full object-cover mr-4 border border-[#e6f2d9]"
    />
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-sm text-[#222] truncate">{agent.name}</div>
      <div className="flex items-center mt-1 text-xs text-[#8CA566]">
        <FiMapPin className="mr-1" size={13} />
        5km away
      </div>
    </div>
    <div className="ml-3 bg-[#8CA566] rounded-full p-2 flex items-center justify-center">
      <FiArrowRight size={16} color="#fff" />
    </div>
  </div>
);

export default AgentCard;