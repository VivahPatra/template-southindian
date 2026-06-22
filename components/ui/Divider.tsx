import { cn } from '@/lib/utils'

export default function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 my-10', className)}>
      <div className="h-px flex-1 opacity-30" style={{ background: 'var(--color-accent)' }} />
      <img src="/assets/lantern.png" alt="" aria-hidden className="lantern-glow" style={{ width: 44, height: 'auto', objectFit: 'contain' }} />
      <div className="h-px flex-1 opacity-30" style={{ background: 'var(--color-accent)' }} />
    </div>
  )
}
