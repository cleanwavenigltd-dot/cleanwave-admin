import React from 'react';
import { Users, ShieldCheck, Store, Building } from 'lucide-react';

const kpiData = [
  { label: 'Total Users', value: 1245, icon: <Users size={20} />, color: 'bg-[#E0F7FA]' },
  { label: 'Agents', value: 120, icon: <ShieldCheck size={20} />, color: 'bg-[#F1F8E9]' },
  { label: 'Vendors', value: 45, icon: <Store size={20} />, color: 'bg-[#FFF3E0]' },
  { label: 'Stores', value: 60, icon: <Building size={20} />, color: 'bg-[#F3E5F5]' },
];

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 rounded-2xl shadow-md ${kpi.color}`}
        >
          <div className="p-3 rounded-full bg-white text-[#8CA566] shadow">{kpi.icon}</div>
          <div>
            <p className="text-gray-600 text-sm">{kpi.label}</p>
            <h3 className="font-bold text-xl text-[#333]">{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
