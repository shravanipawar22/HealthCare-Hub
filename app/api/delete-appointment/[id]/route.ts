import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real-world scenario, you would delete the appointment from a database
  // For this example, we'll just return a success message
  return NextResponse.json({ message: `Appointment ${id} deleted successfully` })
}

