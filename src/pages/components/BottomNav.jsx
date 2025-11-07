import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiUser, FiCreditCard } from 'react-icons/fi';
import { MdDirectionsBike } from 'react-icons/md';

const navItems = [
  { to: '/waste/dashboard', label: 'Home', icon: <FiHome size={22} /> },
  { to: '/waste/pickups', label: 'WastePickup', icon: <MdDirectionsBike size={22} /> },
//   { to: '/marketplace', label: '', icon: <FiShoppingCart size={28} color="#fff" /> },
  { to: 'waste/wallet', label: 'Wallet', icon: <FiCreditCard size={22} /> },
  { to: 'waste/profile', label: 'Profile', icon: <FiUser size={22} /> },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <div className="relative flex w-full max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-auto justify-between items-end bg-white shadow-lg rounded-2xl px-2 sm:px-4 py-2 sm:py-3 pointer-events-auto">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.to;

        //   if (idx === 2) {
        //     return (
        //       <Link
        //         key={item.to}
        //         to={item.to}
        //         className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
        //       >
        //         <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#8CA566] shadow-xl">
        //           {item.icon}
        //         </div>
        //       </Link>
        //     );
        //   }

          const isLeft = idx < 2;
          const isRight = idx > 2;
          const spacingClass =
            (isLeft && idx === 0 && 'md:mr-14') ||
            (isRight && idx === 3 && 'md:ml-14') ||
            '';

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center flex-1 ${spacingClass} ${
                isActive ? 'text-[#8CA566] font-medium' : 'text-gray-500'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition duration-200 ${
                  isActive ? 'bg-[#e6f2d9]' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
