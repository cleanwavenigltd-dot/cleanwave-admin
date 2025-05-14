import React from 'react';
import { ShoppingBag, Package, Wallet, Users } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const VendorDashboard = () => {
  // Data for Sales Overview Chart
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales (₦)',
        data: [12000, 15000, 8000, 18000, 20000, 15000, 25000],
        borderColor: '#8CA566',
        backgroundColor: 'rgba(140, 165, 102, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Data for Product Performance Chart
  const productData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Units Sold',
        data: [50, 75, 100, 60, 90],
        backgroundColor: ['#8CA566', '#779254', '#4A5568', '#2D3748', '#6B7280'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
      <p className="text-sm text-gray-500">Welcome back! Here's an overview of your store's performance.</p>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#8CA566] text-white rounded-full flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-xl font-bold text-gray-800">120</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#779254] text-white rounded-full flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-gray-800">45</p>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4A5568] text-white rounded-full flex items-center justify-center">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Wallet Balance</p>
            <p className="text-xl font-bold text-gray-800">₦50,000</p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D3748] text-white rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-xl font-bold text-gray-800">30</p>
          </div>
        </div>
      </div>

      {/* Sales Overview Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Sales Overview</h2>
        <Line data={salesData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      {/* Product Performance Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Product Performance</h2>
        <Bar data={productData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-gray-800 border-b hover:bg-gray-50">
              <td className="py-2 px-4">#12345</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">2025-05-12</td>
              <td className="py-2 px-4">₦15,000</td>
              <td className="py-2 px-4">
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="text-sm text-gray-800 border-b hover:bg-gray-50">
              <td className="py-2 px-4">#12346</td>
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">2025-05-11</td>
              <td className="py-2 px-4">₦10,000</td>
              <td className="py-2 px-4">
                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                  Pending
                </span>
              </td>
            </tr>
            <tr className="text-sm text-gray-800 border-b hover:bg-gray-50">
              <td className="py-2 px-4">#12347</td>
              <td className="py-2 px-4">Michael Johnson</td>
              <td className="py-2 px-4">2025-05-10</td>
              <td className="py-2 px-4">₦20,000</td>
              <td className="py-2 px-4">
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                  Cancelled
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;