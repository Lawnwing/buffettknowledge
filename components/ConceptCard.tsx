import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import type { Concept } from '@/data/types'

interface ConceptCardProps {
  concept: Concept
  /** Pass the actual cross-reference count if available */
  citedCount?: number
  keyCount?: number
}

export function ConceptCard({ concept, citedCount, keyCount }: ConceptCardProps) {
  const displayCount = citedCount ?? concept.letterCount
  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="block rounded-xl border card-hover p-5 group"
      style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#E9F5EF' }}
        >
          <BookOpen className="w-4 h-4" style={{ color: '#2D6A4F' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold group-hover:text-sage transition-colors"
            style={{ color: '#18181B' }}
          >
            {concept.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#71717A' }}>
            First mentioned {concept.firstMentioned}
          </p>
        </div>
        {keyCount != null && keyCount > 0 && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ backgroundColor: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }}
          >
            {keyCount} key
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#71717A' }}>
        {concept.definition}
      </p>

      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}
        >
          Cited in {displayCount} letters
        </span>
        <span
          className="text-xs font-medium flex items-center gap-1 transition-transform"
          style={{ color: '#2D6A4F' }}
        >
          Explore <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
