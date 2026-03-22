import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'VibeMax — AI Agent Platform for Solopreneurs',
  description:
    'Deploy powerful AI agents that research, qualify, write, and schedule — so you can focus on closing deals.',
  keywords: ['AI agents', 'solopreneur', 'automation', 'sales', 'outreach', 'VibeMax'],
  openGraph: {
    title: 'VibeMax — AI Agent Platform for Solopreneurs',
    description: 'Deploy powerful AI agents that research, qualify, write, and schedule.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
