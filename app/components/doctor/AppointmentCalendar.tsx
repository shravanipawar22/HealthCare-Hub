'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface Appointment {
  id: string;
  patientName: string;
  date: Date;
  time: string;
}

export default function AppointmentCalendar({ doctorId }: { doctorId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    time: '',
  })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    // In a real application, fetch appointments for the selected date
    // For now, we'll just clear the appointments
    setAppointments([])
  }

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && newAppointment.patientName && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        patientName: newAppointment.patientName,
        date: selectedDate,
        time: newAppointment.time,
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({ patientName: '', time: '' })
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <CalendarIcon className="mr-2" />
          Appointment Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border shadow"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </h3>
            {appointments.length > 0 ? (
              <ul className="space-y-2">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="bg-white p-2 rounded-md flex justify-between items-center">
                    <span>{appointment.patientName}</span>
                    <span className="text-gray-500">{appointment.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No appointments scheduled for this date.</p>
            )}
          </div>
          <form onSubmit={handleAddAppointment} className="space-y-2">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                required
                className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label htmlFor="appointmentTime">Time</Label>
              <Input
                id="appointmentTime"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                required
                className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Add Appointment
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

