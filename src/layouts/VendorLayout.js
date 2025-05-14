import React, { useState } from 'react';
import Sidebar from './components/VendorSidebar'; // Vendor-specific sidebar
import Header from './components/VendorHeader'; // Vendor-specific header
import { Outlet } from 'react-router-dom';

const VendorLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarWidth = isOpen ? 256 : 80;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Content Area */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header */}
        <div
          className="fixed top-0 right-0 left-0 z-30"
          style={{ left: sidebarWidth }}
        >
          <Header />
        </div>

        {/* Page Content */}
        <main
          className="mt-16 p-6 overflow-y-auto bg-[#f9fafb]"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;