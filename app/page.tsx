'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CrossIcon as MedicalCross } from 'lucide-react'
import Login from './components/Login'

// Doctor components
import PatientAppointments from './components/doctor/PatientAppointments'
import PatientRecords from './components/doctor/PatientRecords'
import PrescriptionManagement from './components/doctor/PrescriptionManagement'
import TelemedicineConsultation from './components/doctor/TelemedicineConsultation'
import LabResultsViewer from './components/doctor/LabResultsViewer'
import TreatmentPlanCreator from './components/doctor/TreatmentPlanCreator'
import AppointmentCalendar from './components/doctor/AppointmentCalendar'

// Patient components
import AppointmentScheduling from './components/AppointmentScheduling'
import HealthRecords from './components/HealthRecords'
import Chatbot from './components/Chatbot'
import SymptomChecker from './components/SymptomChecker'
import MedicationReminder from './components/MedicationReminder'
import TelemedicineIntegration from './components/TelemedicineIntegration'
import HealthDataVisualization from './components/HealthDataVisualization'
import EmergencyContactSystem from './components/EmergencyContactSystem'
import AIHealthAssistant from './components/AIHealthAssistant'
import PersonalizedHealthGoals from './components/PersonalizedHealthGoals'
import VRTherapy from './components/VRTherapy'
import BlockchainHealthRecords from './components/BlockchainHealthRecords'
import WearableIntegration from './components/WearableIntegration'
import NearbyHospitals from './components/NearbyHospitals'

export default function HealthcareDashboard() {
  const [user, setUser] = useState(null)

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <MedicalCross className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mr-2 sm:mr-3" />
            <h1 className="text-xl sm:text-3xl font-bold text-indigo-900">
              {user.role === 'doctor' ? 'Doctor' : 'Patient'} Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <span className="mb-2 sm:mb-0 sm:mr-4 text-sm sm:text-base text-indigo-700">{user.email} ({user.role})</span>
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {user.role === 'doctor' ? (
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
              <TabsTrigger value="labresults">Lab Results</TabsTrigger>
              <TabsTrigger value="treatmentplans">Treatment Plans</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments">
              <PatientAppointments doctorId={user.id} />
            </TabsContent>
            <TabsContent value="patients">
              <PatientRecords doctorId={user.id} />
            </TabsContent>
            <TabsContent value="prescriptions">
              <PrescriptionManagement doctorId={user.id} />
            </TabsContent>
            <TabsContent value="telemedicine">
              <TelemedicineConsultation doctorId={user.id} />
            </TabsContent>
            <TabsContent value="labresults">
              <LabResultsViewer doctorId={user.id} />
            </TabsContent>
            <TabsContent value="treatmentplans">
              <TreatmentPlanCreator doctorId={user.id} />
            </TabsContent>
            <TabsContent value="calendar">
              <AppointmentCalendar doctorId={user.id} />
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList className="flex flex-wrap justify-center">
              <TabsTrigger value="appointments" className="mb-2 sm:mb-0">Appointments</TabsTrigger>
              <TabsTrigger value="records" className="mb-2 sm:mb-0">Health Records</TabsTrigger>
              <TabsTrigger value="medication" className="mb-2 sm:mb-0">Medication</TabsTrigger>
              <TabsTrigger value="telemedicine" className="mb-2 sm:mb-0">Telemedicine</TabsTrigger>
              <TabsTrigger value="wellness" className="mb-2 sm:mb-0">Wellness</TabsTrigger>
              <TabsTrigger value="emergency" className="mb-2 sm:mb-0">Emergency</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <AppointmentScheduling userId={user.id} />
                <NearbyHospitals />
              </div>
            </TabsContent>
            <TabsContent value="records">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <HealthRecords userId={user.id} />
                <BlockchainHealthRecords userId={user.id} />
                <HealthDataVisualization userId={user.id} />
              </div>
            </TabsContent>
            <TabsContent value="medication">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <MedicationReminder userId={user.id} />
                <SymptomChecker />
              </div>
            </TabsContent>
            <TabsContent value="telemedicine">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <TelemedicineIntegration />
                <Chatbot />
                <AIHealthAssistant userId={user.id} />
              </div>
            </TabsContent>
            <TabsContent value="wellness">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <PersonalizedHealthGoals userId={user.id} />
                <VRTherapy userId={user.id} />
                <WearableIntegration userId={user.id} />
              </div>
            </TabsContent>
            <TabsContent value="emergency">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <EmergencyContactSystem userId={user.id} />
                <NearbyHospitals />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}

