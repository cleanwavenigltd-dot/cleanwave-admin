import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Illustration from '../assets/admin-illustration.svg'; // Use a clean, minimal SVG here

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Section - Illustration + Info */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#EAFBE2] relative px-12">
        <div className="max-w-md text-left z-10">
          <img src={Logo} alt="CleanWave Logo" className="h-20 mb-8" />
          <img
            src={Illustration}
            alt="Admin Illustration"
            className="w-64 mb-8 rounded-md"
          />
          <h2 className="text-xl font-semibold text-[#1F3E22] mb-2">
            Welcome to CleanWave Admin
          </h2>
          <p className="text-sm text-[#3A6042] leading-snug">
            Efficiently manage pickups, agents, vendors, and marketplace operations — all from one clean dashboard.
          </p>
        </div>
        {/* Decorative background blob */}
        <div className="absolute w-[500px] h-[500px] bg-[#C6F0B6] rounded-full top-20 -left-40 opacity-20 z-0" />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue.</p>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
