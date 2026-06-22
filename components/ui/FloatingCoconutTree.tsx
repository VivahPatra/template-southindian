interface FloatingCoconutTreeProps {
  side: 'left' | 'right'
  maxWidth?: number
  opacity?: number
  delay?: string
}

export default function FloatingCoconutTree({
  side,
  maxWidth = 110,
  opacity = 0.55,
  delay = '0s',
}: FloatingCoconutTreeProps) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ [side]: 0, top: 0, bottom: 0, opacity, zIndex: 20 }}
      aria-hidden
    >
      <img
        src={side === 'left' ? '/assets/coconut-left.png' : '/assets/coconut-right.png'}
        alt=""
        style={{
          width: 'auto',
          height: '100%',
          maxWidth,
          objectFit: 'contain',
          objectPosition: `${side} bottom`,
          display: 'block',
          animation: 'float 5s ease-in-out infinite',
          animationDelay: delay,
        }}
      />
    </div>
  )
}
