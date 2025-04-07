'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would call an API to process the symptoms
    setResult(`Based on the symptoms "${symptoms}", it's recommended to consult a doctor for a proper diagnosis. Remember, this is not a substitute for professional medical advice.`)
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-700 flex items-center">
          <AlertCircle className="mr-2" />
          Symptom Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <Input
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., headache, fever, cough"
              className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Check Symptoms
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-800">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

