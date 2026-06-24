'use client'
import { motion } from 'framer-motion'
import { Link2, ExternalLink } from 'lucide-react'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import Divider from '@/components/ui/Divider'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function FooterSection() {
  const weddingData = useWeddingData()
  const { isEditing, data: editData } = useEditMode()
  const d = isEditing ? editData : weddingData
  const { brideName, groomName, hashtag, socialLinks } = d
  return (
    <footer className="py-16 px-4 text-center"
      style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-xl mx-auto">
        <motion.h2 variants={fadeUp} className="font-display text-4xl mb-2" style={{ color: 'var(--color-text)' }}>
          <EditableText field="groomName">{groomName}</EditableText> &amp; <EditableText field="brideName">{brideName}</EditableText>
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-sm tracking-widest mb-6" style={{ color: 'var(--color-accent)' }}>
          <EditableText field="hashtag">{hashtag}</EditableText>
        </motion.p>
        <Divider />
        <motion.div variants={fadeUp} className="flex justify-center gap-5 mb-8">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }} aria-label="Instagram">
              <Link2 size={17} />
            </a>
          )}
          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }} aria-label="YouTube">
              <ExternalLink size={17} />
            </a>
          )}
        </motion.div>
        <motion.p variants={fadeUp} className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Made with ❤️ for <EditableText field="brideName">{brideName}</EditableText> &amp; <EditableText field="groomName">{groomName}</EditableText>
          <br /><span className="opacity-50">© {new Date().getFullYear()} · <EditableText field="hashtag">{hashtag}</EditableText></span>
        </motion.p>
      </motion.div>
    </footer>
  )
}
