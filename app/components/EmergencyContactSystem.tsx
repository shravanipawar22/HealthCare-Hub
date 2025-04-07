'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Phone } from 'lucide-react'

type Contact = {
  id: string;
  name: string;
  phone: string;
}

export default function EmergencyContactSystem({ userId }: { userId: string }) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [newContact, setNewContact] = useState({ name: '', phone: '' })

  const addContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString() }])
      setNewContact({ name: '', phone: '' })
    }
  }

  const simulateEmergency = () => {
    alert(`Emergency services and ${contacts.length} emergency contacts would be notified in a real scenario.`)
  }

  return (
    <Card className="bg-gradient-to-br from-red-50 to-rose-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-rose-700 flex items-center">
          <AlertTriangle className="mr-2" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addContact} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              placeholder="Enter contact name"
              className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input
              id="contactPhone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              placeholder="Enter phone number"
              className="border-rose-300 focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
            Add Contact
          </Button>
        </form>
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex justify-between items-center bg-white p-2 rounded-lg">
              <span className="font-medium">{contact.name}</span>
              <span className="text-gray-600">{contact.phone}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={simulateEmergency}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
        >
          <Phone className="mr-2 h-4 w-4" />
          Simulate Emergency
        </Button>
      </CardContent>
    </Card>
  )
}

