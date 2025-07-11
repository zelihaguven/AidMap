"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Home,
  Droplets,
  Pill,
  TrendingUp,
  Activity,
} from "lucide-react"

// Mock dashboard data
const dashboardStats = {
  totalRequests: 156,
  activeRequests: 89,
  resolvedRequests: 67,
  activeVolunteers: 234,
  resourcesDistributed: 1247,
  avgResponseTime: "2.3 hours",
}

const recentRequests = [
  {
    id: "1",
    title: "Emergency Food Supply",
    location: "Downtown District",
    priority: "urgent",
    status: "pending",
    timeAgo: "15 minutes ago",
  },
  {
    id: "2",
    title: "Medical Assistance",
    location: "Riverside Area",
    priority: "high",
    status: "in_progress",
    timeAgo: "1 hour ago",
  },
  {
    id: "3",
    title: "Temporary Shelter",
    location: "North Quarter",
    priority: "medium",
    status: "resolved",
    timeAgo: "3 hours ago",
  },
]

const resourceStats = [
  { type: "Food", available: 450, distributed: 320, icon: Heart, color: "text-red-500" },
  { type: "Water", available: 890, distributed: 567, icon: Droplets, color: "text-blue-500" },
  { type: "Medicine", available: 123, distributed: 89, icon: Pill, color: "text-green-500" },
  { type: "Shelter", available: 45, distributed: 23, icon: Home, color: "text-purple-500" },
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

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

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
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600">
                Resources
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Activity className="h-3 w-3 mr-1" />
                System Active
              </Badge>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crisis Response Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and coordinate emergency aid efforts in real-time</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalRequests}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12% from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeRequests}</div>
                  <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeVolunteers}</div>
                  <p className="text-xs text-muted-foreground">Currently helping</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.resolvedRequests}</div>
                  <p className="text-xs text-muted-foreground">Avg response: {dashboardStats.avgResponseTime}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Aid Requests</CardTitle>
                  <CardDescription>Latest emergency requests requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{request.title}</h4>
                          <p className="text-xs text-gray-500">
                            {request.location} • {request.timeAgo}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${priorityColors[request.priority]} text-white text-xs`}>
                            {request.priority}
                          </Badge>
                          <Badge className={`${statusColors[request.status]} text-white text-xs`}>
                            {request.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/map">View All Requests</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Distribution</CardTitle>
                  <CardDescription>Current resource availability and distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceStats.map((resource) => {
                      const Icon = resource.icon
                      const percentage = (resource.distributed / (resource.available + resource.distributed)) * 100
                      return (
                        <div key={resource.type} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Icon className={`h-4 w-4 ${resource.color}`} />
                              <span className="text-sm font-medium">{resource.type}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {resource.distributed} / {resource.available + resource.distributed}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/resources">Manage Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aid Request Management</CardTitle>
                <CardDescription>Monitor and manage all emergency aid requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Request Management</h3>
                  <p className="text-gray-500 mb-6">
                    Detailed request management interface would be implemented here with filtering, sorting, assignment
                    capabilities, and status updates.
                  </p>
                  <Button asChild>
                    <Link href="/map">View Requests on Map</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Management</CardTitle>
                <CardDescription>Track and distribute emergency resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Resource Tracking</h3>
                  <p className="text-gray-500 mb-6">
                    Comprehensive resource management system with inventory tracking, distribution planning, and supply
                    chain coordination.
                  </p>
                  <Button asChild>
                    <Link href="/resources">Manage Resources</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Coordination</CardTitle>
                <CardDescription>Manage volunteer assignments and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Volunteer Management</h3>
                  <p className="text-gray-500 mb-6">
                    Volunteer coordination system with skill matching, availability tracking, and assignment management
                    capabilities.
                  </p>
                  <Button>Manage Volunteers</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
