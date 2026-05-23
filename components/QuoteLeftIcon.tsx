import type { CSSProperties } from 'react'

export function QuoteLeftIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`inline-flex items-center justify-center leading-none font-serif font-bold select-none ${className || ''}`}
      style={{ fontSize: '1.15em', lineHeight: 1, ...style }}
    >
      &#x201C;
    </span>
  )
}
