import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, date, time, doctor } = await req.json()

  // In a real-world scenario, you would save this data to a database
  // For this example, we'll just return the created appointment
  const newAppointment = {
    id: Date.now(),
    userId,
    date,
    time,
    doctor
  }

  return NextResponse.json(newAppointment)
}

