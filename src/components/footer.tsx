'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { InstagramLogo } from '@phosphor-icons/react'
import { cn } from "@/lib/utils"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.classList.add('footer-sparkle')
      sparkle.style.left = `${Math.random() * 100}%`
      sparkle.style.top = `${Math.random() * 100}%`
      sparkle.style.animationDuration = `${Math.random() * 1 + 1}s`
      footerRef.current?.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 2000)
    }

    const intervalId = setInterval(createSparkle, 300)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-white py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Santa Phone Calls"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {[
              { href: '#home', label: 'Home' },
              { href: '#how-it-works', label: 'How it works' },
              { href: '#pricing', label: 'Pricing' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-gray-600 hover:text-red-500 transition-colors duration-200",
                  "relative group text-sm font-medium"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Social */}
          <a
            href="http://instagram.com/santaphonecalls"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 hover:text-red-500 transition-colors duration-200"
            aria-label="Follow us on Instagram"
          >
            <InstagramLogo 
              className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-200" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          ©{new Date().getFullYear()} Santaphonecalls.com All rights reserved.
        </div>
      </div>

    </footer>
  )
}