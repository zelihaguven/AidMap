"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MapPin, Heart, Droplets, Pill, Home, Plus, Search, Package, Truck } from "lucide-react"

// Mock resource data
const resources = [
  {
    id: "1",
    type: "food",
    name: "Emergency Food Packages",
    quantity: 150,
    location: "Central Warehouse",
    status: "available",
    lastUpdated: "2024-01-15T10:30:00Z",
    coordinator: "Red Cross Istanbul",
  },
  {
    id: "2",
    type: "water",
    name: "Bottled Water (1L)",
    quantity: 500,
    location: "Distribution Center A",
    status: "available",
    lastUpdated: "2024-01-15T09:15:00Z",
    coordinator: "Local NGO",
  },
  {
    id: "3",
    type: "medicine",
    name: "First Aid Kits",
    quantity: 25,
    location: "Medical Supply Depot",
    status: "low_stock",
    lastUpdated: "2024-01-15T08:45:00Z",
    coordinator: "Healthcare Foundation",
  },
  {
    id: "4",
    type: "shelter",
    name: "Emergency Tents",
    quantity: 8,
    location: "Equipment Storage",
    status: "critical",
    lastUpdated: "2024-01-15T07:20:00Z",
    coordinator: "Disaster Relief Org",
  },
]

const resourceRequests = [
  {
    id: "1",
    type: "food",
    requestedBy: "Downtown Shelter",
    quantity: 50,
    urgency: "high",
    status: "pending",
    requestedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "2",
    type: "water",
    requestedBy: "Riverside Community",
    quantity: 100,
    urgency: "urgent",
    status: "approved",
    requestedAt: "2024-01-15T10:45:00Z",
  },
]

const resourceIcons = {
  food: Heart,
  water: Droplets,
  medicine: Pill,
  shelter: Home,
  other: Package,
}

const statusColors = {
  available: "bg-green-500",
  low_stock: "bg-yellow-500",
  critical: "bg-red-500",
  out_of_stock: "bg-gray-500",
}

const urgencyColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || resource.type === filterType
    const matchesStatus = filterStatus === "all" || resource.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
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
              <Link href="/map" className="text-gray-700 hover:text-blue-600">
                Map
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/resources" className="text-blue-600 font-medium">
                Resources
              </Link>
            </nav>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-gray-600 mt-2">Track and manage emergency resources and distribution</p>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Resource Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const Icon = resourceIcons[resource.type] || Package
                return (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <CardTitle className="text-lg">{resource.name}</CardTitle>
                        </div>
                        <Badge className={`${statusColors[resource.status]} text-white`}>
                          {resource.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <span className="font-semibold">{resource.quantity}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="text-sm">{resource.location}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Coordinator:</span>
                          <span className="text-sm">{resource.coordinator}</span>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Stock Level</span>
                            <span>{resource.quantity > 100 ? "High" : resource.quantity > 50 ? "Medium" : "Low"}</span>
                          </div>
                          <Progress value={Math.min((resource.quantity / 200) * 100, 100)} className="h-2" />
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1">
                            Distribute
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Requests</CardTitle>
                <CardDescription>Pending requests for emergency resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceRequests.map((request) => {
                    const Icon = resourceIcons[request.type] || Package
                    return (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Icon className="h-6 w-6 text-gray-600" />
                          <div>
                            <h4 className="font-medium">{request.requestedBy}</h4>
                            <p className="text-sm text-gray-600">
                              Needs {request.quantity} {request.type} items
                            </p>
                            <p className="text-xs text-gray-500">
                              Requested {new Date(request.requestedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={`${urgencyColors[request.urgency]} text-white`}>{request.urgency}</Badge>
                          <Badge variant="outline">{request.status}</Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution Management</CardTitle>
                <CardDescription>Track resource distribution and logistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Distribution Tracking</h3>
                  <p className="text-gray-500 mb-6">
                    Advanced distribution management system with route optimization, delivery tracking, and logistics
                    coordination would be implemented here.
                  </p>
                  <Button>Manage Distribution</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
