import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Users, Target, Lightbulb, Shield, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
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
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
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
                🌟 About Us
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About ResourceHub
              </h1>
              <p className="mt-6 text-xl text-gray-600 md:text-2xl max-w-3xl mx-auto leading-relaxed">
                We're on a mission to simplify resource management for organizations across the Middle East and beyond, 
                helping businesses thrive in the digital age.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  🚀 Founded in Dubai
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  🌍 Serving 50+ Countries
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  👥 10,000+ Happy Customers
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  📖 Our Journey
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    ResourceHub was founded in 2022 in the heart of Dubai's thriving tech ecosystem by a team of 
                    experienced professionals who recognized a critical challenge across organizations in the Middle East 
                    and beyond: the inefficient management of resource requests and approvals.
                  </p>
                  <p>
                    After experiencing firsthand the frustrations of managing resources through spreadsheets, emails, 
                    and disconnected systems across various industries in the UAE, our founders set out to create a 
                    solution that would streamline the entire process while respecting local business practices.
                  </p>
                  <p>
                    Today, ResourceHub serves thousands of organizations worldwide, from innovative startups in Dubai 
                    Internet City to large enterprises across the GCC, helping them manage their resources more 
                    efficiently and effectively in an increasingly digital world.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">2022</div>
                      <div className="text-sm text-gray-600">Founded in Dubai</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">50+</div>
                      <div className="text-sm text-gray-600">Countries Served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">10K+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime SLA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                🎯 Our Purpose
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To empower organizations across the Middle East and globally with cutting-edge tools to manage resources 
                efficiently, reduce administrative overhead, and make data-driven decisions that drive business growth.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center p-8 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Simplify</h3>
                <p className="text-gray-600 leading-relaxed">
                  Make resource management simple and accessible for everyone in the organization, regardless of 
                  technical expertise or departmental role.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <Lightbulb className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Optimize</h3>
                <p className="text-gray-600 leading-relaxed">
                  Help organizations optimize their resource allocation and utilization through intelligent automation 
                  and advanced analytics capabilities.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Empower</h3>
                <p className="text-gray-600 leading-relaxed">
                  Provide insights and analytics to drive better decision-making and empower teams to achieve 
                  their goals more effectively.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                👥 Leadership
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-xl text-gray-600">
                Meet the experienced professionals leading ResourceHub's mission to transform resource management globally.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team Member 1 */}
              <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300">
                  <div className="h-full w-full flex items-center justify-center">
                    <Users className="h-24 w-24 text-blue-600" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Amira Al-Rashid</h3>
                  <p className="text-blue-600 font-medium mb-2">CEO & Co-Founder</p>
                  <p className="text-sm text-gray-600">
                    Former McKinsey consultant with 15+ years in digital transformation across the Middle East.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 2 */}
              <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-200 to-purple-300">
                  <div className="h-full w-full flex items-center justify-center">
                    <Users className="h-24 w-24 text-purple-600" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Omar Hassan</h3>
                  <p className="text-purple-600 font-medium mb-2">CTO & Co-Founder</p>
                  <p className="text-sm text-gray-600">
                    Former lead architect at Careem, specialized in building scalable enterprise solutions.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 3 */}
              <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-200 to-green-300">
                  <div className="h-full w-full flex items-center justify-center">
                    <Users className="h-24 w-24 text-green-600" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">Fatima Al-Zahra</h3>
                  <p className="text-green-600 font-medium mb-2">COO</p>
                  <p className="text-sm text-gray-600">
                    Operations expert with extensive experience in scaling tech companies across the GCC region.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                💎 Core Values
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do and shape our company culture.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-8 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We prioritize our customers' needs and continuously seek feedback to improve our platform. 
                      Every decision is made with our customers' success in mind.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We're committed to pushing the boundaries of what's possible in resource management, 
                      constantly exploring new technologies and methodologies.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We believe in open communication with our customers, partners, and team members. 
                      Honesty and transparency build trust and lasting relationships.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We strive for excellence in everything we do, from product development to customer support. 
                      Quality is never compromised in our pursuit of innovation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="p-6 md:p-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                📞 Get In Touch
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600">
                Have questions or want to learn more? We'd love to hear from you and discuss how we can help your organization.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Visit Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dubai Internet City<br />
                    Building 17, Office 142<br />
                    Dubai, UAE<br />
                    P.O. Box 500826
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="p-4 bg-green-100 rounded-full mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    info@resourcehub.ae<br />
                    support@resourcehub.ae<br />
                    sales@resourcehub.ae
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-xl transition-all duration-300">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="p-4 bg-purple-100 rounded-full mb-4">
                    <Phone className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    +971 4 123 4567<br />
                    +971 50 123 4567<br />
                    Sun-Thu, 9am-6pm GST
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Our Team
                </Button>
              </Link>
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