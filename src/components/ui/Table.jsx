import React, { useState } from 'react';

const Table = ({ columns, data, actions, loading, icons, rowsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  // Filter and search data
  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter ? row.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4">
                {col.label}
              </th>
            ))}
            {actions && <th className="py-3 px-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Skeleton Loader
            Array(rowsPerPage)
              .fill(0)
              .map((_, rowIndex) => (
                <tr key={rowIndex} className="border-t animate-pulse">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="py-3 px-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                  ))}
                  {actions && (
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                  )}
                </tr>
              ))
          ) : paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">
                    {icons && icons[col.key] ? (
                      <div className="flex items-center gap-2">
                        {icons[col.key]}
                        <span>{row[col.key] || '-'}</span>
                      </div>
                    ) : (
                      row[col.key] || '-'
                    )}
                  </td>
                ))}
                {actions && (
                  <td className="py-3 px-4">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${action.className}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="py-6 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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

export default Table;