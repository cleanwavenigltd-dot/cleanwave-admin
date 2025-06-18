import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiBell, FiShoppingCart } from 'react-icons/fi';
import { getProfile } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const placeholderAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const UserHeader = ({ onNotificationClick }) => {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0); // You can fetch real notifications if needed
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getProfile(token);
          setUser(data);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-transparent">
      {/* Avatar and Greeting */}
      <div className="flex items-center">
        <img
          src={user?.avatar || placeholderAvatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-[#e6f2d9] bg-white"
        />
        <div className="ml-3">
          <div className="text-xs text-gray-500">{getGreeting()},</div>
          <div className="font-bold text-[#8CA566] text-base">{user?.name || 'User'}</div>
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          className="relative bg-white rounded-full p-2 shadow hover:bg-[#f3f7ed] transition"
          onClick={onNotificationClick}
        >
          <FiBell size={22} className="text-[#8CA566]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#8CA566] text-white text-xs rounded-full px-1">
              {notificationCount}
            </span>
          )}
        </button>
        {/* Cart */}
        <button
          className="relative bg-white rounded-full p-2 shadow hover:bg-[#f3f7ed] transition"
          onClick={() => navigate('/marketplace/cart')}
        >
          <FiShoppingCart size={22} className="text-[#8CA566]" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#8CA566] text-white text-xs rounded-full px-1">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserHeader;