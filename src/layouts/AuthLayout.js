import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-[#E3FFB9]">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 hidden md:flex items-center justify-center px-6 py-10">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold text-[#4C862D] mb-4">Welcome Back!</h2>
          <p className="text-gray-700 text-lg">
            CleanWave Admin Panel gives you full control over pickups, agents, vendors, and the marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
