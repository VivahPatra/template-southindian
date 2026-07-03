import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Playfair_Display,
  Inter,
} from 'next/font/google'
import './globals.css'
import { weddingData } from '@/data/wedding-data'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: weddingData.seo.title,
  description: weddingData.seo.description,
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  metadataBase: new URL(weddingData.seo.url),
  openGraph: {
    title: weddingData.seo.title,
    description: weddingData.seo.description,
    images: [{ url: weddingData.seo.ogImage }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="bg-theme-bg text-theme-text font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
