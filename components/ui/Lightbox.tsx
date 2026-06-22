'use client'
import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [handleKey])

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex}
          className="relative w-full h-full max-w-5xl max-h-[88vh] mx-4 my-10"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.22 }}>
          <Image src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} fill className="object-contain" priority />
        </motion.div>
      </AnimatePresence>
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>
      <button className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10"
        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10"
        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }} onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-xs text-white opacity-50 tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  )
}
