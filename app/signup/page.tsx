"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  Users, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Loader2,
  Shield,
  Zap,
  Star
} from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    agreeToTerms: false,
    agreeToNewsletter: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      companySize: value,
    })
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both password fields match",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions to proceed",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Welcome to ResourceHub! Please check your email to verify your account.",
      })
      router.push("/login")
    }, 2000)
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="hover:bg-white/80">
          ← Back to Home
        </Button>
      </Link>
      
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            ✨ Join ResourceHub
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Start streamlining your resource management today with our powerful platform
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              14-day free trial
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Shield className="h-3 w-3 mr-1" />
              Enterprise security
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Zap className="h-3 w-3 mr-1" />
              Setup in 5 minutes
            </Badge>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border-2 focus:border-blue-500 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border-2 focus:border-blue-500 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 focus:border-blue-500 h-12"
                    required
                  />
                </div>

                {/* Password fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
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
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {getPasswordStrengthText(passwordStrength)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border-2 focus:border-blue-500 h-12 pr-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.confirmPassword && formData.password && (
                      <div className="flex items-center gap-2">
                        {formData.password === formData.confirmPassword ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs">Passwords match</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <span className="text-xs">Passwords don't match</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Company information */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Company Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Your company name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="border-2 focus:border-blue-500 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        Company Size
                      </Label>
                      <Select value={formData.companySize} onValueChange={handleSelectChange}>
                        <SelectTrigger id="companySize" className="border-2 focus:border-blue-500 h-12">
                          <SelectValue placeholder="Select your company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees (Startup)</SelectItem>
                          <SelectItem value="11-50">11-50 employees (Small Business)</SelectItem>
                          <SelectItem value="51-200">51-200 employees (Medium Business)</SelectItem>
                          <SelectItem value="201-500">201-500 employees (Large Business)</SelectItem>
                          <SelectItem value="501+">501+ employees (Enterprise)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Terms and agreements */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      className="mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed text-gray-700 cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 underline underline-offset-4 hover:text-blue-800">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 underline underline-offset-4 hover:text-blue-800">
                        Privacy Policy
                      </Link>
                      {" "}*
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      name="agreeToNewsletter"
                      checked={formData.agreeToNewsletter}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToNewsletter: checked as boolean })}
                      className="mt-1"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm leading-relaxed text-gray-700 cursor-pointer"
                    >
                      I'd like to receive product updates, tips, and special offers via email
                    </label>
                  </div>
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
                    Creating your account...
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold underline underline-offset-4 hover:text-blue-800">
              Sign in here
            </Link>
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Free 14-day Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Join 10,000+ Organizations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}