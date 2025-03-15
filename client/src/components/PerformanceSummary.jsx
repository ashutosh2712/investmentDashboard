import { CircleArrowUp } from "lucide-react";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = {
  "1M": [
    { date: "7 Feb", value: 500000 },
    { date: "12 Feb", value: 505000 },
    { date: "17 Feb", value: 495000 },
    { date: "22 Feb", value: 510000 },
    { date: "27 Feb", value: 525000 },
    { date: "9 Mar", value: 550000 },
  ],
  "3M": [
    { date: "Jan", value: 475000 },
    { date: "Feb", value: 490000 },
    { date: "Mar", value: 550000 },
  ],
  "6M": [
    { date: "Oct", value: 450000 },
    { date: "Nov", value: 460000 },
    { date: "Dec", value: 480000 },
    { date: "Jan", value: 500000 },
    { date: "Feb", value: 525000 },
    { date: "Mar", value: 550000 },
  ],
  "1Y": [
    { date: "Apr", value: 400000 },
    { date: "Jul", value: 450000 },
    { date: "Oct", value: 480000 },
    { date: "Jan", value: 500000 },
    { date: "Mar", value: 550000 },
  ],
  "3Y": [
    { date: "2022", value: 300000 },
    { date: "2023", value: 400000 },
    { date: "2024", value: 500000 },
    { date: "2025", value: 550000 },
  ],
  MAX: [
    { date: "2018", value: 200000 },
    { date: "2020", value: 300000 },
    { date: "2022", value: 400000 },
    { date: "2024", value: 500000 },
    { date: "2025", value: 550000 },
  ],
};

const PerformanceSummary = () => {
  const [selectedRange, setSelectedRange] = useState("1M");

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-blue-500">
      <h2 className="text-xl font-bold text-white mb-4">Performance Summary</h2>
      <div className="bg-gray-800 p-4 rounded-lg inline-block">
        <h3 className="text-3xl font-semibold text-white">₹5,50,000</h3>
        <p className="text-green-400 text-lg flex gap-2 justify-center items-center">
          <CircleArrowUp /> ₹50,000 | 10%
        </p>
      </div>

      {/* Investment Performance Line Chart */}
      <div className="mt-4 bg-gray-700 p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData[selectedRange]}>
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00bfff"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center gap-4 mt-4">
        {["1M", "3M", "6M", "1Y", "3Y", "MAX"].map((time) => (
          <button
            key={time}
            onClick={() => setSelectedRange(time)}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedRange === time
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
