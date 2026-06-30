'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useWeddingData } from '@/context/WeddingDataContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import RSVPModal from '@/components/ui/RSVPModal'
import PartyConfetti from '@/components/ui/PartyConfetti'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

const GREEN_SEC = 'linear-gradient(160deg, #0a1a08 0%, #0e2210 50%, #0c1e0c 100%)'

export default function RSVPSection() {
  const weddingData = useWeddingData()
  const { rsvp } = weddingData
  const [modalOpen, setModalOpen] = useState(false)
  const [responded, setResponded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('rsvp-responded') === 'true') setResponded(true)
  }, [])

  const handleSend = (guestCount: number, fullMessage: string) => {
    const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`
    window.open(whatsappUrl, '_blank')
    setModalOpen(false)
    setResponded(true)
    setShowConfetti(true)
    localStorage.setItem('rsvp-responded', 'true')
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <SectionWrapper id="rsvp" className="py-24 relative overflow-hidden" style={{ background: GREEN_SEC }}>
      <div className="absolute inset-0 kolam-bg opacity-[0.04] pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {showConfetti && <PartyConfetti />}
        {responded ? (
          <>
            <div className="text-5xl mb-4">🎉</div>
            <motion.h2 variants={fadeUp} className="font-display shimmer-text text-5xl md:text-6xl mb-3" style={{ padding: '0.1em 0' }}>
              Thank You!
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-base leading-relaxed"
              style={{ color: 'var(--color-muted)' }}>
              Your RSVP has been sent. We can&apos;t wait to celebrate with you!
            </motion.p>
          </>
        ) : (
          <>
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
              style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
              {weddingData.rsvpHeading || 'Will You Attend?'}
            </motion.h2>
            <Divider />
            <motion.p variants={fadeUp} className="font-sans text-base leading-relaxed mb-10"
              style={{ color: 'var(--color-muted)' }}>
              {weddingData.rsvpText || 'We would be honoured to have you celebrate with us.'} Please RSVP by{' '}
              <span style={{ color: 'var(--color-accent)' }}>{weddingData.rsvpDeadline || 'December 1, 2026'}</span>.
            </motion.p>
            <motion.div className="flex justify-center"
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.button onClick={() => setModalOpen(true)} variants={scaleIn}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-semibold text-base shadow-xl"
                style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <MessageCircle size={20} /> RSVP via WhatsApp
              </motion.button>
            </motion.div>
          </>
        )}
      </div>

      <RSVPModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSend}
        defaultMessage={rsvp.whatsappMessage}
        brideName={weddingData.brideName || ''}
        groomName={weddingData.groomName || ''}
      />
    </SectionWrapper>
  )
}
