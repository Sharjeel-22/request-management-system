import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | ResourceHub',
    default: 'ResourceHub - Streamline Your Resource Management',
  },
  description: 'Transform your organization\'s resource management with ResourceHub. Streamline requests, approvals, and workflows across departments with our comprehensive platform designed for businesses in Dubai and globally.',
  keywords: [
    'resource management',
    'workflow automation',
    'business process management',
    'enterprise software',
    'Dubai business solutions',
    'UAE technology',
    'request management system',
    'approval workflows',
    'resource allocation',
    'business efficiency'
  ],
  authors: [{ name: 'Engr Sharjeel Rajpoot' }],
  creator: 'Sharjeel Rajpoot',
  publisher: 'ResourceHub',
  metadataBase: new URL('https://resourcehub.ae'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resourcehub.ae',
    title: 'ResourceHub - Streamline Your Resource Management',
    description: 'Transform your organization\'s resource management with comprehensive workflow automation and approval systems.',
    siteName: 'ResourceHub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResourceHub - Resource Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResourceHub - Streamline Your Resource Management',
    description: 'Transform your organization\'s resource management with comprehensive workflow automation.',
    images: ['/twitter-image.png'],
    creator: '@resourcehub_ae',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'Business Software',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://resourcehub.ae" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* UAE/Dubai specific meta tags */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        
        {/* Business verification */}
        <meta name="business:contact_data:locality" content="Dubai" />
        <meta name="business:contact_data:region" content="Dubai" />
        <meta name="business:contact_data:country_name" content="United Arab Emirates" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ResourceHub",
              "description": "Comprehensive resource management platform for businesses",
              "url": "https://resourcehub.ae",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "109",
                "priceCurrency": "AED",
                "priceValidUntil": "2025-12-31"
              },
              "provider": {
                "@type": "Organization",
                "name": "ResourceHub",
                "url": "https://resourcehub.ae",
                "logo": "https://resourcehub.ae/logo.png",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Dubai Internet City, Building 17, Office 142",
                  "addressLocality": "Dubai",
                  "addressCountry": "AE",
                  "postalCode": "500826"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+971-4-123-4567",
                  "contactType": "Customer Service",
                  "availableLanguage": ["English", "Arabic"]
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "250"
              }
            })
          }}
        />
      </body>
    </html>
  )
}