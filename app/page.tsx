'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WeddingDataProvider } from '@/context/WeddingDataContext'
import SectionGate from '@/components/ui/SectionGate'
import CustomCursor from '@/components/layout/CustomCursor'
import LoadingScreen from '@/components/layout/LoadingScreen'
import FloatingFABs from '@/components/layout/FloatingFABs'
import WaveTransition from '@/components/ui/WaveTransition'
import HeroSection from '@/components/sections/HeroSection'
import InvitationSection from '@/components/sections/InvitationSection'
import CoupleStorySection from '@/components/sections/CoupleStorySection'
import GallerySection from '@/components/sections/GallerySection'
import EventsSection from '@/components/sections/EventsSection'
import RSVPSection from '@/components/sections/RSVPSection'
import CountdownSection from '@/components/sections/CountdownSection'
import InfoSection from '@/components/sections/InfoSection'
import FooterSection from '@/components/sections/FooterSection'

const HERO    = '#080e06'
const GREEN   = '#0a1a08'
const EARTH   = '#1a1408'
const SURFACE = '#0e1c0c'

export default function WeddingPage() {
  const [loading, setLoading] = useState(true)

  return (
    <WeddingDataProvider>
      <CustomCursor />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <FloatingFABs />
          <div className="relative" style={{ overflowX: 'clip' }}>
            <main>
              <SectionGate name="hero"><HeroSection /></SectionGate>

              <WaveTransition fromColor={HERO} toColor={GREEN} boatDelay={0} />
              <SectionGate name="invitation"><InvitationSection /></SectionGate>

              <WaveTransition fromColor={GREEN} toColor={EARTH} boatDelay={3} />
              <SectionGate name="coupleStory"><CoupleStorySection /></SectionGate>

              <WaveTransition fromColor={EARTH} toColor={GREEN} flipped boatDelay={6} />
              <SectionGate name="gallery"><GallerySection /></SectionGate>

              <WaveTransition fromColor={GREEN} toColor={EARTH} boatDelay={1} />
              <SectionGate name="events"><EventsSection /></SectionGate>

              <WaveTransition fromColor={EARTH} toColor={GREEN} flipped boatDelay={8} />
              <SectionGate name="rsvp"><RSVPSection /></SectionGate>

              <WaveTransition fromColor={GREEN} toColor={EARTH} boatDelay={4} />
              <SectionGate name="countdown"><CountdownSection /></SectionGate>

              <WaveTransition fromColor={EARTH} toColor={GREEN} flipped boatDelay={2} />
              <SectionGate name="info"><InfoSection /></SectionGate>

              <WaveTransition fromColor={GREEN} toColor={SURFACE} boatDelay={7} />
              <SectionGate name="footer"><FooterSection /></SectionGate>
            </main>
          </div>
        </>
      )}
    </WeddingDataProvider>
  )
}
