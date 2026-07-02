'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const weddingData = useWeddingData()
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {/* Vilakku lamp */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }} className="mb-6">
        <img src="/assets/lantern.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 96, height: 'auto', objectFit: 'contain' }} />
      </motion.div>

      <motion.p className="font-display text-4xl md:text-5xl tracking-widest"
        style={{ color: 'var(--color-text)' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
        {weddingData.groomName}
        <span className="mx-4" style={{ color: 'var(--color-accent)' }}>&amp;</span>
        {weddingData.brideName}
      </motion.p>

      <motion.div className="mt-10 h-px" style={{ background: 'var(--color-accent)' }}
        initial={{ width: 0 }} animate={{ width: 120 }}
        transition={{ delay: 0.9, duration: 0.8, ease: 'easeInOut' }} />
  
      {/* Percentage */}
      <motion.p
        className="font-sans text-xs tracking-[0.3em] mt-4"
        style={{ color: 'var(--color-accent)', opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3 }}
      >
        {pct}%
      </motion.p>
  </motion.div>
  )
}
