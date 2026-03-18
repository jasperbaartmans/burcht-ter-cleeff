/**
 * Symbols — filled/solid pictogrammen in de huisstijl van Burcht ter Cleeff.
 *
 * Gebruik: <Symbol name="bike" className="text-forest" size={24} />
 *
 * In groene cirkel (zoals in Quote / VerhuurIntro):
 *   <SymbolBadge name="castle" />
 */

import { type SVGProps } from 'react'

// ── SVG primitives ───────────────────────────────────────────────────────────

type SymbolProps = SVGProps<SVGSVGElement> & { size?: number }

export function SymStar({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  )
}

export function SymLeaf({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.5 20c1.5-5.5 5.5-12 15-14-2 5-5 9.5-8.5 11.5C10.5 19.5 8.5 20 6.5 20z" />
      <path d="M6.5 20C7 14 12 8 21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function SymCastle({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Kantelen */}
      <rect x="3"  y="4" width="3" height="4" rx="0.5" />
      <rect x="7.5" y="4" width="3" height="4" rx="0.5" />
      <rect x="13.5" y="4" width="3" height="4" rx="0.5" />
      <rect x="18" y="4" width="3" height="4" rx="0.5" />
      {/* Muur */}
      <rect x="3" y="7" width="18" height="12" rx="1" />
      {/* Poort (uitsparing) */}
      <rect x="9.5" y="13" width="5" height="6" rx="0.5" fill="white" />
    </svg>
  )
}

export function SymLamp({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Bol */}
      <path d="M12 3a5 5 0 0 1 5 5c0 2.5-1.8 4.3-3 5.4V15h-4v-1.6C8.8 12.3 7 10.5 7 8a5 5 0 0 1 5-5z" />
      {/* Montuur */}
      <rect x="10" y="15" width="4" height="1.5" rx="0.5" />
      <rect x="10.5" y="17" width="3" height="1.5" rx="0.5" />
      <rect x="11" y="19" width="2" height="1.5" rx="0.5" />
    </svg>
  )
}

export function SymPicnicTable({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Tafelblad */}
      <rect x="3" y="10" width="18" height="2.5" rx="1" />
      {/* Bank links */}
      <rect x="1" y="14" width="9" height="2" rx="1" />
      {/* Bank rechts */}
      <rect x="14" y="14" width="9" height="2" rx="1" />
      {/* Poten */}
      <rect x="7"  y="12" width="2" height="7" rx="1" />
      <rect x="15" y="12" width="2" height="7" rx="1" />
    </svg>
  )
}

export function SymTrash({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Deksel */}
      <path d="M3 7h18v1.5H3z" />
      <path d="M9 5h6a1 1 0 0 1 1 1H8a1 1 0 0 1 1-1z" />
      {/* Bak */}
      <path d="M5 8.5l1 12a1 1 0 0 0 1 .9h10a1 1 0 0 0 1-.9l1-12H5z" />
      {/* Lijntjes */}
      <rect x="11" y="11" width="1.5" height="6" rx="0.5" fill="white" />
      <rect x="8"  y="11" width="1.5" height="6" rx="0.5" fill="white" />
      <rect x="14" y="11" width="1.5" height="6" rx="0.5" fill="white" />
    </svg>
  )
}

export function SymBike({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Wiel links */}
      <circle cx="5.5" cy="16" r="3.5" />
      <circle cx="5.5" cy="16" r="1.5" fill="white" />
      {/* Wiel rechts */}
      <circle cx="18.5" cy="16" r="3.5" />
      <circle cx="18.5" cy="16" r="1.5" fill="white" />
      {/* Frame */}
      <path d="M5.5 16L9 9h5l4.5 7" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9l4.5 7" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Stuur */}
      <path d="M16 9h4" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Zadel */}
      <path d="M8 9h3" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Hoofd */}
      <circle cx="14" cy="7" r="1.5" />
    </svg>
  )
}

export function SymNoSmoke({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Cirkel */}
      <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 5.66 13.66L4.34 6.34A8 8 0 0 1 12 4zM4.34 17.66A8 8 0 0 0 17.66 4.34L4.34 17.66z" />
      {/* Sigaret balk */}
      <rect x="5" y="13" width="10" height="2.5" rx="1" fill="currentColor" />
      <rect x="16" y="13" width="3" height="2.5" rx="1" fill="currentColor" />
    </svg>
  )
}

export function SymNoDog({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Verbodscirkel */}
      <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 5.66 13.66L4.34 6.34A8 8 0 0 1 12 4zM4.34 17.66A8 8 0 0 0 17.66 4.34L4.34 17.66z" />
      {/* Honden silhouet */}
      <path d="M8 13c0-2.2 1.8-4 4-4 .7 0 1.4.2 2 .5l-5.6 5.6C8.2 14.6 8 13.8 8 13z" />
      <path d="M14.5 10.5c.3.5.5 1 .5 1.5 0 .5-.1 1-.3 1.4L13 15h-2l-1 2h5l.5-1.5c.3-.7.5-1.6.5-2.5 0-1-.3-2-.8-2.8l-.7.3z" />
    </svg>
  )
}

export function SymWarning({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
  )
}

export function SymPerson({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
    </svg>
  )
}

export function SymShirt({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 7.5L8 4.5C8 6.4 9.8 8 12 8s4-1.6 4-3.5l4 3-2.5 2.5V20H6.5V10L4 7.5z" />
    </svg>
  )
}

export function SymDoc({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6 2h8l4 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v4h4" fill="none" />
      <rect x="8" y="10" width="8" height="1.5" rx="0.5" fill="white" />
      <rect x="8" y="13" width="8" height="1.5" rx="0.5" fill="white" />
      <rect x="8" y="16" width="5" height="1.5" rx="0.5" fill="white" />
    </svg>
  )
}

export function SymToy({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Emmertje */}
      <path d="M8 9h8l-1 9a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1L8 9z" />
      <path d="M7 9h10v1.5H7z" />
      {/* Hengsel */}
      <path d="M10 9V7a2 2 0 0 1 4 0v2" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      {/* Schepje erdoor */}
      <rect x="11" y="12" width="2" height="5" rx="1" fill="white" />
    </svg>
  )
}

export function SymSlide({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Kind */}
      <circle cx="16" cy="4" r="2" />
      {/* Glijbaan */}
      <path d="M14 6l-2 4H6v2h7l3-5.5L14 6z" />
      <path d="M12 10l-4 8h2l3.5-6L12 10z" />
      {/* Trap */}
      <path d="M14 6v-2h2V6h2V4h2v12h-2V8h-2v4h-2v-6z" />
    </svg>
  )
}

export function SymWalking({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="13" cy="4" r="2" />
      <path d="M11 8l-3 4 3 1 2 5h2l-2-5 2-2 1 3h2l-2-5-2-1-3-1z" />
      <path d="M8 12l-2 6h2l2-4-2-2z" />
    </svg>
  )
}

export function SymWater({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3C8 9 6 12.5 6 15a6 6 0 0 0 12 0c0-2.5-2-6-6-12z" />
    </svg>
  )
}

export function SymLocation({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  )
}

export function SymCamping({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Tent */}
      <path d="M12 3L3 19h18L12 3z" />
      {/* Tentopening */}
      <path d="M12 19V11l-3 8h6l-3-8z" fill="white" />
    </svg>
  )
}

export function SymFitness({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Halter */}
      <rect x="2"  y="10" width="3" height="4" rx="1" />
      <rect x="19" y="10" width="3" height="4" rx="1" />
      <rect x="4"  y="9"  width="2" height="6" rx="0.5" />
      <rect x="18" y="9"  width="2" height="6" rx="0.5" />
      <rect x="6"  y="11" width="12" height="2" rx="1" />
    </svg>
  )
}

export function SymHouse({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 12L12 3l9 9H3z" />
      <rect x="5" y="12" width="14" height="9" />
      <rect x="9.5" y="15" width="5" height="6" rx="0.5" fill="white" />
    </svg>
  )
}

export function SymShovel({ size = 24, ...props }: SymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {/* Schep blad */}
      <ellipse cx="8" cy="16" rx="4.5" ry="5" transform="rotate(-45 8 16)" />
      {/* Steel */}
      <rect x="11" y="3" width="2" height="12" rx="1" transform="rotate(-45 12 9)" />
    </svg>
  )
}

// ── Symbol map ───────────────────────────────────────────────────────────────

export const symbolMap = {
  star:         SymStar,
  leaf:         SymLeaf,
  castle:       SymCastle,
  lamp:         SymLamp,
  picnicTable:  SymPicnicTable,
  trash:        SymTrash,
  bike:         SymBike,
  noSmoke:      SymNoSmoke,
  noDog:        SymNoDog,
  warning:      SymWarning,
  person:       SymPerson,
  shirt:        SymShirt,
  doc:          SymDoc,
  toy:          SymToy,
  slide:        SymSlide,
  walking:      SymWalking,
  water:        SymWater,
  location:     SymLocation,
  camping:      SymCamping,
  fitness:      SymFitness,
  house:        SymHouse,
  shovel:       SymShovel,
} as const

export type SymbolName = keyof typeof symbolMap

interface SymbolProps2 {
  name: SymbolName
  size?: number
  className?: string
}

/** Plat icoon in currentColor */
export function Symbol({ name, size = 24, className }: SymbolProps2) {
  const Component = symbolMap[name]
  return <Component size={size} className={className} />
}

/** Icoon in groene cirkel (zoals in Quote / VerhuurIntro) */
export function SymbolBadge({ name, size = 28 }: { name: SymbolName; size?: number }) {
  const Component = symbolMap[name]
  const inner = Math.round(size * 0.57)
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-forest text-white shrink-0"
      style={{ width: size, height: size }}
    >
      <Component size={inner} />
    </span>
  )
}
