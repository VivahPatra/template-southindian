'use client'

interface DevAssetLabelProps {
  path: string
  children: React.ReactNode
  className?: string
}

export default function DevAssetLabel({ path, children, className = '' }: DevAssetLabelProps) {
  if (process.env.NODE_ENV !== 'development') return <>{children}</>
  return (
    <div className={`relative group/dev ${className}`}>
      {children}
      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none opacity-0 group-hover/dev:opacity-100 transition-opacity duration-150 flex items-center gap-1.5 px-2 py-1.5"
        style={{ background: 'rgba(0,0,0,0.85)' }}>
        <span className="font-mono text-[10px] truncate" style={{ color: '#facc15' }}>{path}</span>
      </div>
      <div className="absolute top-1 left-1 z-50 pointer-events-none px-1 py-0.5 rounded-sm font-mono text-[8px] leading-none opacity-70"
        style={{ background: 'rgba(250,204,21,0.15)', color: '#facc15', border: '1px solid rgba(250,204,21,0.3)' }}>
        asset
      </div>
    </div>
  )
}
