"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft, 
  Plus, 
  X, 
  ArrowDown, 
  ArrowUp, 
  Settings, 
  User, 
  LogOut, 
  Workflow,
  Target,
  Users,
  Shield,
  Bell,
  GitBranch,
  Edit,
  Save,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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

// Mock data for the workflow being edited
const mockWorkflow = {
  id: "wf-001",
  name: "Standard Approval Process",
  description: "Default workflow for general resource requests with department head and finance approval",
  isActive: true,
  isDefault: true,
  appliesTo: ["Compute Resources", "Storage Resources", "Database Resources"],
  steps: [
    {
      id: "step-1",
      name: "Department Manager Approval",
      type: "approval",
      approver: "manager",
      customApprover: "",
      description: "Department manager reviews and approves the request based on business requirements",
    },
    {
      id: "step-2",
      name: "IT Admin Review",
      type: "approval",
      approver: "it-admin",
      customApprover: "",
      description: "IT administrator reviews technical requirements and infrastructure impact",
    },
    {
      id: "step-3",
      name: "Final Notification",
      type: "notification",
      approver: "",
      customApprover: "",
      description: "Notify requester and stakeholders of the final decision and next steps",
    },
  ],
}

// Resource types for the workflow
const resourceTypes = [
  "Compute Resources",
  "Storage Resources",
  "Database Resources",
  "API Access",
  "Network Resources",
  "Security Access",
  "Other",
]

// Step types for the workflow
const stepTypes = [
  { value: "approval", label: "Approval", icon: Shield },
  { value: "notification", label: "Notification", icon: Bell },
  { value: "condition", label: "Condition Check", icon: GitBranch },
  { value: "assignment", label: "Assignment", icon: Users },
]

// Approver roles for the workflow
const approverRoles = [
  { value: "manager", label: "Department Manager" },
  { value: "it-admin", label: "IT Administrator" },
  { value: "security", label: "Security Team" },
  { value: "finance", label: "Finance Department" },
  { value: "custom", label: "Custom Approver" },
]

export default function EditWorkflowPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const workflowId = params.id
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const [workflowName, setWorkflowName] = useState("")
  const [workflowDescription, setWorkflowDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isDefault, setIsDefault] = useState(false)
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>([])
  const [steps, setSteps] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would fetch the workflow data from your API
      setWorkflowName(mockWorkflow.name)
      setWorkflowDescription(mockWorkflow.description)
      setIsActive(mockWorkflow.isActive)
      setIsDefault(mockWorkflow.isDefault)
      setSelectedResourceTypes(mockWorkflow.appliesTo)
      setSteps(mockWorkflow.steps)
      setIsLoading(false)
    }
    
    loadWorkflow()
  }, [workflowId])

  const handleResourceTypeToggle = (type: string) => {
    if (selectedResourceTypes.includes(type)) {
      setSelectedResourceTypes(selectedResourceTypes.filter((t) => t !== type))
    } else {
      setSelectedResourceTypes([...selectedResourceTypes, type])
    }
  }

  const addStep = () => {
    const newStepId = `step-${Date.now()}`
    setSteps([
      ...steps,
      {
        id: newStepId,
        name: `Step ${steps.length + 1}`,
        type: "approval",
        approver: "manager",
        customApprover: "",
        description: "",
      },
    ])
  }

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((step) => step.id !== id))
    } else {
      toast({
        title: "Cannot Remove Step",
        description: "A workflow must have at least one step.",
        variant: "destructive",
      })
    }
  }

  const moveStepUp = (index: number) => {
    if (index > 0) {
      const newSteps = [...steps]
      const temp = newSteps[index]
      newSteps[index] = newSteps[index - 1]
      newSteps[index - 1] = temp
      setSteps(newSteps)
    }
  }

  const moveStepDown = (index: number) => {
    if (index < steps.length - 1) {
      const newSteps = [...steps]
      const temp = newSteps[index]
      newSteps[index] = newSteps[index + 1]
      newSteps[index + 1] = temp
      setSteps(newSteps)
    }
  }

  const updateStep = (id: string, field: string, value: string) => {
    setSteps(
      steps.map((step) => {
        if (step.id === id) {
          return { ...step, [field]: value }
        }
        return step
      }),
    )
  }

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(st => st.value === type)
    return stepType ? stepType.icon : Shield
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!workflowName) {
      toast({
        title: "Workflow Name Required",
        description: "Please provide a name for your workflow.",
        variant: "destructive",
      })
      return
    }

    if (selectedResourceTypes.length === 0) {
      toast({
        title: "Resource Types Required",
        description: "Please select at least one resource type for this workflow.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast({
      title: "Workflow Updated",
      description: `"${workflowName}" has been updated successfully.`,
    })

    setIsSaving(false)
    router.push("/admin/workflows")
  }

  if (isLoading) {
    return (
      <div className="p-6 w-full min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <p className="text-lg text-gray-600">Loading workflow...</p>
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
        <div className="flex items-center gap-4 mb-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Edit className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Workflow</h1>
            <p className="text-gray-600">Modify your approval workflow for resource requests</p>
          </div>
        </div>
        
        {/* Workflow Info Badge */}
        <div className="flex items-center gap-2 mt-4">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            ID: {workflowId}
          </Badge>
          {isDefault && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Default Workflow
            </Badge>
          )}
          <Badge className={`${isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8">
          {/* Basic Information */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-blue-100">
                Update the general settings and properties for your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="workflow-name" className="text-sm font-semibold text-gray-700">
                  Workflow Name *
                </Label>
                <Input
                  id="workflow-name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Enter a descriptive workflow name"
                  className="border-2 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workflow-description" className="text-sm font-semibold text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="workflow-description"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="Describe the purpose and use case for this workflow"
                  className="min-h-[100px] border-2 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-6 sm:flex-row">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-3">
                    <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                    <div>
                      <Label htmlFor="active" className="font-semibold text-green-800">Active Workflow</Label>
                      <p className="text-xs text-green-600">Enable this workflow to start processing requests</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Switch id="default" checked={isDefault} onCheckedChange={setIsDefault} />
                    <div>
                      <Label htmlFor="default" className="font-semibold text-yellow-800">Default Workflow</Label>
                      <p className="text-xs text-yellow-600">Use as the default for new resource types</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Resource Types */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5" />
                Resource Types
              </CardTitle>
              <CardDescription className="text-purple-100">
                Select which resource types this workflow applies to
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {resourceTypes.map((type) => (
                  <Card 
                    key={type} 
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedResourceTypes.includes(type) 
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' 
                        : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleResourceTypeToggle(type)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`resource-${type}`}
                        checked={selectedResourceTypes.includes(type)}
                        onChange={() => {}} // Handled by card click
                      />
                      <Label htmlFor={`resource-${type}`} className="cursor-pointer font-medium">
                        {type}
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
              
              {selectedResourceTypes.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Selected Resource Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedResourceTypes.map((type) => (
                      <Badge key={type} className="bg-blue-100 text-blue-800 border-blue-200">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <GitBranch className="h-5 w-5" />
                    Workflow Steps
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Modify the sequence of steps in your approval workflow
                  </CardDescription>
                </div>
                <Button 
                  type="button" 
                  onClick={addStep} 
                  variant="outline" 
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <Plus className="mr-2 h-4 w-4" /> 
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {steps.map((step, index) => {
                const StepIcon = getStepIcon(step.type)
                return (
                  <Card key={step.id} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <StepIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Step {index + 1}</h3>
                            <p className="text-sm text-gray-600">{step.name || 'Unnamed Step'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveStepUp(index)}
                            disabled={index === 0}
                            className="hover:bg-blue-100"
                          >
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Move Up</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveStepDown(index)}
                            disabled={index === steps.length - 1}
                            className="hover:bg-blue-100"
                          >
                            <ArrowDown className="h-4 w-4" />
                            <span className="sr-only">Move Down</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStep(step.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`step-name-${step.id}`} className="text-sm font-semibold text-gray-700">
                            Step Name
                          </Label>
                          <Input
                            id={`step-name-${step.id}`}
                            value={step.name}
                            onChange={(e) => updateStep(step.id, "name", e.target.value)}
                            placeholder="Enter descriptive step name"
                            className="border-2 focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`step-type-${step.id}`} className="text-sm font-semibold text-gray-700">
                            Step Type
                          </Label>
                          <Select value={step.type} onValueChange={(value) => updateStep(step.id, "type", value)}>
                            <SelectTrigger id={`step-type-${step.id}`} className="border-2 focus:border-blue-500">
                              <SelectValue placeholder="Select step type" />
                            </SelectTrigger>
                            <SelectContent>
                              {stepTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className="h-4 w-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {step.type === "approval" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor={`step-approver-${step.id}`} className="text-sm font-semibold text-gray-700">
                                Approver Role
                              </Label>
                              <Select
                                value={step.approver}
                                onValueChange={(value) => updateStep(step.id, "approver", value)}
                              >
                                <SelectTrigger id={`step-approver-${step.id}`} className="border-2 focus:border-blue-500">
                                  <SelectValue placeholder="Select approver role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {approverRoles.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                      {role.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {step.approver === "custom" && (
                              <div className="space-y-2">
                                <Label htmlFor={`step-custom-approver-${step.id}`} className="text-sm font-semibold text-gray-700">
                                  Custom Approver
                                </Label>
                                <Input
                                  id={`step-custom-approver-${step.id}`}
                                  value={step.customApprover}
                                  onChange={(e) => updateStep(step.id, "customApprover", e.target.value)}
                                  placeholder="Enter email or username"
                                  className="border-2 focus:border-blue-500"
                                />
                              </div>
                            )}
                          </>
                        )}

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`step-description-${step.id}`} className="text-sm font-semibold text-gray-700">
                            Step Description
                          </Label>
                          <Textarea
                            id={`step-description-${step.id}`}
                            value={step.description}
                            onChange={(e) => updateStep(step.id, "description", e.target.value)}
                            placeholder="Describe what happens in this step and any special requirements"
                            className="border-2 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </CardContent>
          </Card>

          {/* Changes Summary */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Edit className="h-5 w-5 text-orange-600" />
                Workflow Changes Summary
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{steps.length}</div>
                  <div className="text-sm text-gray-600">Total Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedResourceTypes.length}</div>
                  <div className="text-sm text-gray-600">Resource Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pb-8">
            <Link href="/admin/workflows">
              <Button type="button" variant="outline" size="lg" className="px-8">
                Cancel Changes
              </Button>
            </Link>
            <Button 
              type="submit" 
              size="lg" 
              className="px-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

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