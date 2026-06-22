'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isCard, setIsCard] = useState(false)
  const [angle, setAngle] = useState(0)

  const mouseX = useSpring(0, { stiffness: 450, damping: 28 })
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 })
  const trailX = useSpring(0, { stiffness: 110, damping: 20 })
  const trailY = useSpring(0, { stiffness: 110, damping: 20 })

  useEffect(() => {
    setMounted(true)
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX); mouseY.set(e.clientY)
      trailX.set(e.clientX); trailY.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsCard(!!el.closest('[data-cursor-glow]'))
      setIsLink(!!el.closest('a, button, [role="button"]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [mouseX, mouseY, trailX, trailY])

  useEffect(() => {
    if (!isCard) return
    let raf: number
    const tick = () => { setAngle(a => (a + 0.5) % 360); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isCard])

  if (!mounted) return null
  const ringW = isCard ? 60 : isLink ? 44 : 32
  const dotW = isCard ? 10 : isLink ? 8 : 6

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{ x: trailX, y: trailY, width: ringW, height: ringW, translateX: -(ringW / 2), translateY: -(ringW / 2) }}
      >
        {isCard ? (
          <svg viewBox="0 0 60 60" width="100%" height="100%"
            style={{ transform: `rotate(${angle}deg)`, filter: 'drop-shadow(0 0 5px var(--color-accent))', display: 'block' }}
            aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={i} cx="30" cy="13" rx="4" ry="10" fill="var(--color-accent)"
                fillOpacity="0.72" transform={`rotate(${i * 45} 30 30)`} />
            ))}
            <circle cx="30" cy="30" r="5" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.9" />
          </svg>
        ) : (
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            border: '1.5px solid var(--color-accent)',
            opacity: isLink ? 0.75 : 0.45,
            boxShadow: isLink ? '0 0 14px rgba(201,168,76,0.35)' : '0 0 8px rgba(201,168,76,0.2)',
          }} />
        )}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: dotW, height: dotW,
          x: mouseX, y: mouseY,
          translateX: -(dotW / 2), translateY: -(dotW / 2),
          background: 'var(--color-accent)',
          boxShadow: isCard ? '0 0 14px var(--color-accent)' : '0 0 6px var(--color-accent)',
        }}
      />
    </>
  )
}
