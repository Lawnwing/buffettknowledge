'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import type { Concept } from '@/data/types'

interface BacklinkGroup {
  concept: Concept
  refs: {
    letterSlug: string
    year: number
    passage: string
    relevance: string
  }[]
}

interface LetterBacklinksProps {
  groups: BacklinkGroup[]
}

export function LetterBacklinks({ groups }: LetterBacklinksProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [allExpanded, setAllExpanded] = useState(true)

  const totalRefs = groups.reduce((sum, g) => sum + g.refs.length, 0)

  if (groups.length === 0) return null

  const toggleGroup = (slug: string) => {
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  const toggleAll = () => {
    const next = !allExpanded
    setAllExpanded(next)
    const nextMap: Record<string, boolean> = {}
    groups.forEach((g) => {
      nextMap[g.concept.slug] = next
    })
    setExpanded(nextMap)
  }

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2" style={{ color: '#18181B' }}>
          <BookOpen className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
          Links to This Page
          <span
            className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}
          >
            {totalRefs}
          </span>
        </h3>
        <button
          onClick={toggleAll}
          className="text-[10px] font-medium px-2 py-1 rounded transition-colors hover:bg-[#F1F5F9]"
          style={{ color: '#64748B' }}
        >
          {allExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Groups */}
      <div className="space-y-2">
        {groups.map((group) => {
          const isOpen = expanded[group.concept.slug] ?? allExpanded
          return (
            <div
              key={group.concept.slug}
              className="rounded-lg overflow-hidden transition-colors"
              style={{ backgroundColor: isOpen ? '#FAFAF9' : 'transparent' }}
            >
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.concept.slug)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F5F5F4] transition-colors rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: '#1B4332' }}>
                    {group.concept.name}
                  </span>
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
                  >
                    {group.refs.length}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" style={{ color: '#A1A1AA' }} />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: '#A1A1AA' }} />
                )}
              </button>

              {/* Group content */}
              {isOpen && (
                <div className="px-3 pb-3 space-y-3">
                  {group.refs.map((ref, i) => (
                    <div key={i} className="space-y-1.5">
                      <blockquote
                        className="text-xs leading-relaxed pl-3 border-l-2 italic"
                        style={{ borderColor: '#D6D3D1', color: '#52525B' }}
                      >
                        &ldquo;{ref.passage}&rdquo;
                      </blockquote>
                      <div className="flex items-center justify-between pl-3">
                        <span className="text-[10px]" style={{ color: '#A1A1AA' }}>
                          —— {ref.year} Letter
                        </span>
                        <Link
                          href={`/letters/${ref.letterSlug}`}
                          className="text-[10px] font-medium transition-colors hover:underline"
                          style={{ color: '#2D6A4F' }}
                        >
                          View original &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Link
                    href={`/concepts/${group.concept.slug}`}
                    className="inline-block text-[10px] font-medium transition-colors hover:underline mt-1"
                    style={{ color: '#2D6A4F' }}
                  >
                    View concept page &rarr;
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
