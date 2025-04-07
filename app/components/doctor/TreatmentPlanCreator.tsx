'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clipboard, Plus, X, Save } from 'lucide-react'

interface TreatmentStep {
  id: string;
  description: string;
}

interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  steps: TreatmentStep[];
  createdAt: string;
}

export default function TreatmentPlanCreator({ doctorId }: { doctorId: string }) {
  const [patientId, setPatientId] = useState('')
  const [patientName, setPatientName] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [steps, setSteps] = useState<TreatmentStep[]>([])
  const [newStep, setNewStep] = useState('')
  const [savedPlans, setSavedPlans] = useState<TreatmentPlan[]>([])

  useEffect(() => {
    // In a real application, fetch saved treatment plans from an API
    const fetchSavedPlans = async () => {
      try {
        const response = await fetch(`/api/doctor/treatment-plans/${doctorId}`)
        const data = await response.json()
        setSavedPlans(data)
      } catch (error) {
        console.error('Error fetching treatment plans:', error)
      }
    }

    fetchSavedPlans()
  }, [doctorId])

  const addStep = () => {
    if (newStep.trim() !== '') {
      setSteps([...steps, { id: Date.now().toString(), description: newStep }])
      setNewStep('')
    }
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPlan: TreatmentPlan = {
      id: Date.now().toString(),
      patientId,
      patientName,
      diagnosis,
      steps,
      createdAt: new Date().toISOString(),
    }
    // In a real application, send this data to an API
    console.log('Treatment plan submitted:', newPlan)
    setSavedPlans([newPlan, ...savedPlans])
    // Reset form
    setPatientId('')
    setPatientName('')
    setDiagnosis('')
    setSteps([])
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-teal-700 flex items-center">
          <Clipboard className="mr-2" />
          Treatment Plan Creator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div>
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
              className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <div>
            <Label htmlFor="newStep">Treatment Steps</Label>
            <div className="flex space-x-2">
              <Input
                id="newStep"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="Add a treatment step"
                className="border-teal-300 focus:border-teal-500 focus:ring-teal-500"
              />
              <Button type="button" onClick={addStep} className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ul className="space-y-2">
            {steps.map((step) => (
              <li key={step.id} className="flex items-center justify-between bg-white p-2 rounded-md">
                <span>{step.description}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(step.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Treatment Plan
          </Button>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-teal-700 mb-4">Saved Treatment Plans</h3>
          <ul className="space-y-4">
            {savedPlans.map((plan) => (
              <li key={plan.id} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-teal-600">{plan.patientName}</h4>
                <p className="text-sm text-gray-600">Patient ID: {plan.patientId}</p>
                <p className="text-sm text-gray-600">Created: {new Date(plan.createdAt).toLocaleDateString()}</p>
                <p className="mt-2"><strong>Diagnosis:</strong> {plan.diagnosis}</p>
                <ul className="mt-2 list-disc list-inside">
                  {plan.steps.map((step, index) => (
                    <li key={step.id} className="text-sm">{step.description}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

