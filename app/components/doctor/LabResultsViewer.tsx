'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, X } from 'lucide-react'

interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  result: string;
  date: string;
  details: string;
}

export default function LabResultsViewer({ doctorId }: { doctorId: string }) {
  const [labResults, setLabResults] = useState<LabResult[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null)

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await fetch(`/api/doctor/lab-results/${doctorId}`)
        const data = await response.json()
        setLabResults(data)
      } catch (error) {
        console.error('Error fetching lab results:', error)
      }
    }

    fetchLabResults()
  }, [doctorId])

  const filteredResults = labResults.filter(result =>
    result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (result: LabResult) => {
    setSelectedResult(result)
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-700 flex items-center">
          <FileText className="mr-2" />
          Lab Results Viewer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search" className="sr-only">Search lab results</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search by patient name or test name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.patientName}</TableCell>
                <TableCell>{result.testName}</TableCell>
                <TableCell>{result.result}</TableCell>
                <TableCell>{result.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-amber-700 flex items-center justify-between">
                  <span>Lab Result Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedResult(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Patient:</strong> {selectedResult.patientName}</p>
                  <p><strong>Test:</strong> {selectedResult.testName}</p>
                  <p><strong>Result:</strong> {selectedResult.result}</p>
                  <p><strong>Date:</strong> {selectedResult.date}</p>
                  <p><strong>Details:</strong> {selectedResult.details}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

