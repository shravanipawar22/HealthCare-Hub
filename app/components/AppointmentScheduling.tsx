'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from 'lucide-react'

export default function AppointmentScheduling({ userId }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [doctor, setDoctor] = useState('')
  const [message, setMessage] = useState('')
  const [scheduledAppointments, setScheduledAppointments] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/schedule-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, date, time, doctor }),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage('Appointment scheduled successfully!')
        setScheduledAppointments([...scheduledAppointments, { id: Date.now(), date, time, doctor }])
        setDate('')
        setTime('')
        setDoctor('')
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error)
      setMessage('An error occurred while scheduling the appointment.')
    }
  }

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch(`/api/delete-appointment/${appointmentId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setMessage('Appointment deleted successfully!')
        setScheduledAppointments(scheduledAppointments.filter(app => app.id !== appointmentId))
      } else {
        setMessage('Failed to delete appointment.')
      }
    } catch (error) {
      console.error('Error deleting appointment:', error)
      setMessage('An error occurred while deleting the appointment.')
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700">Schedule an Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-indigo-600">Date</Label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-indigo-600">Time</Label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="doctor" className="text-indigo-600">Doctor</Label>
            <Input
              type="text"
              id="doctor"
              placeholder="Enter doctor's name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Schedule Appointment
          </Button>
        </form>
        {message && (
          <div className="mt-4 text-center font-medium text-green-600">
            {message}
          </div>
        )}
        {scheduledAppointments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Scheduled Appointments</h3>
            <ul className="space-y-2">
              {scheduledAppointments.map((appointment) => (
                <li key={appointment.id} className="bg-white p-3 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {appointment.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span> {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Doctor:</span> {appointment.doctor}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDelete(appointment.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

