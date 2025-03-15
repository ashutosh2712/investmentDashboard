import React from "react";
import { Sankey, Tooltip } from "recharts";

const data = {
  nodes: [
    {
      name: "Nippon Large Cap Fund - Direct Plan",
      color: "#DAA520",
      type: "fund",
    },
    {
      name: "Motilal Large Cap Fund - Direct Plan",
      color: "#1E40AF",
      type: "fund",
    },
    { name: "HDFC Large Cap Fund", color: "#8B4513", type: "fund" },
    { name: "ICICI Prudential Midcap Fund", color: "#BDB76B", type: "fund" },
    { name: "HDFC LTD.", color: "#DAA520", type: "stock" },
    { name: "RIL", color: "#008000", type: "stock" },
    { name: "INFY", color: "#800080", type: "stock" },
    { name: "TCS", color: "#00CED1", type: "stock" },
    { name: "HDFCBANK", color: "#DC143C", type: "stock" },
    { name: "BHARTIARTL", color: "#FF4500", type: "stock" },
  ],
  links: [
    { source: 0, target: 4, value: 50 },
    { source: 0, target: 5, value: 40 },
    { source: 1, target: 5, value: 60 },
    { source: 1, target: 6, value: 45 },
    { source: 2, target: 7, value: 55 },
    { source: 2, target: 8, value: 35 },
    { source: 3, target: 8, value: 25 },
    { source: 3, target: 9, value: 20 },
  ],
};

// Custom Node to Position Labels Correctly
const CustomNode = ({ x, y, width, height, index, payload }) => {
  return (
    <g>
      {/* Left-Side Labels (Separated Cards) */}
      {payload.type === "fund" && (
        <>
          <rect
            x={x - 180} // Push the card further left
            y={y - 5}
            width={160}
            height={height + 10}
            fill={payload.color}
            rx={6}
            ry={6}
          />
          <text
            x={x - 160} // Position text inside the box
            y={y + height / 2 + 2}
            fontSize={12}
            fill="#000000"
            fontWeight="bold"
          >
            {payload.name}
          </text>
        </>
      )}

      {/* Right-Side Labels (Stocks - Separate from Nodes) */}
      {payload.type === "stock" && (
        <text
          x={x + width + 15} // Push further right
          y={y + height / 2}
          textAnchor="start"
          fontSize={14}
          fill="#FFFFFF"
          fontWeight="bold"
        >
          {payload.name}
        </text>
      )}

      {/* Actual Node (Colored Rectangle for Funds & Stocks) */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color}
        rx={4}
        ry={4}
      />
    </g>
  );
};

const OverlapAnalysis = () => {
  return (
    <div className="bg-[#1B1A1A] p-6 rounded-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-2">Overlap Analysis</h2>
      <p className="text-sm text-gray-400 mb-4">
        Comparing : Motilal Large Cap Fund and Nippon Large Cap Fund
      </p>
      <ul className="text-gray-400 text-sm mb-4">
        <li>
          • <span className="text-white font-semibold">X Stocks Overlap</span>{" "}
          across these funds.
        </li>
        <li>
          • <span className="text-white font-semibold">Y% Average Overlap</span>{" "}
          in holdings.
        </li>
      </ul>
      <div className="bg-gray-900 p-6 rounded-lg">
        <Sankey
          width={900}
          height={400}
          data={data}
          nodePadding={40}
          nodeWidth={10}
          node={<CustomNode />}
          link={{ stroke: "#666", strokeOpacity: 0.4 }}
        >
          <Tooltip />
        </Sankey>
      </div>
    </div>
  );
};

export default OverlapAnalysis;
