interface CoconutTreeProps {
  height?: number
  flip?: boolean
  className?: string
  animDelay?: string
  opacity?: number
}

export default function CoconutTree({
  height = 220,
  flip = false,
  className = '',
  animDelay = '0s',
  opacity = 1,
}: CoconutTreeProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        transformOrigin: 'center bottom',
        transform: `scaleX(${flip ? -1 : 1})`,
        opacity,
      }}
      aria-hidden
    >
      <svg
        width={height * 0.65}
        height={height}
        viewBox="0 0 130 220"
        style={{
          animation: `treeSway 5s ease-in-out infinite`,
          animationDelay: animDelay,
          transformOrigin: '65px 220px',
          display: 'block',
        }}
      >
        {/* Trunk — curved, textured */}
        <path
          d="M60,220 Q56,190 54,165 Q51,135 55,105 Q57,80 60,55 Q62,35 65,15"
          fill="none"
          stroke="#6B4C1C"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Trunk highlight */}
        <path
          d="M62,220 Q58,190 57,165 Q55,140 58,110 Q60,85 63,60 Q65,40 67,18"
          fill="none"
          stroke="#8B6A2E"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Trunk rings */}
        {[180, 155, 130, 108, 88, 70].map((y, i) => (
          <path
            key={i}
            d={`M${57 - i * 0.5},${y} Q${64 - i * 0.3},${y + 3} ${71 - i * 0.5},${y}`}
            fill="none"
            stroke="#5D3A10"
            strokeWidth="1.5"
            opacity="0.4"
          />
        ))}

        {/* === Fronds emanating from crown === */}

        {/* Center-left drooping frond */}
        <path
          d="M65,15 Q30,-5 5,20"
          fill="none" stroke="#1e4d14" strokeWidth="4" strokeLinecap="round"
          style={{ animation: 'frondWave 3.2s ease-in-out infinite', animationDelay: animDelay, transformOrigin: '65px 15px' }}
        />
        <path d="M65,15 Q30,2 5,20" fill="none" stroke="#2d6e1e" strokeWidth="2" opacity="0.45" strokeLinecap="round" />
        {/* Leaflets left frond */}
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
          const x = 65 + (5 - 65) * t, y = 15 + (20 - 15) * t - 8
          return <path key={i} d={`M${x},${y} Q${x - 8},${y + 12} ${x - 4},${y + 18}`} fill="none" stroke="#3a7a28" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        })}

        {/* Center-right frond */}
        <path
          d="M65,15 Q100,-5 125,15"
          fill="none" stroke="#1e4d14" strokeWidth="4" strokeLinecap="round"
          style={{ animation: 'frondWave 3.8s ease-in-out infinite', animationDelay: '0.4s', transformOrigin: '65px 15px' }}
        />
        <path d="M65,15 Q100,0 125,15" fill="none" stroke="#2d6e1e" strokeWidth="2" opacity="0.45" strokeLinecap="round" />
        {[0.25, 0.5, 0.75].map((t, i) => {
          const x = 65 + (125 - 65) * t, y = 15 + (15 - 15) * t - 8
          return <path key={i} d={`M${x},${y} Q${x + 6},${y + 14} ${x + 2},${y + 20}`} fill="none" stroke="#3a7a28" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        })}

        {/* Up-right frond */}
        <path
          d="M66,14 Q90,-10 118,5"
          fill="none" stroke="#1e4d14" strokeWidth="3.5" strokeLinecap="round"
          style={{ animation: 'frondWave 4.4s ease-in-out infinite', animationDelay: '0.8s', transformOrigin: '66px 14px' }}
        />
        <path d="M66,14 Q90,-4 118,5" fill="none" stroke="#2d6e1e" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />

        {/* Up-left frond */}
        <path
          d="M64,14 Q42,-12 15,0"
          fill="none" stroke="#1e4d14" strokeWidth="3.5" strokeLinecap="round"
          style={{ animation: 'frondWave 3.6s ease-in-out infinite', animationDelay: '0.2s', transformOrigin: '64px 14px' }}
        />

        {/* Down-right drooping frond */}
        <path
          d="M67,16 Q88,30 105,58"
          fill="none" stroke="#1e4d14" strokeWidth="3" strokeLinecap="round"
          style={{ animation: 'frondWave 5s ease-in-out infinite', animationDelay: '1s', transformOrigin: '67px 16px' }}
        />
        <path d="M67,16 Q90,38 108,60" fill="none" stroke="#2d6e1e" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />

        {/* Down-left drooping frond */}
        <path
          d="M63,16 Q44,30 28,55"
          fill="none" stroke="#1e4d14" strokeWidth="3" strokeLinecap="round"
          style={{ animation: 'frondWave 4.8s ease-in-out infinite', animationDelay: '0.6s', transformOrigin: '63px 16px' }}
        />

        {/* Top frond pointing upward */}
        <path
          d="M65,12 Q62,-18 65,-35"
          fill="none" stroke="#1e4d14" strokeWidth="2.5" strokeLinecap="round"
          style={{ animation: 'frondWave 4s ease-in-out infinite', animationDelay: '1.2s', transformOrigin: '65px 12px' }}
        />

        {/* Coconuts cluster */}
        <circle cx="59" cy="22" r="6" fill="#8B6914" />
        <circle cx="68" cy="19" r="5.5" fill="#9A7820" />
        <circle cx="63" cy="26" r="5" fill="#7A5A10" />
        {/* Coconut highlight */}
        <circle cx="57" cy="20" r="2" fill="rgba(255,255,255,0.12)" />
        <circle cx="66" cy="17" r="1.5" fill="rgba(255,255,255,0.1)" />
      </svg>
    </div>
  )
}
