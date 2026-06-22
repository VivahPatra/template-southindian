'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingData } from '@/data/wedding-data'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Divider from '@/components/ui/Divider'
import DevAssetLabel from '@/components/ui/DevAssetLabel'
import { fadeUp, slideLeft, slideRight } from '@/lib/animations'

const EARTH_SEC = 'linear-gradient(160deg, #1a1408 0%, #241a0c 50%, #1e1408 100%)'

export default function CoupleStorySection() {
  return (
    <SectionWrapper id="story" className="py-24" style={{ background: EARTH_SEC }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-3 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.6 }}>✦ ✦ ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-text)' }}>
            Our Story
          </motion.h2>
          <Divider />
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4) 10%, rgba(201,168,76,0.4) 90%, transparent)' }} />

          <div className="flex flex-col gap-16">
            {weddingData.coupleStory.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className="relative">
                  {/* Center dot node */}
                  <motion.div
                    className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <div className="w-4 h-4 rounded-full"
                      style={{ background: 'var(--color-accent)', boxShadow: '0 0 14px rgba(201,168,76,0.65)' }} />
                    <div className="absolute w-8 h-8 rounded-full"
                      style={{ border: '1px solid rgba(201,168,76,0.35)' }} />
                  </motion.div>

                  <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                    {/* Image */}
                    <motion.div
                      className="w-full md:w-5/12"
                      variants={isLeft ? slideLeft : slideRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                    >
                      <DevAssetLabel path={item.image || ''}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                          style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
                          {item.image ? (
                            <Image src={item.image} alt={item.title} fill className="object-cover" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center kolam-bg"
                              style={{ background: 'rgba(201,168,76,0.06)' }}>
                              <img src="/assets/diya.png" alt="" aria-hidden className="lantern-glow" style={{ width: 56, height: 'auto', opacity: 0.3 }} />
                            </div>
                          )}
                          <div className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(26,20,8,0.4) 0%, transparent 60%)' }} />
                        </div>
                      </DevAssetLabel>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                      className={`flex-1 ${isLeft ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right'} text-center`}
                      variants={isLeft ? slideRight : slideLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                    >
                      <p className="font-sans text-xs tracking-[0.35em] uppercase mb-2"
                        style={{ color: 'var(--color-accent)', opacity: 0.7 }}>{item.date}</p>
                      <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--color-text)' }}>
                        {item.title}
                      </h3>
                      <div className={`h-px w-12 mb-4 ${isLeft ? '' : 'ml-auto'} mx-auto md:mx-0 ${isLeft ? '' : 'md:ml-auto md:mr-0'}`}
                        style={{ background: 'var(--color-accent)', opacity: 0.4 }} />
                      <p className="font-serif text-lg leading-relaxed"
                        style={{ color: 'var(--color-text)', opacity: 0.78 }}>
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
