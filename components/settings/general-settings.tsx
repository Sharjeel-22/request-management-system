"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function GeneralSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    companyName: "ResourceHub Inc.",
    platformName: "ResourceHub",
    supportEmail: "support@resourcehub.com",
    defaultLanguage: "en",
    timeZone: "UTC-8",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    maintenanceMode: false,
    maintenanceMessage: "We're currently performing maintenance. Please check back later.",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setSettings({
      ...settings,
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
        description: "Your general settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={settings.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="platformName">Platform Name</Label>
          <Input
            id="platformName"
            value={settings.platformName}
            onChange={(e) => handleChange("platformName", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">This will be displayed in the header and emails.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportEmail">Support Email</Label>
        <Input
          id="supportEmail"
          type="email"
          value={settings.supportEmail}
          onChange={(e) => handleChange("supportEmail", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">This email will receive support requests and notifications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="defaultLanguage">Default Language</Label>
          <Select value={settings.defaultLanguage} onValueChange={(value) => handleChange("defaultLanguage", value)}>
            <SelectTrigger id="defaultLanguage">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeZone">Default Time Zone</Label>
          <Select value={settings.timeZone} onValueChange={(value) => handleChange("timeZone", value)}>
            <SelectTrigger id="timeZone">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC-12">UTC-12</SelectItem>
              <SelectItem value="UTC-11">UTC-11</SelectItem>
              <SelectItem value="UTC-10">UTC-10</SelectItem>
              <SelectItem value="UTC-9">UTC-9</SelectItem>
              <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
              <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
              <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
              <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
              <SelectItem value="UTC-4">UTC-4</SelectItem>
              <SelectItem value="UTC-3">UTC-3</SelectItem>
              <SelectItem value="UTC-2">UTC-2</SelectItem>
              <SelectItem value="UTC-1">UTC-1</SelectItem>
              <SelectItem value="UTC+0">UTC+0</SelectItem>
              <SelectItem value="UTC+1">UTC+1</SelectItem>
              <SelectItem value="UTC+2">UTC+2</SelectItem>
              <SelectItem value="UTC+3">UTC+3</SelectItem>
              <SelectItem value="UTC+4">UTC+4</SelectItem>
              <SelectItem value="UTC+5">UTC+5</SelectItem>
              <SelectItem value="UTC+6">UTC+6</SelectItem>
              <SelectItem value="UTC+7">UTC+7</SelectItem>
              <SelectItem value="UTC+8">UTC+8</SelectItem>
              <SelectItem value="UTC+9">UTC+9</SelectItem>
              <SelectItem value="UTC+10">UTC+10</SelectItem>
              <SelectItem value="UTC+11">UTC+11</SelectItem>
              <SelectItem value="UTC+12">UTC+12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select value={settings.dateFormat} onValueChange={(value) => handleChange("dateFormat", value)}>
            <SelectTrigger id="dateFormat">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
              <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeFormat">Time Format</Label>
          <Select value={settings.timeFormat} onValueChange={(value) => handleChange("timeFormat", value)}>
            <SelectTrigger id="timeFormat">
              <SelectValue placeholder="Select time format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
              <SelectItem value="24h">24-hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Maintenance Mode</h3>
            <p className="text-sm text-muted-foreground">
              When enabled, users will see a maintenance message instead of the platform.
            </p>
          </div>
          <Switch
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
          />
        </div>

        {settings.maintenanceMode && (
          <div className="space-y-2">
            <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
            <Textarea
              id="maintenanceMessage"
              value={settings.maintenanceMessage}
              onChange={(e) => handleChange("maintenanceMessage", e.target.value)}
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
