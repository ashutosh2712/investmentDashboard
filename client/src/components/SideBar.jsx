import React, { useState } from "react";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("PHA");
  return (
    <aside className="w-64  bg-[#1B1A1A] text-white p-6 flex flex-col">
      {/* Sidebar Title Button */}
      {/* <button className="w-full py-2 px-4 bg-[#3D3D3D] text-lg font-semibold rounded-lg mb-8 text-left">
        PHA
      </button> */}

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6">
        {["PHA", "Fund Analysis", "Holdings", "Transactions"].map((tab) => (
          <button
            key={tab}
            className={` w-full py-2 text-left text-lg px-4 ${
              activeTab === tab
                ? "text-white font-semibold bg-[#3D3D3D] rounded-lg"
                : "text-gray-400"
            } hover:text-gray-300 transition-all`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
