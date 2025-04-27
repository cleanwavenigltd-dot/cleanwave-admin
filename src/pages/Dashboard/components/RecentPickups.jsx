import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPickups } from '../../../services/authService';

const statusStyles = {
  completed: 'text-green-600 bg-green-100',
  pending: 'text-yellow-700 bg-yellow-100',
  accepted: 'text-blue-600 bg-blue-100',
};

const RecentPickups = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of pickups per page
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        // Simulate a delay for smoother loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getPickups(token);
        setPickups(data);
      } catch (error) {
        console.error('Failed to fetch pickups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPickups();
  }, [token]);

  // Calculate the pickups to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPickups = pickups.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(pickups.length / itemsPerPage);

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
        <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Pickup Requests</h3>
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
      <h3 className="font-semibold text-lg mb-4 text-[#8CA566]">Recent Pickup Requests</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-600">
          <tr>
            <th className="pb-2">ID</th>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Category</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentPickups.map((pickup) => (
            <tr key={pickup.id} className="border-t">
              <td className="py-2 text-[12px]">{pickup.id}</td>
              <td className="text-[12px]">{pickup.user_name}</td>
              <td className="text-[12px]">{pickup.category_name}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[pickup.status]}`}>
                  {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                </span>
              </td>
              <td className="text-[12px]">{new Date(pickup.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default RecentPickups;
