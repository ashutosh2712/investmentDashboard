import React from "react";

const SideBar = () => {
  return (
    <aside className="w-64 h-screen bg-[#1B1A1A] text-white p-4">
      <button className="w-full py-2 bg-gray-700 rounded mb-6">PHA</button>
      <nav className="space-y-6">
        <a href="#" className="block hover:text-gray-400">
          Fund Analysis
        </a>
        <a href="#" className="block hover:text-gray-400">
          Holdings
        </a>
        <a href="#" className="block hover:text-gray-400">
          Transactions
        </a>
      </nav>
    </aside>
  );
};

export default SideBar;
