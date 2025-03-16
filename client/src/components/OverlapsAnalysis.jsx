import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sankey, Tooltip } from "recharts";

// const data = {
//   nodes: [
//     {
//       name: "Nippon Large Cap Fund - Direct Plan",
//       color: "#DAA520",
//       type: "fund",
//     },
//     {
//       name: "Motilal Large Cap Fund - Direct Plan",
//       color: "#1E40AF",
//       type: "fund",
//     },
//     { name: "HDFC Large Cap Fund", color: "#8B4513", type: "fund" },
//     { name: "ICICI Prudential Midcap Fund", color: "#BDB76B", type: "fund" },
//     { name: "HDFC LTD.", color: "#DAA520", type: "stock" },
//     { name: "RIL", color: "#008000", type: "stock" },
//     { name: "INFY", color: "#800080", type: "stock" },
//     { name: "TCS", color: "#00CED1", type: "stock" },
//     { name: "HDFCBANK", color: "#DC143C", type: "stock" },
//     { name: "BHARTIARTL", color: "#FF4500", type: "stock" },
//   ],
//   links: [
//     { source: 0, target: 4, value: 50 },
//     { source: 0, target: 5, value: 40 },
//     { source: 1, target: 5, value: 60 },
//     { source: 1, target: 6, value: 45 },
//     { source: 2, target: 7, value: 55 },
//     { source: 2, target: 8, value: 35 },
//     { source: 3, target: 8, value: 25 },
//     { source: 3, target: 9, value: 20 },
//   ],
// };

const CustomNode = ({ x, y, width, height, index, payload }) => {
  return (
    <g>
      {/* Left-Side Labels (Funds - Cards) */}
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

const OverlapsAnalysis = () => {
  const [overlapData, setOverlapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverlapAnalysis = async () => {
      try {
        const response = await axios.get(
          "http://34.70.31.205:8000/overlap-analysis/overlaps"
        );
        const fetchedData = response.data.overlaps;
        console.log("fetchedData:", fetchedData);
        setOverlapData(transformData(fetchedData));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching overlap analysis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverlapAnalysis();
  }, []);

  // Function to transform API response into Sankey format
  const transformData = (fetchedData) => {
    let nodes = [];
    let links = [];

    const fundColors = {
      "ICICI Bluechip Fund": "#DAA520",
      "HDFC Top 100 Fund": "#8B4513",
      "SBI Bluechip Fund": "#1E40AF",
      "Axis Bluechip Fund": "#BDB76B",
      "Mirae Asset Large Cap Fund": "#DC143C",
    };

    fetchedData.forEach((item) => {
      let fund1Index = nodes.findIndex((n) => n.name === item.fund_1);
      let fund2Index = nodes.findIndex((n) => n.name === item.fund_2);

      if (fund1Index === -1) {
        fund1Index = nodes.length;
        nodes.push({
          name: item.fund_1,
          color: fundColors[item.fund_1] || "#8884d8",
          type: "fund",
        });
      }

      if (fund2Index === -1) {
        fund2Index = nodes.length;
        nodes.push({
          name: item.fund_2,
          color: fundColors[item.fund_2] || "#8884d8",
          type: "fund",
        });
      }

      links.push({
        source: fund1Index,
        target: fund2Index,
        value: item.overlap_percentage,
      });
    });

    return { nodes, links };
  };

  if (loading) {
    return <p className="text-white">Loading overlap analysis...</p>;
  }

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
      <div className="bg-[#1B1A1A] p-6 rounded-lg">
        {overlapData && overlapData.nodes.length > 0 ? (
          <Sankey
            width={900}
            height={400}
            data={overlapData}
            nodePadding={40}
            nodeWidth={10}
            node={<CustomNode />}
            link={{ stroke: "#666", strokeOpacity: 0.4 }}
          >
            <Tooltip />
          </Sankey>
        ) : (
          <p className="text-white">No overlap data available.</p>
        )}
      </div>
    </div>
  );
};

export default OverlapsAnalysis;
