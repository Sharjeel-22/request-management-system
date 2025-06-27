import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, X, Star, Users, Zap, Shield, Crown } from "lucide-react"

export default function PricingPage() {
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
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
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
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                💰 Transparent Pricing
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 text-xl text-gray-600 md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Choose the plan that's right for your organization. All plans include a 14-day free trial with no credit card required.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  ✅ 14-day free trial
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  💳 No credit card required
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  📞 24/7 support available
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                🎯 Choose Your Plan
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans That Scale With Your Business</h2>
              <p className="text-lg text-gray-600">Start with what you need today, upgrade as you grow tomorrow.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card className="flex flex-col shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-4 right-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardHeader className="pb-4">
                  <Badge className="w-fit bg-blue-100 text-blue-800 border-blue-200 mb-2">
                    Perfect for Small Teams
                  </Badge>
                  <CardTitle className="text-2xl text-gray-900">Starter</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    For small teams getting started with resource management
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-blue-600">AED 109</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Up to 10 users</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Basic request management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">2 custom workflows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Email notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">5 GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-400">Advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-400">API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/signup?plan=starter" className="w-full">
                    <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Professional Plan */}
              <Card className="flex flex-col shadow-xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 hover:shadow-2xl transition-all duration-300 group relative scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm font-semibold">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardHeader className="pb-4 pt-8">
                  <Badge className="w-fit bg-purple-100 text-purple-800 border-purple-200 mb-2">
                    Best Value
                  </Badge>
                  <CardTitle className="text-2xl text-gray-900">Professional</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    For growing teams and organizations with advanced needs
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-purple-600">AED 299</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Up to 50 users</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Advanced request management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Unlimited custom workflows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Email and in-app notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">50 GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Full API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/signup?plan=professional" className="w-full">
                    <Button className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-col shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-4 right-4">
                  <Crown className="h-6 w-6 text-orange-600" />
                </div>
                <CardHeader className="pb-4">
                  <Badge className="w-fit bg-orange-100 text-orange-800 border-orange-200 mb-2">
                    Enterprise Grade
                  </Badge>
                  <CardTitle className="text-2xl text-gray-900">Enterprise</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    For large organizations with complex requirements
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-orange-600">AED 749</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Unlimited users</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Enterprise-grade management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Advanced workflow customization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Multi-channel notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">500 GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">24/7 priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Link href="/signup?plan=enterprise" className="w-full">
                    <Button className="w-full py-6 text-lg bg-orange-600 hover:bg-orange-700">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Need a custom solution for your organization?</p>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-blue-50">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                📊 Detailed Comparison
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare All Features</h2>
              <p className="text-xl text-gray-600">A detailed breakdown of features available in each plan to help you make the right choice.</p>
            </div>

            <Card className="shadow-xl border-0 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="py-6 px-6 text-left font-semibold text-lg">Feature</th>
                      <th className="py-6 px-6 text-center font-semibold text-lg">Starter</th>
                      <th className="py-6 px-6 text-center font-semibold text-lg">Professional</th>
                      <th className="py-6 px-6 text-center font-semibold text-lg">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Users</td>
                      <td className="py-4 px-6 text-center text-gray-700">Up to 10</td>
                      <td className="py-4 px-6 text-center text-gray-700">Up to 50</td>
                      <td className="py-4 px-6 text-center text-gray-700">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Custom Workflows</td>
                      <td className="py-4 px-6 text-center text-gray-700">2</td>
                      <td className="py-4 px-6 text-center text-gray-700">Unlimited</td>
                      <td className="py-4 px-6 text-center text-gray-700">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Request Types</td>
                      <td className="py-4 px-6 text-center text-gray-700">5</td>
                      <td className="py-4 px-6 text-center text-gray-700">Unlimited</td>
                      <td className="py-4 px-6 text-center text-gray-700">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Storage</td>
                      <td className="py-4 px-6 text-center text-gray-700">5 GB</td>
                      <td className="py-4 px-6 text-center text-gray-700">50 GB</td>
                      <td className="py-4 px-6 text-center text-gray-700">500 GB</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">API Access</td>
                      <td className="py-4 px-6 text-center">
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Analytics</td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-red-100 text-red-800 border-red-200">Basic</Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Advanced</Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-green-100 text-green-800 border-green-200">Enterprise</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Custom Branding</td>
                      <td className="py-4 px-6 text-center">
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">SSO Integration</td>
                      <td className="py-4 px-6 text-center">
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">Email</Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Email & Chat</Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-green-100 text-green-800 border-green-200">24/7 Priority</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  ❓ Got Questions?
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Everything you need to know about our pricing and plans.</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I change plans later?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated 
                    and take effect immediately. You'll only pay for what you use.
                  </p>
                </Card>

                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">How does the 14-day trial work?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can try any plan free for 14 days with full access to all features. No credit card required. 
                    At the end of your trial, choose to subscribe or your account will be paused.
                  </p>
                </Card>

                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Do you offer discounts for non-profits?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we offer special pricing for non-profit organizations and educational institutions. 
                    Contact our sales team with your non-profit documentation for custom pricing.
                  </p>
                </Card>

                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I get a custom plan?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    For organizations with specific needs not covered by our standard plans, we offer custom 
                    enterprise solutions. Contact our sales team to discuss your unique requirements.
                  </p>
                </Card>

                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-pink-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We accept all major credit cards, PayPal, and for annual enterprise plans, we can also 
                    accommodate bank transfers, ACH, or checks with NET-30 terms.
                  </p>
                </Card>

                <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Is my data secure?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, 
                    and regular security audits. Your data is always protected and backed up.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-6 md:p-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Start your 14-day free trial today. No credit card required. Setup takes less than 5 minutes.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row mb-8">
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
              <div className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>24/7 Support Available</span>
                </div>
              </div>
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