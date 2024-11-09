'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Step {
  number: number
  title: string
  description: string
  color: 'red' | 'green'
}

const steps: Step[] = [
  {
    number: 1,
    title: "Enter Child's Details",
    description: "Sign up to get started! Enter your child's name, age, and favorite things, the more details you share, the more magical and personal Santa's call will be!",
    color: 'red',
  },
  {
    number: 2,
    title: "Santa Will Call You",
    description: "Sign up to get started! Enter your child's details, and Santa will use them to call and have a magical, personalized conversation with your little one.",
    color: 'green',
  },
  {
    number: 3,
    title: "Kids Talk to Santa (and it's Recorded)",
    description: "Santa gives your child an unforgettable phone call, packed with holiday magic, laughter, and heartfelt moments, creating a joyful experience that only Santa can bring to life.",
    color: 'red',
  }
]

export default function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.classList.add('snowflake')
      snowflake.style.left = `${Math.random() * 100}%`
      snowflake.style.animationDuration = `${Math.random() * 5 + 7}s`
      snowflake.style.opacity = `${Math.random() * 0.5 + 0.5}`
      snowflake.style.width = snowflake.style.height = `${Math.random() * 6 + 2}px`
      
      sectionRef.current?.appendChild(snowflake)

      snowflake.addEventListener('animationend', () => snowflake.remove())
    }

    const intervalId = setInterval(createSnowflake, 100)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section id="how-it-works"
      ref={sectionRef} 
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900"
      aria-label="How it works"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-blue-900/20 to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
            Create Magical Moments In 3 Simple Steps
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group h-full">
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 z-20"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-white rounded-full transform -rotate-45"></div>
                <div className="absolute inset-0 bg-white rounded-full transform rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-100 rounded-full"></div>
              </div>

              <Card className={cn(
                "relative overflow-hidden transition-all duration-500 hover:scale-105 h-full",
                "before:absolute before:inset-0 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500",
                "before:bg-gradient-to-b before:from-white/20 before:to-transparent",
                step.color === 'red' 
                  ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-500/20' 
                  : 'bg-gradient-to-br from-green-600 to-green-700 border-green-500/20'
              )}>
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-10 bg-repeat"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.8' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    filter: "blur(10px)",
                  }}
                ></div>
                
                <CardHeader className="pb-2 sm:pb-4">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
                    aria-hidden="true"
                  >
                    <span className={cn(
                      "text-2xl sm:text-3xl font-bold",
                      step.color === 'red' ? 'text-red-600' : 'text-green-600'
                    )}>
                      {step.number}
                    </span>
                  </div>
                  <CardTitle className="text-center text-white text-lg sm:text-xl md:text-2xl">
                    <span className="sr-only">Step {step.number}:</span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-center leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

     
    </section>
  )
}