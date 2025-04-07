'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Calendar, Clock } from 'lucide-react'

interface PatientDetails {
  id: number;
  name: string;
  age: number;
  dob: string;
  phone: string;
  email: string;
  medicalHistory: string[];
}

interface PatientDetailsProps {
  patientId: number;
  onClose: () => void;
}

export default function PatientDetails({ patientId, onClose }: PatientDetailsProps) {
  const [patient, setPatient] = useState<PatientDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`/api/doctor/patient-details/${patientId}`)
        const data = await response.json()
        setPatient(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching patient details:', error)
        setLoading(false)
      }
    }

    fetchPatientDetails()
  }, [patientId])

  if (loading) {
    return <div>Loading patient details...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-700 flex items-center">
            <User className="mr-2" />
            Patient Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="font-medium">{patient.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
            <span>Date of Birth: {patient.dob}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-emerald-600 mr-2" />
            <span>Age: {patient.age}</span>
          </div>
          <div>
            <h4 className="font-semibold">Contact Information:</h4>
            <p>Phone: {patient.phone}</p>
            <p>Email: {patient.email}</p>
          </div>
          <div>
            <h4 className="font-semibold">Medical History:</h4>
            <ul className="list-disc list-inside">
              {patient.medicalHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <Button onClick={onClose} className="w-full mt-4">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

