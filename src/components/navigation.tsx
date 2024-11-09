'use client'

import Link from 'next/link'
import Image from 'next/image'
import { InstagramLogo as Instagram } from '@phosphor-icons/react'
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Santa Phone Calls"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link 
          href="/"
          className="text-white hover:text-red-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-400 after:transition-all"
        >
          Home
        </Link>
        <Link 
          href="#how-it-works"
          className="text-white hover:text-red-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-400 after:transition-all"
        >
          How it works
        </Link>
        <Link 
          href="#pricing"
          className="text-white hover:text-red-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-400 after:transition-all"
        >
          Pricing
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="https://instagram.com/santaphonecalls" className="text-white hover:text-red-400 transition-colors">
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </Link>
        <Button 
          asChild
          className="bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <Link href="#pricing">Buy Now</Link>
        </Button>
      </div>
    </nav>
  )
} 