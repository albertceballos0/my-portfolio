// app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import LoginModal from '@/hooks/LoginModal'
import MessageModal from '@/hooks/MessageModal'

export const metadata: Metadata = {
  title: 'AI Vision App | Explore AI Vision Technologies',
  description: 'Discover the latest in AI-driven image processing, object detection, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="AI Vision App" />
        <meta property="og:description" content="Discover AI-powered tools for computer vision." />
        <meta property="og:image" content="/public/ai-vision-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Vision App" />
      </head>
      <body>
        <div className="relative flex flex-col min-h-screen">
          <header>
            <NavBar />
          </header>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="py-6 border-t bg-gray-50 text-gray-600">
            <p className="text-xs text-center">
              © 2024 AI Vision App. All rights reserved.
            </p>
          </footer>
          <LoginModal />
          <MessageModal />
        </div>
      </body>
    </html>
  )
}
