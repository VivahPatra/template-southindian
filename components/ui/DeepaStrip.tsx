'use client'
import { motion } from 'framer-motion'

const ASSET_MAP = {
  diya:       { src: '/assets/diya.png',       cls: 'lantern-glow', sizes: [36,40,50,44,56,42,52,38,48] },
  bananaleaf: { src: '/assets/bananaleaf.png', cls: 'leaf-sway',    sizes: [52,44,60,48,64,46,58,42,54] },
  lantern:    { src: '/assets/lantern.png',    cls: 'lantern-glow', sizes: [42,50,46,56,40,52,44,58,48] },
}

const POSITIONS = ['4%','13%','23%','33%','43%','53%','63%','73%','83%']
const DELAYS    = [0.0, 0.5, 0.2, 0.8, 0.1, 0.6, 0.3, 0.9, 0.4]
const OPACITIES = [0.88,0.65,0.92,0.68,0.95,0.70,0.88,0.62,0.85]
const BOB_DURS  = [3.2, 3.8, 3.4, 4.1, 3.0, 3.9, 3.5, 4.3, 3.6]

type Theme = 'diya' | 'bananaleaf' | 'lantern'
interface Props { bgColor?: string; theme?: Theme }

export default function DeepaStrip({ bgColor = 'transparent', theme = 'diya' }: Props) {
  const asset = ASSET_MAP[theme]

  return (
    <div
      className="relative overflow-hidden w-full kolam-bg"
      style={{ height: 120, background: bgColor }}
      aria-hidden
    >
      {/* Gold shimmer lines */}
      {[30, 52, 72].map((pct, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${pct}%`, height: 1,
            background: 'linear-gradient(to right, transparent 5%, rgba(201,168,76,0.22) 30%, rgba(201,168,76,0.35) 50%, rgba(201,168,76,0.22) 70%, transparent 95%)',
          }}
          animate={{ scaleX: [0.65, 1.05, 0.65], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + i * 1.2, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        />
      ))}

      {/* Kolam dot accent row */}
      <div className="absolute left-0 right-0" style={{ top: '48%', height: 1, opacity: 0.12,
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.8) 1px, transparent 1px)',
        backgroundSize: '18px 100%' }} />

      {/* Elements — bob continuously */}
      {POSITIONS.map((x, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, bottom: -asset.sizes[i] * 0.15, opacity: OPACITIES[i] }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: BOB_DURS[i], repeat: Infinity, delay: DELAYS[i], ease: 'easeInOut' }}
        >
          <img
            src={asset.src}
            alt=""
            className={asset.cls}
            style={{ width: asset.sizes[i], height: 'auto', display: 'block' }}
          />
        </motion.div>
      ))}
    </div>
  )
}
