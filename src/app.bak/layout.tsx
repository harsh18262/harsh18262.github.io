import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Harshwardhan Mehrotra - DevOps Portfolio',
  description: 'Senior DevOps Engineer specializing in Kubernetes, cloud infrastructure, and automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-mono bg-dark-bg text-terminal-green overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
