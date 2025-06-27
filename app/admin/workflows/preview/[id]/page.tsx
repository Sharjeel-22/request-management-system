"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Settings, 
  User, 
  LogOut, 
  Eye,
  Edit,
  Shield,
  Bell,
  GitBranch,
  Users,
  Workflow,
  Calendar,
  Activity,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for the workflow being previewed
const mockWorkflow = {
  id: "wf-001",
  name: "Standard Approval Process",
  description: "Default workflow for general resource requests with comprehensive approval stages",
  isActive: true,
  isDefault: true,
  appliesTo: ["Compute Resources", "Storage Resources", "Database Resources"],
  createdDate: "2025-04-15",
  lastModified: "2025-05-01",
  totalRequests: 1240,
  avgProcessingTime: "2.3 days",
  successRate: "94%",
  steps: [
    {
      id: "step-1",
      name: "Department Manager Approval",
      type: "approval",
      approver: "manager",
      description: "Department manager reviews and approves the request based on business requirements and budget constraints",
      estimatedTime: "1 day",
      completionRate: "96%"
    },
    {
      id: "step-2",
      name: "IT Admin Review",
      type: "approval",
      approver: "it-admin",
      description: "IT administrator reviews technical requirements, security implications, and infrastructure impact",
      estimatedTime: "0.8 days",
      completionRate: "92%"
    },
    {
      id: "step-3",
      name: "Final Notification",
      type: "notification",
      description: "Notify requester and stakeholders of the final decision with detailed feedback and next steps",
      estimatedTime: "0.1 days",
      completionRate: "100%"
    },
  ],
}

export default function PreviewWorkflowPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const workflowId = params.id
  const [workflow, setWorkflow] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('adminSession')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    
    setTimeout(() => {
      router.push("/")
    }, 1000)
    
    setLogoutDialogOpen(false)
  }

  // Simulate fetching workflow data
  useEffect(() => {
    const loadWorkflow = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In a real app, you would fetch the workflow data from your API
      setWorkflow(mockWorkflow)
      setIsLoading(false)
    }
    
    loadWorkflow()
  }, [workflowId])

  const getStepIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <Shield className="h-6 w-6 text-green-500" />
      case "notification":
        return <Bell className="h-6 w-6 text-blue-500" />
      case "condition":
        return <GitBranch className="h-6 w-6 text-yellow-500" />
      case "assignment":
        return <Users className="h-6 w-6 text-purple-500" />
      default:
        return <AlertCircle className="h-6 w-6" />
    }
  }

  const getStepTypeBadge = (type: string) => {
    switch (type) {
      case "approval":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Approval
          </Badge>
        )
      case "notification":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Bell className="h-3 w-3 mr-1" />
            Notification
          </Badge>
        )
      case "condition":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <GitBranch className="h-3 w-3 mr-1" />
            Condition
          </Badge>
        )
      case "assignment":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Users className="h-3 w-3 mr-1" />
            Assignment
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getApproverRole = (approver: string) => {
    switch (approver) {
      case "manager":
        return "Department Manager"
      case "it-admin":
        return "IT Administrator"
      case "security":
        return "Security Team"
      case "finance":
        return "Finance Department"
      default:
        return approver
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <p className="text-lg text-gray-600">Loading workflow preview...</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 w-full min-h-screen">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/workflows"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Workflows
          </Link>
        </div>
        
        <div className="flex gap-3">
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

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Eye className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{workflow.name}</h1>
              <p className="text-gray-600 mt-1">{workflow.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`/admin/workflows/edit/${workflow.id}`}>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Workflow
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Status Badges */}
        <div className="flex items-center gap-3 mt-4">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            ID: {workflow.id}
          </Badge>
          {workflow.isActive ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              Inactive
            </Badge>
          )}
          {workflow.isDefault && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Default Workflow
            </Badge>
          )}
        </div>
      </div>

      {/* Workflow Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Workflow className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{workflow.steps.length}</div>
            <div className="text-sm text-blue-800">Total Steps</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{workflow.totalRequests}</div>
            <div className="text-sm text-green-800">Total Requests</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{workflow.successRate}</div>
            <div className="text-sm text-purple-800">Success Rate</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{workflow.avgProcessingTime}</div>
            <div className="text-sm text-orange-800">Avg Processing</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Details */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 mb-8">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Settings className="h-5 w-5" />
            Workflow Configuration
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Current settings and configuration details for this workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Status Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  {workflow.isActive ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      Inactive
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Default:</span>
                  <span className="font-medium">{workflow.isDefault ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{workflow.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modified:</span>
                  <span className="font-medium">{workflow.lastModified}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Applies To</h3>
              <div className="flex flex-wrap gap-2">
                {workflow.appliesTo.map((type: string) => (
                  <Badge key={type} className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps Visualization */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <GitBranch className="h-5 w-5" />
            Workflow Steps
          </CardTitle>
          <CardDescription className="text-blue-100">
            Visual representation of the complete approval process flow
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative">
            {workflow.steps.map((step: any, index: number) => (
              <div key={step.id} className="relative mb-8 last:mb-0">
                <div className="flex items-start gap-6">
                  {/* Step Number Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    {index < workflow.steps.length - 1 && (
                      <div className="mt-4 h-16 w-1 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <Card className="shadow-md border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {getStepIcon(step.type)}
                            <h3 className="text-xl font-semibold text-gray-900">{step.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStepTypeBadge(step.type)}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                        
                        {/* Step Details Grid */}
                        <div className="grid gap-4 md:grid-cols-3">
                          {step.approver && (
                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-1">Approver:</p>
                              <p className="text-sm text-gray-600">{getApproverRole(step.approver)}</p>
                            </div>
                          )}
                          {step.estimatedTime && (
                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-1">Est. Time:</p>
                              <p className="text-sm text-gray-600">{step.estimatedTime}</p>
                            </div>
                          )}
                          {step.completionRate && (
                            <div>
                              <p className="text-sm font-semibold text-gray-800 mb-1">Success Rate:</p>
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                {step.completionRate}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Arrow between steps */}
                    {index < workflow.steps.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="h-0.5 w-8 bg-gray-300"></div>
                          <ArrowRight className="h-5 w-5" />
                          <div className="h-0.5 w-8 bg-gray-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8 pb-8">
        <Link href="/admin/workflows">
          <Button variant="outline" size="lg" className="px-8">
            Back to Workflows
          </Button>
        </Link>
        <Link href={`/admin/workflows/edit/${workflow.id}`}>
          <Button size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit This Workflow
          </Button>
        </Link>
      </div>

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