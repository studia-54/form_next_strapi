import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'
import { Metrika } from '@/components/Metrika/Metrika'

export const metadata: Metadata = {
  title: 'Form for Studia 54',
  description: 'Form for Studia 54',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Metrika />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
