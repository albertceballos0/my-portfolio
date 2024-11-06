'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Loader2, Menu, LogIn, LogOut } from 'lucide-react'

export default function NavBar() {
  const pathname = usePathname()
  const { isLoggedIn, logout, isInitialized, user } = useAuthStore()
  const { openModal } = useModalStore()
  const { setMessage } = useMessageStore()



  const handleClickLogout = async () => {
    try {
      await logout()
      setMessage('Logged out successfully', 'success')
    } catch (error) {
      console.error("Logout failed:", error)
      setMessage('Failed to log out', 'error')
    }
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/object-detection', label: 'Detect Objects' },
    { href: '/avatar-generation', label: 'Create Avatar' },
    { href: '/object-removal', label: 'Remove Objects' },
    { href: '/image-generation', label: 'Generate Images' },
    { href: '/style-transfer', label: 'Transfer Style' },
    { href: '/branch-and-bound', label: 'Optimize' },
    { href: '/hist', label: 'View History' },
  ]

  const NavLinks = ({ isMobile = false }) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-1'}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
            ${pathname === item.href 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:bg-muted hover:text-primary'
            } ${isMobile ? 'w-full' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )

  return (
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            ImageAI
          </Link>
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <div className="flex items-center space-x-4">
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
                    <DropdownMenuItem onClick={handleClickLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => openModal()}>
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              )
            ) : (
              <Button variant="ghost" size="icon" disabled>
                <Loader2 className="animate-spin h-5 w-5" />
                <span className="sr-only">Loading</span>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="mt-6 flex flex-col space-y-6">
                  <NavLinks isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
  )
}