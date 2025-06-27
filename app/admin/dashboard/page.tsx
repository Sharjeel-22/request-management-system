"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Edit, Trash2, Check, X, MoreHorizontal, Eye, Settings, LogOut, User } from "lucide-react"

// Sample data for admin dashboard
const sampleRequests = [
  {
    id: "REQ-001",
    budgetCode: "BC-2024-001",
    title: "AWS EC2 Instance for Development",
    description: "Compute Resources for ML Training",
    details: "High-performance GPU instances for machine learning model training with NVIDIA A100 GPUs",
    requestUnit: "GPU Hours",
    pricePerUnit: 9.18,
    quantity: 200,
    total: 1836.00,
    budgetUtilized: 1836.00,
    balance: 0.00,
    status: "pending",
    priority: "High",
    requester: "John Doe",
    department: "Engineering",
    submittedDate: "2025-05-05",
    justification: "Need high-performance computing resources for training machine learning models for our new AI-powered recommendation system."
  },
  {
    id: "REQ-002",
    budgetCode: "BC-2024-002",
    title: "Database Storage Expansion",
    description: "PostgreSQL Storage Expansion",
    details: "Additional PostgreSQL database storage for user data with automated backups and replication",
    requestUnit: "GB",
    pricePerUnit: 0.37,
    quantity: 1000,
    total: 367.00,
    budgetUtilized: 275.25,
    balance: 91.75,
    status: "approved",
    priority: "Medium",
    requester: "Sarah Johnson",
    department: "Data",
    submittedDate: "2025-05-03",
    justification: "Current database storage is at 85% capacity. Need additional storage to support growing user base."
  },
  {
    id: "REQ-003",
    budgetCode: "BC-2024-003",
    title: "API Access Premium",
    description: "External API Integration",
    details: "Premium tier API access for external integrations with enhanced rate limits and SLA",
    requestUnit: "API Calls",
    pricePerUnit: 0.004,
    quantity: 50000,
    total: 183.50,
    budgetUtilized: 0.00,
    balance: 183.50,
    status: "rejected",
    priority: "Low",
    requester: "Michael Chen",
    department: "Development",
    submittedDate: "2025-05-01",
    justification: "Need premium API access for integrating with third-party payment processors and analytics services."
  },
  {
    id: "REQ-004",
    budgetCode: "BC-2024-004",
    title: "Cloud Infrastructure Setup",
    description: "Multi-region Infrastructure",
    details: "Multi-region cloud infrastructure deployment with load balancing and auto-scaling capabilities",
    requestUnit: "Instances",
    pricePerUnit: 146.80,
    quantity: 5,
    total: 734.00,
    budgetUtilized: 440.40,
    balance: 293.60,
    status: "in-progress",
    priority: "High",
    requester: "Emily Wilson",
    department: "DevOps",
    submittedDate: "2025-05-02",
    justification: "Setting up multi-region infrastructure to improve application performance and ensure high availability."
  }
]

export default function AdminRequestsTable() {
  const router = useRouter()
  const { toast } = useToast()
  const [requests, setRequests] = useState(sampleRequests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('adminToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('adminSession')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    
    // Redirect to home page
    setTimeout(() => {
      router.push("/")
    }, 1000)
    
    setLogoutDialogOpen(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200'
    }
    
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800 border-gray-200'} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    }
    
    return (
      <Badge variant="outline" className={priorityStyles[priority as keyof typeof priorityStyles]}>
        {priority}
      </Badge>
    )
  }

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ))
    
    const statusMessages = {
      'approved': 'Request approved successfully',
      'rejected': 'Request rejected',
      'in-progress': 'Request moved to in-progress',
      'pending': 'Request moved back to pending'
    }
    
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus as keyof typeof statusMessages],
    })
  }

  const handleEdit = (request: any) => {
    setSelectedRequest(request)
    setEditDialogOpen(true)
  }

  const handleDelete = (request: any) => {
    setSelectedRequest(request)
    setDeleteDialogOpen(true)
  }

  const handleView = (request: any) => {
    setSelectedRequest(request)
    setViewDialogOpen(true)
  }

  const confirmDelete = () => {
    setRequests(prev => prev.filter(req => req.id !== selectedRequest.id))
    toast({
      title: "Request Deleted",
      description: `Request ${selectedRequest.id} has been deleted.`,
    })
    setDeleteDialogOpen(false)
    setSelectedRequest(null)
  }

  const saveEdit = () => {
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id ? selectedRequest : req
    ))
    toast({
      title: "Request Updated",
      description: `Request ${selectedRequest.id} has been updated.`,
    })
    setEditDialogOpen(false)
    setSelectedRequest(null)
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and oversee all resource requests</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/workflows">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Workflows
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="outline">Settings</Button>
          </Link>
          
          {/* Admin Profile Dropdown with Logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Admin
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Requests Table */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 w-full">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Resource Requests Management</CardTitle>
          <CardDescription className="text-purple-100">
            Review, edit, approve, or reject resource requests from all departments.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-24">Request ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-32">Budget Code</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 min-w-48">Title</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-32">Requester</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-28">Department</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-20">Priority</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-32">Total Budget</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-center w-28">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-center w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow 
                    key={request.id} 
                    className={`hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <TableCell className="font-bold text-blue-600 py-4 px-4">
                      {request.id}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm font-medium inline-block">
                        {request.budgetCode}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 font-medium text-gray-900">
                      <div className="max-w-xs truncate" title={request.title}>
                        {request.title}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-gray-700">
                      {request.requester}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                        {request.department}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      {getPriorityBadge(request.priority)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right font-bold text-lg text-blue-600">
                      {formatCurrency(request.total)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Quick Approve/Reject buttons for pending requests */}
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
                              onClick={() => handleStatusChange(request.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleStatusChange(request.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        {/* More actions dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(request)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(request)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(request)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Request
                            </DropdownMenuItem>
                            {request.status !== 'pending' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'pending')}>
                                Reset to Pending
                              </DropdownMenuItem>
                            )}
                            {request.status !== 'in-progress' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, 'in-progress')}>
                                Mark In Progress
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-t">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Total Requests</div>
              <div className="text-2xl font-bold text-purple-600">
                {requests.length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Pending Approval</div>
              <div className="text-2xl font-bold text-yellow-600">
                {requests.filter(req => req.status === 'pending').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Approved</div>
              <div className="text-2xl font-bold text-green-600">
                {requests.filter(req => req.status === 'approved').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Total Budget</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(requests.reduce((sum, req) => sum + req.total, 0))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Details - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Complete information about this resource request.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Requester</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.requester}</p>
                </div>
                <div>
                  <Label className="font-semibold">Department</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedRequest.priority)}</div>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>
              <div>
                <Label className="font-semibold">Description</Label>
                <p className="text-sm text-gray-600">{selectedRequest.description}</p>
              </div>
              <div>
                <Label className="font-semibold">Details</Label>
                <p className="text-sm text-gray-600">{selectedRequest.details}</p>
              </div>
              <div>
                <Label className="font-semibold">Business Justification</Label>
                <p className="text-sm text-gray-600">{selectedRequest.justification}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-semibold">Request Unit</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.requestUnit}</p>
                </div>
                <div>
                  <Label className="font-semibold">Price per Unit</Label>
                  <p className="text-sm text-gray-600">{formatCurrency(selectedRequest.pricePerUnit)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Budget</Label>
                  <p className="text-sm font-bold text-blue-600">{formatCurrency(selectedRequest.total)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Request - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Modify the details of this resource request.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedRequest.title}
                    onChange={(e) => setSelectedRequest({...selectedRequest, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="budgetCode">Budget Code</Label>
                  <Input
                    id="budgetCode"
                    value={selectedRequest.budgetCode}
                    onChange={(e) => setSelectedRequest({...selectedRequest, budgetCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={selectedRequest.priority} 
                    onValueChange={(value) => setSelectedRequest({...selectedRequest, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedRequest.status} 
                    onValueChange={(value) => setSelectedRequest({...selectedRequest, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={selectedRequest.description}
                  onChange={(e) => setSelectedRequest({...selectedRequest, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={selectedRequest.details}
                  onChange={(e) => setSelectedRequest({...selectedRequest, details: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pricePerUnit">Price per Unit (AED)</Label>
                  <Input
                    id="pricePerUnit"
                    type="number"
                    step="0.01"
                    value={selectedRequest.pricePerUnit}
                    onChange={(e) => setSelectedRequest({...selectedRequest, pricePerUnit: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={selectedRequest.quantity}
                    onChange={(e) => setSelectedRequest({...selectedRequest, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="total">Total (AED)</Label>
                  <Input
                    id="total"
                    type="number"
                    step="0.01"
                    value={selectedRequest.total}
                    onChange={(e) => setSelectedRequest({...selectedRequest, total: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete request {selectedRequest?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will be redirected to the home page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}