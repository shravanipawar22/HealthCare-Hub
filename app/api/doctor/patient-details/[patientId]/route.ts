import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { patientId: string } }) {
  const patientId = parseInt(params.patientId)

  // In a real application, you would fetch this data from a database
  const patientDetails = {
    id: patientId,
    name: 'John Doe',
    age: 35,
    dob: '1988-05-15',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
    medicalHistory: [
      'Hypertension diagnosed in 2020',
      'Appendectomy in 2015',
      'Allergic to penicillin',
      'Family history of diabetes'
    ]
  }

  return NextResponse.json(patientDetails)
}

