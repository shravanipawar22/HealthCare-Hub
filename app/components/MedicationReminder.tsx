'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pill } from 'lucide-react'

type Medication = {
  id: string;
  name: string;
  time: string;
}

export default function MedicationReminder({ userId }: { userId: string }) {
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState({ name: '', time: '' })

  const addMedication = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication.name && newMedication.time) {
      setMedications([...medications, { ...newMedication, id: Date.now().toString() }])
      setNewMedication({ name: '', time: '' })
    }
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-700 flex items-center">
          <Pill className="mr-2" />
          Medication Reminder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addMedication} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="medicationName">Medication Name</Label>
            <Input
              id="medicationName"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              placeholder="Enter medication name"
              className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicationTime">Time</Label>
            <Input
              id="medicationTime"
              type="time"
              value={newMedication.time}
              onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
              className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
            Add Medication
          </Button>
        </form>
        <div className="space-y-2">
          {medications.map((med) => (
            <div key={med.id} className="flex justify-between items-center bg-white p-2 rounded-lg">
              <span className="font-medium">{med.name}</span>
              <span className="text-gray-600">{med.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

