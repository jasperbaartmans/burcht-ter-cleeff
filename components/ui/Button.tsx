import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'ghost' | 'arrow' | 'text-arrow' | 'caramel' | 'sienna'
type Size = 'sm' | 'md' | 'lg'

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
  href?: never
  variant?: Variant
  size?: Size
  children?: ReactNode
}

interface ButtonAsLink {
  as: 'link'
  href: string
  target?: string
  rel?: string
  variant?: Variant
  size?: Size
  children?: ReactNode
  className?: string
  'aria-label'?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-body3',
  md: 'px-6 py-3 text-body2',
  lg: 'px-8 py-4 text-body1',
}

const arrowSizeClasses: Record<Size, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-xl',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-forest text-white hover:bg-forest/90 active:scale-95 rounded-full font-walsheim font-medium',
  ghost:
    'border border-forest text-forest hover:bg-forest/10 active:scale-95 rounded-full font-walsheim font-medium',
  caramel:
    'bg-caramel text-white hover:bg-caramel/90 active:scale-95 rounded-full font-walsheim font-medium',
  sienna:
    'bg-sienna text-white hover:bg-sienna/90 active:scale-95 rounded-full font-walsheim font-medium',
  'text-arrow':
    'text-forest hover:text-forest/80 font-walsheim font-medium flex items-center gap-2 group',
  arrow:
    'bg-forest text-white hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-transform',
}

function buildClasses(variant: Variant, size: Size, extra = '') {
  const isArrow = variant === 'arrow'
  const isTextArrow = variant === 'text-arrow'
  const base =
    'inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2'
  const sizing = isArrow
    ? arrowSizeClasses[size]
    : isTextArrow
    ? ''
    : sizeClasses[size]
  return [base, sizing, variantClasses[variant], extra].filter(Boolean).join(' ')
}

function renderContent(variant: Variant, children?: ReactNode) {
  if (variant === 'arrow') return <span aria-hidden="true">→</span>
  if (variant === 'text-arrow') {
    return (
      <>
        <span>{children}</span>
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </>
    )
  }
  return children
}

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary'
  const size = props.size ?? 'md'

  if (props.as === 'link') {
    const { href, target, rel, children, className, 'aria-label': ariaLabel } = props
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={buildClasses(variant, size, className)}
      >
        {renderContent(variant, children)}
      </Link>
    )
  }

  const { as: _omit, variant: _v, size: _s, children, className, ...rest } = props as ButtonAsButton & { as?: string; variant?: Variant; size?: Size; className?: string }
  return (
    <button className={buildClasses(variant, size, className)} {...rest}>
      {renderContent(variant, children)}
    </button>
  )
}
