"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Users, AlertTriangle, Heart, Home } from "lucide-react"
import Link from "next/link"

// Mock data for aid requests
const mockAidRequests = [
  {
    id: "1",
    title: "Emergency Food Supply Needed",
    description: "Family of 5 needs immediate food assistance after flood damage",
    location: { lat: 41.0082, lng: 28.9784 },
    priority: "urgent",
    status: "pending",
    requestedBy: "Local Resident",
    requestedAt: "2024-01-15T10:30:00Z",
    neededResources: [
      { type: "food", quantity: 5 },
      { type: "water", quantity: 20 },
    ],
    assignedVolunteers: [],
  },
  {
    id: "2",
    title: "Medical Supplies Required",
    description: "Elderly person needs medication and medical attention",
    location: { lat: 41.0122, lng: 28.9844 },
    priority: "high",
    status: "in_progress",
    requestedBy: "Healthcare Worker",
    requestedAt: "2024-01-15T09:15:00Z",
    neededResources: [{ type: "medicine", quantity: 1 }],
    assignedVolunteers: ["volunteer1"],
  },
  {
    id: "3",
    title: "Temporary Shelter Needed",
    description: "Displaced family needs temporary accommodation",
    location: { lat: 41.0062, lng: 28.9724 },
    priority: "medium",
    status: "pending",
    requestedBy: "NGO Staff",
    requestedAt: "2024-01-15T08:45:00Z",
    neededResources: [{ type: "shelter", quantity: 1 }],
    assignedVolunteers: [],
  },
]

const priorityColors = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

const statusColors = {
  pending: "bg-gray-500",
  in_progress: "bg-blue-500",
  resolved: "bg-green-500",
}

const resourceIcons = {
  food: Heart,
  water: Heart,
  medicine: AlertTriangle,
  shelter: Home,
  other: Users,
}

export default function MapPage() {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = mockAidRequests.filter((request) => {
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesPriority && matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AidMap</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/map" className="text-blue-600 font-medium">
                Map
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600">
                Resources
              </Link>
            </nav>
            <Button asChild>
              <Link href="/request-aid">
                <Plus className="h-4 w-4 mr-2" />
                Request Aid
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Aid Requests</h2>

            {/* Filters */}
            <div className="space-y-3">
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="flex space-x-2">
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Request List */}
          <div className="p-4 space-y-4">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRequest?.id === request.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium">{request.title}</CardTitle>
                    <div className="flex space-x-1">
                      <Badge className={`${priorityColors[request.priority]} text-white text-xs`}>
                        {request.priority}
                      </Badge>
                      <Badge className={`${statusColors[request.status]} text-white text-xs`}>
                        {request.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By: {request.requestedBy}</span>
                    <span>{new Date(request.requestedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    {request.neededResources.map((resource, index) => {
                      const Icon = resourceIcons[resource.type] || Users
                      return (
                        <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
                          <Icon className="h-3 w-3" />
                          <span>
                            {resource.quantity} {resource.type}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Interactive Map</h3>
              <p className="text-gray-500 max-w-md">
                This would display an interactive map using Leaflet.js or Mapbox showing all aid requests, resources,
                and volunteer locations in real-time.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Urgent Requests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Low Priority</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Request Details */}
          {selectedRequest && (
            <div className="absolute top-4 right-4 w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedRequest.title}
                    <Badge className={`${priorityColors[selectedRequest.priority]} text-white`}>
                      {selectedRequest.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{selectedRequest.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Needed Resources:</h4>
                      <div className="space-y-1">
                        {selectedRequest.neededResources.map((resource, index) => {
                          const Icon = resourceIcons[resource.type] || Users
                          return (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Icon className="h-4 w-4 text-gray-500" />
                              <span>
                                {resource.quantity} {resource.type}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Status:</h4>
                      <Badge className={`${statusColors[selectedRequest.status]} text-white`}>
                        {selectedRequest.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Volunteer to Help
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Contact Requester
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
