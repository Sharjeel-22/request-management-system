"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function IntegrationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock integration data
  const [integrations, setIntegrations] = useState([
    {
      id: "slack",
      name: "Slack",
      description: "Send notifications to Slack channels",
      connected: true,
      webhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
      channels: "#resource-requests, #approvals",
    },
    {
      id: "ms-teams",
      name: "Microsoft Teams",
      description: "Send notifications to Microsoft Teams channels",
      connected: false,
      webhookUrl: "",
      channels: "",
    },
    {
      id: "jira",
      name: "Jira",
      description: "Create and update Jira issues from requests",
      connected: true,
      apiKey: "jira-api-key-123456",
      domain: "company.atlassian.net",
      project: "RES",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Create calendar events for resource allocations",
      connected: false,
      clientId: "",
      clientSecret: "",
    },
  ])

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id) {
          return { ...integration, connected: !integration.connected }
        }
        return integration
      }),
    )

    const integration = integrations.find((i) => i.id === id)
    const newStatus = !integration?.connected

    toast({
      title: newStatus ? "Integration Connected" : "Integration Disconnected",
      description: `${integration?.name} has been ${newStatus ? "connected" : "disconnected"}.`,
    })
  }

  const handleUpdateIntegration = (id: string, field: string, value: string) => {
    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id) {
          return { ...integration, [field]: value }
        }
        return integration
      }),
    )
  }

  const handleSaveChanges = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your integration settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Available Integrations</h3>
        <Button onClick={handleSaveChanges} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
                <Badge variant="outline" className={integration.connected ? "bg-green-100 text-green-800" : ""}>
                  {integration.connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {integration.id === "slack" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-webhook`}>Webhook URL</Label>
                    <Input
                      id={`${integration.id}-webhook`}
                      value={integration.webhookUrl}
                      onChange={(e) => handleUpdateIntegration(integration.id, "webhookUrl", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-channels`}>Channels</Label>
                    <Input
                      id={`${integration.id}-channels`}
                      value={integration.channels}
                      onChange={(e) => handleUpdateIntegration(integration.id, "channels", e.target.value)}
                      disabled={!integration.connected}
                      placeholder="e.g., #channel1, #channel2"
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of channels</p>
                  </div>
                </div>
              )}

              {integration.id === "ms-teams" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-webhook`}>Webhook URL</Label>
                    <Input
                      id={`${integration.id}-webhook`}
                      value={integration.webhookUrl}
                      onChange={(e) => handleUpdateIntegration(integration.id, "webhookUrl", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-channels`}>Channels</Label>
                    <Input
                      id={`${integration.id}-channels`}
                      value={integration.channels}
                      onChange={(e) => handleUpdateIntegration(integration.id, "channels", e.target.value)}
                      disabled={!integration.connected}
                      placeholder="e.g., General, Approvals"
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of channels</p>
                  </div>
                </div>
              )}

              {integration.id === "jira" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-domain`}>Jira Domain</Label>
                    <Input
                      id={`${integration.id}-domain`}
                      value={integration.domain}
                      onChange={(e) => handleUpdateIntegration(integration.id, "domain", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-api-key`}>API Key</Label>
                    <Input
                      id={`${integration.id}-api-key`}
                      type="password"
                      value={integration.apiKey}
                      onChange={(e) => handleUpdateIntegration(integration.id, "apiKey", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-project`}>Project Key</Label>
                    <Input
                      id={`${integration.id}-project`}
                      value={integration.project}
                      onChange={(e) => handleUpdateIntegration(integration.id, "project", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                </div>
              )}

              {integration.id === "google-calendar" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-client-id`}>Client ID</Label>
                    <Input
                      id={`${integration.id}-client-id`}
                      value={integration.clientId}
                      onChange={(e) => handleUpdateIntegration(integration.id, "clientId", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-client-secret`}>Client Secret</Label>
                    <Input
                      id={`${integration.id}-client-secret`}
                      type="password"
                      value={integration.clientSecret}
                      onChange={(e) => handleUpdateIntegration(integration.id, "clientSecret", e.target.value)}
                      disabled={!integration.connected}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(`https://example.com/docs/integrations/${integration.id}`, "_blank")
                }}
              >
                View Documentation
              </Button>
              <Button
                variant={integration.connected ? "destructive" : "default"}
                size="sm"
                onClick={() => handleToggleIntegration(integration.id)}
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-medium">API Access</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Key</p>
              <p className="text-sm text-muted-foreground">Use this key to authenticate API requests</p>
            </div>
            <div className="flex items-center gap-2">
              <Input value="api-key-123456789abcdef" readOnly className="w-64 font-mono text-sm" type="password" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText("api-key-123456789abcdef")
                  toast({
                    title: "API Key Copied",
                    description: "The API key has been copied to your clipboard.",
                  })
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Regenerate API Key</p>
              <p className="text-sm text-muted-foreground">
                This will invalidate the current key and generate a new one
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast({
                  title: "API Key Regenerated",
                  description: "A new API key has been generated. Make sure to update your integrations.",
                })
              }}
            >
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
