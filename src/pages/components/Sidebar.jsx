import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Record Waste", to: "/record-waste" },
    { name: "Agents", to: "/agents" }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-8">WasteBank</h1>
      <nav className="space-y-4">
        {links.map((l) => (
          <NavLink
            key={l.name}
            to={l.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {l.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
