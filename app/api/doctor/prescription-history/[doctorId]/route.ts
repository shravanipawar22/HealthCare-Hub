import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { doctorId: string } }) {
  const doctorId = params.doctorId

  // In a real application, you would fetch this data from a database
  const prescriptionHistory = [
    { 
      id: 1, 
      patientName: 'John Doe', 
      medication: 'Amoxicillin', 
      dosage: '500mg 3x daily', 
      instructions: 'Take with food. Complete full course of antibiotics.',
      date: '2023-06-10' 
    },
    { 
      id: 2, 
      patientName: 'Jane Smith', 
      medication: 'Lisinopril', 
      dosage: '10mg 1x daily', 
      instructions: 'Take in the morning. Avoid alcohol.',
      date: '2023-06-11' 
    },
    { 
      id: 3, 
      patientName: 'Bob Johnson', 
      medication: 'Metformin', 
      dosage: '1000mg 2x daily', 
      instructions: 'Take with meals. Monitor blood sugar regularly.',
      date: '2023-06-12' 
    },
    { 
      id: 4, 
      patientName: 'Alice Brown', 
      medication: 'Sertraline', 
      dosage: '50mg 1x daily', 
      instructions: 'Take in the morning. May cause drowsiness.',
      date: '2023-06-13' 
    },
  ]

  return NextResponse.json(prescriptionHistory)
}

