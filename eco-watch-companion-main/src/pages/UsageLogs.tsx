import { useEffect, useState } from "react";
import { fetchUsageLogs, addUsageLog } from "../api/usageService";

export default function UsageLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [newUsage, setNewUsage] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const TARGET_KWH = 33; // Fixed target

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserId(parsed.id);
      loadLogs(parsed.id);
    }
  }, []);

  const loadLogs = async (id: number) => {
    try {
      const data = await fetchUsageLogs(id);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching usage logs", error);
    }
  };

  const handleAdd = async () => {
    if (!userId || !newUsage) return;
    const log = {
      logDate: new Date().toISOString().split("T")[0],
      dailyUsage: parseFloat(newUsage),
      user: { id: userId }
    };
    await addUsageLog(log);
    setNewUsage("");
    loadLogs(userId);
  };

  const totalUsage = logs.reduce((sum, log) => sum + parseFloat(log.dailyUsage || 0), 0);
  const exceedCount = logs.filter(log => log.dailyUsage > TARGET_KWH).length;
  const avgUsage = logs.length > 0 ? (totalUsage / logs.length).toFixed(2) : "0.00";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700 flex items-center justify-center gap-2">
        ⚡ Usage Logs
      </h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-600 font-medium">Total Usage</p>
          <p className="text-2xl font-bold text-green-700">{totalUsage.toFixed(2)} <span className="text-sm">kWh</span></p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-600 font-medium">Average Daily</p>
          <p className="text-2xl font-bold text-green-700">{avgUsage} <span className="text-sm">kWh</span></p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <p className="text-sm text-red-600 font-medium">Days Exceeded</p>
          <p className="text-2xl font-bold text-red-700">{exceedCount} <span className="text-sm">days</span></p>
        </div>
      </div>

      {/* Add Usage Form */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">Add New Usage Entry</h3>
        <div className="flex gap-3">
          <input
            type="number"
            value={newUsage}
            onChange={(e) => setNewUsage(e.target.value)}
            placeholder="Enter usage (kWh)"
            className="flex-1 border-2 border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow whitespace-nowrap"
          >
            Add Entry
          </button>
        </div>
      </div>

      {/* Usage Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <th className="p-4 text-left font-semibold">Date</th>
              <th className="p-4 text-right font-semibold">Usage (kWh)</th>
              <th className="p-4 text-right font-semibold">Target (kWh)</th>
              <th className="p-4 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-12">
                  <div className="text-5xl mb-3">📊</div>
                  <p className="text-gray-500 text-lg">No usage logs found. Add your first entry above!</p>
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const status = log.dailyUsage > TARGET_KWH ? "Exceeded" : "Good";
                const rowClass = status === "Exceeded"
                  ? "bg-red-50 hover:bg-red-100"
                  : "bg-green-50 hover:bg-green-100";
                const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

                return (
                  <tr
                    key={log.id}
                    className={`border-b border-gray-100 ${status === "Exceeded" ? rowClass : bgClass + " hover:bg-gray-100"} transition-colors duration-200`}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {new Date(log.logDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-semibold text-gray-900">{log.dailyUsage}</span>
                      <span className="text-xs text-gray-500 ml-1">kWh</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-semibold text-gray-700">{TARGET_KWH}</span>
                      <span className="text-xs text-gray-500 ml-1">kWh</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        status === "Exceeded"
                          ? "bg-red-100 text-red-700 border border-red-300"
                          : "bg-green-100 text-green-700 border border-green-300"
                      }`}>
                        {status === "Exceeded" ? "⚠️" : "✓"} {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {logs.length > 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">
          Showing {logs.length} log entries
        </p>
      )}
    </div>
  );
}