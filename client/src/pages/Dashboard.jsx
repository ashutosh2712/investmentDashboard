import React from "react";
import SideBar from "../components/SideBar";
import SectorAllocation from "../components/SectorAllocation";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <section className="bg-black text-white p-6 w-full">
        <h1 className="text-3xl font-bold mb-2">Good morning, Brock!</h1>
        <p className="text-gray-400 mb-6">
          Evaluate Your Investment Performance
        </p>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Current Investment Value</p>
            <h2 className="text-2xl font-semibold">₹5,75,000</h2>
            <p className="text-green-400 text-sm">+0.6% 1D Return</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Initial Investment Value</p>
            <h2 className="text-2xl font-semibold">₹5,00,000</h2>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Best Performing Scheme</p>
            <h2 className="text-2xl font-semibold">
              ICICI Prudential Midcap Fund
            </h2>
            <p className="text-green-400 text-sm">+19% Inception</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Worst Performing Scheme</p>
            <h2 className="text-2xl font-semibold">Axis Flexi Cap Fund</h2>
            <p className="text-red-400 text-sm">-5% Inception</p>
          </div>
        </div>
        <div className="flex justify-around border-b border-gray-600 mb-6 mt-10">
          <h3 className="text-lg font-semibold text-gray-400">
            Performance Metrics
          </h3>
          <h3 className="text-lg font-semibold text-white border-b-2 border-blue-500">
            Portfolio Composition
          </h3>
        </div>
        <SectorAllocation />
      </section>
    </div>
  );
};

export default Dashboard;
