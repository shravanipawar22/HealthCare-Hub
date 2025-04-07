'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pill, Clock, X } from 'lucide-react'

interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  instructions: string;
  date: string;
}

export default function PrescriptionManagement({ doctorId }: { doctorId: string }) {
  const [patientName, setPatientName] = useState('')
  const [medication, setMedication] = useState('')
  const [dosage, setDosage] = useState('')
  const [instructions, setInstructions] = useState('')
  const [prescriptionHistory, setPrescriptionHistory] = useState<Prescription[]>([])
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)

  useEffect(() => {
    fetchPrescriptionHistory()
  }, [doctorId])

  const fetchPrescriptionHistory = async () => {
    try {
      const response = await fetch(`/api/doctor/prescription-history/${doctorId}`)
      const data = await response.json()
      setPrescriptionHistory(data)
    } catch (error) {
      console.error('Error fetching prescription history:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newPrescription: Prescription = {
      id: Date.now(),
      patientName,
      medication,
      dosage,
      instructions,
      date: new Date().toISOString().split('T')[0]
    }
    
    // In a real application, send this data to an API
    console.log('Prescription submitted:', newPrescription)
    
    // Update local state
    setPrescriptionHistory([newPrescription, ...prescriptionHistory])
    
    // Reset form
    setPatientName('')
    setMedication('')
    setDosage('')
    setInstructions('')
  }

  const handlePrescriptionClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700 flex items-center">
          <Pill className="mr-2" />
          Prescription Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              required
              className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
              className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Issue Prescription
          </Button>
        </form>

        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Prescription History</h3>
          <ul className="space-y-2">
            {prescriptionHistory.map((prescription) => (
              <li 
                key={prescription.id} 
                className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-purple-50 transition duration-300"
                onClick={() => handlePrescriptionClick(prescription)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{prescription.patientName}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {prescription.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{prescription.medication} - {prescription.dosage}</p>
              </li>
            ))}
          </ul>
        </div>

        {selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-purple-700">Prescription Details</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedPrescription(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <p><strong>Patient:</strong> {selectedPrescription.patientName}</p>
                <p><strong>Medication:</strong> {selectedPrescription.medication}</p>
                <p><strong>Dosage:</strong> {selectedPrescription.dosage}</p>
                <p><strong>Instructions:</strong> {selectedPrescription.instructions}</p>
                <p><strong>Date:</strong> {selectedPrescription.date}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

