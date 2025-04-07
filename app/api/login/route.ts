import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password, userType } = await req.json()

    // Accept any email that ends with @example.com and any non-empty password
    if (email.endsWith('@example.com') && password.length > 0) {
      let role = 'patient'
      if (userType === 'doctor' && email.startsWith('doctor')) {
        role = 'doctor'
      }
      return NextResponse.json({ id: Math.floor(Math.random() * 1000), email, role })
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

