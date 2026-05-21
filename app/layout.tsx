import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { ChatWidget } from '@/components/ChatWidget'
import { stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BuffettKnowledge",
  url: "https://buffettknowledge.com",
  description: `The most comprehensive English archive of Warren Buffett's shareholder letters (1956–2025). Explore ${stats.totalLetters} letters, ${concepts.length} investment concepts, ${companies.length} companies, and cross-references across ${stats.yearsCovered} years.`,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "BuffettKnowledge",
    url: "https://buffettknowledge.com",
  },
}

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BuffettKnowledge",
  url: "https://buffettknowledge.com",
  description: "A comprehensive educational archive of Warren Buffett's shareholder letters and investment wisdom.",
  logo: "https://buffettknowledge.com/og-image.png",
}

export const metadata: Metadata = {
  metadataBase: new URL('https://buffettknowledge.com'),
  title: {
    default: 'BuffettKnowledge — Warren Buffett Shareholder Letters Archive',
    template: '%s | BuffettKnowledge',
  },
  description:
    `The most comprehensive English archive of Warren Buffett's shareholder letters (1956–2025). Explore ${stats.totalLetters} letters, ${concepts.length} investment concepts, ${companies.length} companies, and cross-references across ${stats.yearsCovered} years.`,
  keywords: [
    'Warren Buffett shareholder letters',
    'Berkshire Hathaway letters',
    'Buffett partnership letters',
    'value investing',
    'Buffett letters archive',
    'Buffett concepts',
    'Warren Buffett wisdom',
  ],
  authors: [{ name: 'BuffettKnowledge' }],
  creator: 'BuffettKnowledge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buffettknowledge.com',
    siteName: 'BuffettKnowledge',
    title: 'BuffettKnowledge — Warren Buffett Shareholder Letters Archive',
    description:
      "70 years of investment wisdom. 90+ letters. 3,939+ cross-references. The definitive English archive of Buffett's shareholder letters.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BuffettKnowledge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuffettKnowledge — Warren Buffett Shareholder Letters Archive',
    description: "The most comprehensive English archive of Warren Buffett's shareholder letters (1956–2025).",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://buffettknowledge.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <JsonLd value={jsonLdWebSite} />
        <JsonLd value={jsonLdOrganization} />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J5WZDWK17M"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J5WZDWK17M');
          `}
        </Script>
        {/* AdSense global script — replace ca-pub-XXXXXXXX with your actual publisher ID */}
        <Script
          id="adsbygoogle-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: '#F9F7F3' }}>
        {/* Fixed left sidebar */}
        <Sidebar />
        {/* Main content — offset by sidebar width on desktop */}
        <div className="md:ml-64 min-h-screen flex flex-col">
          <TopBar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        {/* AI Chat Widget */}
        <ChatWidget />
      </body>
    </html>
  )
}
