import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ariana Global Trade | Premium Iranian Agricultural Exports',
  description:
    'ISO 22000-certified Iranian import and export company supplying premium saffron, dates, spices, herbal drinks, and dried fruits to international wholesale markets. Established 1998.',
  keywords: [
    'Iranian agricultural exports',
    'Iran saffron wholesale',
    'premium Iranian dates',
    'Iranian spices supplier',
    'wholesale dried fruits Iran',
    'Ariana Global Trade',
    'import from Iran',
    'Iranian export company',
    'bulk Iranian tea',
    'global trade Iran'
  ],
  authors: [{ name: 'Ariana Global Trade' }],
  creator: 'Ariana Global Trade',
  publisher: 'Ariana Global Trade',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arianaglobaltrade.com',
    title: 'Ariana Global Trade | Premium Iranian Exports',
    description: 'Direct-from-source Iranian agricultural commodities. Certified, tested, and exported worldwide.',
    siteName: 'Ariana Global Trade',
    images: [
      {
        url: '/images/saffron.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Iranian Saffron - Ariana Global Trade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ariana Global Trade | Premium Iranian Exports',
    description: 'Direct-from-source Iranian agricultural commodities. Certified, tested, and exported worldwide.',
    images: ['/images/saffron.jpg'],
  },
  alternates: {
    canonical: 'https://arianaglobaltrade.com',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#1C2B2B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${instrument.variable} ${vazirmatn.variable} bg-background`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
