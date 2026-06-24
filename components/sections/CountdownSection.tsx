'use client'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import { useCountdown } from '@/lib/useCountdown'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import { fadeUp, scaleIn, staggerFast } from '@/lib/animations'
import { pad } from '@/lib/utils'

const EARTH_SEC = 'linear-gradient(160deg, #1a1408 0%, #241a0c 50%, #1e1408 100%)'

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div variants={scaleIn} className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.28)', backdropFilter: 'blur(4px)' }}>
        <motion.span key={value} className="font-display text-4xl md:text-5xl" style={{ color: 'var(--color-accent)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {pad(value)}
        </motion.span>
      </div>
      <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>{label}</p>
    </motion.div>
  )
}

export default function CountdownSection() {
  const weddingData = useWeddingData()
  const { isEditing, data: editData } = useEditMode()
  const d = isEditing ? editData : weddingData
  const { days, hours, minutes, seconds, isPast } = useCountdown(d.weddingDate)
  return (
    <SectionWrapper id="countdown" className="py-24" style={{ background: EARTH_SEC }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
          style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
          Counting Down
        </motion.h2>
        <Divider />
        {isPast ? (
          <motion.p variants={fadeUp} className="font-display text-4xl" style={{ color: 'var(--color-accent)' }}>
            <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto', display: 'inline', verticalAlign: 'middle', marginRight: 8 }} /> We Got Married!
          </motion.p>
        ) : (
          <motion.div className="flex justify-center gap-4 md:gap-8 mt-4"
            variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <CountUnit value={days} label="Days" />
            <CountUnit value={hours} label="Hours" />
            <CountUnit value={minutes} label="Min" />
            <CountUnit value={seconds} label="Sec" />
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
