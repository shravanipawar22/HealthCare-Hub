import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from 'lucide-react'

interface PatientRecord {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
}

interface AddPatientProps {
  onClose: () => void;
  onAddPatient: (patient: PatientRecord) => void;
}

export default function AddPatient({ onClose, onAddPatient }: AddPatientProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPatient: PatientRecord = {
      id: Date.now(),
      name,
      age: parseInt(age),
      lastVisit: new Date().toISOString().split('T')[0],
    }
    onAddPatient(newPatient)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-700 flex items-center">
            <UserPlus className="mr-2" />
            Add New Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">
                Add Patient
              </Button>
              <Button type="button" onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

