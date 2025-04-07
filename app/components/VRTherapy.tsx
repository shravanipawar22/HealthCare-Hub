'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones } from 'lucide-react'

export default function VRTherapy({ userId }: { userId: string }) {
  const [isSessionActive, setIsSessionActive] = useState(false)

  const startSession = () => {
    // In a real application, this would initiate a VR therapy session
    setIsSessionActive(true)
    setTimeout(() => setIsSessionActive(false), 5000) // Simulate a session ending after 5 seconds
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <Headphones className="mr-2" />
          VR Therapy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Experience immersive therapy sessions from the comfort of your home using virtual reality technology.
        </p>
        <Button
          onClick={startSession}
          className={`w-full ${isSessionActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
        >
          {isSessionActive ? 'End VR Session' : 'Start VR Therapy Session'}
        </Button>
        {isSessionActive && (
          <div className="text-center text-indigo-700 font-medium">
            VR therapy session in progress...
          </div>
        )}
      </CardContent>
    </Card>
  )
}

