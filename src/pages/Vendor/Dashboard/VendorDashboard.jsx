import React, { useEffect, useState } from 'react';
import { ShoppingBag, Package, Wallet, Users } from 'lucide-react';
import MetricsCard from './components/MetricsCard';
import SalesChart from './components/SalesChart';
import ProductChart from './components/ProductChart';
import RecentOrders from './components/RecentOrders';
import { getVendorDashboardData } from '../../../services/authService';

const VendorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getVendorDashboardData(token);
        setDashboardData(data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
      <p className="text-sm text-gray-500">Welcome back! Here's an overview of your store's performance.</p>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          icon={<ShoppingBag size={24} />}
          title="Total Products"
          value={dashboardData?.total_products || 0}
          bgColor="bg-[#8CA566]"
        />
        <MetricsCard
          icon={<Package size={24} />}
          title="Total Orders"
          value={dashboardData?.total_orders || 0}
          bgColor="bg-[#779254]"
        />
        <MetricsCard
          icon={<Wallet size={24} />}
          title="Wallet Balance"
          value={`₦${dashboardData?.wallet_balance || '0.00'}`}
          bgColor="bg-[#4A5568]"
        />
        <MetricsCard
          icon={<Users size={24} />}
          title="Total Customers"
          value={dashboardData?.total_customers || 0}
          bgColor="bg-[#2D3748]"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <ProductChart />
      </div>

      {/* Recent Orders Section */}
      <RecentOrders />
    </div>
  );
};

export default VendorDashboard;