'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, Shield } from 'lucide-react'

type HealthRecord = {
  id: string;
  data: string;
  timestamp: string;
  hash: string;
}

export default function BlockchainHealthRecords({ userId }: { userId: string }) {
  const [records, setRecords] = useState<HealthRecord[]>([])
  const [newRecord, setNewRecord] = useState('')

  const addRecord = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRecord) {
      const record: HealthRecord = {
        id: Date.now().toString(),
        data: newRecord,
        timestamp: new Date().toISOString(),
        hash: Math.random().toString(36).substring(2, 15),
      }
      setRecords([...records, record])
      setNewRecord('')
    }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-slate-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-700 flex items-center">
          <Link className="mr-2" />
          Blockchain Health Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addRecord} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="healthRecord">New Health Record</Label>
            <Input
              id="healthRecord"
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
              placeholder="Enter health record data"
              className="border-slate-300 focus:border-slate-500 focus:ring-slate-500"
            />
          </div>
          <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-700 text-white">
            Add to Blockchain
          </Button>
        </form>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Record ID: {record.id}</span>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">{record.data}</p>
              <div className="text-xs text-gray-500">
                <p>Timestamp: {record.timestamp}</p>
                <p>Hash: {record.hash}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

