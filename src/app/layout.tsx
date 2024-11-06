// app/layout.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
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
        <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md">
          <NavBar />
        </header>
        <main id="main-content">
          {children}
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50 text-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 AI Vision App. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#" aria-label="Read Terms of Service">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#" aria-label="Read Privacy Policy">
              Privacy
            </Link>
          </nav>
        </footer>
        <LoginModal />
        <MessageModal />
      </body>
    </html>
  )
}
