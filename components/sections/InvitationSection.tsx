'use client'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import OrnateFrame from '@/components/ui/OrnateFrame'
import Divider from '@/components/ui/Divider'
import FloatingCoconutTree from '@/components/ui/FloatingCoconutTree'
import { fadeUp, staggerFast } from '@/lib/animations'

function KolambCorner({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) {
  return (
    <svg viewBox="0 0 56 56" width="52" aria-hidden
      style={{ transform: `scale(${flip ? -1 : 1}, ${flipY ? -1 : 1})`, transformOrigin: 'center' }}>
      <path d="M6,50 Q28,-8 52,18" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.45" />
      <path d="M6,42 Q22,12 42,22" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.25" />
      <circle cx="6" cy="50" r="2" fill="var(--color-accent)" opacity="0.5" />
      <circle cx="18" cy="34" r="1.5" fill="var(--color-accent)" opacity="0.4" />
      <circle cx="34" cy="20" r="1.5" fill="var(--color-accent)" opacity="0.4" />
      <circle cx="50" cy="10" r="2" fill="var(--color-accent)" opacity="0.5" />
      <path d="M4,50 Q8,42 14,48 Q8,52 4,50 Z" fill="var(--color-accent)" opacity="0.35" />
      <line x1="4" y1="36" x2="20" y2="36" stroke="var(--color-accent)" strokeWidth="0.7" opacity="0.3" />
    </svg>
  )
}

const GREEN_SEC = 'linear-gradient(160deg, #0a1a08 0%, #0e2210 50%, #0c1e0c 100%)'

export default function InvitationSection() {
  const weddingData = useWeddingData()
  const dateStr = weddingData.weddingDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <SectionWrapper id="invitation" className="py-28 relative overflow-hidden" style={{ background: GREEN_SEC }}>
      {/* Floating coconut trees on sides */}
      <FloatingCoconutTree side="left" maxWidth={100} opacity={0.5} delay="0s" />
      <FloatingCoconutTree side="right" maxWidth={100} opacity={0.5} delay="1.5s" />

      {/* Boat — explicit overflow wrapper prevents framer-motion clip bug */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 15, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }} aria-hidden>
        <div style={{ position: 'absolute', bottom: 18, left: 0, animation: 'boatSailSection 14s linear infinite', animationDelay: '2s' }}>
          <div style={{ animation: 'boatBob 3.5s ease-in-out infinite' }}>
            <img src="/assets/boat.png" alt="" style={{ height: 60, width: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.45em] uppercase mb-5 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto', display: 'inline', verticalAlign: 'middle' }} /> &nbsp; {weddingData.invitationSubtitle || 'Shubh Vivah'} &nbsp; <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto', display: 'inline', verticalAlign: 'middle' }} />
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-10"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)', lineHeight: 1.1 }}>
            {weddingData.invitationHeading || 'You Are Invited'}
          </motion.h2>

          <motion.div variants={fadeUp} data-cursor-glow className="relative px-8 py-12 rounded-2xl"
            style={{
              background: 'linear-gradient(160deg, #132212 0%, #1a3018 100%)',
              border: '2px solid rgba(201,168,76,0.4)',
              boxShadow: '0 8px 48px rgba(201,168,76,0.12), inset 0 1px 0 rgba(201,168,76,0.15)',
            }}
            whileHover={{ boxShadow: '0 8px 60px rgba(201,168,76,0.22), inset 0 1px 0 rgba(201,168,76,0.2)' }}
            transition={{ duration: 0.4 }}>
            <div className="absolute inset-3 rounded-xl pointer-events-none"
              style={{ border: '1px solid rgba(201,168,76,0.2)' }} />
            <OrnateFrame size={32} offset={16} />
            <div className="absolute top-4 left-4 opacity-60"><KolambCorner /></div>
            <div className="absolute top-4 right-4 opacity-60"><KolambCorner flip /></div>
            <div className="absolute bottom-4 left-4 opacity-60"><KolambCorner flipY /></div>
            <div className="absolute bottom-4 right-4 opacity-60"><KolambCorner flip flipY /></div>

            <svg viewBox="0 0 320 16" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-7" aria-hidden>
              <line x1="0" y1="8" x2="120" y2="8" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.4" />
              <path d="M140,4 L148,8 L140,12 L132,8 Z" fill="var(--color-accent)" opacity="0.6" />
              <path d="M160,4 L168,8 L160,12 L152,8 Z" fill="var(--color-accent)" opacity="0.35" />
              <line x1="180" y1="8" x2="320" y2="8" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.4" />
            </svg>

            <div className="flex flex-col items-center mb-4">
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="ganesha-backdrop" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,80,0.75) 0%, rgba(201,168,76,0.35) 55%, transparent 75%)', filter: 'blur(10px)' }} />
                <img src="/assets/ganesha.gif" alt="Ganesha" className="ganesha-glow" style={{ width: 58, height: 'auto', position: 'relative', zIndex: 1 }} />
              </div>
              <p className="font-sans text-xs tracking-[0.35em] uppercase mt-3 glow-pulse"
                style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
                {weddingData.invitationBlessing || '॥ Shree Ganeshaya Namah ॥'}
              </p>
            </div>

            <div className="my-6">
              <div className="flex items-start justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <span className="font-display shimmer-text block" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    {weddingData.groomName}
                  </span>
                  {weddingData.groomParents && (
                    <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                      Son of {weddingData.groomParents}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <span className="font-display shimmer-text block" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    {weddingData.brideName}
                  </span>
                  {weddingData.brideParents && (
                    <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                      Daughter of {weddingData.brideParents}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <svg viewBox="0 0 320 16" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-7" aria-hidden>
              <line x1="0" y1="8" x2="120" y2="8" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.4" />
              <path d="M140,4 L148,8 L140,12 L132,8 Z" fill="var(--color-accent)" opacity="0.6" />
              <path d="M160,4 L168,8 L160,12 L152,8 Z" fill="var(--color-accent)" opacity="0.35" />
              <line x1="180" y1="8" x2="320" y2="8" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.4" />
            </svg>

            <p className="font-serif text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
              {weddingData.invitationText || 'Together with our families, we joyfully invite you to witness and bless the beginning of our forever. Your presence will make our celebration truly complete.'}
            </p>

            <Divider />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 font-sans text-sm tracking-wide"
              style={{ color: 'var(--color-accent)', opacity: 0.75 }}>
              <span>📅 &nbsp; {dateStr}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
