'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send } from 'lucide-react'

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const predefinedQuestions = [
  "What are common symptoms of the flu?",
  "How can I improve my sleep quality?",
  "What are some heart-healthy diet tips?",
  "How often should I exercise?",
]

const healthResponses = {
  "What are common symptoms of the flu?": "Common flu symptoms include fever, cough, sore throat, runny or stuffy nose, body aches, headache, chills, and fatigue. Some people may have vomiting and diarrhea. Remember, if symptoms are severe or you're in a high-risk group, consult a healthcare professional.",
  "How can I improve my sleep quality?": "To improve sleep quality: 1) Stick to a sleep schedule, 2) Create a relaxing bedtime routine, 3) Limit exposure to screens before bedtime, 4) Avoid caffeine and heavy meals late in the day, 5) Exercise regularly, but not close to bedtime, 6) Ensure your bedroom is dark, quiet, and cool. If sleep problems persist, consult a doctor.",
  "What are some heart-healthy diet tips?": "For a heart-healthy diet: 1) Eat more fruits, vegetables, and whole grains, 2) Choose lean proteins like fish and poultry, 3) Limit saturated and trans fats, 4) Reduce sodium intake, 5) Control portion sizes, 6) Include healthy fats like those in nuts and avocados. Always consult a nutritionist or doctor for personalized advice.",
  "How often should I exercise?": "Adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, along with muscle-strengthening activities at least 2 days a week. However, any amount of exercise is better than none. Consult your doctor before starting a new exercise regimen, especially if you have any health conditions.",
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your healthcare assistant. How can I help you today? You can ask me a question or choose from the predefined questions below."
    }
  ])
  const [input, setInput] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Generate response
    setTimeout(() => {
      const response = healthResponses[input] || "I'm sorry, I don't have specific information about that. For accurate medical advice, please consult with a healthcare professional."
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 500) // Simulate a slight delay for realism
  }

  const handlePredefinedQuestion = (question: string) => {
    setInput(question)
    handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)
  }

  return (
    <Card className="h-[500px] sm:h-[600px] flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 flex items-center">
          <MessageCircle className="mr-2" />
          Healthcare Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow pr-4 mb-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-indigo-100 ml-auto' : 'bg-white'
                } max-w-[80%]`}
              >
                <p className={`text-sm ${message.role === 'user' ? 'text-indigo-800' : 'text-gray-800'}`}>
                  {message.content}
                </p>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        <div className="mb-4 overflow-x-auto">
          <p className="text-sm text-gray-600 mb-2">Predefined Questions:</p>
          <div className="flex flex-wrap gap-2 pb-2">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedQuestion(question)}
                className="text-xs mb-2"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex mt-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health-related question..."
            className="flex-grow mr-2 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

