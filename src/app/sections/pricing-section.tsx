'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

interface Package {
  id: string
  title: string
  price: number
  unit: string
  description: string
  headerColor: string
}

interface PricingSectionProps {
  packages?: Package[]
}

const defaultPackages: Package[] = [
  {
    id: 'talk-to-santa',
    title: 'Talk to Santa',
    price: 9.95,
    unit: 'Call',
    description: 'A one-time, personalized call from Santa, perfect for creating a magical moment that will surprise your child or loved one with joyful holiday cheer they\'ll remember forever.',
    headerColor: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  {
    id: 'includes-recording',
    title: 'Includes Recording',
    price: 14.95,
    unit: 'Recording',
    description: 'A five-minute personalized call from Santa, including a special recording so you can relive the magic and cherished memories of this moment for years to come.',
    headerColor: 'bg-gradient-to-br from-red-400 to-red-600',
  },
]

export default function PricingSection({ packages = defaultPackages }: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.classList.add('snowflake')
      snowflake.innerHTML = Math.random() > 0.5 ? '❄' : '❅'
      snowflake.style.left = `${Math.random() * 100}%`
      snowflake.style.top = `${Math.random() * 100}%`
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`
      snowflake.style.opacity = `${Math.random() * 0.5 + 0.5}`
      snowflake.style.fontSize = `${Math.random() * 15 + 10}px`
      sectionRef.current?.appendChild(snowflake)

      setTimeout(() => {
        snowflake.remove()
      }, 10000)
    }

    const intervalId = setInterval(createSnowflake, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-900">
              Bring the <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500 animate-gradient">magic of Christmas</span> to life with a real-time, personalized <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-red-500 animate-gradient">phone call</span> from <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500 animate-gradient">Santa</span> himself!
            </h2>
            <p className="text-lg text-blue-800">
              Watch children&apos;s faces light up as Santa knows their name, wishes, and favorite things in a one-on-one conversation they&apos;ll never forget.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className="relative overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm z-0" />
                <CardHeader className={`${pkg.headerColor} p-4 relative z-10`}>
                  <h3 className="text-lg font-bold text-white text-center">
                    {pkg.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-4 space-y-3 relative z-10 flex-grow">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-bold text-blue-900">$</span>
                      <span className="text-4xl font-bold text-blue-900">{pkg.price.toFixed(2)}</span>
                      <span className="text-blue-700">/ {pkg.unit}</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-800 text-center">
                    {pkg.description}
                  </p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button
                    asChild
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    <Link href={`/?${pkg.id}`}>
                      Buy Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .snowflake {
          position: absolute;
          color: #fff;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
          pointer-events: none;
          z-index: 1;
          animation: fall linear forwards;
          background: transparent;
          -webkit-text-fill-color: white;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }

        @keyframes fall {
          0% {
            transform: translateY(-10%) rotate(0deg);
          }
          100% {
            transform: translateY(110%) rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .snowflake {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}