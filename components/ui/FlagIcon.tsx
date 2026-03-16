interface FlagIconProps {
  className?: string
  color?: string
}

export default function FlagIcon({ className = '', color = '#B07826' }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 500 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Knop bovenaan */}
      <circle cx="55" cy="22" r="14" fill={color} />

      {/* Mast */}
      <rect x="48" y="22" width="14" height="538" rx="7" fill={color} />

      {/* Vlag */}
      <path
        d="
          M 62 48
          C 140 20, 220 20, 290 70
          C 360 120, 420 120, 490 80
          L 490 155
          C 420 195, 360 195, 290 145
          C 220 95, 140 95, 62 123
          Z
        "
        fill={color}
      />
    </svg>
  )
}
