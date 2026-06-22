'use client'
import { motion } from 'framer-motion'
import { weddingData } from '@/data/wedding-data'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import InfoCard from '@/components/ui/InfoCard'
import { staggerFast, fadeUp } from '@/lib/animations'

const GREEN_SEC = 'linear-gradient(160deg, #0a1a08 0%, #0e2210 50%, #0c1e0c 100%)'

export default function InfoSection() {
  return (
    <SectionWrapper id="info" className="py-24" style={{ background: GREEN_SEC }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
            Good to Know
          </motion.h2>
          <Divider />
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4"
          variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {weddingData.infoCards.map((card, i) => <InfoCard key={i} card={card} />)}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
