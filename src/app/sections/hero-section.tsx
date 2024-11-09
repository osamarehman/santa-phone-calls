'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2 } from 'lucide-react'

export default function HeroContent() {
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

  return (
    <>
      
      <main className="relative pt-16 min-h-[calc(100vh-20rem)] flex items-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-20">
          <div className="max-w-3xl space-y-8 sm:space-y-12">
            <h1 className="space-y-2">
              <span className="block text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Get A <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600 drop-shadow-[0_0_8px_rgba(255,105,180,0.3)]">Live Call</span>
              </span>
              <span className="block text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                From <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_8px_rgba(64,224,255,0.3)]">Santa</span>
              </span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Create A <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 drop-shadow-[0_0_8px_rgba(177,156,217,0.3)]">Memory</span>
              </p>
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                That Lasts <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600 drop-shadow-[0_0_8px_rgba(255,191,0,0.3)]">Forever</span>.
              </p>
            </div>
          
            <div className="space-y-8">
              <div className="relative w-full max-w-md">
                <button
                  onClick={togglePlayback}
                  className="group flex items-center gap-3 text-white text-2xl sm:text-3xl font-medium transition-colors hover:text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  <span className="drop-shadow-lg">Listen to a Call</span>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all active:scale-95 active:bg-white/40">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white shadow-lg">
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
              
              <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-md">
                <Button
                  asChild
                  className="h-12 sm:h-14 px-6 text-lg sm:text-xl bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full transition-all shadow-lg active:scale-95 active:shadow-inner"
                >
                  <Link href="#pricing">
                    Talk Now
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-12 sm:h-14 px-6 text-lg sm:text-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full transition-all shadow-lg active:scale-95 active:shadow-inner"
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
    </>
  )
}