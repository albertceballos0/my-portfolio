// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import LoginModal from '@/hooks/LoginModal'
import MessageModal from '@/hooks/MessageModal'

export const metadata: Metadata = {
  title: 'AI Vision App',
  description: 'Explore AI Vision Technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <div className='relative flex flex-col min-h-screen'>
          <NavBar />
  
          <main className="flex-1">
            {children}
          </main>
          {/* Modal de login */}
          <LoginModal />
          {/* Modal de mensajes */}
          <MessageModal />

        </div>
      </body>
    </html>
  );
}
