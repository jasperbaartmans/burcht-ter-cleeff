function ClockIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  )
}

interface StatusBadgeProps {
  status: 'open' | 'gesloten' | 'verhuurd'
  label?: string
  variant?: 'filled' | 'outline'
  className?: string
}

const statusConfig = {
  open: {
    filled: 'bg-forest text-white',
    outline: 'bg-ivory border border-forest text-forest',
    defaultLabel: 'Open',
  },
  gesloten: {
    filled: 'bg-sienna text-white',
    outline: 'bg-ivory border border-sienna text-sienna',
    defaultLabel: 'Gesloten',
  },
  verhuurd: {
    filled: 'bg-caramel text-white',
    outline: 'bg-ivory border border-caramel text-caramel',
    defaultLabel: 'Verhuurd',
  },
}

export default function StatusBadge({
  status,
  label,
  variant = 'filled',
  className = '',
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const displayLabel = label ?? config.defaultLabel

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full py-[10px] pl-4 pr-[26px]',
        'text-body3 font-dm-sans font-medium',
        config[variant],
        className,
      ].join(' ')}
    >
      <ClockIcon size={12} className="shrink-0" />
      {displayLabel}
    </span>
  )
}
