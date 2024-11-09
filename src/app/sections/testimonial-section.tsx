'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
}

const testimonials: Testimonial[] = [
  {
    quote: "SantaPhoneCalls.com brought so much joy to our family! Our twins were thrilled when Santa mentioned their favorite toys and how they've been helping around the house. The attention to detail made it feel so real, and the recording lets us hold on to that memory forever. This is a holiday experience we'll be doing every year!",
    author: "Jason R."
  },
  {
    quote: "The look on my daughter's face when Santa knew about her dance recital was priceless! This was such a magical experience that made our Christmas extra special.",
    author: "Sarah M."
  },
  {
    quote: "We couldn't believe how personalized the call was! Santa even knew about our family's holiday traditions. This is truly a remarkable service that creates unforgettable memories.",
    author: "Michael P."
  }
]

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [randomIndex, setRandomIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * testimonials.length))
  }, [])

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.classList.add('sparkle')
      sparkle.style.left = `${Math.random() * 100}%`
      sparkle.style.top = `${Math.random() * 100}%`
      sparkle.style.animationDuration = `${Math.random() * 1 + 1}s`
      sectionRef.current?.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 2000)
    }

    const intervalId = setInterval(createSparkle, 200)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Decorative Trees */}
      <div className="absolute left-0 bottom-0 w-[300px] md:w-[500px] pointer-events-none">
        <Image
          src="/tree-left.png"
          alt="Decorative Christmas Tree"
          width={500}
          height={800}
          className="object-contain animate-sway"
          priority
        />
      </div>
      <div className="absolute right-0 bottom-0 w-[300px] md:w-[500px] pointer-events-none">
        <Image
          src="/tree-right.png"
          alt="Decorative Christmas Tree"
          width={500}
          height={800}
          className="object-contain animate-sway-reverse"
          priority
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm">
          <div className="relative pb-[56.25%]">
            <iframe
              src="https://player.vimeo.com/video/1026689821?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1&h=5a5d6352e4#t="
              title="Santa Phone Call Experience"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 animate-gradient">
            Such An Enchanting Experience!
          </span>
        </h2>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto px-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
                  <Card className="border-none bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center p-8 md:p-10">
                      <Quote className="w-10 h-10 mb-6 text-blue-500 rotate-180" />
                      <p className="text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed">
                        {testimonial.quote}
                      </p>
                      <footer className="text-sm font-semibold text-gray-900">
                        - {testimonial.author}
                      </footer>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-blue-300 hover:bg-blue-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    
    </section>
  )
}