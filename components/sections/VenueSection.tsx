'use client'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { staggerFast, fadeUp } from '@/lib/animations'

const EARTH_BG = 'linear-gradient(160deg, #1a1408 0%, #241a0c 50%, #1e1408 100%)'

export default function VenueSection() {
  const weddingData = useWeddingData()
  const { venue } = weddingData

  return (
    <SectionWrapper id="venue" className="py-24 relative overflow-hidden" style={{ background: EARTH_BG }}>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse flex items-center justify-center gap-2 whitespace-nowrap"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', flexShrink: 0 }} />
            The Venue
            <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', flexShrink: 0 }} />
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--color-text)' }}
          >
            Our <em>Venue</em>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <svg viewBox="0 0 320 14" width="320" height="14" aria-hidden>
              <path d="M10,7 L310,7" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.42" />
              <path d="M10,11 L310,11" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.25" />
              <rect x="75" y="4" width="6" height="6" fill="var(--color-accent)" opacity="0.50" transform="rotate(45 78 7)" />
              <rect x="155" y="3" width="8" height="8" fill="var(--color-accent)" opacity="0.65" transform="rotate(45 159 7)" />
              <rect x="235" y="4" width="6" height="6" fill="var(--color-accent)" opacity="0.50" transform="rotate(45 238 7)" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Venue details */}
        <motion.div
          className="text-center"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3
            variants={fadeUp}
            className="font-display tracking-wide"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--color-text)' }}
          >
            {venue.name}
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm mt-3 max-w-md mx-auto leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            {venue.address}
          </motion.p>

          {/* Get Directions button */}
          {venue.mapLink && (
            <motion.div variants={fadeUp} className="mt-10">
              <a
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold tracking-wider transition-all hover:opacity-90"
                style={{
                  background: 'var(--color-surface)',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                  border: '1px solid var(--color-border)',
                }}
              >
                📍 Get Directions
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
