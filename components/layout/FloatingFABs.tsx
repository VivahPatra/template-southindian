'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { useWeddingData, useIsPreview } from '@/context/WeddingDataContext'

export default function FloatingFABs() {
  const { invitationMusic } = useWeddingData()
  const isPreview = useIsPreview()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const src = invitationMusic || ''
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    setIsPlaying(false)
    if (isPreview) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        setShowHint(true)
        setTimeout(() => setShowHint(false), 4000)
      })
    }
    return () => { audio.pause(); audio.src = '' }
  }, [invitationMusic, isPreview])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    setShowHint(false)
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  const btnStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  }

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-[9990] flex flex-col items-end gap-2">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}
          >
            ♪ Tap to play music
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
        style={{ ...btnStyle, color: isPlaying ? 'var(--color-accent)' : 'var(--color-muted)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        initial={{ opacity: 0, y: 20 }}
        animate={showHint ? { scale: [1, 1.15, 1], y: 0, opacity: 1 } : { opacity: 1, y: 0 }}
        transition={showHint ? { repeat: Infinity, duration: 1 } : { delay: 2.5 }}
      >
        {isPlaying ? (
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Music size={18} />
          </motion.span>
        ) : (
          <VolumeX size={18} />
        )}
      </motion.button>
    </div>
  )
}
