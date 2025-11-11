import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/ui/metric-card"
import { ProgressChart } from "@/components/charts/ProgressChart"
import { Target, Calendar, Zap, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { fetchTotalEnergy } from "../api/sensorService"

interface EnergyGoal {
  id: number
  targetKwh: number
  startDate: string
  endDate: string
  currentUsage: number
  status: 'active' | 'completed' | 'exceeded'
}

// Mock current goal
const mockCurrentGoal: EnergyGoal = {
  id: 1,
  targetKwh: 560,
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  currentUsage: 155,
  status: 'active'
}

export default function Targets() {
  const [currentGoal, setCurrentGoal] = useState<EnergyGoal>(mockCurrentGoal)
  const [sensorUsage, setSensorUsage] = useState<number>(0) // state for total energy usage
  const [newTarget, setNewTarget] = useState({
    targetKwh: "",
    startDate: "",
    endDate: ""
  })
  const { toast } = useToast()

  // Fetch total energy usage from backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user?.id) {
      fetchTotalEnergy(user.id).then((data) => {
        setSensorUsage(data.totalEnergyUsage)
      }).catch(() => {
        setSensorUsage(currentGoal.currentUsage) // fallback if fetch fails
      })
    }
  }, [])

  const handleSetTarget = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTarget.targetKwh || !newTarget.startDate || !newTarget.endDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const target = parseFloat(newTarget.targetKwh)
    if (target <= 0) {
      toast({
        title: "Invalid target",
        description: "Target must be greater than 0.",
        variant: "destructive",
      })
      return
    }

    const newGoal: EnergyGoal = {
      id: currentGoal.id + 1,
      targetKwh: target,
      startDate: newTarget.startDate,
      endDate: newTarget.endDate,
      currentUsage: 0,
      status: 'active'
    }

    setCurrentGoal(newGoal)
    setNewTarget({ targetKwh: "", startDate: "", endDate: "" })

    toast({
      title: "Target set!",
      description: "Your new energy conservation goal has been saved.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysRemaining = () => {
    const endDate = new Date(currentGoal.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const getProgressPercentage = () => {
    return (sensorUsage / currentGoal.targetKwh) * 100 // use sensorUsage for progress
  }

  const getStatusVariant = () => {
    const percentage = getProgressPercentage()
    if (percentage <= 75) return 'success'
    if (percentage <= 90) return 'warning'
    return 'destructive'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Energy Targets</h1>
        <p className="text-muted-foreground">
          Set and track your energy conservation goals
        </p>
      </div>

      {/* Current Goal Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Current Target"
          value={`${currentGoal.targetKwh} kWh`}
          subtitle="Monthly goal"
          icon={Target}
          variant="default"
        />
        <MetricCard
          title="Usage So Far"
          value={`${sensorUsage.toFixed(1)} kWh`} // display total energy usage
          subtitle={`${(getProgressPercentage()).toFixed(1)}% of target`}
          icon={Zap}
          variant={getStatusVariant()}
        />
        <MetricCard
          title="Remaining"
          value={`${(currentGoal.targetKwh - sensorUsage).toFixed(1)} kWh`}
          subtitle="Until target reached"
          icon={TrendingUp}
          variant="default"
        />
        <MetricCard
          title="Days Left"
          value={getDaysRemaining()}
          subtitle="in current period"
          icon={Calendar}
          variant="default"
        />
      </div>

      {/* Current Goal Details and Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Current Goal
            </CardTitle>
            <CardDescription>
              Your active energy conservation target
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Target</span>
                <span className="text-lg font-bold">{currentGoal.targetKwh} kWh</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Period</span>
                <span className="text-sm">
                  {formatDate(currentGoal.startDate)} - {formatDate(currentGoal.endDate)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={getStatusVariant() === 'success' ? 'secondary' : 'destructive'}>
                  {currentGoal.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Visualization</CardTitle>
            <CardDescription>
              Visual representation of your goal progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart
              used={sensorUsage} // use sensorUsage here as well
              target={currentGoal.targetKwh}
              title=""
            />
          </CardContent>
        </Card>
      </div>

      {/* Set New Target */}
      <Card>
        <CardHeader>
          <CardTitle>Set New Target</CardTitle>
          <CardDescription>
            Create a new energy conservation goal for the upcoming period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetTarget} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="targetKwh">Target (kWh)</Label>
                <Input
                  id="targetKwh"
                  type="number"
                  step="0.1"
                  placeholder="Enter target kWh"
                  value={newTarget.targetKwh}
                  onChange={(e) => setNewTarget(prev => ({ ...prev, targetKwh: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTarget.startDate}
                  onChange={(e) => setNewTarget(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newTarget.endDate}
                  onChange={(e) => setNewTarget(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-gradient-energy hover:opacity-90 shadow-energy">
                Set Target
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips for Setting Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Setting Tips</CardTitle>
          <CardDescription>
            Best practices for effective energy conservation targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">🎯 Make it Realistic</h4>
              <p className="text-sm text-muted-foreground">
                Set targets that are challenging but achievable based on your historical usage
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">📊 Consider Seasonality</h4>
              <p className="text-sm text-muted-foreground">
                Factor in seasonal changes that affect heating and cooling needs
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">🔄 Regular Review</h4>
              <p className="text-sm text-muted-foreground">
                Review and adjust targets monthly based on your progress and lifestyle changes
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">💡 Start Small</h4>
              <p className="text-sm text-muted-foreground">
                Begin with modest reductions (5-10%) and gradually increase conservation goals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
