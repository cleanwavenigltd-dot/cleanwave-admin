// src/pages/Marketplace/MarketplacePage.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/marketplaceService';
import ProductsTable from './components/ProductsTable';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Marketplace Products</h2>
      <ProductsTable data={products} loading={loading} />
    </div>
  );
};

export default Marketplace;
