'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Search, Plus } from 'lucide-react'
import PatientDetails from './PatientDetails'
import AddPatient from './AddPatient'

interface PatientRecord {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
}

export default function PatientRecords({ doctorId }: { doctorId: string }) {
  const [records, setRecords] = useState<PatientRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null)
  const [showAddPatient, setShowAddPatient] = useState(false)

  useEffect(() => {
    // In a real application, fetch patient records from an API
    const fetchRecords = async () => {
      // Simulated API call
      const response = await fetch(`/api/doctor/patient-records/${doctorId}`)
      const data = await response.json()
      setRecords(data)
    }

    fetchRecords()
  }, [doctorId])

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPatient = () => {
    setShowAddPatient(true)
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-700 flex items-center">
          <FileText className="mr-2" />
          Patient Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search" className="sr-only">Search patients</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
        {filteredRecords.length > 0 ? (
          <ul className="space-y-4">
            {filteredRecords.map((record) => (
              <li key={record.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-emerald-700">{record.name}</h3>
                    <p className="text-sm text-gray-600">Age: {record.age}</p>
                    <p className="text-sm text-gray-600">Last visit: {record.lastVisit}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(record)}>
                    View Details
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No patient records found.</p>
        )}
        <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleAddPatient}>
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
        {selectedPatient && (
          <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        )}
        {showAddPatient && (
          <AddPatient onClose={() => setShowAddPatient(false)} onAddPatient={(newPatient) => {
            setRecords([...records, newPatient])
            setShowAddPatient(false)
          }} />
        )}
      </CardContent>
    </Card>
  )
}

