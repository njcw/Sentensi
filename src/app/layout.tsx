import type { Metadata } from 'next'
import '../ui/globals.scss'
import { ReactNode } from 'react'
import { DM_Sans, Lora, IBM_Plex_Mono } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Sentensi',
  description: 'Sentensi',
}

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const serif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        {children}
      </body>
    </html>
  )
}
