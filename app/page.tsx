import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Shield, Users, ArrowRight, Star, Globe, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                R
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Resource
                </span>
                <span className="text-gray-900">Hub</span>
              </div>
            </div>
            
            <nav className="hidden gap-8 md:flex">
              <Link href="/" className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600">
                Home
              </Link>
              <Link href="/features" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
                About
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:text-blue-600">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-2">
                ✨ Trusted by 10,000+ Organizations
              </Badge>
              
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Streamline Resource
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Requests Instantly
                </span>
              </h1>
              
              <p className="max-w-2xl text-xl text-gray-600 leading-relaxed">
                Transform how your organization manages resources. Our intelligent platform makes 
                submitting, reviewing, and approving requests faster and more efficient than ever.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link href="/user/request">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                    Submit a Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 px-8 py-4 text-lg transition-all duration-300">
                    Admin Dashboard
                    <Shield className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-gray-600">Requests Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 mb-4">
                Features
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-4">
                Everything you need to manage resources
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your workflow and boost productivity
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Lightning Fast Requests</CardTitle>
                      <CardDescription className="text-gray-600">Submit in minutes, not hours</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Our intuitive interface and smart forms help you submit resource requests with all necessary 
                    details in just a few clicks.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-blue-600 font-medium">
                    <Clock className="h-4 w-4" />
                    <span>Average submission time: 2 minutes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Smart Approval Workflow</CardTitle>
                      <CardDescription className="text-gray-600">Intelligent routing system</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Administrators can efficiently review, approve, reject, or assign requests with our 
                    streamlined workflow management system.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-purple-600 font-medium">
                    <Users className="h-4 w-4" />
                    <span>Multi-level approval support</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Real-time Tracking</CardTitle>
                      <CardDescription className="text-gray-600">Stay updated every step</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Get instant notifications and track the status of your requests as they progress 
                    through the approval pipeline.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-green-600 font-medium">
                    <Star className="h-4 w-4" />
                    <span>Live status updates</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white md:text-5xl mb-6">
                Ready to streamline your resource management?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of organizations that trust ResourceHub to manage their resource requests efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 py-8 md:h-20 md:flex-row md:py-0">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm">
                R
              </div>
              <p className="text-sm text-gray-600">
                © 2025 ResourceHub. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/support" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}