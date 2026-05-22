import type { Metadata } from 'next'
import Link from 'next/link'
import { allLetters, stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { graphData } from '@/lib/graphData'
import { ForceGraph } from '@/components/ForceGraph'
import { Network, FileText, Lightbulb, Building2, Users, ArrowRight, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Knowledge Graph',
  description: 'Explore the interconnected web of Warren Buffett\'s letters, concepts, companies, and people.',
}

export default function GraphPage() {
  // ── Featured: sort by relevance ──────────────────────────────────
  const featuredLetters = [...allLetters]
    .sort((a, b) => b.crossReferences.length - a.crossReferences.length)
    .slice(0, 6)

  const featuredConcepts = [...concepts]
    .sort((a, b) => b.letterCount - a.letterCount)
    .slice(0, 6)

  const featuredCompanies = [...companies]
    .sort((a, b) => b.letterCount - a.letterCount)
    .slice(0, 6)

  const featuredPeople = [...people]
    .sort((a, b) => b.letterCount - a.letterCount)
    .slice(0, 6)

  // ── Data insights ──────────────────────────────────────────────────
  const topLetterByRefs = [...allLetters]
    .sort((a, b) => b.crossReferences.length - a.crossReferences.length)[0]

  const conceptWithMostRefs = [...concepts]
    .sort((a, b) => b.crossReferences.length - a.crossReferences.length)[0]

  const conceptMostLetters = [...concepts]
    .sort((a, b) => b.letterCount - a.letterCount)[0]

  const yearsSet = new Set(allLetters.map((l) => l.year))
  const missingYears = Array.from(
    { length: 2025 - 1956 + 1 },
    (_, i) => 1956 + i,
  ).filter((y) => !yearsSet.has(y))

  // ── Year coverage timeline for sidebar ─────────────────────────────
  const coverageByDecade: Record<string, { total: number; present: number }> = {}
  for (let y = 1956; y <= 2025; y++) {
    const dec = `${Math.floor(y / 10) * 10}s`
    if (!coverageByDecade[dec]) coverageByDecade[dec] = { total: 0, present: 0 }
    coverageByDecade[dec].total++
    if (yearsSet.has(y)) coverageByDecade[dec].present++
  }
  const decadeEntries = Object.entries(coverageByDecade)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
      {/* ════════════════════════════════════════════════════════
          MAIN COLUMN
          ════════════════════════════════════════════════════════ */}
      <main className="min-w-0">
        {/* Header */}
        <div className="mb-10 page-header">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#F3E8FF' }}
            >
              <Network className="w-5 h-5" style={{ color: '#7C3AED' }} />
            </div>
            <h1 className="font-display text-4xl font-bold" style={{ color: '#18181B' }}>
              Knowledge Graph
            </h1>
          </div>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
            Explore the interconnected web of Warren Buffett&apos;s investment universe.{' '}
            {stats.totalLetters} letters, {concepts.length} concepts, {companies.length} companies,
            and {people.length} key people — all linked by {graphData.edges.length}+ connections.
          </p>
        </div>

        {/* Stats Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Letters',
                value: stats.totalLetters,
                icon: FileText,
                color: '#92400E',
                bg: '#FEF3C7',
                href: '/letters',
              },
              {
                label: 'Concepts',
                value: concepts.length,
                icon: Lightbulb,
                color: '#2D6A4F',
                bg: '#E9F5EF',
                href: '/concepts',
              },
              {
                label: 'Companies',
                value: companies.length,
                icon: Building2,
                color: '#52525B',
                bg: '#F4F4F5',
                href: '/companies',
              },
              {
                label: 'People',
                value: people.length,
                icon: Users,
                color: '#1C2333',
                bg: '#E8ECF4',
                href: '/people',
              },
              {
                label: 'Connections',
                value: graphData.edges.length,
                icon: Network,
                color: '#7C3AED',
                bg: '#F3E8FF',
                href: '/graph',
              },
              {
                label: 'Years Covered',
                value: stats.yearsCovered,
                icon: FileText,
                color: '#0369A1',
                bg: '#E0F2FE',
                href: '/letters',
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="group p-5 rounded-xl transition-all hover:shadow-md"
                  style={{ backgroundColor: card.bg, border: '1px solid transparent' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                    <ArrowRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ color: card.color }}
                    />
                  </div>
                  <div className="font-display text-2xl font-bold" style={{ color: card.color }}>
                    {card.value}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: card.color, opacity: 0.7 }}>
                    {card.label}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Interactive Force Graph ─────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
              Interactive Knowledge Map
            </h2>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#A1A1AA' }}>
              <Info className="w-3.5 h-3.5" />
              {graphData.nodes.length} nodes · {graphData.edges.length} connections
            </div>
          </div>

          {/* usage hint */}
          <div className="mb-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: '#71717A' }}>
            <span className="flex items-center gap-1"><span style={{ color: '#2D6A4F' }}>●</span> Click a node to open its page</span>
            <span className="flex items-center gap-1"><span style={{ color: '#2D6A4F' }}>●</span> Drag nodes to rearrange</span>
            <span className="flex items-center gap-1"><span style={{ color: '#2D6A4F' }}>●</span> Scroll to zoom</span>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #E6E2D9', backgroundColor: '#FAFAF9' }}
          >
            <ForceGraph data={graphData} height={560} />
          </div>
        </section>

        {/* ── Data Insights ─────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold mb-6" style={{ color: '#18181B' }}>
            Data Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Insight 1: Most referenced concept */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#F9F7F3' }}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                <h3 className="text-sm font-semibold" style={{ color: '#18181B' }}>Most Connected Concept</h3>
              </div>
              <p className="text-sm" style={{ color: '#3F3F46' }}>
                <strong style={{ color: '#2D6A4F' }}>{conceptWithMostRefs.name}</strong> appears
                in <strong>{conceptMostLetters.letterCount}</strong> letters and has{' '}
                <strong>{conceptWithMostRefs.crossReferences.length}</strong> cross-references.
              </p>
            </div>

            {/* Insight 2: Letter with most references */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#F9F7F3' }}>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" style={{ color: '#92400E' }} />
                <h3 className="text-sm font-semibold" style={{ color: '#18181B' }}>Most Referenced Letter</h3>
              </div>
              <p className="text-sm" style={{ color: '#3F3F46' }}>
                <strong style={{ color: '#92400E' }}>{topLetterByRefs.year} {topLetterByRefs.title}</strong>
                {' '}has <strong>{topLetterByRefs.crossReferences.length}</strong> cross-references — the most of any letter.
              </p>
            </div>

            {/* Insight 3: Year coverage */}
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#F9F7F3' }}>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4" style={{ color: '#0369A1' }} />
                <h3 className="text-sm font-semibold" style={{ color: '#18181B' }}>Year Coverage</h3>
              </div>
              <p className="text-sm" style={{ color: '#3F3F46' }}>
                <strong>{stats.yearsCovered}</strong> years covered.
                {missingYears.length > 0 && (
                  <span> Missing: {missingYears.join(', ')}.</span>
                )}
                {' '}The archive spans <strong>70 years</strong> of investment wisdom.
              </p>
            </div>
          </div>
        </section>

        {/* ── Featured Items ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Letters */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
              Top Letters by Influence
            </h2>
            <div className="space-y-2">
              {featuredLetters.map((letter) => (
                <Link
                  key={letter.slug}
                  href={`/letters/${letter.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]"
                >
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                  >
                    {letter.year}
                  </span>
                  <span className="text-sm truncate" style={{ color: '#3F3F46' }}>
                    {letter.title}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: '#A1A1AA' }}>
                    {letter.crossReferences.length} refs
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Concepts */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
              Key Concepts
            </h2>
            <div className="space-y-2">
              {featuredConcepts.map((concept) => (
                <Link
                  key={concept.slug}
                  href={`/concepts/${concept.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]"
                >
                  <Lightbulb className="w-4 h-4 flex-shrink-0" style={{ color: '#2D6A4F' }} />
                  <span className="text-sm truncate" style={{ color: '#3F3F46' }}>
                    {concept.name}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: '#A1A1AA' }}>
                    {concept.letterCount} letters
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Companies */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
              Featured Companies
            </h2>
            <div className="space-y-2">
              {featuredCompanies.map((company) => (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]"
                >
                  <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: '#52525B' }} />
                  <span className="text-sm truncate" style={{ color: '#3F3F46' }}>
                    {company.name}
                  </span>
                  {company.ticker && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-mono"
                      style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
                    >
                      {company.ticker}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* Featured People */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
              Key People
            </h2>
            <div className="space-y-2">
              {featuredPeople.map((person) => (
                <Link
                  key={person.slug}
                  href={`/people/${person.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]"
                >
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: '#1C2333' }} />
                  <span className="text-sm truncate" style={{ color: '#3F3F46' }}>
                    {person.name}
                  </span>
                  <span className="text-xs ml-auto truncate max-w-[120px]" style={{ color: '#A1A1AA' }}>
                    {person.role}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ════════════════════════════════════════════════════════
          RIGHT SIDEBAR
          ════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-6">
          {/* Quick Stats */}
          <div className="rounded-xl border p-5" style={{ borderColor: '#E6E2D9', backgroundColor: '#FAFAF9' }}>
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#18181B' }}>
              Quick Stats
            </h3>
            <div className="space-y-2 text-sm" style={{ color: '#3F3F46' }}>
              <div className="flex justify-between">
                <span>Total nodes</span>
                <span className="font-mono font-medium">{graphData.nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total connections</span>
                <span className="font-mono font-medium">{graphData.edges.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Letters with full text</span>
                <span className="font-mono font-medium">
                  {allLetters.filter((l) => l.fullText && l.fullText.length > 100).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Concepts with 5+ letters</span>
                <span className="font-mono font-medium">
                  {concepts.filter((c) => c.letterCount >= 5).length}
                </span>
              </div>
            </div>
          </div>

          {/* Year Coverage Timeline */}
          <div className="rounded-xl border p-5" style={{ borderColor: '#E6E2D9', backgroundColor: '#FAFAF9' }}>
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#18181B' }}>
              Year Coverage
            </h3>
            <div className="space-y-2">
              {decadeEntries.map(([decade, data]) => (
                <div key={decade}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#52525B' }}>
                    <span>{decade}</span>
                    <span>{data.present}/{data.total}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: data.total }, (_, i) => {
                      const year = parseInt(decade) + i
                      const hasLetter = yearsSet.has(year)
                      return (
                        <div
                          key={year}
                          className="flex-1 h-2 rounded-sm"
                          style={{
                            backgroundColor: hasLetter ? '#2D6A4F' : '#E6E2D9',
                            opacity: hasLetter ? 1 : 0.3,
                          }}
                          title={year.toString()}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: '#A1A1AA' }}>
              Green = letter available. {missingYears.length > 0 && (
                <span>Missing: {missingYears.join(', ')}</span>
              )}
            </p>
          </div>

          {/* Most Connected Nodes */}
          <div className="rounded-xl border p-5" style={{ borderColor: '#E6E2D9', backgroundColor: '#FAFAF9' }}>
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#18181B' }}>
              Most Connected Concepts
            </h3>
            <div className="space-y-1">
              {[...concepts]
                .sort((a, b) => b.crossReferences.length - a.crossReferences.length)
                .slice(0, 5)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/concepts/${c.slug}`}
                    className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-[#E6E2D9] transition-colors"
                  >
                    <span style={{ color: '#3F3F46' }}>{c.name}</span>
                    <span className="font-mono" style={{ color: '#2D6A4F' }}>{c.crossReferences.length}</span>
                  </Link>
                ))}
            </div>
          </div>

          {/* AdSense placeholder */}
          <div
            className="rounded-xl border p-5 text-center text-xs"
            style={{ borderColor: '#E6E2D9', color: '#A1A1AA' }}
          >
            Advertisement
          </div>
        </div>
      </aside>
    </div>
  )
}
