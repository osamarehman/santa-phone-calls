'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/navigation'
import HeroContent from '@/app/sections/hero-section'
import PricingSection from '@/app/sections/pricing-section'
import TestimonialSection from '@/app/sections/testimonial-section'
import StepsSection from '@/app/sections/steps-section'
import ChatSection from '@/app/sections/chat-section'
import Footer from '@/components/footer'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading skeleton
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative h-screen">
        {/* Full-screen background image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/christmas-background.png"
            alt="Christmas decorated Victorian building in snow"
            fill
            className="object-cover object-center brightness-[0.7]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        </div>
        
        {/* Navigation and Hero Content */}
        <div className="relative h-full">
          <Navigation />
          <HeroContent />
        </div>
      </section>

      <PricingSection />
      <TestimonialSection />
      <StepsSection />
      <ChatSection />
      <Footer />
    </div>
  )
}