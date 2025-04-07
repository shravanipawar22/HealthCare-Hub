import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId

  // In a real-world scenario, you would fetch this data from a database
  const appointments = [
    { id: 1, date: '2023-06-15', time: '10:00', doctor: 'Dr. Smith' },
    { id: 2, date: '2023-06-20', time: '14:30', doctor: 'Dr. Johnson' },
    { id: 3, date: '2023-06-25', time: '11:15', doctor: 'Dr. Williams' },
  ]

  return NextResponse.json(appointments)
}

