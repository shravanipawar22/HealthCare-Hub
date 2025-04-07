'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain } from 'lucide-react'

export default function AIHealthAssistant({ userId }: { userId: string }) {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would call an AI service API
    setResponse(`AI Assistant: Based on your query "${query}", here's a personalized health recommendation...`)
    setQuery('')
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700 flex items-center">
          <Brain className="mr-2" />
          AI Health Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your health..."
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Get AI Advice
          </Button>
        </form>
        {response && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-800">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

