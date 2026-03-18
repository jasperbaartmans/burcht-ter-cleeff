import { Clock } from 'lucide-react'

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
      <Clock size={12} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />
      {displayLabel}
    </span>
  )
}
