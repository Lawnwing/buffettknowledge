import type { Metadata } from 'next'
import { ConceptCard } from '@/components/ConceptCard'
import { concepts } from '@/data/concepts'
import { conceptStats } from '@/lib/citationStats'

export const metadata: Metadata = {
  title: 'Investment Concepts',
  description: `Explore ${concepts.length} core investment concepts from Warren Buffett's shareholder letters — from Intrinsic Value to Capital Allocation.`,
}

export default function ConceptsPage() {
  // Build a lookup for citation stats
  const statsMap = new Map(conceptStats.map((s) => [s.slug, s]))

  // Sort concepts: featured first, then by citedInLetters descending
  const sortedConcepts = [...concepts].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    const aCount = statsMap.get(a.slug)?.citedInLetters ?? a.letterCount
    const bCount = statsMap.get(b.slug)?.citedInLetters ?? b.letterCount
    return bCount - aCount
  })

  // Top 3 by citation count for the leader board
  const topThree = [...conceptStats].slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <div className="mb-8 page-header">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
          Investment Concepts
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
          {concepts.length} core investment concepts that define Buffett&apos;s philosophy,
          cross-referenced across 70 years of shareholder letters.
        </p>
      </div>

      {/* Most-cited podium */}
      <div className="mb-10 grid grid-cols-3 gap-3">
        {topThree.map((s, i) => (
          <div
            key={s.slug}
            className="rounded-xl p-4 text-center"
            style={{
              backgroundColor: i === 0 ? '#FEF3C7' : i === 1 ? '#F4F4F5' : '#FFF7ED',
              border: `1px solid ${i === 0 ? '#FDE68A' : i === 1 ? '#E4E4E7' : '#FED7AA'}`,
            }}
          >
            <div
              className="text-xl font-bold mb-1"
              style={{ color: i === 0 ? '#92400E' : i === 1 ? '#52525B' : '#C2410C' }}
            >
              #{i + 1}
            </div>
            <div className="text-sm font-medium" style={{ color: '#18181B' }}>{s.name}</div>
            <div className="text-xs mt-1" style={{ color: '#71717A' }}>
              {s.citedInLetters} letters
              {s.keyCount > 0 && ` · ${s.keyCount} key`}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedConcepts.map((concept) => {
          const s = statsMap.get(concept.slug)
          return (
            <ConceptCard
              key={concept.slug}
              concept={concept}
              citedCount={s?.citedInLetters}
              keyCount={s?.keyCount}
            />
          )
        })}
      </div>
    </div>
  )
}
