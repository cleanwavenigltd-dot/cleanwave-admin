import React from 'react';

const MetricsCard = ({ icon, title, value, bgColor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
      {/* Icon Section */}
      <div
        className={`w-14 h-14 ${bgColor} text-white rounded-full flex items-center justify-center shadow-md`}
      >
        {icon}
      </div>

      {/* Text Section */}
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default MetricsCard;