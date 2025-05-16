import React, { useState } from 'react';
import { LogOut, Settings, Store } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

const VendorProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout({ role: 'vendor' })); // Pass the role as 'vendor'
  };

  return (
    <div className="relative">
      {/* Store Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
      >
        <Store size={24} className="text-gray-600" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-800">Vendor Settings</p>
            <p className="text-xs text-gray-500">Manage your store and account</p>
          </div>
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => console.log('Settings clicked')}
            >
              <Settings size={16} />
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={handleLogout} // Call the handleLogout function
            >
              <LogOut size={16} />
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* Close Menu on Outside Click */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default VendorProfileMenu;