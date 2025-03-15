import React from "react";

const SectorAllocation = () => {
  return (
    <div className="bg-[#1B1A1A] p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sector Allocation</h2>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-blue-300 p-4 rounded-lg col-span-3 flex flex-col gap-10">
          <div>
            {" "}
            <p className="text-gray-800">Financial</p>
            <p className="text-sm font-semibold text-gray-800">₹1,95,000</p>
          </div>
          <p className="text-xl font-bold text-gray-800">34%</p>
        </div>

        <div className="bg-blue-200 p-4 rounded-lg flex flex-col gap-10">
          <div>
            <p className="text-gray-800">Healthcare</p>
            <p className="text-sm font-semibold text-gray-800">₹83,250</p>
          </div>
          <p className="text-xl font-bold text-gray-800">14.5%</p>
        </div>

        <div className="bg-purple-200 p-4 rounded-lg col-span-1 flex flex-col gap-10">
          <div>
            <p className="text-gray-800">Technology</p>
            <p className="text-sm font-semibold text-gray-800">₹1,11,000</p>
          </div>
          <p className="text-xl font-bold text-gray-800">19%</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg flex flex-col gap-10">
          <div>
            <p className="text-gray-800">Consumer Goods</p>
            <p className="text-sm font-semibold text-gray-800">₹55,500</p>
          </div>
          <p className="text-xl font-bold text-gray-800">9.5%</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg flex flex-col gap-10">
          <div>
            <p className="text-gray-800">Energy</p>
            <p className="text-sm font-semibold text-gray-800">₹55,500</p>
          </div>
          <p className="text-xl font-bold text-gray-800">9.5%</p>
        </div>

        <div className="bg-[#F8F3F5] p-4 rounded-lg flex flex-col gap-10">
          <div>
            <p className="text-gray-800">Other Sectors</p>
            <p className="text-sm font-semibold text-gray-800">₹55,500</p>
          </div>
          <p className="text-xl font-bold text-gray-800">9.5%</p>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocation;
