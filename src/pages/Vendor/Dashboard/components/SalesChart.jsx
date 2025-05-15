import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getVendorOrders } from '../../../../services/orderService';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales (₦)',
        data: [],
        borderColor: '#8CA566',
        backgroundColor: 'rgba(140, 165, 102, 0.2)',
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const orders = await getVendorOrders(token);

        // Process data for the chart
        const labels = orders.map((order) =>
          new Date(order.order_date).toLocaleDateString()
        );
        const data = orders.map((order) => order.total_price);

        setSalesData((prev) => ({
          ...prev,
          labels,
          datasets: [
            {
              ...prev.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Sales Overview</h2>
      <Line
        data={salesData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
        }}
      />
    </div>
  );
};

export default SalesChart;