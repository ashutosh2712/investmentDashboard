import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingDown, TrendingUp } from "lucide-react";

const InvestmentCards = () => {
  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/investments"); // API Endpoint
        setInvestmentData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentData();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculate Initial Investment (Total Invested Amount)
  const initialInvestment = investmentData.reduce(
    (sum, inv) => sum + parseFloat(inv.amount_invested),
    0
  );

  // Calculate Current Investment (After Returns)
  const currentInvestment = investmentData.reduce(
    (sum, inv) =>
      sum +
      parseFloat(inv.amount_invested) * (1 + inv.returns_percentage / 100),
    0
  );

  // // Calculate total investment and best/worst performing schemes
  // const totalInvestment = investmentData.reduce(
  //   (sum, inv) => sum + parseFloat(inv.amount_invested),
  //   0
  // );

  const bestPerforming = [...investmentData].sort(
    (a, b) => b.returns_percentage - a.returns_percentage
  )[0];

  const worstPerforming = [...investmentData].sort(
    (a, b) => a.returns_percentage - b.returns_percentage
  )[0];

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Current Investment Value */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Current Investment Value</p>
            <h4 className="text-2xl font-semibold">
              {" "}
              ₹{currentInvestment.toLocaleString()}
            </h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          <TrendingUp size={14} className="mr-1" />
          <span>+{bestPerforming.returns_percentage}% 1D Return</span>
        </div>
      </div>

      {/* Initial Investment Value */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Initial Investment Value</p>
            <h4 className="text-2xl font-semibold">
              ₹{initialInvestment.toLocaleString()}
            </h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          <TrendingUp size={14} className="mr-1" />
          <span>+{(bestPerforming.returns_percentage + 5).toFixed(1)}%</span>
        </div>
      </div>

      {/* Best Performing Scheme */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Best Performing Scheme</p>
            <h4 className="text-lg font-semibold">
              {bestPerforming.mutual_fund_name}
            </h4>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          {/* <ArrowUpRight size={14} className="mr-1" /> */}
          <TrendingUp size={14} className="mr-1" />
          <span>+{bestPerforming.returns_percentage}%</span>
        </div>
      </div>

      {/* Worst Performing Scheme */}
      <div className="bg-[#0D1B2A] p-5 rounded-xl border border-gray-600 relative">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-red-500 rounded-md mr-3"></div>
          <div>
            <p className="text-gray-400">Worst Performing Scheme</p>
            <h4 className="text-lg font-semibold">
              {worstPerforming.mutual_fund_name}
            </h4>
          </div>
        </div>
        <div className="flex items-center text-red-400 text-sm mt-2">
          <TrendingDown size={14} className="mr-1" />
          <span>-{worstPerforming.returns_percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCards;
