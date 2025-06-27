import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Workflow, Users, Layers, BarChart3, Zap, Shield, Clock, FileText, Globe, Database, Settings } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="p-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/">
              <span className="text-primary">Resource</span>Hub
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                ✨ Advanced Features
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Powerful Features for Resource Management
              </h1>
              <p className="mt-6 text-xl text-gray-600 md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Discover how our platform streamlines resource requests, approvals, and management with powerful
                features designed for businesses of all sizes.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 hover:bg-blue-50">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                🚀 Core Features
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Manage Resources</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our platform offers a comprehensive set of features to manage your resource requests efficiently
                and scale with your organization's growth.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit group-hover:bg-blue-200 transition-colors">
                    <Workflow className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Custom Workflows</CardTitle>
                  <CardDescription className="text-gray-600">
                    Create and customize approval workflows to match your organization's structure and processes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Multi-step approval processes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Role-based approvers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Conditional logic and branching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-green-100 rounded-lg w-fit group-hover:bg-green-200 transition-colors">
                    <Layers className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Request Management</CardTitle>
                  <CardDescription className="text-gray-600">
                    Comprehensive tools for submitting, tracking, and managing resource requests across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Intuitive request forms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Real-time status tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Request history and audit trails</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-purple-100 rounded-lg w-fit group-hover:bg-purple-200 transition-colors">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Role-Based Access</CardTitle>
                  <CardDescription className="text-gray-600">
                    Secure, role-based permissions for different user types with granular access controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Granular permission controls</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Department-specific views</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Admin management console</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-orange-100 rounded-lg w-fit group-hover:bg-orange-200 transition-colors">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Analytics & Reporting</CardTitle>
                  <CardDescription className="text-gray-600">
                    Gain insights into resource usage patterns and generate comprehensive reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Custom dashboards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Exportable reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Resource utilization metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-yellow-100 rounded-lg w-fit group-hover:bg-yellow-200 transition-colors">
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Automation</CardTitle>
                  <CardDescription className="text-gray-600">
                    Streamline processes with powerful automation tools and intelligent workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Automated notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Scheduled resource allocation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Integration with other systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-red-100 rounded-lg w-fit group-hover:bg-red-200 transition-colors">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="mt-4 text-xl text-gray-900">Security & Compliance</CardTitle>
                  <CardDescription className="text-gray-600">
                    Enterprise-grade security for your sensitive data with compliance standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">End-to-end encryption</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Compliance reporting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Comprehensive audit logs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200">
                ⚡ Advanced Capabilities
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Beyond the Basics</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take your resource management to the next level with these powerful additional capabilities 
                designed for enterprise-scale operations.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Based Escalations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatically escalate requests that haven't been addressed within defined timeframes to ensure timely responses.
                </p>
              </Card>

              <Card className="text-center p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Form Builder</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create tailored request forms with custom fields, validation rules, and conditional logic to capture all necessary information.
                </p>
              </Card>

              <Card className="text-center p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">API Integration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect seamlessly with your existing tools and systems through our comprehensive RESTful API and webhooks.
                </p>
              </Card>

              <Card className="text-center p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                    <Database className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Resource Inventory</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track and manage your available resources with our built-in inventory system and automated stock management.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  🎯 Workflow Management
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Streamlined Approval Processes</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Design custom approval workflows that match your organization's hierarchy. Set up multi-level approvals, 
                  conditional routing, and automated escalations to ensure nothing falls through the cracks.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Visual workflow designer with drag-and-drop interface</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Parallel and sequential approval paths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Dynamic approver assignment based on request attributes</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">Workflow Designer</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Request Submitted</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Department Head Review</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Finance Approval</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-6 md:p-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Resource Management?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Join thousands of organizations that use our platform to manage their resources efficiently, 
                reduce approval times, and improve operational visibility.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <p className="text-blue-200 text-sm mt-6">
                No credit card required • 14-day free trial • Setup in under 5 minutes
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-600 md:text-left">
              © 2025 ResourceHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}