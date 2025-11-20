import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google' // Fuente monoespaciada moderna
import './globals.css'
import NavBar from '@/components/NavBar'
import LoginModal from '@/components/modals/LoginModal'
import MessageModal from '@/components/modals/MessageModal'
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from 'next/link'; 
// Configuración de la fuente
const fontMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'AI Vision App | Retro Tech',
  description: 'Discover the latest in AI-driven image processing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontMono.className} flex flex-col min-h-screen bg-gray-50 selection:bg-black selection:text-white`}>
        <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white">
          <NavBar />
        </header>
        <main id="main-content" className="flex-grow">
          {children}
          <SpeedInsights />
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t-2 border-black bg-white text-black">
          <p className="text-xs font-bold">© 2024 AI Vision App. SYSTEM ONLINE.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 font-bold uppercase" href="#">
              Terms
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 font-bold uppercase" href="#">
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