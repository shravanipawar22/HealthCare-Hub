'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from 'lucide-react'
import PatientDetails from './PatientDetails'

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  time: string;
}

export default function PatientAppointments({ doctorId }: { doctorId: string }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/doctor/appointments/${doctorId}`)
        const data = await response.json()
        setAppointments(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [doctorId])

  const handleAppointmentClick = (patientId: number) => {
    setSelectedPatient(patientId)
  }

  if (loading) {
    return <Card><CardContent className="p-6">Loading appointments...</CardContent></Card>
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <Calendar className="mr-2" />
          Patient Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPatient ? (
          <PatientDetails patientId={selectedPatient} onClose={() => setSelectedPatient(null)} />
        ) : (
          appointments.length > 0 ? (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-indigo-50 transition duration-300"
                  onClick={() => handleAppointmentClick(appointment.patientId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-indigo-600 mr-2" />
                      <span className="font-medium">{appointment.patientName}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No appointments scheduled.</p>
          )
        )}
      </CardContent>
    </Card>
  )
}

