import React, { useEffect, useState } from "react";
import { fetchAlerts, markAlertAsRead } from "../api/alertService";

interface Alert {
  id: number;
  message: string;
  read: boolean;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const userId = 1; // Replace with logged-in user's ID

  // Default 5 alerts (for demo/testing)
  const defaultAlerts: Alert[] = [
    { id: 101, message: "High energy usage detected today ", read: false },
    { id: 102, message: "You reached your daily goal! ", read: true },
    { id: 103, message: "Unusual sensor reading in Room 2 ", read: false },
    { id: 104, message: "Weekly report generated successfully ", read: true },
    { id: 105, message: "Reminder: Check your energy target settings ", read: false },
  ];

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const data = await fetchAlerts(userId);
        if (data && data.length > 0) {
          setAlerts(data);
        } else {
          setAlerts(defaultAlerts);
        }
      } catch (error) {
        console.error("Backend not reachable, using default alerts.");
        setAlerts(defaultAlerts);
      }
    };
    loadAlerts();
  }, []);

  const handleMarkAsRead = async (alertId: number) => {
    try {
      const updated = await markAlertAsRead(alertId);
      if (updated) {
        setAlerts((prev) =>
          prev.map((a) => (a.id === alertId ? { ...a, read: true } : a))
        );
      } else {
        setAlerts((prev) =>
          prev.map((a) => (a.id === alertId ? { ...a, read: true } : a))
        );
      }
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-md w-full mt-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
           Alerts & Notifications
        </h2>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full border border-red-300">
            {unreadCount} unread
          </span>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-gray-500 text-lg">All clear! No alerts at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3 w-full">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 flex justify-between items-start gap-4 transition-all duration-200 rounded-xl border-2 w-full ${
                alert.read
                  ? "bg-gray-50 border-gray-200 hover:border-gray-300"
                  : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200 hover:border-red-300 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    alert.read ? "bg-gray-400" : "bg-red-500 animate-pulse"
                  }`}
                />
                <span
                  className={`text-base leading-relaxed ${
                    alert.read ? "text-gray-600" : "text-gray-900 font-medium"
                  }`}
                >
                  {alert.message}
                </span>
              </div>

              {!alert.read && (
                <button
                  onClick={() => handleMarkAsRead(alert.id)}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow whitespace-nowrap flex-shrink-0"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {alerts.length > 0 && unreadCount === 0 && (
        <p className="text-center text-gray-400 text-sm mt-6">
          All alerts have been read ✓
        </p>
      )}
    </div>
  );
};

export default Alerts;
