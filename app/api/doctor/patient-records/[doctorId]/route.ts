import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { doctorId: string } }) {
  const doctorId = params.doctorId

  // In a real application, you would fetch this data from a database
  const patientRecords = [
    { id: 1, name: 'John Doe', age: 35, lastVisit: '2023-05-20' },
    { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2023-06-01' },
    { id: 3, name: 'Bob Johnson', age: 42, lastVisit: '2023-05-15' },
    { id: 4, name: 'Alice Brown', age: 55, lastVisit: '2023-06-10' },
  ]

  return NextResponse.json(patientRecords)
}

