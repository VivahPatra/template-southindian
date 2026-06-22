'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { weddingData } from '@/data/wedding-data'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

const GREEN_SEC = 'linear-gradient(160deg, #0a1a08 0%, #0e2210 50%, #0c1e0c 100%)'

export default function RSVPSection() {
  const { rsvp } = weddingData
  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(rsvp.whatsappMessage)}`

  return (
    <SectionWrapper id="rsvp" className="py-24 relative overflow-hidden" style={{ background: GREEN_SEC }}>
      <div className="absolute inset-0 kolam-bg opacity-[0.04] pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
          style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
          Will You Attend?
        </motion.h2>
        <Divider />
        <motion.p variants={fadeUp} className="font-sans text-base leading-relaxed mb-10"
          style={{ color: 'var(--color-muted)' }}>
          We would be honoured to have you celebrate with us. Please RSVP by{' '}
          <span style={{ color: 'var(--color-accent)' }}>December 1, 2026</span>.
        </motion.p>
        <motion.div className="flex justify-center"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" variants={scaleIn}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-semibold text-base shadow-xl"
            style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <MessageCircle size={20} /> RSVP via WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
