'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video, Phone, Mic, MicOff, Camera, CameraOff } from 'lucide-react'

export default function TelemedicineConsultation({ doctorId }: { doctorId: string }) {
  const [patientId, setPatientId] = useState('')
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const startCall = () => {
    // In a real application, this would initiate a video call
    setIsCallActive(true)
    setCallDuration(0)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <Video className="mr-2" />
          Telemedicine Consultation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCallActive ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID"
                className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Button onClick={startCall} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Start Consultation
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex items-center justify-center">
              {isVideoOff ? (
                <p className="text-white">Video is off</p>
              ) : (
                <p className="text-white">Video call in progress...</p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Call duration: {formatDuration(callDuration)}</p>
              <div className="flex space-x-2">
                <Button onClick={toggleMute} variant="outline" size="icon">
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={toggleVideo} variant="outline" size="icon">
                  {isVideoOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                </Button>
                <Button onClick={endCall} className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="mr-2 h-4 w-4" /> End Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

