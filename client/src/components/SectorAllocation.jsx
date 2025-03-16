import React, { useEffect, useState } from "react";
import axios from "axios";

const sectorColors = {
  Financials: "bg-blue-300",
  IT: "bg-green-300",
  Industrials: "bg-purple-300",
  Energy: "bg-red-300",
  "Consumer Goods": "bg-yellow-300",
  "Other Sectors": "bg-gray-300",
};

const SectorAllocation = () => {
  const [sectors, setSectors] = useState([]);
  const [hoveredSector, setHoveredSector] = useState(null);
  const [mutualFunds, setMutualFunds] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          "http://34.70.31.205:8000/fund-allocations/sectors"
        );
        setSectors(response.data.sectors);
      } catch (err) {
        setError("Failed to fetch sector data!");
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const handleSectorHover = async (sectorName) => {
    setHoveredSector(sectorName);
    try {
      const response = await axios.get(
        `http://34.70.31.205:8000/fund-allocations/sector/${sectorName}`
      );
      setMutualFunds({ [sectorName]: response.data.mutual_funds });
    } catch (err) {
      setMutualFunds({});
      setError("No mutual funds found for this sector.");
    }
  };

  const handleMouseLeave = () => {
    setHoveredSector(null);
    setMutualFunds({});
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#1B1A1A] p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sector Allocation</h2>

      {/* Grid Layout for Sectors */}
      <div className="grid grid-cols-4 gap-2">
        {sectors.map((sector, index) => {
          const isHovered = hoveredSector === sector.sector_name;
          const sectorBgColor =
            sectorColors[sector.sector_name] || "bg-blue-300";

          return isHovered ? (
            /* Replace sector with Mutual Funds */
            mutualFunds[sector.sector_name]?.map((fund, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${sectorBgColor} col-span-1`}
                onMouseLeave={handleMouseLeave} // Reset back on hover exit
              >
                <p className="text-gray-900 font-bold">
                  {fund.mutual_fund_name}
                </p>
                <p className="text-sm text-gray-900">
                  ₹{fund.amount_invested.toLocaleString()}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {fund.amount_invested}%
                </p>
              </div>
            ))
          ) : (
            /* Default Sector Div */
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-all ${sectorBgColor} col-span-1`}
              onMouseEnter={() => handleSectorHover(sector.sector_name)} // Trigger on hover
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-900 font-bold">
                    {sector.sector_name}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{(sector.allocation_percentage * 1000).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-900 text-lg font-bold">
                  {sector.allocation_percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectorAllocation;
