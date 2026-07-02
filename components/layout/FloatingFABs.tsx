'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { useAudioContext } from '@/components/providers/AudioProvider'

export default function FloatingFABs() {
  const { isPlaying, toggle, showHint } = useAudioContext()

  const btnStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
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
