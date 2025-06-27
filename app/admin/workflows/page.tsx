"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Settings, Copy, Trash2, Workflow, Clock, Target, Users, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for workflows
const mockWorkflows = [
  {
    id: "wf-001",
    name: "Standard Approval Process",
    description: "Default workflow for general resource requests with department head and finance approval",
    isActive: true,
    isDefault: true,
    steps: 3,
    lastModified: "2025-05-01",
    appliesTo: ["Compute Resources", "Storage Resources", "Database Resources"],
    avgProcessingTime: "2.3 days",
    completionRate: "94%",
    totalRequests: 1240
  },
  {
    id: "wf-002",
    name: "Expedited Approval",
    description: "Fast-track workflow for urgent requests requiring immediate attention",
    isActive: true,
    isDefault: false,
    steps: 2,
    lastModified: "2025-04-28",
    appliesTo: ["API Access"],
    avgProcessingTime: "0.8 days",
    completionRate: "98%",
    totalRequests: 156
  },
  {
    id: "wf-003",
    name: "Security Review Process",
    description: "Enhanced security review for sensitive resource requests with multiple approval layers",
    isActive: false,
    isDefault: false,
    steps: 5,
    lastModified: "2025-05-05",
    appliesTo: ["Database Resources", "API Access"],
    avgProcessingTime: "5.2 days",
    completionRate: "89%",
    totalRequests: 67
  },
]

export default function WorkflowsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [workflows, setWorkflows] = useState(mockWorkflows)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null)
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

  const handleToggleActive = (id: string) => {
    setWorkflows(
      workflows.map((workflow) => {
        if (workflow.id === id) {
          return { ...workflow, isActive: !workflow.isActive }
        }
        return workflow
      }),
    )

    const workflow = workflows.find((w) => w.id === id)
    toast({
      title: workflow?.isActive ? "Workflow Deactivated" : "Workflow Activated",
      description: `"${workflow?.name}" has been ${workflow?.isActive ? "deactivated" : "activated"}.`,
    })
  }

  const handleSetDefault = (id: string) => {
    setWorkflows(
      workflows.map((workflow) => {
        if (workflow.id === id) {
          return { ...workflow, isDefault: true }
        }
        return { ...workflow, isDefault: workflow.id === id }
      }),
    )

    const workflow = workflows.find((w) => w.id === id)
    toast({
      title: "Default Workflow Set",
      description: `"${workflow?.name}" has been set as the default workflow.`,
    })
  }

  const handleDuplicate = (id: string) => {
    const workflowToDuplicate = workflows.find((w) => w.id === id)
    if (workflowToDuplicate) {
      const newWorkflow = {
        ...workflowToDuplicate,
        id: `wf-00${workflows.length + 1}`,
        name: `${workflowToDuplicate.name} (Copy)`,
        isDefault: false,
        lastModified: new Date().toISOString().split("T")[0],
        totalRequests: 0
      }
      setWorkflows([...workflows, newWorkflow])
      toast({
        title: "Workflow Duplicated",
        description: `"${workflowToDuplicate.name}" has been duplicated successfully.`,
      })
    }
  }

  const handleDeleteClick = (id: string) => {
    setWorkflowToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (workflowToDelete) {
      const workflowToDeleteObj = workflows.find((w) => w.id === workflowToDelete)
      setWorkflows(workflows.filter((workflow) => workflow.id !== workflowToDelete))
      toast({
        title: "Workflow Deleted",
        description: `"${workflowToDeleteObj?.name}" has been deleted successfully.`,
      })
    }
    setDeleteDialogOpen(false)
    setWorkflowToDelete(null)
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>
    )
  }

  return (
    <div className="p-6 w-full min-h-screen">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workflow Management</h1>
            <p className="text-gray-600 mt-1">Create and manage custom approval workflows for your organization</p>
          </div>
          <Link href="/admin/workflows/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" /> 
              Create Workflow
            </Button>
          </Link>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6">
        {workflows.map((workflow, index) => (
          <Card 
            key={workflow.id} 
            className={`shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 ${
              workflow.isDefault ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Workflow className="h-5 w-5" />
                    {workflow.name}
                    {workflow.isDefault && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Default
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    {workflow.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-100">Active</span>
                    <Switch 
                      checked={workflow.isActive} 
                      onCheckedChange={() => handleToggleActive(workflow.id)} 
                      className="data-[state=checked]:bg-white data-[state=unchecked]:bg-blue-300"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/workflows/edit/${workflow.id}`}>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Workflow
                        </DropdownMenuItem>
                      </Link>
                      {!workflow.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(workflow.id)}>
                          <Target className="mr-2 h-4 w-4" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDuplicate(workflow.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteClick(workflow.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Status and Stats Row */}
              <div className="grid gap-6 md:grid-cols-4 mb-6">
                <div className="text-center">
                  <div className="mb-2">
                    {getStatusBadge(workflow.isActive)}
                  </div>
                  <p className="text-sm text-gray-500">Status</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{workflow.steps}</div>
                  <p className="text-sm text-gray-500">Approval Steps</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{workflow.completionRate}</div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{workflow.totalRequests}</div>
                  <p className="text-sm text-gray-500">Total Requests</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid gap-4 md:grid-cols-3 border-t pt-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-medium text-gray-900">Processing Time</p>
                  </div>
                  <p className="text-sm text-gray-600">{workflow.avgProcessingTime} average</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium text-gray-900">Last Modified</p>
                  </div>
                  <p className="text-sm text-gray-600">{workflow.lastModified}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Applies To</p>
                  <div className="flex flex-wrap gap-1">
                    {workflow.appliesTo.map((type) => (
                      <Badge key={type} className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2 bg-gray-50 border-t">
              <Link href={`/admin/workflows/preview/${workflow.id}`}>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                  Preview
                </Button>
              </Link>
              <Link href={`/admin/workflows/edit/${workflow.id}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Edit Workflow
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-blue-800">Total Workflows</div>
            <div className="text-2xl font-bold text-blue-600">
              {workflows.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-green-800">Active Workflows</div>
            <div className="text-2xl font-bold text-green-600">
              {workflows.filter(w => w.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-purple-800">Total Requests</div>
            <div className="text-2xl font-bold text-purple-600">
              {workflows.reduce((sum, w) => sum + w.totalRequests, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-medium text-orange-800">Avg Success Rate</div>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(workflows.reduce((sum, w) => sum + parseInt(w.completionRate), 0) / workflows.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workflow</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workflow? This action cannot be undone and will affect all future requests.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Workflow
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