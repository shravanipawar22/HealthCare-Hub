'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target } from 'lucide-react'

type Goal = {
  id: string;
  description: string;
  target: string;
  progress: number;
}

export default function PersonalizedHealthGoals({ userId }: { userId: string }) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({ description: '', target: '' })

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoal.description && newGoal.target) {
      setGoals([...goals, { ...newGoal, id: Date.now().toString(), progress: 0 }])
      setNewGoal({ description: '', target: '' })
    }
  }

  const updateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: Math.min(progress, 100) } : goal
    ))
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-teal-700 flex items-center">
          <Target className="mr-2" />
          Health Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addGoal} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="goalDescription">Goal Description</Label>
            <Input
              id="goalDescription"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="E.g., Walk 10,000 steps daily"
              className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goalTarget">Target</Label>
            <Input
              id="goalTarget"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              placeholder="E.g., 30 days"
              className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            Add Goal
          </Button>
        </form>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.description}</span>
                <span className="text-sm text-gray-600">Target: {goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-600 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <Input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm text-gray-600">{goal.progress}% complete</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

