export default function ScrollBoat() {
  return (
    <div
      className="fixed z-30 pointer-events-none select-none"
      style={{ bottom: '4vh', left: 0, animation: 'boatSail 20s linear infinite' }}
      aria-hidden
    >
      <div style={{ animation: 'boatBob 3.5s ease-in-out infinite' }}>
        <img
          src="/assets/boat.webp"
          alt=""
          style={{ height: 70, width: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}
