'use client'
import { useState, useEffect, useRef } from 'react'
import { useIsPreview } from '@/context/WeddingDataContext'

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const isPreview = useIsPreview()

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    if (isPreview) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        setShowHint(true)
        setTimeout(() => setShowHint(false), 4000)
      })
    }
    return () => { audio.pause(); audio.src = '' }
  }, [src, isPreview])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    setShowHint(false)
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return { isPlaying, toggle, showHint }
}
