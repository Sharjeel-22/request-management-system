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
import { 
  CreditCard, 
  FileText, 
  MoreHorizontal, 
  Eye, 
  Settings, 
  LogOut, 
  User, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Receipt,
  Send
} from "lucide-react"

// Sample data for approved requests ready for payment
const sampleApprovedRequests = [
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
    paymentStatus: "pending",
    priority: "Medium",
    requester: "Sarah Johnson",
    department: "Data",
    submittedDate: "2025-05-03",
    approvedDate: "2025-05-07",
    justification: "Current database storage is at 85% capacity. Need additional storage to support growing user base.",
    vendor: "AWS",
    vendorEmail: "billing@aws.com",
    paymentMethod: "Bank Transfer",
    invoiceNumber: "",
    paymentDate: "",
    paymentReference: ""
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
    status: "approved",
    paymentStatus: "pending",
    priority: "High",
    requester: "Emily Wilson",
    department: "DevOps",
    submittedDate: "2025-05-02",
    approvedDate: "2025-05-06",
    justification: "Setting up multi-region infrastructure to improve application performance and ensure high availability.",
    vendor: "Google Cloud",
    vendorEmail: "billing@googlecloud.com",
    paymentMethod: "Credit Card",
    invoiceNumber: "",
    paymentDate: "",
    paymentReference: ""
  },
  {
    id: "REQ-005",
    budgetCode: "BC-2024-005",
    title: "Software License Renewal",
    description: "Enterprise Software Licenses",
    details: "Annual renewal of enterprise software licenses for development tools and productivity software",
    requestUnit: "Licenses",
    pricePerUnit: 299.99,
    quantity: 25,
    total: 7499.75,
    budgetUtilized: 0.00,
    balance: 7499.75,
    status: "approved",
    paymentStatus: "processing",
    priority: "High",
    requester: "David Park",
    department: "IT",
    submittedDate: "2025-05-01",
    approvedDate: "2025-05-05",
    justification: "Critical software licenses expiring next month. Need renewal to maintain development productivity.",
    vendor: "Microsoft",
    vendorEmail: "licensing@microsoft.com",
    paymentMethod: "Bank Transfer",
    invoiceNumber: "INV-2025-MS-001",
    paymentDate: "2025-05-08",
    paymentReference: "PAY-2025-001"
  },
  {
    id: "REQ-006",
    budgetCode: "BC-2024-006",
    title: "Marketing Campaign Tools",
    description: "Digital Marketing Platform",
    details: "Advanced marketing automation platform with analytics, email marketing, and customer segmentation",
    requestUnit: "Monthly Subscription",
    pricePerUnit: 599.00,
    quantity: 12,
    total: 7188.00,
    budgetUtilized: 0.00,
    balance: 7188.00,
    status: "approved",
    paymentStatus: "completed",
    priority: "Medium",
    requester: "Lisa Chen",
    department: "Marketing",
    submittedDate: "2025-04-28",
    approvedDate: "2025-05-04",
    justification: "Need advanced marketing tools to improve customer acquisition and retention rates.",
    vendor: "HubSpot",
    vendorEmail: "billing@hubspot.com",
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-2025-HS-001",
    paymentDate: "2025-05-06",
    paymentReference: "PAY-2025-002"
  }
]

export default function FinanceDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [requests, setRequests] = useState(sampleApprovedRequests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('financeToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('financeSession')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    
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

  const getPaymentStatusBadge = (status: string) => {
    const statusStyles = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'failed': 'bg-red-100 text-red-800 border-red-200'
    }
    
    const statusIcons = {
      'pending': <Clock className="h-3 w-3 mr-1" />,
      'processing': <AlertCircle className="h-3 w-3 mr-1" />,
      'completed': <CheckCircle className="h-3 w-3 mr-1" />,
      'failed': <XCircle className="h-3 w-3 mr-1" />
    }
    
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800 border-gray-200'} font-medium flex items-center`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  const handleView = (request: any) => {
    setSelectedRequest(request)
    setViewDialogOpen(true)
  }

  const handleStartPayment = (request: any) => {
    setSelectedRequest({
      ...request,
      paymentMethod: request.paymentMethod || "Bank Transfer",
      invoiceNumber: request.invoiceNumber || "",
      paymentReference: request.paymentReference || `PAY-${new Date().getFullYear()}-${String(requests.length + 1).padStart(3, '0')}`
    })
    setPaymentDialogOpen(true)
  }

  const processPayment = () => {
    const updatedRequest = {
      ...selectedRequest,
      paymentStatus: 'processing',
      paymentDate: new Date().toISOString().split('T')[0],
      invoiceNumber: selectedRequest.invoiceNumber || `INV-${new Date().getFullYear()}-${selectedRequest.vendor.substring(0, 2).toUpperCase()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    }

    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id ? updatedRequest : req
    ))

    toast({
      title: "Payment Initiated",
      description: `Payment for ${selectedRequest.id} has been started. Reference: ${selectedRequest.paymentReference}`,
    })

    setPaymentDialogOpen(false)
    setSelectedRequest(null)

    // Simulate payment completion after 3 seconds
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        req.id === updatedRequest.id ? { ...req, paymentStatus: 'completed' } : req
      ))
      toast({
        title: "Payment Completed",
        description: `Payment for ${updatedRequest.id} has been successfully processed.`,
      })
    }, 3000)
  }

  const filteredRequests = requests.filter(req => {
    if (filterStatus === "all") return true
    return req.paymentStatus === filterStatus
  })

  const generateInvoice = (request: any) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for ${request.id} has been generated and downloaded.`,
    })
  }

  const sendPaymentConfirmation = (request: any) => {
    toast({
      title: "Confirmation Sent",
      description: `Payment confirmation for ${request.id} has been sent to ${request.requester}.`,
    })
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600 mt-1">Process payments for approved resource requests</p>
        </div>
        <div className="flex gap-3">
          <Link href="/finance/reports">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Payment Reports
            </Button>
          </Link>
          <Link href="/finance/settings">
            <Button variant="outline">Settings</Button>
          </Link>
          
          {/* Finance Profile Dropdown with Logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Finance Team
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

      {/* Filter and Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Requests</div>
          <div className="text-2xl font-bold text-purple-600">
            {requests.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Pending Payment</div>
          <div className="text-2xl font-bold text-yellow-600">
            {requests.filter(req => req.paymentStatus === 'pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Processing</div>
          <div className="text-2xl font-bold text-blue-600">
            {requests.filter(req => req.paymentStatus === 'processing').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {requests.filter(req => req.paymentStatus === 'completed').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Amount</div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(requests.reduce((sum, req) => sum + req.total, 0))}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex gap-4 items-center">
        <Label htmlFor="statusFilter" className="font-medium">Filter by Payment Status:</Label>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payment Requests Table */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 w-full">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Payment Processing Dashboard</CardTitle>
          <CardDescription className="text-green-100">
            Process payments for approved resource requests from all departments.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-24">Request ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 min-w-48">Title</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-32">Vendor</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-28">Department</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 w-20">Priority</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-right w-32">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-center w-32">Payment Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-4 text-center w-40">Actions</TableHead>
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
                    <TableCell className="py-4 px-4 font-medium text-gray-900">
                      <div className="max-w-xs truncate" title={request.title}>
                        {request.title}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm font-medium inline-block">
                        {request.vendor}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                        {request.department}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      {getPriorityBadge(request.priority)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right font-bold text-lg text-green-600">
                      {formatCurrency(request.total)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      {getPaymentStatusBadge(request.paymentStatus)}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Quick Payment button for pending requests */}
                        {request.paymentStatus === 'pending' && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStartPayment(request)}
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Pay Now
                          </Button>
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
                            {request.paymentStatus === 'pending' && (
                              <DropdownMenuItem onClick={() => handleStartPayment(request)}>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Start Payment
                              </DropdownMenuItem>
                            )}
                            {request.paymentStatus === 'completed' && (
                              <>
                                <DropdownMenuItem onClick={() => generateInvoice(request)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => sendPaymentConfirmation(request)}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Confirmation
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <Receipt className="h-4 w-4 mr-2" />
                              Payment History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Request Details - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Complete information about this payment request.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
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
                  <Label className="font-semibold">Vendor</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.vendor}</p>
                </div>
                <div>
                  <Label className="font-semibold">Vendor Email</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.vendorEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedRequest.priority)}</div>
                </div>
                <div>
                  <Label className="font-semibold">Payment Status</Label>
                  <div className="mt-1">{getPaymentStatusBadge(selectedRequest.paymentStatus)}</div>
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-semibold">Unit Price</Label>
                  <p className="text-sm text-gray-600">{formatCurrency(selectedRequest.pricePerUnit)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Quantity</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.quantity} {selectedRequest.requestUnit}</p>
                </div>
                <div>
                  <Label className="font-semibold">Total Amount</Label>
                  <p className="text-sm font-bold text-green-600">{formatCurrency(selectedRequest.total)}</p>
                </div>
              </div>
              {selectedRequest.paymentDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Payment Date</Label>
                    <p className="text-sm text-gray-600">{selectedRequest.paymentDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Payment Reference</Label>
                    <p className="text-sm text-gray-600">{selectedRequest.paymentReference}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Processing Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Process Payment - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Configure payment details and initiate the payment process.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Payment Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Vendor: </span>
                    <span className="text-blue-900">{selectedRequest.vendor}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Amount: </span>
                    <span className="text-blue-900 font-bold">{formatCurrency(selectedRequest.total)}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Department: </span>
                    <span className="text-blue-900">{selectedRequest.department}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Priority: </span>
                    <span className="text-blue-900">{selectedRequest.priority}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select 
                    value={selectedRequest.paymentMethod} 
                    onValueChange={(value) => setSelectedRequest({...selectedRequest, paymentMethod: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentReference">Payment Reference</Label>
                  <Input
                    id="paymentReference"
                    value={selectedRequest.paymentReference}
                    onChange={(e) => setSelectedRequest({...selectedRequest, paymentReference: e.target.value})}
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number (Optional)</Label>
                <Input
                  id="invoiceNumber"
                  value={selectedRequest.invoiceNumber}
                  onChange={(e) => setSelectedRequest({...selectedRequest, invoiceNumber: e.target.value})}
                  placeholder="Will be auto-generated"
                />
              </div>

              <div>
                <Label htmlFor="paymentNotes">Payment Notes (Optional)</Label>
                <Textarea
                  id="paymentNotes"
                  placeholder="Add any special instructions or notes for this payment..."
                  className="h-20"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processPayment} className="bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payment
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