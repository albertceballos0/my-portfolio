'use client'

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
import { useHistStore } from '@/store/useHist'
import { navItems } from '@/types'

function NavLinks({ isMobile = false }) {
  const pathname = usePathname()

  return (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
            ${pathname === item.href 
              ? 'text-gray-800'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            } ${isMobile ? 'w-full' : ''}`}
        >
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-gray-800 transition-all duration-200 transform ${pathname === item.href ? 'scale-x-100' : 'scale-x-0'} origin-left`}
          />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

interface UserMenuProps {
  isLoggedIn: boolean;
  user: { avatarUrl?: string; name?: string; email?: string } | null;
  handleClickLogout: () => void;
}

function UserMenu({ isLoggedIn, user, handleClickLogout }: UserMenuProps) {
  const { openModal } = useModalStore()

  return (
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
  )
}

export default function NavBar() {
  const { isLoggedIn, logout, isInitialized, user } = useAuthStore()
  const { removeHist } = useHistStore()
  const { setMessage } = useMessageStore()

  const handleClickLogout = async () => {
    try {
      logout()
      removeHist()
      setMessage('Logged out successfully', 'success')
    } catch (error) {
      console.error("Logout failed:", error)
      setMessage('Failed to log out', 'error')
    }
  }

  return (
    <div className="sticky px-8 bg-white/80 shadow-md">
      <div className="flex h-16 items-center justify-between">
      <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-800">
        ImageAI
      </Link>
      <div className="hidden md:block">
        <NavLinks />
      </div>
      <div className="flex items-center space-x-4">
        {isInitialized ? (
        <UserMenu isLoggedIn={isLoggedIn} user={user} handleClickLogout={handleClickLogout} />
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
