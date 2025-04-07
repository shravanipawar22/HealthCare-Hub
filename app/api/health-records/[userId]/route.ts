import { NextResponse } from 'next/server'

export async function GET(req: Request, context: { params: { userId: string } }) {
  const { userId } = await context.params;

  // In a real-world scenario, you would fetch this data from a database
  const healthRecords = [
    { id: 1, record: "Blood Test", userId },
    { id: 2, record: "X-Ray", userId },
  ];

  return new Response(JSON.stringify(healthRecords), {
    headers: { "Content-Type": "application/json" },
  });
}

