import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

const InvestmentCards = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Current Investment Value */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Current Investment Value</p>
            <h4 className="text-2xl font-semibold">₹5,75,000</h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          <TrendingUp size={14} className="mr-1" />
          <span>+0.6% 1D Return</span>
        </div>
      </div>

      {/* Initial Investment Value */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Initial Investment Value</p>
            <h4 className="text-2xl font-semibold">₹5,00,000</h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          <TrendingUp size={14} className="mr-1" />
          <span>+15%</span>
        </div>
      </div>

      {/* Best Performing Scheme */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Best Performing Scheme</p>
            <h4 className="text-lg font-semibold">
              ICICI Prudential Midcap Fund
            </h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          {/* <ArrowUpRight size={14} className="mr-1" /> */}
          <TrendingUp size={14} className="mr-1" />
          <span>+19%</span>
        </div>
      </div>

      {/* Worst Performing Scheme */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-red-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Worst Performing Scheme</p>
            <h4 className="text-lg font-semibold">Axis Flexi Cap Fund</h4>
          </div>
        </div>
        <div className="flex items-center text-red-400 text-sm mt-2">
          <TrendingDown size={14} className="mr-1" />
          <span>-5%</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCards;
