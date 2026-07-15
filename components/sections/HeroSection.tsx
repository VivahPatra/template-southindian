'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'
import OrnateFrame from '@/components/ui/OrnateFrame'
import { formatShortDate } from '@/lib/utils'

export default function HeroSection() {
  const weddingData = useWeddingData()
  const outerRef = useRef<HTMLDivElement>(null)
  const [curtainOpen, setCurtainOpen] = useState(false)

  // Outer wrapper drives the sticky-scroll progress (260vh hold)
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  // Temple: starts small at bottom, zooms in as user scrolls
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.18])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['10%', '-6%'])

  // Text: rises above the temple as scroll progresses
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  // Cloud parallax — different Y speeds per layer (slow/mid/fast)
  const cloudYSlow = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const cloudYMid  = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const cloudYFast = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])

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
      style={{ height: '100svh', background: '#1a0a2e' }}>

      {/* ── Dusk sky: deep violet top → purple mid → amber/orange horizon → crimson base ── */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #120820 0%, #2b0d4a 14%, #4a1a6e 26%, #7a2d8a 38%, #c45a5a 52%, #e8843a 64%, #f0a030 74%, #d45820 85%, #8a2010 100%)'
      }} />

      {/* CSS for cloud drift — all move left to right */}
      <style>{`
        @keyframes driftA { from{transform:translateX(-15%)} to{transform:translateX(115%)} }
        @keyframes driftB { from{transform:translateX(-20%)} to{transform:translateX(120%)} }
        @keyframes driftC { from{transform:translateX(-10%)} to{transform:translateX(110%)} }
      `}</style>

      {/* ── Clouds: far layer (slow Y parallax) ── */}
      <motion.div className="absolute pointer-events-none" aria-hidden
        style={{ top: '-5%', left: 0, right: 0, height: '35%', y: cloudYSlow, zIndex: 2, maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '0%',   left: '0', width: '100%', height: 'auto', opacity: 0.5,
          animation: 'driftA 90s linear infinite' }} />
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '20%',  left: '0', width: '80%', height: 'auto', opacity: 0.4,
          animation: 'driftA 110s linear infinite', animationDelay: '-40s' }} />
      </motion.div>

      {/* ── Clouds: mid layer ── */}
      <motion.div className="absolute pointer-events-none" aria-hidden
        style={{ top: '-5%', left: 0, right: 0, height: '35%', y: cloudYMid, zIndex: 3, maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '5%',   left: '0', width: '90%', height: 'auto', opacity: 0.55,
          animation: 'driftB 70s linear infinite', animationDelay: '-25s' }} />
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '28%',  left: '0', width: '70%', height: 'auto', opacity: 0.45,
          animation: 'driftB 85s linear infinite', animationDelay: '-60s' }} />
      </motion.div>

      {/* ── Clouds: near layer (fastest) ── */}
      <motion.div className="absolute pointer-events-none" aria-hidden
        style={{ top: '-5%', left: 0, right: 0, height: '35%', y: cloudYFast, zIndex: 4, maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '10%',  left: '0', width: '75%', height: 'auto', opacity: 0.6,
          animation: 'driftC 55s linear infinite', animationDelay: '-15s' }} />
        <img src="/assets/clds.webp" alt="" style={{ position: 'absolute', top: '0%',   left: '0', width: '60%', height: 'auto', opacity: 0.5,
          animation: 'driftC 65s linear infinite', animationDelay: '-50s' }} />
      </motion.div>

      {/* ── Temple image ── */}
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
            filter: 'brightness(0.95) saturate(1.2)',
            translateX: '-50%',
            scale: imgScale,
            y: imgY,
          }}
        />
        {/* Soft ground fog at base */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '22%',
          background: 'linear-gradient(to top, rgba(255,180,80,0.35) 0%, transparent 100%)' }} />
        {/* Subtle vignette top */}
        <div className="absolute top-0 left-0 right-0" style={{ height: '30%',
          background: 'linear-gradient(to bottom, rgba(18,8,32,0.4) 0%, transparent 100%)' }} />
        <div className="absolute inset-0 kolam-bg opacity-[0.03]" />
      </div>

      {/* Gold corner frame */}
      <OrnateFrame size={48} offset={28} />

      {/* Bottom gradient to anchor text */}
      <div className="absolute bottom-0 left-0 right-0 z-[5]" style={{ height: '75%',
        background: 'linear-gradient(to top, rgba(5,2,12,0.88) 0%, rgba(5,2,12,0.72) 30%, rgba(5,2,12,0.4) 55%, rgba(5,2,12,0.1) 75%, transparent 100%)' }} />

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
        <motion.div variants={fadeUp} className="mb-3">
          <h1 className="shimmer-text font-display"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '0.08em', lineHeight: 1.5, padding: '0.15em 0',
              filter: 'drop-shadow(0 0 18px rgba(220,160,40,0.95)) drop-shadow(0 2px 8px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,0.9))' }}>
            {weddingData.groomName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-5 my-3">
          <div className="h-px w-14 md:w-20" style={{ background: 'var(--color-accent)', opacity: 0.7 }} />
          <img src="/assets/lantern.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', objectFit: 'contain' }} />
          <span className="font-display text-3xl glow-pulse" style={{ color: 'var(--color-accent)', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>&amp;</span>
          <img src="/assets/lantern.webp" alt="" aria-hidden className="lantern-glow" style={{ width: 36, height: 'auto', objectFit: 'contain' }} />
          <div className="h-px w-14 md:w-20" style={{ background: 'var(--color-accent)', opacity: 0.7 }} />
        </motion.div>

        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="shimmer-text font-display"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '0.08em', lineHeight: 1.5, padding: '0.15em 0',
              filter: 'drop-shadow(0 0 18px rgba(220,160,40,0.95)) drop-shadow(0 2px 8px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,0.9))' }}>
            {weddingData.brideName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <div className="h-px w-20 opacity-70" style={{ background: 'var(--color-accent)' }} />
          <p className="font-sans text-xs tracking-[0.35em] uppercase" style={{ color: '#ffffff', textShadow: '0 1px 12px rgba(0,0,0,1), 0 2px 24px rgba(0,0,0,1)' }}>
            {formatShortDate(weddingData.weddingDate)}
          </p>
          <div className="h-px w-20 opacity-70" style={{ background: 'var(--color-accent)' }} />
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
          src="/assets/coconut-left.webp"
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
          src="/assets/coconut-right.webp"
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
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '0.06em', textShadow: '0 2px 24px rgba(0,0,0,0.9)', lineHeight: 1.5, padding: '0.15em 0' }}>
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
            <img src="/assets/boat.webp" alt="" style={{ height: 60, width: 'auto', display: 'block' }} />
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
