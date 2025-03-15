import React from "react";

import notification from "../assets/notification.png";
import search from "../assets/search.png";
import logout from "../assets/logout.png";
import user from "../assets/user.png";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#1B1A1A] text-white">
      {/* Left side logo */}
      <div className="text-blue-500 text-3xl font-bold">d</div>

      {/* Center navigation links */}
      <ul className="flex space-x-8">
        <li className="hover:underline">Home</li>
        <li className="hover:underline border-b-2 border-blue-500">
          Portfolio
        </li>
        <li className="hover:underline">Mutual Funds</li>
        <li className="hover:underline">Tools</li>
        <li className="hover:underline">Transactions</li>
      </ul>

      {/* Right side icons */}
      <div className="flex space-x-6 items-center">
        <img src={search} alt="Search" className="w-5 h-5" />
        <div className="relative">
          <img src={notification} alt="Notifications" className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <img src={user} alt="User" className="w-5 h-5" />
        <img src={logout} alt="Logout" className="w-5 h-5" />
      </div>
    </nav>
  );
};

export default Navbar;
