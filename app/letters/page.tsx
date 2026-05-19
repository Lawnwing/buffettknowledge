import type { Metadata } from 'next'
import { LetterCard } from '@/components/LetterCard'
import { JsonLd } from '@/components/JsonLd'
import { allLetters, stats } from '@/data/letters'

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

export default function LettersPage() {
  const partnershipLetters = allLetters.filter((l) => l.type === 'partnership')
  const berkshireLetters = allLetters.filter((l) => l.type === 'berkshire')
  const specialLetters = allLetters.filter((l) => l.type === 'special')

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <JsonLd value={jsonLdLettersPage} />
      {/* Header */}
      <div className="mb-10 page-header">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
          The Complete Archive
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
          {stats.totalLetters} letters spanning 70 years of investment wisdom.
          From the early Partnership years to the 2025 farewell letter.
          Each letter includes key concepts, company mentions, and cross-references.
        </p>
      </div>

      {/* Partnership Letters */}
      <section id="partnership" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#FEF3C7' }}
          >
            <span className="text-xs font-bold" style={{ color: '#92400E' }}>P</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold" style={{ color: '#18181B' }}>
              Partnership Letters
            </h2>
            <p className="text-xs" style={{ color: '#71717A' }}>
              {partnershipLetters.length} letters — 1956 to 1969
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partnershipLetters.map((letter) => (
            <LetterCard key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>

      {/* Berkshire Letters */}
      <section id="berkshire" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#E9F5EF' }}
          >
            <span className="text-xs font-bold" style={{ color: '#2D6A4F' }}>B</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold" style={{ color: '#18181B' }}>
              Berkshire Hathaway Letters
            </h2>
            <p className="text-xs" style={{ color: '#71717A' }}>
              {berkshireLetters.length} letters — 1965 to 2025
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {berkshireLetters.map((letter) => (
            <LetterCard key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>

      {/* Special Letters */}
      <section id="special">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#E4E4E7' }}
          >
            <span className="text-xs font-bold" style={{ color: '#52525B' }}>S</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold" style={{ color: '#18181B' }}>
              Special Letters
            </h2>
            <p className="text-xs" style={{ color: '#71717A' }}>
              {specialLetters.length} milestone letters — selected for historical significance
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {specialLetters.map((letter) => (
            <LetterCard key={letter.slug} letter={letter} />
          ))}
        </div>
      </section>
    </div>
  )
}
