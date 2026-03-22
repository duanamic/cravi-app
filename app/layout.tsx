import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cravi',
  description: 'Your AI cooking companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#f4fbfd]">
        {children}
      </body>
    </html>
  )
}
