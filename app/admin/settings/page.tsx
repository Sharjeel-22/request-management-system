"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft, 
  Settings as SettingsIcon, 
  User, 
  LogOut, 
  Shield,
  Bell,
  Users,
  Palette,
  Globe,
  Lock,
  Save,
  Eye,
  EyeOff
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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

// Settings Components
function GeneralSettings() {
  const [platformName, setPlatformName] = useState("ResourceHub")
  const [platformDescription, setPlatformDescription] = useState("Streamline your resource management")
  const [timezone, setTimezone] = useState("Asia/Dubai")
  const [language, setLanguage] = useState("en")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="platform-name">Platform Name</Label>
          <Input
            id="platform-name"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="border-2 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
              <SelectItem value="Asia/Riyadh">Asia/Riyadh (AST)</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="platform-description">Platform Description</Label>
        <Textarea
          id="platform-description"
          value={platformDescription}
          onChange={(e) => setPlatformDescription(e.target.value)}
          className="border-2 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Default Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="border-2 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية (Arabic)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function UserManagementSettings() {
  const [allowSelfRegistration, setAllowSelfRegistration] = useState(false)
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  const [defaultUserRole, setDefaultUserRole] = useState("user")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-blue-800">Self Registration</Label>
              <p className="text-xs text-blue-600">Allow users to register themselves</p>
            </div>
            <Switch checked={allowSelfRegistration} onCheckedChange={setAllowSelfRegistration} />
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-green-800">Email Verification</Label>
              <p className="text-xs text-green-600">Require email verification for new users</p>
            </div>
            <Switch checked={requireEmailVerification} onCheckedChange={setRequireEmailVerification} />
          </div>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="default-role">Default User Role</Label>
        <Select value={defaultUserRole} onValueChange={setDefaultUserRole}>
          <SelectTrigger className="border-2 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [requestNotifications, setRequestNotifications] = useState(true)
  const [approvalNotifications, setApprovalNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-blue-800">Email Notifications</Label>
              <p className="text-xs text-blue-600">Send notifications via email</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-green-800">Request Notifications</Label>
              <p className="text-xs text-green-600">Notify when new requests are submitted</p>
            </div>
            <Switch checked={requestNotifications} onCheckedChange={setRequestNotifications} />
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-purple-800">Approval Notifications</Label>
              <p className="text-xs text-purple-600">Notify when requests are approved/rejected</p>
            </div>
            <Switch checked={approvalNotifications} onCheckedChange={setApprovalNotifications} />
          </div>
        </Card>

        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold text-orange-800">System Notifications</Label>
              <p className="text-xs text-orange-600">Notify about system maintenance and updates</p>
            </div>
            <Switch checked={systemNotifications} onCheckedChange={setSystemNotifications} />
          </div>
        </Card>
      </div>
    </div>
  )
}

function IntegrationSettings() {
  const [slackWebhook, setSlackWebhook] = useState("")
  const [teamsWebhook, setTeamsWebhook] = useState("")
  const [apiKey, setApiKey] = useState("rh_live_abc123...")
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
          <Input
            id="slack-webhook"
            value={slackWebhook}
            onChange={(e) => setSlackWebhook(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="border-2 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teams-webhook">Microsoft Teams Webhook URL</Label>
          <Input
            id="teams-webhook"
            value={teamsWebhook}
            onChange={(e) => setTeamsWebhook(e.target.value)}
            placeholder="https://outlook.office.com/webhook/..."
            className="border-2 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="flex gap-2">
            <Input
              id="api-key"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              readOnly
              className="border-2 focus:border-blue-500"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState("light")
  const [accentColor, setAccentColor] = useState("blue")
  const [compactMode, setCompactMode] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accent-color">Accent Color</Label>
          <Select value={accentColor} onValueChange={setAccentColor}>
            <SelectTrigger className="border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-semibold text-indigo-800">Compact Mode</Label>
            <p className="text-xs text-indigo-600">Reduce spacing for a more compact interface</p>
          </div>
          <Switch checked={compactMode} onCheckedChange={setCompactMode} />
        </div>
      </Card>
    </div>
  )
}

function SecuritySettings() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("8")
  const [passwordPolicy, setPasswordPolicy] = useState("strong")

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-semibold text-red-800">Two-Factor Authentication</Label>
            <p className="text-xs text-red-600">Require 2FA for all admin users</p>
          </div>
          <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
          <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
            <SelectTrigger className="border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 hour</SelectItem>
              <SelectItem value="4">4 hours</SelectItem>
              <SelectItem value="8">8 hours</SelectItem>
              <SelectItem value="24">24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-policy">Password Policy</Label>
          <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
            <SelectTrigger className="border-2 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="strong">Strong</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
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

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const tabConfig = [
    { value: "general", label: "General", icon: SettingsIcon, color: "blue" },
    { value: "users", label: "Users", icon: Users, color: "green" },
    { value: "notifications", label: "Notifications", icon: Bell, color: "purple" },
    { value: "integrations", label: "Integrations", icon: Globe, color: "orange" },
    { value: "appearance", label: "Appearance", icon: Palette, color: "pink" },
    { value: "security", label: "Security", icon: Lock, color: "red" },
  ]

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
          <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          
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
                <SettingsIcon className="h-4 w-4 mr-2" />
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
          <div className="p-3 bg-gray-100 rounded-lg">
            <SettingsIcon className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600">Configure your ResourceHub platform settings and preferences</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Admin Panel
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            System Configuration
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 p-1 bg-gray-100 rounded-lg">
          {tabConfig.map((tab) => {
            const IconComponent = tab.icon
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className={`flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <SettingsIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription className="text-blue-100">
                Configure basic platform settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription className="text-green-100">
                Manage users, roles, and permissions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <UserManagementSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-purple-100">
                Configure email and in-app notifications for different events
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-5 w-5" />
                Integration Settings
              </CardTitle>
              <CardDescription className="text-orange-100">
                Connect with external services and APIs for enhanced functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <IntegrationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-pink-50">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription className="text-pink-100">
                Customize the look and feel of your platform interface
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <AppearanceSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-red-100">
                Configure security options and access controls for your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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