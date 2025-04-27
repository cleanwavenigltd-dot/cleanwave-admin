import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Users, ShieldCheck, Store, Building } from 'lucide-react';
import { getTotals } from '../../../services/authService';

const KPICards = () => {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        // Simulate a delay for smoother loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getTotals(token);
        setTotals(data);
      } catch (error) {
        console.error('Failed to fetch totals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, [token]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-gray-100"
            >
              <div className="p-3 rounded-full bg-gray-300 w-10 h-10 animate-pulse"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 bg-gray-300 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-full w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  const kpiData = [
    {
      label: 'Total Users',
      value: totals?.total_users || 0,
      icon: <Users size={20} />,
      color: 'bg-[#E0F7FA]',
    },
    {
      label: 'Agents',
      value: totals?.total_agents || 0,
      icon: <ShieldCheck size={20} />,
      color: 'bg-[#F1F8E9]',
    },
    {
      label: 'Vendors',
      value: totals?.total_vendors || 0,
      icon: <Store size={20} />,
      color: 'bg-[#FFF3E0]',
    },
    {
      label: 'Stores',
      value: totals?.total_stores || 0,
      icon: <Building size={20} />,
      color: 'bg-[#F3E5F5]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 rounded-2xl shadow-md ${kpi.color}`}
        >
          <div className="p-3 rounded-full bg-white text-[#8CA566] shadow">
            {kpi.icon}
          </div>
          <div>
            <p className="text-gray-600 text-[12px]">{kpi.label}</p>
            <h3 className="font-bold text-[14px] text-[#333]">{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;