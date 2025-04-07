'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity } from 'lucide-react'

const data = [
  { name: 'Jan', weight: 70 },
  { name: 'Feb', weight: 69 },
  { name: 'Mar', weight: 68 },
  { name: 'Apr', weight: 68 },
  { name: 'May', weight: 67 },
  { name: 'Jun', weight: 66 },
]

export default function HealthDataVisualization({ userId }: { userId: string }) {
  useEffect(() => {
    // In a real application, you would fetch the user's health data here
  }, [userId])

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-cyan-700 flex items-center">
          <Activity className="mr-2" />
          Health Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#0891b2" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-sm text-cyan-700">
          Weight trend over the last 6 months
        </div>
      </CardContent>
    </Card>
  )
}

