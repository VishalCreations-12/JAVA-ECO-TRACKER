import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api/leaderboardService";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  totalEnergy: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const leaderboardData = await fetchLeaderboard();
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    loadData();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full mx-auto mt-6 max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌱 Energy Leaderboard
      </h2>

      {/* ✅ Full-width Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <th className="px-6 py-4 font-semibold">Rank</th>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 text-right font-semibold">
                Total Energy (kWh)
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-green-50 transition duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3 text-green-700 font-bold text-base">
                    {getRankBadge(entry.rank)}
                  </td>
                  <td className="px-6 py-3 text-gray-800">{entry.userName}</td>
                  <td className="px-6 py-3 text-right text-gray-900 font-semibold">
                    {entry.totalEnergy.toFixed(2)}
                    <span className="text-xs text-gray-500 ml-1">kWh</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 p-6">
                  No leaderboard data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
