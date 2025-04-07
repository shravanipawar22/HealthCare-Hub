'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar } from 'lucide-react'

export default function TelemedicineIntegration() {
  const [isCallActive, setIsCallActive] = useState(false)

  const startCall = () => {
    // In a real application, this would initiate a video call
    setIsCallActive(true)
    setTimeout(() => setIsCallActive(false), 5000) // Simulate a call ending after 5 seconds
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <Video className="mr-2" />
          Telemedicine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={startCall}
          className={`w-full ${isCallActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
        >
          {isCallActive ? 'End Call' : 'Start Video Consultation'}
        </Button>
        <Button className="w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
          <Calendar className="mr-2 h-4 w-4" /> Schedule Consultation
        </Button>
        {isCallActive && (
          <div className="text-center text-indigo-700 font-medium">
            Video call in progress...
          </div>
        )}
      </CardContent>
    </Card>
  )
}

