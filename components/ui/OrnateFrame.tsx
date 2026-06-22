interface OrnateFrameProps {
  size?: number
  offset?: number
}

const CornerFloral = ({ style }: { style: React.CSSProperties }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ position: 'absolute', ...style, pointerEvents: 'none', zIndex: 21 }}>
    <circle cx="8" cy="8" r="2" fill="var(--color-accent)" opacity="0.9" />
    <circle cx="8" cy="3" r="1.2" fill="var(--color-accent)" opacity="0.6" />
    <circle cx="8" cy="13" r="1.2" fill="var(--color-accent)" opacity="0.6" />
    <circle cx="3" cy="8" r="1.2" fill="var(--color-accent)" opacity="0.6" />
    <circle cx="13" cy="8" r="1.2" fill="var(--color-accent)" opacity="0.6" />
  </svg>
)

export default function OrnateFrame({ size = 40, offset = 24 }: OrnateFrameProps) {
  const base: React.CSSProperties = { position: 'absolute', width: size, height: size, zIndex: 20, pointerEvents: 'none' }
  const b = '1.5px solid var(--color-accent)'
  return (
    <>
      <div style={{ ...base, top: offset, left: offset, borderTop: b, borderLeft: b }} />
      <CornerFloral style={{ top: offset - 8, left: offset - 8 }} />
      <div style={{ ...base, top: offset, right: offset, borderTop: b, borderRight: b }} />
      <CornerFloral style={{ top: offset - 8, right: offset - 8 }} />
      <div style={{ ...base, bottom: offset, left: offset, borderBottom: b, borderLeft: b }} />
      <CornerFloral style={{ bottom: offset - 8, left: offset - 8 }} />
      <div style={{ ...base, bottom: offset, right: offset, borderBottom: b, borderRight: b }} />
      <CornerFloral style={{ bottom: offset - 8, right: offset - 8 }} />
    </>
  )
}
