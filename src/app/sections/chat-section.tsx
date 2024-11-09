'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function ChatSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div')
      star.classList.add('floating-star')
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDuration = `${Math.random() * 2 + 2}s`
      sectionRef.current?.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, 4000)
    }

    const intervalId = setInterval(createStar, 500)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/chat-background.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center pt-16 md:pt-24 lg:pt-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white animate-gradient">
              A Chat With Santa Is Just A Click Away
            </span>
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto drop-shadow-md">
            With each call, Santa can ask about their wishes, remind them to be good, 
            and even share a special message just for them.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="bg-black hover:bg-black/80 text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Chat Now
          </Button>
        </div>
      </div>

      {/* Decorative stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="absolute text-yellow-300/30 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
          }}
        />
      ))}

      <style jsx global>{`
        .floating-star {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 30% 30%, #fde047, #fcd34d);
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          opacity: 0;
          animation: float-and-fade linear forwards;
        }

        @keyframes float-and-fade {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}