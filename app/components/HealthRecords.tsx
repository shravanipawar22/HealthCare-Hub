'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, ChevronDown, ChevronUp, User, Clipboard } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HealthRecord {
  id: number;
  type: string;
  date: string;
  description: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
}

export default function HealthRecords({ userId }: { userId: string }) {
  const [records, setRecords] = useState<HealthRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)

  useEffect(() => {
    fetchHealthRecords()
  }, [userId])

  const fetchHealthRecords = async () => {
    try {
      const response = await fetch(`/api/health-records/${userId}`)
      const data = await response.json()
      setRecords(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching health records:', error)
      setLoading(false)
    }
  }

  const toggleRecord = (id: number) => {
    setExpandedRecord(expandedRecord === id ? null : id)
  }

  if (loading) {
    return <Card><CardContent className="p-6">Loading health records...</CardContent></Card>
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700">Health Records</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id} className="bg-white transition duration-300 hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-semibold text-indigo-600">{record.type}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRecord(record.id)}
                    className="self-end sm:self-center"
                  >
                    {expandedRecord === record.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(record.date).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{record.description}</p>
                {expandedRecord === record.id && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <p>Doctor: {record.doctor}</p>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700">Diagnosis:</h4>
                      <p className="mt-1 text-sm text-gray-600">{record.diagnosis}</p>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700">Prescription:</h4>
                      <div className="mt-1 flex items-center">
                        <Clipboard className="h-4 w-4 mr-2 text-gray-400" />
                        <p className="text-sm text-gray-600">{record.prescription}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

