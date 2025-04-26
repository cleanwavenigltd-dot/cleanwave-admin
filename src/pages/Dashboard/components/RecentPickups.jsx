import React from 'react';

const dummyPickups = [
  { id: 'PU-001', location: 'Lagos', status: 'Completed', date: '2025-04-20' },
  { id: 'PU-002', location: 'Abuja', status: 'Pending', date: '2025-04-19' },
  { id: 'PU-003', location: 'Port Harcourt', status: 'In Progress', date: '2025-04-18' },
  { id: 'PU-004', location: 'Ibadan', status: 'Completed', date: '2025-04-17' },
  { id: 'PU-005', location: 'Benin', status: 'Pending', date: '2025-04-16' },
];

const statusStyles = {
  Completed: 'text-green-600 bg-green-100',
  Pending: 'text-yellow-700 bg-yellow-100',
  'In Progress': 'text-blue-600 bg-blue-100',
};

const RecentPickups = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Pickup Requests</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-600">
          <tr>
            <th className="pb-2">ID</th>
            <th className="pb-2">Location</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyPickups.map((pickup) => (
            <tr key={pickup.id} className="border-t">
              <td className="py-2">{pickup.id}</td>
              <td>{pickup.location}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[pickup.status]}`}>
                  {pickup.status}
                </span>
              </td>
              <td>{pickup.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPickups;
