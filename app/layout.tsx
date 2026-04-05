import type { Metadata } from 'next'
import { Syne, DM_Sans, Noto_Sans_Tamil } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  weight: "700",
  variable: "--font-syne"
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans"
});

const notoTamilSans = Noto_Sans_Tamil({ 
  subsets: ["tamil"],
  weight: "400",
  variable: "--font-noto-tamil"
});

export const metadata: Metadata = {
  title: 'LyricsLens - Bilingual Song Lyrics Finder',
  description: 'Find lyrics in English and Tamil. Search any song, movie, or album and get both versions side by side.',
  generator: 'v0.app',
  openGraph: {
    title: 'LyricsLens',
    description: 'Find lyrics in English and Tamil, side by side.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${syne.variable} ${dmSans.variable} ${notoTamilSans.variable} text-slate-100 font-sans antialiased`}
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
