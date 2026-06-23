'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WeddingDataProvider } from '@/context/WeddingDataContext'
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
              <HeroSection />

              <WaveTransition fromColor={HERO}  toColor={GREEN}  boatDelay={0} />
              <InvitationSection />

              <WaveTransition fromColor={GREEN} toColor={EARTH}  boatDelay={3} />
              <CoupleStorySection />

              <WaveTransition fromColor={EARTH} toColor={GREEN}  flipped boatDelay={6} />
              <GallerySection />

              <WaveTransition fromColor={GREEN} toColor={EARTH}  boatDelay={1} />
              <EventsSection />

              <WaveTransition fromColor={EARTH} toColor={GREEN}  flipped boatDelay={8} />
              <RSVPSection />

              <WaveTransition fromColor={GREEN} toColor={EARTH}  boatDelay={4} />
              <CountdownSection />

              <WaveTransition fromColor={EARTH} toColor={GREEN}  flipped boatDelay={2} />
              <InfoSection />

              <WaveTransition fromColor={GREEN} toColor={SURFACE} boatDelay={7} />
              <FooterSection />
            </main>
          </div>
        </>
      )}
    </WeddingDataProvider>
  )
}
