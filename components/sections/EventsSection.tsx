'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { staggerFast, fadeUp } from '@/lib/animations'
import { WeddingEvent } from '@/types/wedding.types'

const EARTH_SEC = 'linear-gradient(160deg, #1a1408 0%, #241a0c 50%, #1e1408 100%)'

const FALLBACK_COLORS: Record<string, string> = {
  nichayathartham: '#c9a84c',
  nalagu:          '#c8a030',
  pallikkettu:     '#8b6fc4',
  muhurtham:       '#c9a84c',
  sadya:           '#5a9a60',
  reception:       '#c07060',
}

const EVENT_EMOJI: Record<string, string> = {
  nichayathartham: '💍',
  nalagu:          '🌿',
  pallikkettu:     '🎶',
  muhurtham:       'diya',
  sadya:           '🍃',
  reception:       '🌺',
}

function EventNode({ event, isHero = false, delay = 0 }: { event: WeddingEvent; isHero?: boolean; delay?: number }) {
  const [imgError, setImgError] = useState(false)
  const color = event.color || FALLBACK_COLORS[event.id] || '#c9a84c'
  const emoji = EVENT_EMOJI[event.id] ?? '✦'
  const size = isHero ? 130 : 100

  return (
    <motion.article data-cursor-glow className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full transition-all duration-500"
          style={{ boxShadow: `0 0 18px 4px ${color}33` }} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ boxShadow: `0 0 48px 16px ${color}55` }} />
        <div className="absolute rounded-full group-hover:[animation:spin_6s_linear_infinite]"
          style={{ inset: -3, border: `1.5px dashed ${color}`, opacity: 0.5 }} />
        <div className="absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-90"
          style={{ border: `2px solid ${color}`, opacity: 0.55 }} />
        {event.image && !imgError ? (
          <img src={event.image} alt={event.name}
            className="absolute inset-0 object-contain transition-all duration-500"
            style={{ width: '100%', height: '100%', filter: 'brightness(1.2) saturate(1.1)' }} loading="lazy"
            onError={() => setImgError(true)} />
        ) : (
          <div className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`, fontSize: isHero ? 44 : 32 }}>
            {emoji === 'diya'
              ? <img src="/assets/diya.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto' }} />
              : emoji}
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        <p className="font-display tracking-wide" style={{ color: 'var(--color-text)', fontSize: isHero ? '1.2rem' : '0.95rem' }}>
          {event.name}
        </p>
        <p className="font-sans text-xs tracking-widest mt-1" style={{ color: color, opacity: 0.7 }}>
          {event.date.replace(', 2026', '')} · {event.time}
        </p>
      </div>
      <div className="text-center mt-3 rounded-xl px-3 py-3" style={{
        maxWidth: 165,
        background: `linear-gradient(135deg, ${color}14 0%, ${color}08 100%)`,
        border: `1px solid ${color}50`,
        boxShadow: `0 0 16px ${color}20`,
        backdropFilter: 'blur(4px)',
      }}>
        <p className="font-serif text-sm" style={{ color: 'var(--color-text)', opacity: 0.85 }}>{event.venue}</p>
        <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
          {event.venueAddress.split(',')[0]}
        </p>
        {event.venueMapLink && (
          <a href={event.venueMapLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-full font-sans text-xs font-semibold whitespace-nowrap tracking-wider transition-all hover:opacity-90"
            style={{ background: 'var(--color-surface)', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            📍 Get Directions
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function EventsSection() {
  const weddingData = useWeddingData()
  const events = weddingData.events.filter((e) => !e.hidden)
  const half = Math.ceil(events.length / 2)
  const row1 = events.slice(0, half)
  const row2 = events.slice(half)

  return (
    <SectionWrapper id="events" className="py-24 relative overflow-hidden" style={{ background: EARTH_SEC }}>
      {/* Right mandap decoration — all anchored from bottom */}
      <div className="hidden sm:block" style={{ position: 'absolute', bottom: 80, right: 0, width: 200, height: 480, pointerEvents: 'none', zIndex: 2 }} aria-hidden>
        {/* Leaf: emerges just above pillar top, fans left */}
        <img src="/assets/bananaleaf.webp" alt="" className="leaf-sway"
          style={{ position: 'absolute', top: 50, right: -20, width: 940, height: 'auto', zIndex: 1, opacity: 0.95 }} />
        {/* Trunk: base of banana plant, left of pillar */}
        <img src="/assets/bananatrunk.webp" alt=""
          style={{ position: 'absolute', bottom: 0, right: 80, width: 60, height: 'auto', zIndex: 2, opacity: 0.95 }} />
        {/* Pillar: right edge, bottom-anchored */}
        <img src="/assets/pillar.webp" alt=""
          style={{ position: 'absolute', bottom: 0, right: 0, width: 640, height: 'auto', zIndex: 3, opacity: 1 }} />
      </div>
      {/* Mobile-only: smaller pillar + leaf */}
      <div className="sm:hidden" style={{ position: 'absolute', bottom: 80, right: 0, width: 160, height: 320, pointerEvents: 'none', zIndex: 2 }} aria-hidden>
        <img src="/assets/bananaleaf.webp" alt="" className="leaf-sway"
          style={{ position: 'absolute', top: 0, right: -10, width: 380, height: 'auto', zIndex: 1, opacity: 0.95 }} />
        <img src="/assets/pillar.webp" alt=""
          style={{ position: 'absolute', bottom: 0, right: 0, width: 160, height: 'auto', zIndex: 3, opacity: 0.85 }} />
      </div>

      {/* Boat — explicit overflow wrapper prevents framer-motion clip bug */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 15, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }} aria-hidden>
        <div style={{ position: 'absolute', bottom: -10, left: 0, animation: 'boatSailSection 14s linear infinite', animationDelay: '4s' }}>
          <div style={{ animation: 'boatBob 3.5s ease-in-out infinite' }}>
            <img src="/assets/boat.webp" alt="" style={{ height: 60, width: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16"
          variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse flex items-center justify-center gap-2 whitespace-nowrap"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            <img src="/assets/diya.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', flexShrink: 0 }} /> The Celebrations <img src="/assets/diya.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', flexShrink: 0 }} />
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--color-text)' }}>
            Our <em>Events</em>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-5">
            <svg viewBox="0 0 320 14" width="320" height="14" aria-hidden>
              <path d="M10,7 L310,7" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.42" />
              <path d="M10,11 L310,11" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.25" />
              <rect x="75"  y="4" width="6" height="6" fill="var(--color-accent)" opacity="0.50" transform="rotate(45 78 7)" />
              <rect x="155" y="3" width="8" height="8" fill="var(--color-accent)" opacity="0.65" transform="rotate(45 159 7)" />
              <rect x="235" y="4" width="6" height="6" fill="var(--color-accent)" opacity="0.50" transform="rotate(45 238 7)" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6 md:mb-0">
          {row1.map((ev, i) => <EventNode key={ev.id} event={ev} delay={i * 0.1} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 md:mt-10">
          {row2.map((ev, i) => (
            <EventNode key={ev.id} event={ev} isHero={ev.id === 'muhurtham'} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
