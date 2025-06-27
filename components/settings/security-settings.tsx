"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    passwordExpiryDays: 90,
    passwordHistory: 5,
    mfaEnabled: false,
    mfaRequired: false,
    mfaMethod: "app",
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    ipRestriction: false,
    allowedIPs: "",
  })

  const handleChange = (field: string, value: string | boolean | number) => {
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
        description: "Your security settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Password Policy</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="passwordMinLength">Minimum Password Length: {settings.passwordMinLength}</Label>
            </div>
            <Slider
              id="passwordMinLength"
              min={6}
              max={16}
              step={1}
              value={[settings.passwordMinLength]}
              onValueChange={(value) => handleChange("passwordMinLength", value[0])}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
            <Switch
              id="passwordRequireUppercase"
              checked={settings.passwordRequireUppercase}
              onCheckedChange={(checked) => handleChange("passwordRequireUppercase", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="passwordRequireLowercase">Require Lowercase Letters</Label>
            <Switch
              id="passwordRequireLowercase"
              checked={settings.passwordRequireLowercase}
              onCheckedChange={(checked) => handleChange("passwordRequireLowercase", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
            <Switch
              id="passwordRequireNumbers"
              checked={settings.passwordRequireNumbers}
              onCheckedChange={(checked) => handleChange("passwordRequireNumbers", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="passwordRequireSymbols">Require Special Characters</Label>
            <Switch
              id="passwordRequireSymbols"
              checked={settings.passwordRequireSymbols}
              onCheckedChange={(checked) => handleChange("passwordRequireSymbols", checked)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="passwordExpiryDays">Password Expiry (days)</Label>
              <Input
                id="passwordExpiryDays"
                type="number"
                min="0"
                max="365"
                value={settings.passwordExpiryDays}
                onChange={(e) => handleChange("passwordExpiryDays", Number.parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Set to 0 to disable password expiry</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordHistory">Password History</Label>
              <Input
                id="passwordHistory"
                type="number"
                min="0"
                max="24"
                value={settings.passwordHistory}
                onChange={(e) => handleChange("passwordHistory", Number.parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Number of previous passwords that cannot be reused</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Multi-Factor Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mfaEnabled">Enable MFA</Label>
              <p className="text-sm text-muted-foreground">Allow users to set up multi-factor authentication</p>
            </div>
            <Switch
              id="mfaEnabled"
              checked={settings.mfaEnabled}
              onCheckedChange={(checked) => handleChange("mfaEnabled", checked)}
            />
          </div>

          {settings.mfaEnabled && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mfaRequired">Require MFA</Label>
                  <p className="text-sm text-muted-foreground">Force all users to set up MFA</p>
                </div>
                <Switch
                  id="mfaRequired"
                  checked={settings.mfaRequired}
                  onCheckedChange={(checked) => handleChange("mfaRequired", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mfaMethod">Default MFA Method</Label>
                <Select value={settings.mfaMethod} onValueChange={(value) => handleChange("mfaMethod", value)}>
                  <SelectTrigger id="mfaMethod">
                    <SelectValue placeholder="Select MFA method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app">Authenticator App</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-medium">Session Security</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              min="5"
              max="1440"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange("sessionTimeout", Number.parseInt(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Users will be logged out after this period of inactivity</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                min="1"
                max="10"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleChange("maxLoginAttempts", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">Account Lockout Duration (minutes)</Label>
              <Input
                id="lockoutDuration"
                type="number"
                min="5"
                max="1440"
                value={settings.lockoutDuration}
                onChange={(e) => handleChange("lockoutDuration", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">IP Restriction</h3>
            <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
          </div>
          <Switch
            id="ipRestriction"
            checked={settings.ipRestriction}
            onCheckedChange={(checked) => handleChange("ipRestriction", checked)}
          />
        </div>

        {settings.ipRestriction && (
          <div className="space-y-2">
            <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
            <Textarea
              id="allowedIPs"
              value={settings.allowedIPs}
              onChange={(e) => handleChange("allowedIPs", e.target.value)}
              placeholder="192.168.1.1, 10.0.0.0/24"
              className="h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground">Enter IP addresses or CIDR ranges, separated by commas</p>
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
