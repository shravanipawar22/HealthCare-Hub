'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Watch } from 'lucide-react'

type WearableData = {
  steps: number;
  heartRate: number;
  calories: number;
}

export default function WearableIntegration({ userId }: { userId: string }) {
  const [wearableData, setWearableData] = useState<WearableData | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (isConnected) {
      // Simulate fetching data from a wearable device
      const interval = setInterval(() => {
        setWearableData({
          steps: Math.floor(Math.random() * 10000),
          heartRate: Math.floor(Math.random() * 40) + 60,
          calories: Math.floor(Math.random() * 500),
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isConnected])

  const toggleConnection = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      setWearableData(null)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-700 flex items-center">
          <Watch className="mr-2" />
          Wearable Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={toggleConnection}
          className={`w-full mb-4 ${isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
        >
          {isConnected ? 'Disconnect Wearable' : 'Connect Wearable'}
        </Button>
        {wearableData && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">Steps</span>
              <span className="text-2xl font-bold text-amber-600">{wearableData.steps}</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">Heart Rate</span>
              <span className="text-2xl font-bold text-amber-600">{wearableData.heartRate} bpm</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">Calories Burned</span>
              <span className="text-2xl font-bold text-amber-600">{wearableData.calories} kcal</span>
            </div>
          </div>
        )}
        {!wearableData && isConnected && (
          <p className="text-center text-gray-600">Connecting to wearable device...</p>
        )}
      </CardContent>
    </Card>
  )
}

