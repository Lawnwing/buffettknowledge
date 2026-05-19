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
  const featuredLetters = allLetters.filter((l) => l.featured).slice(0, 6)
  const featuredConcepts = concepts.filter((c) => c.featured).slice(0, 6)
  const featuredCompanies = companies.filter((c) => c.featured).slice(0, 6)
  const featuredPeople = people.filter((p) => p.featured).slice(0, 6)

  const totalCrossRefs = allLetters.reduce((sum, l) => sum + l.crossReferences.length, 0)
  const totalConceptRefs = concepts.reduce((sum, c) => sum + c.crossReferences.length, 0)

  const statsCards = [
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
      label: 'Cross-References',
      value: totalConceptRefs,
      icon: Network,
      color: '#7C3AED',
      bg: '#F3E8FF',
      href: '/letters',
    },
    {
      label: 'Years Covered',
      value: stats.yearsCovered,
      icon: FileText,
      color: '#0369A1',
      bg: '#E0F2FE',
      href: '/letters',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
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
          Explore the interconnected web of Warren Buffett&apos;s investment universe.
          {stats.totalLetters} letters, {concepts.length} concepts, {companies.length} companies,
          and {people.length} key people — all linked by {totalConceptRefs}+ cross-references.
        </p>
      </div>

      {/* Stats Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statsCards.map((card) => {
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
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: card.color }} />
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

      {/* ── Interactive Force Graph ───────────────────────────────────────── */}
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
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E6E2D9', backgroundColor: '#FAFAF9' }}
        >
          <ForceGraph data={graphData} height={560} />
        </div>
      </section>

      {/* Featured Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Letters */}
        <section>
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
            Featured Letters
          </h2>
          <div className="space-y-2">
            {featuredLetters.map((letter) => (
              <Link
                key={letter.slug}
                href={`/letters/${letter.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]"
              >
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                  {letter.year}
                </span>
                <span className="text-sm truncate" style={{ color: '#3F3F46' }}>
                  {letter.title}
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
                  <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}>
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
    </div>
  )
}
