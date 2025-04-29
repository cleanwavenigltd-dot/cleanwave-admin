// src/pages/Wallets/WalletsTable.jsx
import React from 'react';
import Table from '../../../components/ui/Table';
import { FaUserCircle, FaEnvelope, FaCoins } from 'react-icons/fa';

const WalletsTable = ({ data, loading }) => {
  const columns = [
    { label: 'User ID', key: 'user_id' },
    { label: 'Name', key: 'user_name' },
    { label: 'Email', key: 'user_email' },
    { label: 'User Type', key: 'user_type' },
    { label: 'Points', key: 'points' },
  ];

  const icons = {
    user_name: <FaUserCircle className="text-[#4C862D]" />,
    user_type: <FaUserCircle className="text-[#4C862D]" />,
    user_email: <FaEnvelope className="text-[#4C862D]" />,
    points: <FaCoins className="text-[#4C862D]" />,
  };

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        icons={icons}
        loading={loading}
        rowsPerPage={10}
      />
    </div>
  );
};

export default WalletsTable;
