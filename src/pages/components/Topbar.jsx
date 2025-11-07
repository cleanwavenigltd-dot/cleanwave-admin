import React from "react";

const Topbar = () => (
  <header className="flex justify-between items-center bg-white shadow px-6 py-4">
    <h2 className="text-lg font-semibold text-primary">WasteBank Dashboard</h2>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Hello, Admin</span>
      <button className="px-3 py-1 bg-primary text-white rounded">Logout</button>
    </div>
  </header>
);

export default Topbar;
