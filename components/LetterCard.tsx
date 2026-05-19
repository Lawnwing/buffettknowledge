import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import type { Letter } from '@/data/types'

interface LetterCardProps {
  letter: Letter
  variant?: 'default' | 'featured' | 'compact'
}

const typeBadgeConfig = {
  partnership: { label: 'Partnership', bg: 'bg-amber-100', text: 'text-amber-700' },
  berkshire:   { label: 'Berkshire',   bg: 'bg-sage-100',  text: 'text-sage-700' },
  special:     { label: 'Special',     bg: 'bg-slate-100', text: 'text-slate-700' },
}

export function LetterCard({ letter, variant = 'default' }: LetterCardProps) {
  const badge = typeBadgeConfig[letter.type]

  if (variant === 'compact') {
    return (
      <Link
        href={`/letters/${letter.slug}`}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border card-hover group"
        style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ backgroundColor: '#E9F5EF' }}
        >
          <FileText className="w-4 h-4" style={{ color: '#2D6A4F' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate" style={{ color: '#18181B' }}>
            {letter.year} — {letter.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#71717A' }}>
            {letter.summary.slice(0, 60)}...
          </div>
        </div>
        <ArrowRight className="w-4 h-4 flex-shrink-0 transition-all" style={{ color: '#71717A' }} />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/letters/${letter.slug}`}
        className="block rounded-2xl border card-hover p-6 group"
        style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badge.bg} ${badge.text}`}>
              {badge.label}
            </span>
            <span className="text-xs" style={{ color: '#71717A' }}>{letter.year}</span>
          </div>
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}
          >
            {letter.readingTimeMinutes} min read
          </span>
        </div>

        <h3
          className="font-display text-xl font-semibold mb-2 group-hover:text-sage transition-colors"
          style={{ color: '#18181B' }}
        >
          {letter.title}
        </h3>

        <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717A' }}>
          {letter.summary}
        </p>

        {letter.keyQuotes.length > 0 && (
          <blockquote
            className="border-l-2 pl-3 text-sm italic mb-4"
            style={{ borderColor: '#7EC39C', color: '#71717A' }}
          >
            &ldquo;{letter.keyQuotes[0].slice(0, 120)}...&rdquo;
          </blockquote>
        )}

        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {letter.concepts.slice(0, 3).map((concept) => (
              <span key={concept} className="tag-concept text-xs">
                {concept.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <span
            className="ml-auto text-xs font-medium flex items-center gap-1 transition-transform"
            style={{ color: '#2D6A4F' }}
          >
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link
      href={`/letters/${letter.slug}`}
      className="block rounded-xl border card-hover p-5 group"
      style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
        <span className="font-display font-bold text-sm" style={{ color: '#18181B', opacity: 0.4 }}>
          {letter.year}
        </span>
      </div>

      <h3
        className="font-display text-lg font-semibold mb-2 group-hover:text-sage transition-colors"
        style={{ color: '#18181B' }}
      >
        {letter.title}
      </h3>

      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#71717A' }}>
        {letter.summary}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {letter.concepts.slice(0, 2).map((concept) => (
            <span key={concept} className="tag-concept">
              {concept.replace(/-/g, ' ')}
            </span>
          ))}
          {letter.concepts.length > 2 && (
            <span className="text-xs" style={{ color: '#71717A' }}>
              +{letter.concepts.length - 2} more
            </span>
          )}
        </div>
        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}>
          {letter.readingTimeMinutes} min
        </span>
      </div>
    </Link>
  )
}
