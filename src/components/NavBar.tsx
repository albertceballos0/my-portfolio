'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'
import { useMessageStore } from '@/store/useMessageStore'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaHome, FaCamera, FaUserCircle, FaEraser, FaImage, FaPaintBrush, FaTree, FaHistory } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

export default function NavBar() {
  const [loading, setLoading] = useState(false)
  const { isLoggedIn, logout, isInitialized, user } = useAuthStore()
  const { openModal } = useModalStore()
  const { setMessage } = useMessageStore()

  const handleClickLogout = async () => { 
    setLoading(true);
    try {

        logout(); // Espera a que el logout se complete
        setMessage('Logged out successfully', 'success');
    } catch (error) {
        console.error("Logout failed:", error);
        setMessage('Failed to log out', 'error');
    } finally {
        setLoading(false); // Quita la carga después del logout
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/object-detection', label: 'Object Detection', icon: FaCamera },
    { href: '/avatar-generation', label: 'Avatar Generation', icon: FaUserCircle },
    { href: '/object-removal', label: 'Object Removal', icon: FaEraser },
    { href: '/image-generation', label: 'Image Generation', icon: FaImage },
    { href: '/style-transfer', label: 'Style Transfer', icon: FaPaintBrush },
    { href: '/branch-and-bound', label: 'B & B', icon: FaTree },
    { href: '/hist', label: 'History', icon: FaHistory },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-gray-400 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              <span className="hidden sm:inline">{item.label}</span>
              <item.icon className="inline sm:hidden" aria-label={item.label} />
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {isInitialized ? (
            isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem  onClick={handleClickLogout}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Log out"
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" onClick={() => openModal()} className="text-sm">
                Sign In
              </Button>
            )
          ) : (
            <Button variant="ghost" className="w-8 h-8 p-0">
              <Loader2 className="animate-spin h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}