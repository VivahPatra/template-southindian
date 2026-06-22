interface WaveTransitionProps {
  fromColor: string
  toColor: string
  height?: number
  flipped?: boolean
  boatDelay?: number
}

export default function WaveTransition({
  fromColor,
  toColor,
  height = 90,
  flipped = false,
  boatDelay = 0,
}: WaveTransitionProps) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        height,
        background: fromColor,
        marginBottom: -1,
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
      aria-hidden
    >
      {/* Back wave — slow, full opacity */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full"
        style={{ width: '200%', animation: 'wave1 12s linear infinite' }}
      >
        <path
          d="M0,45 C160,90 320,0 480,45 C640,90 800,0 960,45 C1120,90 1280,0 1440,45 L1440,90 L0,90 Z"
          fill={toColor} opacity="0.5"
        />
      </svg>

      {/* Mid wave */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full"
        style={{ width: '200%', animation: 'wave2 9s linear infinite' }}
      >
        <path
          d="M0,25 C200,75 400,5 600,35 C800,65 1000,15 1200,45 C1320,65 1400,30 1440,45 L1440,90 L0,90 Z"
          fill={toColor} opacity="0.4"
        />
      </svg>

      {/* Front wave — fast */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full"
        style={{ width: '300%', animation: 'wave3 7s linear infinite' }}
      >
        <path
          d="M0,55 C120,30 240,70 360,50 C480,30 600,65 720,50 C840,35 960,60 1080,45 C1200,30 1320,55 1440,45 L1440,90 L0,90 Z"
          fill={toColor} opacity="0.6"
        />
      </svg>

      {/* Boat — inner overflow wrapper guarantees clean clip */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 10, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
        <div style={{ position: 'absolute', bottom: 8, left: 0, animation: `boatSailSection 16s linear infinite`, animationDelay: `${boatDelay}s` }}>
          <div style={{ animation: 'boatBob 3.5s ease-in-out infinite' }}>
            <img src="/assets/boat.png" alt="" style={{ height: 52, width: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Solid base */}
      <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: toColor }} />
    </div>
  )
}
