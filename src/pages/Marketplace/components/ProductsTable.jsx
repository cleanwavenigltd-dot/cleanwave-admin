// src/pages/Marketplace/ProductsTable.jsx
import React from 'react';
import Table from '../../../components/ui/Table';
import { FaBox, FaTags, FaDollarSign, FaLayerGroup } from 'react-icons/fa';

const ProductsTable = ({ data, loading }) => {
  const columns = [
    { label: 'Product', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Price (₦)', key: 'price' },
    { label: 'Stock', key: 'stock_quantity' },
  ];

  const icons = {
    name: <FaBox className="text-[#4C862D]" />,
    category: <FaTags className="text-[#4C862D]" />,
    price: <FaDollarSign className="text-[#4C862D]" />,
    stock_quantity: <FaLayerGroup className="text-[#4C862D]" />,
  };

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        icons={icons}
        loading={loading}
        rowsPerPage={8}
      />
    </div>
  );
};

export default ProductsTable;
