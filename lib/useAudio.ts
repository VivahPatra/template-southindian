'use client'
import { useState, useEffect, useRef } from 'react'

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return { isPlaying, toggle }
}
