import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getVendorOrders } from '../../../../services/orderService';

const ProductChart = () => {
  const [productData, setProductData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Units Sold',
        data: [],
        backgroundColor: ['#8CA566', '#779254', '#4A5568', '#2D3748', '#6B7280'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('token');
        const orders = await getVendorOrders(token);

        // Process data for the chart
        const productMap = {};

        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (productMap[item.product_name]) {
              productMap[item.product_name] += item.quantity;
            } else {
              productMap[item.product_name] = item.quantity;
            }
          });
        });

        const labels = Object.keys(productMap);
        const data = Object.values(productMap);

        setProductData((prev) => ({
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
        console.error('Failed to fetch product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Product Performance</h2>
      <Bar data={productData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default ProductChart;