import React from 'react';

const MetricsCard = ({ icon, title, value, bgColor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
      <div className={`w-12 h-12 ${bgColor} text-white rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default MetricsCard;