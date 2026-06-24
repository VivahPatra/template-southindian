'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import Lightbox from '@/components/ui/Lightbox'
import DevAssetLabel from '@/components/ui/DevAssetLabel'
import { scaleIn, staggerFast, fadeUp } from '@/lib/animations'

const GREEN_SEC = 'linear-gradient(160deg, #0a1a08 0%, #0e2210 50%, #0c1e0c 100%)'
// Staggered mosaic: alternating heights create an organic, varied rhythm
const HEIGHTS = [240, 175, 220, 280, 160, 205]

export default function GallerySection() {
  const weddingData = useWeddingData()
  const { isEditing, data: editData } = useEditMode()
  const d = isEditing ? editData : weddingData
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = d.galleryImages
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i === null ? 0 : (i - 1 + images.length) % images.length))
  const next = () => setLightboxIndex(i => (i === null ? 0 : (i + 1) % images.length))

  return (
    <>
      <SectionWrapper id="gallery" className="py-24" style={{ background: GREEN_SEC }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
              style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
              Gallery
            </motion.h2>
            <Divider />
          </div>

          {/* Staggered mosaic: 2-col mobile, 3-col desktop with alternating heights */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4"
            variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            {images.map((src, i) => (
              <motion.div key={i} variants={scaleIn} data-cursor-glow
                className="relative cursor-pointer overflow-hidden rounded-xl group"
                style={{ height: HEIGHTS[i % HEIGHTS.length], border: '1px solid var(--color-border)' }}
                onClick={() => setLightboxIndex(i)}
                whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(201,168,76,0.28)' }}
                transition={{ duration: 0.2 }}>
                <DevAssetLabel path={src}>
                  <Image src={src} alt={`Photo ${i + 1}`} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </DevAssetLabel>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.25)' }}>
                  <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto' }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} currentIndex={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  )
}
