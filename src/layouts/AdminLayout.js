import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarWidth = isOpen ? 256 : 80; // 64 or 20 in Tailwind (16px units)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Content area */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Fixed Header */}
        <div
          className="fixed top-0 right-0 left-0 z-30"
          style={{ left: sidebarWidth }}
        >
          <Header />
        </div>

        {/* Scrollable Page Content */}
        <main
          className="mt-16 p-6 overflow-y-auto bg-[#f9fafb]"
          style={{ height: 'calc(100vh - 64px)' }} // 64px = Header height
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
