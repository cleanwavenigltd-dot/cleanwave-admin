import React from 'react';

const dummyTransactions = [
  { id: 'TX-001', type: 'Credit', amount: '+₦10,000', date: '2025-04-20' },
  { id: 'TX-002', type: 'Debit', amount: '-₦5,000', date: '2025-04-19' },
  { id: 'TX-003', type: 'Credit', amount: '+₦7,500', date: '2025-04-18' },
  { id: 'TX-004', type: 'Debit', amount: '-₦2,000', date: '2025-04-17' },
  { id: 'TX-005', type: 'Credit', amount: '+₦3,200', date: '2025-04-16' },
];

const typeColors = {
  Credit: 'text-green-600',
  Debit: 'text-red-600',
};

const RecentTransactions = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Wallet Transactions</h3>
      <ul className="divide-y divide-gray-200 text-sm">
        {dummyTransactions.map((tx) => (
          <li key={tx.id} className="flex justify-between py-2">
            <div>
              <p className="font-medium">{tx.id}</p>
              <p className="text-gray-500">{tx.date}</p>
            </div>
            <p className={`font-semibold ${typeColors[tx.type]}`}>{tx.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
