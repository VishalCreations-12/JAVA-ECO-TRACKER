import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const applianceData = [
  { name: "Fridge", value: 30 },
  { name: "AC", value: 40 },
  { name: "Washing Machine", value: 15 },
  { name: "Lights", value: 10 },
  { name: "Others", value: 5 },
]

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#A020F0"]

const dailyUsageData = [
  { day: "Mon", kWh: 12 },
  { day: "Tue", kWh: 15 },
  { day: "Wed", kWh: 9 },
  { day: "Thu", kWh: 14 },
  { day: "Fri", kWh: 20 },
  { day: "Sat", kWh: 18 },
  { day: "Sun", kWh: 11 },
]

export default function EnergyUsageChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Appliance Energy Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={applianceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {applianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Energy Usage (kWh)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyUsageData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="kWh" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
