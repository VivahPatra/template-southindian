'use client'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

export default function SectionWrapper({ children, className, id, style }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn('py-20 px-4 md:px-8 relative overflow-hidden', className)}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <img src="/assets/flower.webp" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.5, mixBlendMode: 'overlay' }} />
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  )
}
