import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch admin profile from Redux
  const admin = useSelector((state) => state.auth.admin);

  const handleLogout = () => {
    dispatch(logout({ role: 'admin' })); // Pass role as 'admin'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 hover:bg-gray-100 transition px-3 py-2 rounded-xl"
      >
        <div className="w-10 h-10 rounded-full bg-[#8CA566] flex items-center justify-center text-white font-semibold">
          {admin?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-gray-500">{admin?.email || 'admin@cleanwave.com'}</p>
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
