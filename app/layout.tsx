import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cravi',
  description: 'Save and discover Instagram recipes with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b6370" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cravi" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-sans bg-[#f4fbfd]">
        {children}
      </body>
    </html>
  )
}
