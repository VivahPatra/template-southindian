'use client'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  type: 'marigold' | 'kolam-dot' | 'diamond' | 'mango-leaf' | 'spark'
  color: string
  rotation: number
}

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const COLORS = ['#c9a84c', '#e8780a', '#c9a84c', '#7a1a2a', '#e8c87a']
const TYPES = ['marigold', 'marigold', 'kolam-dot', 'diamond', 'mango-leaf', 'spark'] as const

export default function SouthIndianPetals({ count = 24 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: seededRand(i * 7) * 100,
        size: 8 + seededRand(i * 3) * 14,
        delay: seededRand(i * 5) * 12,
        duration: 9 + seededRand(i * 11) * 9,
        type: TYPES[i % TYPES.length],
        color: COLORS[i % COLORS.length],
        rotation: seededRand(i * 13) * 360,
      }))
    )
  }, [count])

  if (!particles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]" aria-hidden>
      <style>{`
        @keyframes petalDrop {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.x}%`,
            animation: `petalDrop ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        >
          {/* Marigold — South Indian wedding staple, orange/gold */}
          {p.type === 'marigold' && (
            <svg viewBox="0 0 24 24" width={p.size} height={p.size} style={{ transform: `rotate(${p.rotation}deg)` }}>
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
                <ellipse key={i} cx="12" cy="12" rx="2.5" ry="6"
                  fill={p.color} opacity="0.65"
                  transform={`rotate(${deg} 12 12) translate(0,-4)`} />
              ))}
              <circle cx="12" cy="12" r="2.5" fill="#f5c842" opacity="0.9" />
            </svg>
          )}

          {/* Kolam dot — gold circle, kolam pattern element */}
          {p.type === 'kolam-dot' && (
            <svg viewBox="0 0 16 16" width={p.size * 0.6} height={p.size * 0.6}>
              <circle cx="8" cy="8" r="5" fill={p.color} opacity="0.55" />
              <circle cx="8" cy="8" r="2.5" fill="#f5e8b0" opacity="0.7" />
            </svg>
          )}

          {/* Diamond — kolam/rangoli geometric */}
          {p.type === 'diamond' && (
            <svg viewBox="0 0 16 16" width={p.size * 0.7} height={p.size * 0.7} style={{ transform: `rotate(${p.rotation}deg)` }}>
              <rect x="3" y="3" width="10" height="10" fill={p.color} opacity="0.6" transform="rotate(45 8 8)" />
              <rect x="3" y="3" width="10" height="10" fill="none" stroke="rgba(245,232,176,0.5)" strokeWidth="0.6" transform="rotate(45 8 8)" />
            </svg>
          )}

          {/* Mango leaf — torana decoration, classic South Indian */}
          {p.type === 'mango-leaf' && (
            <svg viewBox="0 0 14 28" width={p.size * 0.55} height={p.size} style={{ transform: `rotate(${p.rotation}deg)` }}>
              <ellipse cx="7" cy="15" rx="5.5" ry="12" fill="#3a6b28" opacity="0.55" />
              <ellipse cx="7" cy="15" rx="5.5" ry="12" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.5" />
              <line x1="7" y1="4" x2="7" y2="26" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
            </svg>
          )}

          {/* Spark — diya ember, tiny gold star */}
          {p.type === 'spark' && (
            <svg viewBox="0 0 16 16" width={p.size * 0.5} height={p.size * 0.5} style={{ transform: `rotate(${p.rotation}deg)` }}>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <line key={i} x1="8" y1="8"
                  x2={8 + Math.cos(deg * Math.PI / 180) * 6}
                  y2={8 + Math.sin(deg * Math.PI / 180) * 6}
                  stroke={p.color} strokeWidth="1.2" opacity="0.8" strokeLinecap="round" />
              ))}
              <circle cx="8" cy="8" r="1.5" fill="#fff8e0" opacity="0.95" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
