import { NextResponse } from 'next/server'

const hospitals = [
  {
    id: 1,
    name: 'General Hospital',
    address: '123 Main St, Cityville',
    latitude: 40.7128,
    longitude: -74.0060,
    phone: '(555) 123-4567',
    website: 'https://generalhospital.com',
    specialties: ['Emergency Care', 'Surgery', 'Pediatrics'],
    emergencyCare: true,
  },
  {
    id: 2,
    name: 'City Medical Center',
    address: '456 Oak Ave, Townsburg',
    latitude: 40.7282,
    longitude: -73.9942,
    phone: '(555) 987-6543',
    website: 'https://citymedical.com',
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
    emergencyCare: true,
  },
  {
    id: 3,
    name: 'Community Health Clinic',
    address: '789 Pine Rd, Villageton',
    latitude: 40.7489,
    longitude: -73.9680,
    phone: '(555) 456-7890',
    website: 'https://communityhealthclinic.org',
    specialties: ['Family Medicine', 'Mental Health', 'Preventive Care'],
    emergencyCare: false,
  },
  {
    id: 4,
    name: 'Pediatric Care Center',
    address: '101 Elm St, Kidstown',
    latitude: 40.7589,
    longitude: -73.9851,
    phone: '(555) 234-5678',
    website: 'https://pediatriccare.com',
    specialties: ['Pediatrics', 'Child Psychology', 'Pediatric Dentistry'],
    emergencyCare: false,
  },
  {
    id: 5,
    name: 'Urgent Care Clinic',
    address: '202 Maple Ave, Quickville',
    latitude: 40.7421,
    longitude: -74.0018,
    phone: '(555) 345-6789',
    website: 'https://urgentcareclinic.com',
    specialties: ['Urgent Care', 'X-ray Services', 'Lab Tests'],
    emergencyCare: true,
  },
]

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return parseFloat(distance.toFixed(1))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latitude = parseFloat(searchParams.get('latitude') || '0')
  const longitude = parseFloat(searchParams.get('longitude') || '0')
  const emergencyCare = searchParams.get('emergencyCare')

  let filteredHospitals = hospitals.map(hospital => ({
    ...hospital,
    distance: calculateDistance(latitude, longitude, hospital.latitude, hospital.longitude)
  }))

  filteredHospitals.sort((a, b) => a.distance - b.distance)

  if (emergencyCare) {
    filteredHospitals = filteredHospitals.filter(hospital => hospital.emergencyCare)
  }

  return NextResponse.json(filteredHospitals)
}

