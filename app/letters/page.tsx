import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { allLetters, stats } from '@/data/letters'
import { ArrowRight, FileText } from 'lucide-react'

const jsonLdLettersPage = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'All Letters — BuffettKnowledge',
  description: `Browse all ${stats.totalLetters} Warren Buffett shareholder letters (1956–2025).`,
  url: 'https://buffettknowledge.com/letters',
  isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
}

export const metadata: Metadata = {
  title: 'All Letters',
  description: `Browse all ${stats.totalLetters} shareholder letters from Warren Buffett, spanning the Partnership era (1956-1969) and Berkshire Hathaway (1965-2025).`,
}

/* ── Timeline visualization (SVG) ────────────────────────────────── */

function ArchiveTimeline() {
  const startYear = 1956
  const endYear = 2025
  const totalYears = endYear - startYear + 1
  const width = 340
  const height = 110
  const paddingX = 12
  const barY = 28
  const barH = 16
  const barW = width - paddingX * 2

  const partnershipStart = 1956
  const partnershipEnd = 1970
  const berkshireStart = 1971
  const berkshireEnd = 2025

  const ps = ((partnershipStart - startYear) / totalYears) * barW
  const pw = ((partnershipEnd - partnershipStart + 1) / totalYears) * barW
  const bs = ((berkshireStart - startYear) / totalYears) * barW
  const bw = ((berkshireEnd - berkshireStart + 1) / totalYears) * barW

  // Special letter years
  const specialYears = [1963, 1965, 1969]

  return (
    <div className="rounded-xl border p-4" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <h3 className="font-display text-sm font-semibold mb-3" style={{ color: '#18181B' }}>
        Archive at a Glance
      </h3>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" className="overflow-visible">
        {/* Era bars */}
        <rect x={paddingX + ps} y={barY} width={pw} height={barH} rx={4} fill="#F59E0B" opacity={0.2} />
        <rect x={paddingX + bs} y={barY} width={bw} height={barH} rx={4} fill="#2D6A4F" opacity={0.2} />

        {/* Partnership bar fill */}
        <rect x={paddingX + ps} y={barY} width={pw} height={barH} rx={4} fill="#F59E0B" opacity={0.85} />
        {/* Berkshire bar fill */}
        <rect x={paddingX + bs} y={barY} width={bw} height={barH} rx={4} fill="#2D6A4F" opacity={0.85} />

        {/* Special year markers */}
        {specialYears.map((y) => {
          const cx = paddingX + ((y - startYear) / totalYears) * barW + (barW / totalYears) / 2
          return (
            <g key={y}>
              <circle cx={cx} cy={barY + barH / 2} r={5} fill="#fff" stroke="#52525B" strokeWidth={2} />
              <text x={cx} y={barY + barH + 16} textAnchor="middle" fontSize={10} fill="#71717A">
                {y}
              </text>
            </g>
          )
        })}

        {/* Start / end labels */}
        <text x={paddingX} y={barY - 8} textAnchor="start" fontSize={11} fill="#71717A" fontWeight={500}>
          {startYear}
        </text>
        <text x={width - paddingX} y={barY - 8} textAnchor="end" fontSize={11} fill="#71717A" fontWeight={500}>
          {endYear}
        </text>

        {/* Era labels */}
        <text
          x={paddingX + ps + pw / 2}
          y={barY + barH + 32}
          textAnchor="middle"
          fontSize={10}
          fill="#92400E"
          fontWeight={600}
        >
          Partnership ({stats.partnershipLetters} letters)
        </text>
        <text
          x={paddingX + bs + bw / 2}
          y={barY + barH + 32}
          textAnchor="middle"
          fontSize={10}
          fill="#1B4332"
          fontWeight={600}
        >
          Berkshire ({stats.berkshireLetters} letters)
        </text>
      </svg>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-3" style={{ borderTop: '1px solid #E6E2D9' }}>
        {[
          { label: 'Years', value: `${startYear}–${endYear}` },
          { label: 'Letters', value: stats.totalLetters },
          { label: 'Eras', value: '2 + Special' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-sm font-bold" style={{ color: '#18181B' }}>{s.value}</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#A1A1AA' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Type badge helper ───────────────────────────────────────────── */

const typeBadgeConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  partnership: { label: 'Partnership', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  berkshire:   { label: 'Berkshire',   bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  special:     { label: 'Special',     bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200' },
}

/* ── Letter list row ─────────────────────────────────────────────── */

function LetterRow({ letter }: { letter: (typeof allLetters)[0] }) {
  const badge = typeBadgeConfig[letter.type]
  return (
    <Link
      href={`/letters/${letter.slug}`}
      className="group flex items-center gap-4 px-5 py-3.5 rounded-xl border border-[#E6E2D9] bg-white transition-all duration-150 hover:shadow-sm hover:border-[#2D6A4F]"
    >
      {/* Year */}
      <div
        className="font-display text-lg font-bold w-14 text-center flex-shrink-0"
        style={{ color: '#18181B', opacity: 0.35 }}
      >
        {letter.year}
      </div>

      {/* Divider */}
      <div className="w-px h-8 flex-shrink-0" style={{ backgroundColor: '#E6E2D9' }} />

      {/* Type icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: letter.type === 'partnership' ? '#FEF3C7' : letter.type === 'special' ? '#F4F4F5' : '#E9F5EF' }}
      >
        <FileText
          className="w-3.5 h-3.5"
          style={{ color: letter.type === 'partnership' ? '#92400E' : letter.type === 'special' ? '#52525B' : '#2D6A4F' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3
            className="font-display text-sm font-semibold truncate group-hover:text-[#2D6A4F] transition-colors"
            style={{ color: '#18181B' }}
          >
            {letter.title}
          </h3>
          <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${badge.bg} ${badge.text} ${badge.border}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-xs truncate" style={{ color: '#71717A' }}>
          {letter.summary}
        </p>
      </div>

      {/* Concepts */}
      {letter.concepts.length > 0 && (
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          {letter.concepts.slice(0, 2).map((c) => (
            <span
              key={c}
              className="text-[10px] px-2 py-0.5 rounded-full bg-sage-50 text-sage-600"
            >
              {c.replace(/-/g, ' ')}
            </span>
          ))}
          {letter.concepts.length > 2 && (
            <span className="text-[10px]" style={{ color: '#A1A1AA' }}>+{letter.concepts.length - 2}</span>
          )}
        </div>
      )}

      {/* Reading time */}
      <div className="hidden md:block text-[10px] flex-shrink-0 px-2 py-1 rounded" style={{ backgroundColor: '#F9F7F3', color: '#A1A1AA' }}>
        {letter.readingTimeMinutes} min
      </div>

      {/* Arrow */}
      <ArrowRight
        className="w-3.5 h-3.5 flex-shrink-0 transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
        style={{ color: '#2D6A4F' }}
      />
    </Link>
  )
}

/* ── Section header ──────────────────────────────────────────────── */

function SectionHeader({
  icon,
  title,
  subtitle,
  bg,
  text,
}: {
  icon: string
  title: string
  subtitle: string
  bg: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-10">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: bg }}
      >
        <span className="text-xs font-bold" style={{ color: text }}>{icon}</span>
      </div>
      <div>
        <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
          {title}
        </h2>
        <p className="text-xs" style={{ color: '#71717A' }}>{subtitle}</p>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function LettersPage() {
  const partnershipLetters = allLetters.filter((l) => l.type === 'partnership').sort((a, b) => a.year - b.year)
  const berkshireLetters = allLetters.filter((l) => l.type === 'berkshire').sort((a, b) => a.year - b.year)
  const specialLetters = allLetters.filter((l) => l.type === 'special').sort((a, b) => a.year - b.year)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <JsonLd value={jsonLdLettersPage} />

      {/* Header — two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-6">
        <div className="page-header">
          <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
            The Complete Archive
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
            {stats.totalLetters} letters spanning 70 years of investment wisdom.
            From the early Partnership years to the 2025 farewell letter.
            Each letter includes key concepts, company mentions, and cross-references.
          </p>
        </div>

        <div className="hidden lg:block">
          <ArchiveTimeline />
        </div>
      </div>

      {/* Partnership Letters */}
      <section id="partnership">
        <SectionHeader
          icon="P"
          title="Partnership Letters"
          subtitle={`${partnershipLetters.length} letters — 1956 to 1970`}
          bg="#FEF3C7"
          text="#92400E"
        />
        <div className="space-y-2">
          {partnershipLetters.map((letter) => (
            <LetterRow key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>

      {/* Berkshire Letters */}
      <section id="berkshire" className="mt-2">
        <SectionHeader
          icon="B"
          title="Berkshire Hathaway Letters"
          subtitle={`${berkshireLetters.length} letters — 1971 to 2025`}
          bg="#E9F5EF"
          text="#2D6A4F"
        />
        <div className="space-y-2">
          {berkshireLetters.map((letter) => (
            <LetterRow key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>

      {/* Special Letters */}
      <section id="special" className="mt-2">
        <SectionHeader
          icon="S"
          title="Special Letters"
          subtitle={`${specialLetters.length} milestone letters — selected for historical significance`}
          bg="#F4F4F5"
          text="#52525B"
        />
        <div className="space-y-2">
          {specialLetters.map((letter) => (
            <LetterRow key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>
    </div>
  )
}
