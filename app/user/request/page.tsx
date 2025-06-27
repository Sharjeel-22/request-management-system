"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Calculator, Receipt, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample data for the table
const sampleRequests = [
  {
    id: "REQ-001",
    budgetCode: "BC-2024-001",
    description: "Compute Resources for ML Training",
    details: "High-performance GPU instances for machine learning model training with NVIDIA A100 GPUs",
    requestUnit: "GPU Hours",
    pricePerUnit: 9.18,
    total: 1836.00,
    budgetUtilized: 1836.00,
    balance: 0.00,
    type: "budget"
  },
  {
    id: "REQ-002",
    budgetCode: "BC-2024-002",
    description: "Database Storage Expansion",
    details: "Additional PostgreSQL database storage for user data with automated backups and replication",
    requestUnit: "GB",
    pricePerUnit: 0.37,
    requestQuantity: 1000,
    total: 367.00,
    budgetUtilized: 275.25,
    balance: 91.75,
    type: "budget"
  },
  {
    id: "REQ-003",
    budgetCode: "",
    description: "Emergency Server Maintenance",
    details: "Urgent server maintenance required for system stability",
    requestUnit: "Service Hours",
    pricePerUnit: 0,
    requestQuantity: 10,
    total: 0,
    budgetUtilized: 0,
    balance: 0,
    type: "non-budget"
  },
  {
    id: "REQ-004",
    budgetCode: "",
    description: "Office Supplies - Laptops",
    details: "Dell laptops for new team members",
    requestUnit: "Units",
    pricePerUnit: 0,
    requestQuantity: 5,
    total: 0,
    budgetUtilized: 0,
    balance: 0,
    type: "saleable-stock"
  }
]

export default function RequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [requests, setRequests] = useState(sampleRequests)
  const [activeTab, setActiveTab] = useState<"budget" | "non-budget" | "saleable-stock">("budget")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Request Submitted",
        description: "Your resource request has been submitted successfully.",
      })
      setShowForm(false)
      // In a real app, you would add the new request to the table data
    }, 1500)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "budget":
        return <Calculator className="h-4 w-4" />
      case "non-budget":
        return <Receipt className="h-4 w-4" />
      case "saleable-stock":
        return <Package className="h-4 w-4" />
      default:
        return <Calculator className="h-4 w-4" />
    }
  }

  const getTabColor = (tab: string) => {
    switch (tab) {
      case "budget":
        return "from-blue-600 to-purple-600"
      case "non-budget":
        return "from-green-600 to-teal-600"
      case "saleable-stock":
        return "from-orange-600 to-red-600"
      default:
        return "from-blue-600 to-purple-600"
    }
  }

  const filteredRequests = requests.filter(req => req.type === activeTab)

  const renderBudgetColumns = () => {
    if (activeTab === "budget") {
      return (
        <>
          <TableHead className="font-semibold text-gray-700 py-4 px-4 w-32">Budget Code</TableHead>
          <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-32">Price per Unit</TableHead>
          <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-32">Total Budget</TableHead>
          <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-32">Budget Utilized</TableHead>
          <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-28">Balance</TableHead>
        </>
      )
    }
    return null
  }

  const renderBudgetCells = (request: any) => {
    if (activeTab === "budget") {
      return (
        <>
          <TableCell className="py-4 px-4">
            <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm font-medium inline-block">
              {request.budgetCode}
            </div>
          </TableCell>
          <TableCell className="py-4 px-4 text-right font-semibold text-gray-800">
            {formatCurrency(request.pricePerUnit)}
          </TableCell>
          <TableCell className="py-4 px-4 text-right font-bold text-lg text-blue-600">
            {formatCurrency(request.total)}
          </TableCell>
          <TableCell className="py-4 px-4 text-right font-semibold text-orange-600">
            {formatCurrency(request.budgetUtilized)}
          </TableCell>
          <TableCell className="py-4 px-4 text-right">
            <span className={`font-bold text-lg ${
              request.balance <= 0 
                ? "text-red-600" 
                : request.balance < request.total * 0.2 
                  ? "text-yellow-600" 
                  : "text-green-600"
            }`}>
              {formatCurrency(request.balance)}
            </span>
          </TableCell>
        </>
      )
    }
    return null
  }

  const renderSummaryCards = () => {
    if (activeTab === "budget") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-t">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Budget</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(filteredRequests.reduce((sum, req) => sum + req.total, 0))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Utilized</div>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(filteredRequests.reduce((sum, req) => sum + req.budgetUtilized, 0))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Balance</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(filteredRequests.reduce((sum, req) => sum + req.balance, 0))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Requests</div>
            <div className="text-2xl font-bold text-purple-600">
              {filteredRequests.length}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 border-t">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Total Requests</div>
            <div className="text-2xl font-bold text-purple-600">
              {filteredRequests.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Request Type</div>
            <div className="text-2xl font-bold text-gray-600">
              {activeTab === "non-budget" ? "Non-Budget" : "Saleable Stock"}
            </div>
          </div>
        </div>
      )
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case "budget":
        return "Budget Requests"
      case "non-budget":
        return "Non-Budget Requests"
      case "saleable-stock":
        return "Saleable Stock Requests"
      default:
        return "Requests"
    }
  }

  const getTabDescription = () => {
    switch (activeTab) {
      case "budget":
        return "Manage and track your budget-allocated resource requests and budget utilization across all projects."
      case "non-budget":
        return "Track non-budget resource requests that don't require budget allocation or financial tracking."
      case "saleable-stock":
        return "Manage requests for saleable stock items and inventory-based resources."
      default:
        return "Manage your resource requests."
    }
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Request
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === "budget" ? "default" : "outline"}
            onClick={() => setActiveTab("budget")}
            className={`flex items-center gap-2 ${
              activeTab === "budget" 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
            }`}
          >
            {getTabIcon("budget")}
            Budget
          </Button>
          <Button
            variant={activeTab === "non-budget" ? "default" : "outline"}
            onClick={() => setActiveTab("non-budget")}
            className={`flex items-center gap-2 ${
              activeTab === "non-budget" 
                ? "bg-green-600 hover:bg-green-700" 
                : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
            }`}
          >
            {getTabIcon("non-budget")}
            Non-Budget
          </Button>
          <Button
            variant={activeTab === "saleable-stock" ? "default" : "outline"}
            onClick={() => setActiveTab("saleable-stock")}
            className={`flex items-center gap-2 ${
              activeTab === "saleable-stock" 
                ? "bg-orange-600 hover:bg-orange-700" 
                : "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
            }`}
          >
            {getTabIcon("saleable-stock")}
            Saleable Stock
          </Button>
        </div>
      </div>

      {/* Requests Table */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 w-full">
        <CardHeader className={`bg-gradient-to-r ${getTabColor(activeTab)} text-white rounded-t-lg`}>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {getTabIcon(activeTab)}
            {getTabTitle()}
          </CardTitle>
          <CardDescription className="text-white/90">
            {getTabDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-24">ID</TableHead>
                  {renderBudgetColumns()}
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 min-w-48">Description</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 min-w-64">Details</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-28">Request Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request, index) => (
                  <TableRow 
                    key={request.id} 
                    className={`hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-bold text-blue-600 py-4 px-4">
                      {request.id}
                    </TableCell>
                    {renderBudgetCells(request)}
                    <TableCell className="py-4 px-4 font-medium text-gray-900">
                      <div className="max-w-xs truncate" title={request.description}>
                        {request.description}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="text-sm text-gray-600 max-w-sm truncate" title={request.details}>
                        {request.details}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                        {request.requestUnit}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell 
                      colSpan={activeTab === "budget" ? 9 : 4} 
                      className="text-center py-8 text-gray-500"
                    >
                      No {activeTab.replace('-', ' ')} requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Summary Cards */}
          {renderSummaryCards()}
        </CardContent>
      </Card>

      {/* Form Modal/Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {getTabIcon(activeTab)}
                  Submit {getTabTitle().replace('Requests', 'Request')}
                </CardTitle>
                <CardDescription>
                  Fill out the form below to request {activeTab.replace('-', ' ')} resources. Your request will be reviewed by our team.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input id="title" placeholder="Brief title for your request" required />
                  </div>

                  {/* Budget Code field only for budget requests */}
                  {activeTab === "budget" && (
                    <div className="space-y-2">
                      <Label htmlFor="budget-code">Budget Code</Label>
                      <Input id="budget-code" placeholder="e.g., BC-2024-001" required />
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="resource-type">Resource Type</Label>
                      <Select required>
                        <SelectTrigger id="resource-type">
                          <SelectValue placeholder="Select resource type" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeTab === "budget" && (
                            <>
                              <SelectItem value="compute">Compute Resources</SelectItem>
                              <SelectItem value="storage">Storage Resources</SelectItem>
                              <SelectItem value="database">Database Resources</SelectItem>
                              <SelectItem value="api">API Access</SelectItem>
                            </>
                          )}
                          {activeTab === "non-budget" && (
                            <>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="support">Support Services</SelectItem>
                              <SelectItem value="training">Training</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                            </>
                          )}
                          {activeTab === "saleable-stock" && (
                            <>
                              <SelectItem value="hardware">Hardware</SelectItem>
                              <SelectItem value="software">Software Licenses</SelectItem>
                              <SelectItem value="equipment">Equipment</SelectItem>
                              <SelectItem value="supplies">Office Supplies</SelectItem>
                            </>
                          )}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select required>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Quantity and Unit fields for non-budget requests */}
                  {activeTab !== "budget" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" min="1" placeholder="Enter quantity" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" placeholder="e.g., pieces, hours, licenses" required />
                      </div>
                    </div>
                  )}

                  {/* Price fields only for budget requests */}
                  {activeTab === "budget" && (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="price-per-unit">Price per Unit (AED)</Label>
                        <Input id="price-per-unit" type="number" step="0.01" min="0" placeholder="0.00" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" min="1" placeholder="Enter quantity" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total-budget">Total Budget (AED)</Label>
                        <Input id="total-budget" type="number" step="0.01" min="0" placeholder="Auto-calculated" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about your resource requirements, including specifications and purpose"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="justification">Business Justification</Label>
                    <Textarea
                      id="justification"
                      placeholder="Explain why you need these resources and how they will benefit your work or project"
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Requested Start Date</Label>
                      <Input id="start-date" type="date" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input id="duration" type="number" min="1" placeholder="How long do you need the resource?" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}