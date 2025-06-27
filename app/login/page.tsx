"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Shield,
  CreditCard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  CheckCircle2,
  Star,
  Zap
} from "lucide-react"

const users = [
  {
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    dashboard: "/admin/dashboard"
  },
  {
    email: "finance@company.com",
    password: "finance123",
    role: "finance",
    name: "Finance User",
    dashboard: "/finance-department/dashboard"
  },
  {
    email: "user@company.com",
    password: "user123",
    role: "user",
    name: "Request User",
    dashboard: "/user/request"
  }
]

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Find user with matching credentials
      const user = users.find(u => u.email === email && u.password === password)

      if (user) {
        // Store user session data
        const sessionData = {
          email: user.email,
          role: user.role,
          name: user.name,
          loginTime: new Date().toISOString()
        }

        // Store in localStorage based on role
        if (user.role === "admin") {
          localStorage.setItem('adminToken', 'admin-token-' + Date.now())
          localStorage.setItem('adminSession', JSON.stringify(sessionData))
        } else if (user.role === "finance") {
          localStorage.setItem('financeToken', 'finance-token-' + Date.now())
          localStorage.setItem('financeSession', JSON.stringify(sessionData))
        } else if (user.role === "user") {
          localStorage.setItem('userToken', 'user-token-' + Date.now())
          localStorage.setItem('userSession', JSON.stringify(sessionData))
        }

        // Store general user role for cross-reference
        localStorage.setItem('userRole', user.role)

        if (rememberMe) {
          localStorage.setItem('rememberUser', email)
        }

        toast({
          title: "Welcome Back! 🎉",
          description: `Successfully logged in as ${user.name}`,
        })

        // Redirect to appropriate dashboard
        router.push(user.dashboard)
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        })
      }

      setIsLoading(false)
    }, 1500)
  }

  const handleDemoLogin = (userType: string) => {
    const user = users.find(u => u.role === userType)
    if (user) {
      setEmail(user.email)
      setPassword(user.password)
      toast({
        title: "Demo Credentials Loaded",
        description: `Ready to sign in as ${user.name}`,
      })
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-5 w-5" />
      case "finance":
        return <CreditCard className="h-5 w-5" />
      case "user":
        return <User className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "finance":
        return "bg-green-100 text-green-800 border-green-200"
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleGradient = (role: string) => {
    switch (role) {
      case "admin":
        return "from-red-50 to-red-100"
      case "finance":
        return "from-green-50 to-green-100"
      case "user":
        return "from-blue-50 to-blue-100"
      default:
        return "from-gray-50 to-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="hover:bg-white/80">
          ← Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            🔐 Secure Login
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Sign in to your ResourceHub account to continue managing your resources
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Secure Access
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Star className="h-3 w-3 mr-1" />
              Trusted Platform
            </Badge>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm mb-6">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 focus:border-blue-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 focus:border-blue-500 h-12 pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Keep me signed in for 30 days
                  </label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Account Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100 mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Demo Accounts
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click any role below to auto-fill credentials and explore the platform
                </p>
              </div>

              <div className="grid gap-3">
                {users.map((user) => (
                  <Card
                    key={user.role}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md bg-gradient-to-r ${getRoleGradient(user.role)} border-0`}
                    onClick={() => handleDemoLogin(user.role)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-full shadow-sm">
                            {getRoleIcon(user.role)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <Badge className={`${getRoleBadgeColor(user.role)} font-medium shadow-sm`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500">
                  <strong>All passwords:</strong> admin123, finance123, user123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Levels Information */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 mb-6">
          <CardContent className="p-6">
            <h4 className="font-semibold text-blue-900 mb-4 text-center flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Platform Access Levels
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                <Shield className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <span className="font-semibold text-red-800">Admin Access:</span>
                  <p className="text-sm text-blue-800">Complete system control, user management, and workflow configuration</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                <CreditCard className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <span className="font-semibold text-green-800">Finance Access:</span>
                  <p className="text-sm text-blue-800">Payment processing, budget tracking, and financial approvals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                <User className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-800">User Access:</span>
                  <p className="text-sm text-blue-800">Submit requests, track status, and manage personal resources</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold underline underline-offset-4 hover:text-blue-800">
              Create one here
            </Link>
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Trusted by 10,000+ Orgs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}