import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import EnergyUsageChart from "@/components/charts/EnergyUsageChart";
import { fetchSensorData, fetchTotalEnergy } from "../api/sensorService";
import { fetchUserRank } from "../api/leaderboardService"; // ✅ Import leaderboard API

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [totalEnergy, setTotalEnergy] = useState<number>(0);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const userName = user?.name || "User";

  useEffect(() => {
    const loadDashboard = async () => {
      if (!userId) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        // ✅ Fetch sensor and total energy usage
        const sensors = await fetchSensorData(userId);
        setSensorData(sensors);

        const totalResp = await fetchTotalEnergy(userId);
        setTotalEnergy(totalResp.totalEnergyUsage || 0);

        // ✅ Fetch leaderboard rank
        const rankResp = await fetchUserRank(userId);
        const rankValue =
          typeof rankResp === "object" && rankResp !== null
            ? rankResp.rank
            : rankResp;
        setUserRank(rankValue);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [userId]);

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading dashboard...</p>;

  const getRankBadge = (rank: number | null) => {
    if (!rank) return "—";
    if (rank === 1) return "🥇 #1";
    if (rank === 2) return "🥈 #2";
    if (rank === 3) return "🥉 #3";
    return `#${rank}`;
  };

  return (
    <div className="space-y-10 px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-green-700">
          Energy Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Welcome back, {userName}! Track your energy usage and leaderboard rank.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* ✅ Total Energy Usage */}
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Total Energy Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-4 text-3xl font-bold text-green-700">
              {totalEnergy.toFixed(2)} kWh
            </p>
          </CardContent>
        </Card>

        {/* ✅ Leaderboard Rank */}
        <Card className="p-6 text-center">
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Leaderboard Rank
            </CardTitle>
            <Trophy className="mt-2 h-8 w-8 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="mt-4 text-3xl font-bold text-yellow-600">
              {userRank !== null ? getRankBadge(userRank) : "Loading..."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Appliance-wise usage */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Your Appliance-wise Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <EnergyUsageChart data={sensorData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
