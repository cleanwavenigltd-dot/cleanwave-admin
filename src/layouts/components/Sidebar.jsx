import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  Store,
  Truck,
  Wallet,
  ShoppingBag,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { logout } from '../../redux/auth/authSlice';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Agents', to: '/agents', icon: <Users size={20} /> },
  { label: 'Vendors', to: '/vendors', icon: <Store size={20} /> },
  { label: 'Pickup Requests', to: '/pickups', icon: <Truck size={20} /> },
  { label: 'Wallet & Transactions', to: '/wallet', icon: <Wallet size={20} /> },
  { label: 'Marketplace', to: '/marketplace', icon: <ShoppingBag size={20} /> },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <div className="p-4 text-white">Loading...</div>;

  return (
    <aside
      className={`h-full bg-[#8CA566] text-white flex flex-col justify-between shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 -right-4 bg-[#8CA566] text-white p-1 rounded-full shadow-md z-50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Top Section */}
      <div className="p-4 flex flex-col gap-6">
        {/* Admin Card */}
        <div className="flex w-full items-center gap-4 bg-[#779254] rounded-2xl p-4 shadow-inner">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8CA566] font-bold text-sm shadow">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          {isOpen && (
            <div>
              <p className="font-semibold text-[12px] text-base leading-tight">{user?.name || 'Admin'}</p>
              <p className="text-[12px] opacity-80">{user?.role || 'admin@cleanwave.com'}</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center text-sm gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-white text-[#8CA566] font-medium'
                    : 'hover:bg-white hover:text-[#8CA566]'
                } ${!isOpen ? 'justify-center px-2' : ''}`
              }
            >
              {item.icon}
              {isOpen && item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={() => dispatch(logout())}
          className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition duration-200 hover:bg-white hover:text-[#8CA566] ${
            !isOpen ? 'justify-center px-2' : ''
          }`}
        >
          <LogOut size={20} />
          {isOpen && 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
