interface StatusBadgeProps {
  status: 'open' | 'gesloten' | 'verhuurd'
  label?: string
  variant?: 'filled' | 'outline'
  className?: string
}

const statusConfig = {
  open: {
    filled: 'bg-forest text-white',
    outline: 'border border-forest text-forest',
    defaultLabel: 'Open',
  },
  gesloten: {
    filled: 'bg-sienna text-white',
    outline: 'border border-sienna text-sienna',
    defaultLabel: 'Gesloten',
  },
  verhuurd: {
    filled: 'bg-caramel text-white',
    outline: 'border border-caramel text-caramel',
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
        'text-body3 font-helvetica font-medium',
        config[variant],
        className,
      ].join(' ')}
    >
      {/* Klok icoon */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {displayLabel}
    </span>
  )
}
