import React, { useState } from "react";
import SideBar from "../components/SideBar";
import SectorAllocation from "../components/SectorAllocation";

import PerformanceSummary from "../components/PerformanceSummary";

import InvestmentCards from "../components/InvestmentCards";
import OverlapsAnalysis from "../components/OverlapsAnalysis";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Performance Metrics");
  return (
    <div className="flex">
      <SideBar />
      <section className="bg-black text-white p-6 w-full">
        <h1 className="text-3xl font-bold mb-2">Good morning, Brock!</h1>
        <p className="text-gray-400 mb-6">
          Evaluate Your Investment Performance
        </p>

        <InvestmentCards />

        {/* Tabs for Performance Metrics & Portfolio Composition */}
        <div className="flex justify-around border-b border-gray-600 mb-6 mt-10">
          <h3
            className={`text-lg font-semibold cursor-pointer ${
              activeTab === "Performance Metrics"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("Performance Metrics")}
          >
            Performance Metrics
          </h3>
          <h3
            className={`text-lg font-semibold cursor-pointer ${
              activeTab === "Portfolio Composition"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("Portfolio Composition")}
          >
            Portfolio Composition
          </h3>
        </div>
        {activeTab === "Performance Metrics" ? (
          <PerformanceSummary />
        ) : (
          <>
            <SectorAllocation />
            <OverlapsAnalysis />
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
