"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function AppearanceSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    theme: "system",
    primaryColor: "#7c3aed",
    logoUrl: "/logo.png",
    favicon: "/favicon.ico",
    customCss: "",
    enableCustomization: true,
    sidebarPosition: "left",
    compactMode: false,
    showBreadcrumbs: true,
    defaultFontSize: "medium",
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
        description: "Your appearance settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Theme Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme Mode</Label>
            <RadioGroup
              id="theme"
              value={settings.theme}
              onValueChange={(value) => handleChange("theme", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system">System</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={settings.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="h-10 w-20"
              />
              <Input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="w-32"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultFontSize">Default Font Size</Label>
            <Select value={settings.defaultFontSize} onValueChange={(value) => handleChange("defaultFontSize", value)}>
              <SelectTrigger id="defaultFontSize">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Branding</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              value={settings.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <p className="text-xs text-muted-foreground">
              Recommended size: 200x50px. Supported formats: PNG, JPG, SVG.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon URL</Label>
            <Input
              id="favicon"
              value={settings.favicon}
              onChange={(e) => handleChange("favicon", e.target.value)}
              placeholder="https://example.com/favicon.ico"
            />
            <p className="text-xs text-muted-foreground">Recommended size: 32x32px. Supported formats: ICO, PNG.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Layout Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sidebarPosition" className="flex flex-col gap-0.5">
              <span>Sidebar Position</span>
              <span className="font-normal text-sm text-muted-foreground">
                Choose which side the navigation sidebar appears
              </span>
            </Label>
            <Select
              value={settings.sidebarPosition}
              onValueChange={(value) => handleChange("sidebarPosition", value)}
              className="w-32"
            >
              <SelectTrigger id="sidebarPosition">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="compactMode" className="flex flex-col gap-0.5">
              <span>Compact Mode</span>
              <span className="font-normal text-sm text-muted-foreground">
                Reduce spacing and padding throughout the interface
              </span>
            </Label>
            <Switch
              id="compactMode"
              checked={settings.compactMode}
              onCheckedChange={(checked) => handleChange("compactMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showBreadcrumbs" className="flex flex-col gap-0.5">
              <span>Show Breadcrumbs</span>
              <span className="font-normal text-sm text-muted-foreground">
                Display navigation breadcrumbs at the top of pages
              </span>
            </Label>
            <Switch
              id="showBreadcrumbs"
              checked={settings.showBreadcrumbs}
              onCheckedChange={(checked) => handleChange("showBreadcrumbs", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Advanced Customization</h3>
            <p className="text-sm text-muted-foreground">
              Enable custom CSS and JavaScript to further customize the platform appearance.
            </p>
          </div>
          <Switch
            id="enableCustomization"
            checked={settings.enableCustomization}
            onCheckedChange={(checked) => handleChange("enableCustomization", checked)}
          />
        </div>

        {settings.enableCustomization && (
          <div className="space-y-2">
            <Label htmlFor="customCss">Custom CSS</Label>
            <textarea
              id="customCss"
              value={settings.customCss}
              onChange={(e) => handleChange("customCss", e.target.value)}
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder=".custom-class { color: #333; }"
            />
            <p className="text-xs text-muted-foreground">
              Custom CSS will be applied to the entire platform. Use with caution.
            </p>
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
