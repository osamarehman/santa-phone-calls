'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

export default function HeroContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [progress, setProgress] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    
    if (currentAudioRef) {
      currentAudioRef.addEventListener('ended', handleEnded)
      return () => {
        currentAudioRef.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  const togglePlayback = () => {
    if (!audioRef.current) return
    
    if (!isPlaying) {
      audioRef.current.play()
      setIsPlaying(true)
      setIsExpanded(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
      setIsExpanded(false)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setIsExpanded(false)
    setProgress(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const onTimeUpdate = () => {
    if (!audioRef.current) return
    const { currentTime, duration } = audioRef.current
    setProgress((currentTime / duration) * 100)
  }



  useEffect(() => {
    // Create twinkling stars effect
    const createStar = () => {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`
      sectionRef.current?.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, 3000)
    }

    // Create initial stars
    for (let i = 0; i < 20; i++) {
      createStar()
    }

    const intervalId = setInterval(createStar, 300)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <main 
      ref={sectionRef}
      className="relative min-h-[calc(100vh-20rem)] flex items-center justify-center md:justify-start overflow-hidden"
    >
    

      {/* Removed Gradient overlay */}

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-12 md:py-0">
        <div className="max-w-3xl mx-auto md:mx-0 space-y-8 md:space-y-12">
          <div className="text-center md:text-left space-y-6">
            <h1 className="space-y-2">
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-300 via-red-200 to-pink-300 bg-clip-text text-transparent animate-gradient">
                Get A Live Call
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent animate-gradient-slow">
                From Santa
              </span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-blue-200 to-purple-300 bg-clip-text text-transparent animate-gradient">
                Create A Memory
              </p>
              <p className="text-2xl md:text-4xl font-bold text-white">
                That Lasts Forever.
              </p>
            </div>
          </div>
          
          <div className="space-y-8 md:space-y-12">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-md">
                <button
                  onClick={togglePlayback}
                  className="group flex items-center gap-3 text-white text-2xl font-medium transition-colors hover:text-white/90"
                >
                  <span className="drop-shadow-lg">Listen to a Call</span>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 text-white shadow-lg">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
                        onClick={togglePlayback}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                      </Button>

                      <div className="flex-1 flex items-center gap-3">
                        <span className="min-w-[3ch] text-sm">
                          {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
                        </span>
                        <Slider
                          value={[progress]}
                          max={100}
                          step={1}
                          className="w-full"
                          onValueChange={(value) => {
                            if (!audioRef.current) return
                            const newTime = (value[0] / 100) * audioRef.current.duration
                            audioRef.current.currentTime = newTime
                            setProgress(value[0])
                          }}
                        />
                        <span className="min-w-[3ch] text-sm">
                          {audioRef.current ? formatTime(audioRef.current.duration) : '2:54'}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-white/20"
                      >
                        <Volume2 className="h-4 w-4" />
                        <span className="sr-only">Adjust volume</span>
                      </Button>
                    </div>
                  </div>
                )}

                <audio
                  ref={audioRef}
                  src="https://santaphonecalls.com/wp-content/uploads/2024/11/AUDIO_6509.m4a"
                  onTimeUpdate={onTimeUpdate}
                  onEnded={handleEnded}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-md mx-auto md:mx-0">
              <Button
                asChild
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20 h-auto"
              >
                <Link href="#pricing">
                  Talk Now
                </Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-red-600/90 to-red-500/90 hover:from-red-500/90 hover:to-red-600/90 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20 backdrop-blur-sm h-auto"
              >
                <Link href="#pricing">
                  Includes Recording
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

     
    </main>
  )
}