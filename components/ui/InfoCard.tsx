'use client'
import { motion } from 'framer-motion'
import { InfoCard as InfoCardType } from '@/types/wedding.types'
import EditableText from '@/components/ui/EditableText'
import { scaleIn } from '@/lib/animations'

export default function InfoCard({ card, index }: { card: InfoCardType; index?: number }) {
  return (
    <motion.div
      variants={scaleIn}
      className="rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)',
        border: '1px solid rgba(201,168,76,0.28)',
        boxShadow: '0 2px 16px rgba(201,168,76,0.08)',
      }}
      whileHover={{
        boxShadow: '0 4px 28px rgba(201,168,76,0.22)',
        borderColor: 'rgba(201,168,76,0.55)',
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)' }} />
      <span className="text-3xl">{card.icon}</span>
      <h3 className="font-serif font-semibold text-lg" style={{ color: 'var(--color-accent2)' }}>
        <EditableText field="title" index={index} arrayField="infoCards">{card.title}</EditableText>
      </h3>
      <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        <EditableText field="description" index={index} arrayField="infoCards" multiline>{card.description}</EditableText>
      </p>
    </motion.div>
  )
}
