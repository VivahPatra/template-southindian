'use client'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { useAudioContext } from '@/components/providers/AudioProvider'

export default function FloatingFABs() {
  const { isPlaying, toggle } = useAudioContext()

  const btnStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
        style={{ ...btnStyle, color: isPlaying ? 'var(--color-accent)' : 'var(--color-muted)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
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
