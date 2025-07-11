"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, AlertTriangle, Heart, Home, Droplets, Pill, Users, CheckCircle } from "lucide-react"

const resourceTypes = [
  { id: "food", label: "Food", icon: Heart, description: "Meals, groceries, emergency food supplies" },
  { id: "water", label: "Water", icon: Droplets, description: "Drinking water, water purification" },
  { id: "medicine", label: "Medicine", icon: Pill, description: "Medical supplies, medications" },
  { id: "shelter", label: "Shelter", icon: Home, description: "Temporary housing, accommodation" },
  { id: "other", label: "Other", icon: Users, description: "Other emergency assistance" },
]

export default function RequestAidPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    location: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    neededResources: [],
    urgentNeed: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResourceToggle = (resourceId, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        neededResources: [...prev.neededResources, { type: resourceId, quantity: 1 }],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        neededResources: prev.neededResources.filter((r) => r.type !== resourceId),
      }))
    }
  }

  const handleQuantityChange = (resourceId, quantity) => {
    setFormData((prev) => ({
      ...prev,
      neededResources: prev.neededResources.map((r) =>
        r.type === resourceId ? { ...r, quantity: Number.parseInt(quantity) || 1 } : r,
      ),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally submit to your API
    console.log("Submitting aid request:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
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
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully</h2>
              <p className="text-gray-600 mb-6">
                Your aid request has been submitted and will be reviewed by our team. You should receive a response
                within 30 minutes.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Request ID: #AID-{Date.now().toString().slice(-6)}</h3>
                <p className="text-sm text-blue-700">
                  Please save this ID for your records. You can use it to track your request status.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/map">View on Map</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
              <Link href="/resources" className="text-gray-700 hover:text-blue-600">
                Resources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request Emergency Aid</h1>
          <p className="text-gray-600 mt-2">
            Fill out this form to request emergency assistance. Our team will respond as quickly as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Provide details about your emergency aid request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your need"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your situation and what help you need"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Urgent - Life threatening</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>High - Immediate need</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Medium - Important</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Low - Can wait</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Your address or location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgentNeed}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, urgentNeed: checked }))}
                />
                <Label htmlFor="urgent" className="text-sm">
                  This is an urgent, life-threatening situation
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Needed Resources</CardTitle>
              <CardDescription>Select the type and quantity of resources you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceTypes.map((resource) => {
                  const Icon = resource.icon
                  const isSelected = formData.neededResources.some((r) => r.type === resource.id)
                  const selectedResource = formData.neededResources.find((r) => r.type === resource.id)

                  return (
                    <div key={resource.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                          id={resource.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => handleResourceToggle(resource.id, checked)}
                        />
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <Label htmlFor={resource.id} className="font-medium">
                            {resource.label}
                          </Label>
                          <p className="text-xs text-gray-500">{resource.description}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-3">
                          <Label htmlFor={`quantity-${resource.id}`} className="text-sm">
                            Quantity needed
                          </Label>
                          <Input
                            id={`quantity-${resource.id}`}
                            type="number"
                            min="1"
                            placeholder="1"
                            value={selectedResource?.quantity || 1}
                            onChange={(e) => handleQuantityChange(resource.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can we reach you about this request?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Your full name"
                  value={formData.contactName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="flex-1">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Submit Aid Request
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your request will be reviewed by our emergency response team</li>
              <li>• We'll contact you within 30 minutes to confirm details</li>
              <li>• Nearby volunteers and resources will be notified</li>
              <li>• You'll receive updates on the status of your request</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}
