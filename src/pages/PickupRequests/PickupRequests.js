import React from 'react';
import PickupRequestsTable from './components/PickupRequestsTable';

const PickupRequests = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pickup Requests</h1>
      <PickupRequestsTable />
    </div>
  );
};

export default PickupRequests;