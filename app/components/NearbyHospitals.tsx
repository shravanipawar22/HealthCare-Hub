'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Globe, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

interface Hospital {
  id: number;
  name: string;
  address: string;
  distance: number;
  phone: string;
  website: string;
  specialties: string[];
  emergencyCare: boolean;
}

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null)
  const [emergencyCare, setEmergencyCare] = useState(false)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (userLocation) {
      fetchNearbyHospitals()
    }
  }, [userLocation, emergencyCare])

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          setLocationError(null)
        },
        error => {
          console.error("Error getting user location:", error)
          setLocationError(getLocationErrorMessage(error))
          setLoading(false)
        }
      )
    } else {
      setLocationError("Geolocation is not supported by this browser.")
      setLoading(false)
    }
  }

  const getLocationErrorMessage = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access denied. Please enable location services and refresh the page."
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable. Please try again later."
      case error.TIMEOUT:
        return "The request to get user location timed out. Please try again."
      default:
        return "An unknown error occurred while trying to get your location."
    }
  }

  const fetchNearbyHospitals = async () => {
    if (!userLocation) return

    try {
      const params = new URLSearchParams({
        latitude: userLocation.latitude.toString(),
        longitude: userLocation.longitude.toString(),
        ...(emergencyCare ? { emergencyCare: 'true' } : {})
      })

      const response = await fetch(`/api/nearby-hospitals?${params.toString()}`)
      const data = await response.json()
      setHospitals(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error)
      setLoading(false)
    }
  }

  const toggleHospital = (id: number) => {
    setExpandedHospital(expandedHospital === id ? null : id)
  }

  if (locationError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            <p>{locationError}</p>
          </div>
          <Button onClick={getUserLocation} className="mt-4">
            Retry Location Access
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return <Card><CardContent className="p-6">Loading nearby hospitals...</CardContent></Card>
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700">Nearby Hospitals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emergencyCare"
              checked={emergencyCare}
              onCheckedChange={(checked) => setEmergencyCare(checked as boolean)}
            />
            <Label htmlFor="emergencyCare">Emergency Care Only</Label>
          </div>
        </div>
        {hospitals.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {hospitals.map((hospital) => (
              <li key={hospital.id} className="bg-white transition duration-300 hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-indigo-600">{hospital.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHospital(hospital.id)}
                      className="ml-2"
                    >
                      {expandedHospital === hospital.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <p>{hospital.address}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {hospital.distance} km away
                    </span>
                  </div>
                  {expandedHospital === hospital.id && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <p>{hospital.phone}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="h-4 w-4 mr-2" />
                        <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                          {hospital.website}
                        </a>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Specialties:</h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {hospital.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Emergency Care:</h4>
                        <p className="text-sm text-gray-600">{hospital.emergencyCare ? 'Available' : 'Not available'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No hospitals found nearby. Try adjusting your filters or location.</p>
        )}
      </CardContent>
    </Card>
  )
}

