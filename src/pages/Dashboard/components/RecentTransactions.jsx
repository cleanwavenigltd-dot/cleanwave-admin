import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTransactions } from '../../../services/authService';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Gift } from 'lucide-react';

const typeIcons = {
  points_purchased: <DollarSign className="text-green-500" size={20} />,
  points_redeemed: <ArrowDownLeft className="text-red-500" size={20} />,
  points_earned: <Gift className="text-blue-500" size={20} />,
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of transactions per page
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulate a delay for smoother loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getTransactions(token);
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // Calculate the transactions to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md w-full">
        <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Wallet Transactions</h3>
        <ul className="divide-y divide-gray-200 text-sm">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <li key={index} className="flex justify-between py-2 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Wallet Transactions</h3>
      <ul className="divide-y divide-gray-200 text-sm">
        {currentTransactions.map((tx) => (
          <li key={tx.id} className="flex justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {typeIcons[tx.type] || <ArrowUpRight className="text-gray-500" size={20} />}
              </div>
              <div>
                <p className="font-medium">{tx.user_name}</p>
                <p className="text-gray-500 text-xs">{new Date(tx.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="font-semibold text-gray-700">₦{tx.amount}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#8CA566] text-white hover:bg-[#4C862D]'
          }`}
        >
          Previous
        </button>
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#8CA566] text-white hover:bg-[#4C862D]'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;