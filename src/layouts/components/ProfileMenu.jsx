import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Fetch user data from Redux
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(); // Reload the page to reset the app state
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 hover:bg-gray-100 transition px-3 py-2 rounded-xl"
      >
        <div className="w-10 h-10 rounded-full bg-[#8CA566] flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
          <p className="text-xs text-gray-500">{user?.email || 'admin@cleanwave.com'}</p>
        </div>
        <ChevronDown className="text-gray-500" size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-20 animate-fadeIn">
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
