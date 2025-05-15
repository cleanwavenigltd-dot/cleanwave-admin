import React from 'react';
import ProductsTable from './components/ProductsTable';

const VendorProducts = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Products</h1>
      <ProductsTable />
    </div>
  );
};

export default VendorProducts;