"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSettings, setEmailSettings] = useState({
    enableEmails: true,
    requestSubmitted: true,
    requestApproved: true,
    requestRejected: true,
    requestAssigned: true,
    commentAdded: true,
    reminderEmails: true,
    dailyDigest: false,
    emailFooter: "This is an automated message from ResourceHub. Please do not reply to this email.",
    senderName: "ResourceHub",
    senderEmail: "notifications@resourcehub.com",
  })

  const [inAppSettings, setInAppSettings] = useState({
    enableNotifications: true,
    requestUpdates: true,
    mentions: true,
    systemAnnouncements: true,
    autoMarkAsRead: false,
    notificationSound: true,
    desktopNotifications: false,
    retentionDays: "30",
  })

  const handleEmailChange = (field: string, value: boolean | string) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value,
    })
  }

  const handleInAppChange = (field: string, value: boolean | string) => {
    setInAppSettings({
      ...inAppSettings,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your notification settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="in-app">In-App Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableEmails" className="text-base">
                Enable Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">When disabled, no emails will be sent from the system.</p>
            </div>
            <Switch
              id="enableEmails"
              checked={emailSettings.enableEmails}
              onCheckedChange={(checked) => handleEmailChange("enableEmails", checked)}
            />
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="requestSubmitted" className="flex flex-col gap-0.5">
                  <span>Request Submitted</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Notify when a new request is submitted
                  </span>
                </Label>
                <Switch
                  id="requestSubmitted"
                  checked={emailSettings.requestSubmitted}
                  onCheckedChange={(checked) => handleEmailChange("requestSubmitted", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="requestApproved" className="flex flex-col gap-0.5">
                  <span>Request Approved</span>
                  <span className="font-normal text-sm text-muted-foreground">Notify when a request is approved</span>
                </Label>
                <Switch
                  id="requestApproved"
                  checked={emailSettings.requestApproved}
                  onCheckedChange={(checked) => handleEmailChange("requestApproved", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="requestRejected" className="flex flex-col gap-0.5">
                  <span>Request Rejected</span>
                  <span className="font-normal text-sm text-muted-foreground">Notify when a request is rejected</span>
                </Label>
                <Switch
                  id="requestRejected"
                  checked={emailSettings.requestRejected}
                  onCheckedChange={(checked) => handleEmailChange("requestRejected", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="requestAssigned" className="flex flex-col gap-0.5">
                  <span>Request Assigned</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Notify when a request is assigned to someone
                  </span>
                </Label>
                <Switch
                  id="requestAssigned"
                  checked={emailSettings.requestAssigned}
                  onCheckedChange={(checked) => handleEmailChange("requestAssigned", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="commentAdded" className="flex flex-col gap-0.5">
                  <span>Comment Added</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Notify when a comment is added to a request
                  </span>
                </Label>
                <Switch
                  id="commentAdded"
                  checked={emailSettings.commentAdded}
                  onCheckedChange={(checked) => handleEmailChange("commentAdded", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reminderEmails" className="flex flex-col gap-0.5">
                  <span>Reminder Emails</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send reminder emails for pending requests
                  </span>
                </Label>
                <Switch
                  id="reminderEmails"
                  checked={emailSettings.reminderEmails}
                  onCheckedChange={(checked) => handleEmailChange("reminderEmails", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dailyDigest" className="flex flex-col gap-0.5">
                  <span>Daily Digest</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send a daily summary of all activity
                  </span>
                </Label>
                <Switch
                  id="dailyDigest"
                  checked={emailSettings.dailyDigest}
                  onCheckedChange={(checked) => handleEmailChange("dailyDigest", checked)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Email Configuration</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  value={emailSettings.senderName}
                  onChange={(e) => handleEmailChange("senderName", e.target.value)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderEmail">Sender Email</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={emailSettings.senderEmail}
                  onChange={(e) => handleEmailChange("senderEmail", e.target.value)}
                  disabled={!emailSettings.enableEmails}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailFooter">Email Footer</Label>
              <Textarea
                id="emailFooter"
                value={emailSettings.emailFooter}
                onChange={(e) => handleEmailChange("emailFooter", e.target.value)}
                disabled={!emailSettings.enableEmails}
                rows={3}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="in-app" className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications" className="text-base">
                Enable In-App Notifications
              </Label>
              <p className="text-sm text-muted-foreground">When disabled, no in-app notifications will be shown.</p>
            </div>
            <Switch
              id="enableNotifications"
              checked={inAppSettings.enableNotifications}
              onCheckedChange={(checked) => handleInAppChange("enableNotifications", checked)}
            />
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="requestUpdates" className="flex flex-col gap-0.5">
                  <span>Request Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show notifications for request status changes
                  </span>
                </Label>
                <Switch
                  id="requestUpdates"
                  checked={inAppSettings.requestUpdates}
                  onCheckedChange={(checked) => handleInAppChange("requestUpdates", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mentions" className="flex flex-col gap-0.5">
                  <span>Mentions</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show notifications when you are mentioned in comments
                  </span>
                </Label>
                <Switch
                  id="mentions"
                  checked={inAppSettings.mentions}
                  onCheckedChange={(checked) => handleInAppChange("mentions", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="systemAnnouncements" className="flex flex-col gap-0.5">
                  <span>System Announcements</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show notifications for system announcements
                  </span>
                </Label>
                <Switch
                  id="systemAnnouncements"
                  checked={inAppSettings.systemAnnouncements}
                  onCheckedChange={(checked) => handleInAppChange("systemAnnouncements", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoMarkAsRead" className="flex flex-col gap-0.5">
                  <span>Auto-mark as Read</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically mark notifications as read when viewed
                  </span>
                </Label>
                <Switch
                  id="autoMarkAsRead"
                  checked={inAppSettings.autoMarkAsRead}
                  onCheckedChange={(checked) => handleInAppChange("autoMarkAsRead", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notificationSound" className="flex flex-col gap-0.5">
                  <span>Notification Sound</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Play a sound when new notifications arrive
                  </span>
                </Label>
                <Switch
                  id="notificationSound"
                  checked={inAppSettings.notificationSound}
                  onCheckedChange={(checked) => handleInAppChange("notificationSound", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="desktopNotifications" className="flex flex-col gap-0.5">
                  <span>Desktop Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show browser notifications when the app is in the background
                  </span>
                </Label>
                <Switch
                  id="desktopNotifications"
                  checked={inAppSettings.desktopNotifications}
                  onCheckedChange={(checked) => handleInAppChange("desktopNotifications", checked)}
                  disabled={!inAppSettings.enableNotifications}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retentionDays">Notification Retention (days)</Label>
                <Input
                  id="retentionDays"
                  type="number"
                  min="1"
                  max="365"
                  value={inAppSettings.retentionDays}
                  onChange={(e) => handleInAppChange("retentionDays", e.target.value)}
                  disabled={!inAppSettings.enableNotifications}
                  className="max-w-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Notifications older than this will be automatically deleted.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
