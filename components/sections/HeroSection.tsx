'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { weddingData } from '@/data/wedding-data'
import { fadeUp, staggerContainer } from '@/lib/animations'
import OrnateFrame from '@/components/ui/OrnateFrame'
import { formatShortDate } from '@/lib/utils'

export default function HeroSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [curtainOpen, setCurtainOpen] = useState(false)

  // Outer wrapper drives the sticky-scroll progress (260vh hold)
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  // Temple: starts small at bottom, zooms in as user scrolls (reference: "subject zooms in on scroll")
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.18])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['10%', '-6%'])

  // Text: rises above the temple as scroll progresses
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  // Open curtain on first scroll
  useEffect(() => {
    const open = () => { setCurtainOpen(true); window.removeEventListener('scroll', open) }
    window.addEventListener('scroll', open, { passive: true })
    return () => window.removeEventListener('scroll', open)
  }, [])

  const openCurtain = () => setCurtainOpen(true)

  return (
    <div ref={outerRef} style={{ height: '260vh' }}>
    <section id="hero" className="sticky top-0 w-full overflow-hidden"
      style={{ height: '100svh', background: '#080e06' }}>

      {/* ── Parallax background ── */}
      <div className="absolute inset-0">
        <motion.img
          src={weddingData.heroImage}
          alt={`${weddingData.groomName} and ${weddingData.brideName}`}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '55%',
            height: 'auto',
            maxHeight: '72%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            borderRadius: '12px 12px 0 0',
            filter: 'brightness(0.65) saturate(1.1)',
            translateX: '-50%',
            scale: imgScale,
            y: imgY,
          }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,14,6,0.15) 0%, rgba(8,14,6,0.3) 45%, rgba(8,14,6,0.88) 100%)' }} />
        <div className="absolute inset-0 kolam-bg opacity-[0.05]" />
      </div>

      {/* Gold corner frame */}
      <OrnateFrame size={48} offset={28} />

      {/* Kasavu top strip */}
      <div className="absolute top-0 left-0 right-0 h-2 z-10"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-accent) 20%, var(--color-accent2) 50%, var(--color-accent) 80%, transparent 100%)', opacity: 0.7 }} />

      {/* ── Hero content — visible after curtains open ── */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-8"
        variants={staggerContainer}
        initial="hidden"
        animate={curtainOpen ? 'visible' : 'hidden'}
        transition={{ delayChildren: 0.6 }}
        style={{ y: textY }}
      >
        <motion.p variants={fadeUp} className="font-display text-3xl tracking-[0.3em] mb-6 opacity-60 glow-pulse"
          style={{ color: 'var(--color-accent)' }}>ॐ</motion.p>

        <motion.div variants={fadeUp} className="mb-3">
          <h1 className="shimmer-text font-display leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '0.08em' }}>
            {weddingData.groomName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-5 my-3">
          <div className="h-px w-14 md:w-20" style={{ background: 'var(--color-accent)', opacity: 0.5 }} />
          <img src="/assets/lantern.png" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', objectFit: 'contain' }} />
          <span className="font-display text-3xl glow-pulse" style={{ color: 'var(--color-accent)' }}>&amp;</span>
          <img src="/assets/lantern.png" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', objectFit: 'contain' }} />
          <div className="h-px w-14 md:w-20" style={{ background: 'var(--color-accent)', opacity: 0.5 }} />
        </motion.div>

        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="shimmer-text font-display leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '0.08em' }}>
            {weddingData.brideName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <div className="h-px w-20 opacity-50" style={{ background: 'var(--color-accent)' }} />
          <p className="font-sans text-xs tracking-[0.35em] uppercase" style={{ color: 'var(--color-accent)' }}>
            {formatShortDate(weddingData.weddingDate)}
          </p>
          <div className="h-px w-20 opacity-50" style={{ background: 'var(--color-accent)' }} />
        </motion.div>
      </motion.div>

      {/* ── LEFT CURTAIN ── */}
      <motion.div
        className="absolute inset-y-0 left-0 z-20 overflow-hidden"
        style={{ width: '54vw' }}
        initial={{ x: 0 }}
        animate={{ x: curtainOpen ? '-110%' : 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src="/assets/coconut-left.png"
          alt=""
          className="h-full w-full object-cover object-right"
          style={{ userSelect: 'none', pointerEvents: 'none', filter: 'brightness(0.65) saturate(1.1)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── RIGHT CURTAIN ── */}
      <motion.div
        className="absolute inset-y-0 right-0 z-20 overflow-hidden"
        style={{ width: '54vw' }}
        initial={{ x: 0 }}
        animate={{ x: curtainOpen ? '110%' : 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      >
        <img
          src="/assets/coconut-right.png"
          alt=""
          className="h-full w-full object-cover object-left"
          style={{ userSelect: 'none', pointerEvents: 'none', filter: 'brightness(0.65) saturate(1.1)' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Click-to-open hint ── */}
      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center select-none cursor-pointer"
        animate={{ opacity: curtainOpen ? 0 : 1, pointerEvents: curtainOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.4 }}
        onClick={openCurtain}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center px-8 py-10"
        >
          <p className="font-display shimmer-text"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '0.06em', textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}>
            {weddingData.groomName} &amp; {weddingData.brideName}
          </p>
          <p className="font-sans text-xs tracking-[0.4em] uppercase mt-3 mb-2"
            style={{ color: 'var(--color-accent)', opacity: 0.85, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            {formatShortDate(weddingData.weddingDate)}
          </p>
          <div className="flex flex-col items-center gap-2 mt-8">
            <p className="font-sans text-xs tracking-[0.5em] uppercase"
              style={{ color: 'var(--color-accent)', opacity: 0.85, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
              Tap or Scroll to Begin
            </p>
            <motion.div className="w-px h-8"
              style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Boat */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 15, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }} aria-hidden>
        <div style={{ position: 'absolute', bottom: 18, left: 0, animation: 'boatSailSection 14s linear infinite' }}>
          <div style={{ animation: 'boatBob 3.5s ease-in-out infinite' }}>
            <img src="/assets/boat.png" alt="" style={{ height: 60, width: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Kasavu bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 z-10"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-accent) 20%, var(--color-accent2) 50%, var(--color-accent) 80%, transparent 100%)', opacity: 0.7 }} />

      {/* Scroll indicator (after open) */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ opacity: curtainOpen ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <p className="font-sans text-xs tracking-[0.35em] opacity-60" style={{ color: 'var(--color-accent)' }}>
          SCROLL
        </p>
        <motion.div className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
      </motion.div>
    </section>
    </div>
  )
}
