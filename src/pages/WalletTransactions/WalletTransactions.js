// src/pages/Wallets/Wallets.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import WalletsTable from './components/WalletsTable';
import { getAdminWallets } from '../../services/walletService';

const WalletsTransactions = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getAdminWallets(token);
        setWallets(data);
      } catch (error) {
        toast.error('Failed to fetch wallets');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [token]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Wallets Overview</h1>
        <p className="text-sm text-gray-500">Monitor user wallet balances and related details.</p>
      </div>
      <WalletsTable data={wallets} loading={loading} />
    </div>
  );
};

export default WalletsTransactions;
