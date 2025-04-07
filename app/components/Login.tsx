'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('patient')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      })
    
      const data = await response.json()
    
      if (response.ok) {
        setUser(data)
      } else {
        alert(`Login failed: ${data.message}`)
      }
    } catch (error) {
      console.error('Error logging in:', error)
      alert('An error occurred while logging in. Please try again.')
    }
  }

  const handleRandomLogin = async () => {
    const randomEmail = `${userType}${Math.floor(Math.random() * 1000)}@example.com`
    const randomPassword = Math.random().toString(36).slice(-8)
    setEmail(randomEmail)
    setPassword(randomPassword)
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: randomEmail, password: randomPassword, userType }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data)
      } else {
        alert(`Random login failed: ${data.message}`)
      }
    } catch (error) {
      console.error('Error with random login:', error)
      alert('An error occurred while attempting random login. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6 sm:mb-8">Healthcare Hub</h1>
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-indigo-700">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup defaultValue="patient" onValueChange={setUserType} className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient">Patient</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doctor" id="doctor" />
                <Label htmlFor="doctor">Doctor</Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <div className="mt-4">
            <Button onClick={handleRandomLogin} variant="outline" className="w-full">
              Random {userType === 'patient' ? 'Patient' : 'Doctor'} Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

