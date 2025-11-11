import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface ProgressChartProps {
  used: number
  target: number
  title?: string
}

export function ProgressChart({ used, target, title = "Target Progress" }: ProgressChartProps) {
  const percentage = Math.min((used / target) * 100, 100)
  const remaining = Math.max(target - used, 0)

  const data = [
    { name: 'Used', value: used, color: 'hsl(var(--primary))' },
    { name: 'Remaining', value: remaining, color: 'hsl(var(--muted))' }
  ]

  const getProgressColor = () => {
    if (percentage <= 75) return 'hsl(var(--success))'
    if (percentage <= 90) return 'hsl(var(--warning))'
    return 'hsl(var(--destructive))'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? getProgressColor() : entry.color} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} kWh`, '']}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold" style={{ color: getProgressColor() }}>
              {percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">of target</div>
            <div className="text-xs text-muted-foreground mt-1">
              {used} / {target} kWh
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}