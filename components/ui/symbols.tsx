'use client'

/**
 * Symbols — filled/solid pictogrammen in de huisstijl van Burcht ter Cleeff.
 * Gebaseerd op Phosphor Icons (fill weight).
 *
 * Gebruik: <Symbol name="bike" className="text-forest" size={24} />
 *
 * In groene cirkel (zoals in Quote / VerhuurIntro):
 *   <SymbolBadge name="castle" />
 */

import {
  Warning,
  Trash,
  Prohibit,
  Bicycle,
  CigaretteSlash,
  Palette,
  FileText,
  User,
  TShirt,
  Star,
  Leaf,
  CastleTurret,
  Lightbulb,
  PicnicTable,
  PersonSimpleWalk,
  Drop,
  MapPin,
  Tent,
  Barbell,
  House,
  Shovel,
  Dog,
} from '@phosphor-icons/react'
import type { Icon as PhosphorIconType } from '@phosphor-icons/react'

// ── NoDog: hond in verbodscirkel ─────────────────────────────────────────────

function NoDog({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className ?? ''}`} style={{ width: size, height: size }}>
      <Dog size={size} weight="fill" />
      <Prohibit size={size} weight="bold" className="absolute inset-0 opacity-90" />
    </span>
  )
}

// ── Symbol map ───────────────────────────────────────────────────────────────

export const symbolMap: Record<string, PhosphorIconType | 'noDog'> = {
  warning:     Warning,
  trash:       Trash,
  noDog:       'noDog',
  bike:        Bicycle,
  noSmoke:     CigaretteSlash,
  toy:         Palette,
  doc:         FileText,
  person:      User,
  shirt:       TShirt,
  star:        Star,
  leaf:        Leaf,
  castle:      CastleTurret,
  lamp:        Lightbulb,
  picnicTable: PicnicTable,
  walking:     PersonSimpleWalk,
  water:       Drop,
  location:    MapPin,
  camping:     Tent,
  fitness:     Barbell,
  house:       House,
  shovel:      Shovel,
}

export type SymbolName = keyof typeof symbolMap

interface SymbolProps {
  name: SymbolName
  size?: number
  className?: string
}

/** Plat icoon in currentColor */
export function Symbol({ name, size = 24, className }: SymbolProps) {
  if (name === 'noDog') return <NoDog size={size} className={className} />
  const Component = symbolMap[name] as PhosphorIconType
  return <Component size={size} weight="fill" className={className} />
}

/** Icoon in groene cirkel (zoals in Quote / VerhuurIntro) */
export function SymbolBadge({ name, size = 28 }: { name: SymbolName; size?: number }) {
  const inner = Math.round(size * 0.57)
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-forest text-white shrink-0"
      style={{ width: size, height: size }}
    >
      <Symbol name={name} size={inner} className="text-white" />
    </span>
  )
}
