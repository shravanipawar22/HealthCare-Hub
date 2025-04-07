import { NextResponse } from 'next/server'

export async function GET(req: Request, context: { params: { doctorId: string } }) {
  const { doctorId } = await context.params;

  // In a real application, you would fetch this data from a database
  const appointments = [
    { id: 1, patient: "John Doe", doctorId },
    { id: 2, patient: "Jane Smith", doctorId },
  ];

  return new Response(JSON.stringify(appointments), {
    headers: { "Content-Type": "application/json" },
  });
}

