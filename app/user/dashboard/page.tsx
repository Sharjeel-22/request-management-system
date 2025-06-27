"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for user requests
const userRequests = [
  {
    id: "REQ-001",
    title: "AWS EC2 Instance for Development",
    type: "Compute Resources",
    status: "pending",
    submittedDate: "2025-05-05",
    priority: "Medium",
  },
  {
    id: "REQ-002",
    title: "S3 Storage Bucket for Project Assets",
    type: "Storage Resources",
    status: "approved",
    submittedDate: "2025-05-01",
    priority: "Low",
  },
  {
    id: "REQ-003",
    title: "Database Access for Analytics Team",
    type: "Database Resources",
    status: "rejected",
    submittedDate: "2025-04-28",
    priority: "High",
    feedback: "Please provide more details about access requirements and security measures.",
  },
  {
    id: "REQ-004",
    title: "API Access for Integration Testing",
    type: "API Access",
    status: "in-progress",
    submittedDate: "2025-05-03",
    priority: "Medium",
    assignedTo: "Technical Team",
  },
]

export default function UserDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Requests</h1>
          <p className="text-muted-foreground">Manage and track your resource requests</p>
        </div>
        <Link href="/user/request">
          <Button>New Request</Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {userRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{request.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {request.id} • {request.type} • Submitted on {request.submittedDate}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{request.priority}</Badge>
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {request.feedback && (
                  <div className="mb-2 rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">Feedback:</p>
                    <p className="text-sm text-muted-foreground">{request.feedback}</p>
                  </div>
                )}
                {request.assignedTo && (
                  <p className="text-sm text-muted-foreground">Assigned to: {request.assignedTo}</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {request.status === "rejected" && <Button size="sm">Resubmit</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {userRequests
            .filter((r) => r.status === "pending" || r.status === "in-progress")
            .map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {request.id} • {request.type} • Submitted on {request.submittedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{request.priority}</Badge>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {request.assignedTo && (
                    <p className="text-sm text-muted-foreground">Assigned to: {request.assignedTo}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {userRequests
            .filter((r) => r.status === "approved")
            .map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {request.id} • {request.type} • Submitted on {request.submittedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{request.priority}</Badge>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {userRequests
            .filter((r) => r.status === "rejected")
            .map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {request.id} • {request.type} • Submitted on {request.submittedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{request.priority}</Badge>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {request.feedback && (
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm font-medium">Feedback:</p>
                      <p className="text-sm text-muted-foreground">{request.feedback}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Resubmit</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
