import type React from 'react'

interface BlogTagProps {
  tag: string
  small?: boolean
  active?: boolean
}

export function BlogTag({ tag, small = false, active = false }: BlogTagProps) {
  const label = tag.replace(/-/g, ' ')
  const activeStyles: React.CSSProperties = active
    ? { backgroundColor: '#2D6A4F', color: '#fff' }
    : { backgroundColor: '#E9F5EF', color: '#1B4332' }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium transition-colors ${
        small ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={activeStyles}
    >
      {label}
    </span>
  )
}
