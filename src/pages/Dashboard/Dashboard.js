import React from 'react';
import KPICards from './components/KPICards';
import RecentPickups from './components/RecentPickups';
import RecentTransactions from './components/RecentTransactions';

const Dashboard = () => {
  return (
    <div className="p-6 pt-14 space-y-6">
      <KPICards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPickups />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
