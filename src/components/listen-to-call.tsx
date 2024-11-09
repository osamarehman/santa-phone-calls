'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function ListenToCall({ playButtonClass = "bg-white/20 hover:bg-white/30" }: { playButtonClass?: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded)
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded)
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
    <div className="relative w-full max-w-md">
      {!isExpanded ? (
        <button
          onClick={togglePlayback}
          className="group flex items-center gap-3 text-white text-2xl font-medium transition-colors hover:text-white/90"
        >
          <span className="drop-shadow-lg">Listen to a Call</span>
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${playButtonClass} transition-colors backdrop-blur-sm`}>
            <Play className="w-6 h-6 text-white" />
          </div>
        </button>
      ) : (
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
  )
}