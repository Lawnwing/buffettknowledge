import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock, ExternalLink, BookOpen } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import LetterInterpretation from '@/components/LetterInterpretation'
import ShareToolbar from '@/components/ShareToolbar'
import { getLetterBySlug, allLetters } from '@/data/letters'
import { getConceptBySlug } from '@/data/concepts'
import { getCompanyBySlug } from '@/data/companies'
import { getPersonBySlug } from '@/data/people'
import { LetterBacklinks } from '@/components/LetterBacklinks'
import { getLetterBacklinks } from '@/lib/letter-backlinks'
import LetterText from '@/components/LetterText'
import { interpretations } from '@/data/interpretations'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { fullTexts } from '@/data/fulltexts'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const letter = getLetterBySlug(params.slug)
  if (!letter) return {}
  return {
    title: `${letter.year} — ${letter.title}`,
    description: letter.summary,
  }
}

export async function generateStaticParams() {
  return allLetters.map((letter) => ({
    slug: letter.slug,
  }))
}

export default function LetterPage({ params }: PageProps) {
  const letter = getLetterBySlug(params.slug)
  if (!letter) notFound()

  const currentIndex = allLetters.findIndex((l) => l.slug === letter.slug)
  const prevLetter = currentIndex > 0 ? allLetters[currentIndex - 1] : null
  const nextLetter = currentIndex < allLetters.length - 1 ? allLetters[currentIndex + 1] : null

  const letterConcepts = letter.concepts.map((s) => getConceptBySlug(s)).filter(Boolean)
  const letterCompanies = letter.companies.map((s) => getCompanyBySlug(s)).filter(Boolean)
  const letterPeople = letter.people.map((s) => getPersonBySlug(s)).filter(Boolean)

  const interpretation = letter.interpretation || interpretations[letter.slug]

  // JSON-LD must be declared AFTER `interpretation` (line 78)
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: letter.title,
    datePublished: interpretation?.publishedDate || letter.date,
    dateModified: interpretation?.lastUpdated || letter.date,
    author: { '@type': 'Person', name: 'Warren Buffett' },
    publisher: {
      '@type': 'Organization',
      name: 'BuffettKnowledge',
      url: 'https://buffettknowledge.com',
    },
    description: letter.summary,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://buffettknowledge.com/letters/${letter.slug}`,
    },
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
    ...(letter.sourceUrl && {
      isBasedOn: {
        '@type': 'WebPage',
        url: letter.sourceUrl,
      },
    }),
  }

  const relatedLetters = allLetters
    .filter((l) => l.slug !== letter.slug && l.year >= letter.year - 2 && l.year <= letter.year + 2)
    .slice(0, 3)

  const backlinkGroups = getLetterBacklinks(letter.slug)

  const linkEntities = [
    ...concepts.map((c) => ({ name: c.name, slug: c.slug, type: 'concepts' as const })),
    ...companies.map((c) => ({ name: c.name, slug: c.slug, type: 'companies' as const })),
    ...people.map((p) => ({ name: p.name, slug: p.slug, type: 'people' as const })),
  ]

  return (
    <div>
      <JsonLd value={jsonLdArticle} />
      {/* Top Navigation Bar */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm" style={{ borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-12">
            <Link
              href="/letters"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-zinc-900"
              style={{ color: '#71717A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Letters
            </Link>
            <div className="flex items-center gap-4">
              {prevLetter && (
                <Link
                  href={`/letters/${prevLetter.slug}`}
                  className="text-xs transition-colors flex items-center gap-1 hover:text-zinc-900"
                  style={{ color: '#71717A' }}
                >
                  <ArrowLeft className="w-3 h-3" />
                  {prevLetter.year}
                </Link>
              )}
              <span className="text-xs font-mono rounded px-2 py-1" style={{ color: '#71717A', backgroundColor: '#F9F7F3' }}>
                {currentIndex + 1} / {allLetters.length}
              </span>
              {nextLetter && (
                <Link
                  href={`/letters/${nextLetter.slug}`}
                  className="text-xs transition-colors flex items-center gap-1 hover:text-zinc-900"
                  style={{ color: '#71717A' }}
                >
                  {nextLetter.year}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Main Content */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={
                    letter.type === 'partnership'
                      ? { backgroundColor: 'rgba(180, 83, 9, 0.1)', color: '#B45309' }
                      : letter.type === 'berkshire'
                      ? { backgroundColor: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }
                      : { backgroundColor: 'rgba(63, 63, 70, 0.1)', color: '#3F3F46' }
                  }
                >
                  {letter.type === 'partnership'
                    ? 'Partnership Letter'
                    : letter.type === 'berkshire'
                    ? 'Berkshire Letter'
                    : 'Special Letter'}
                </span>
                <span className="text-xs" style={{ color: '#71717A' }}>{letter.date}</span>
                <span className="text-xs flex items-center gap-1" style={{ color: '#71717A' }}>
                  <Clock className="w-3 h-3" />
                  {letter.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: '#18181B' }}>
                {letter.title}
              </h1>

              <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                {letter.summary}
              </p>

              {letter.sourceUrl && (
                <a
                  href={letter.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs transition-colors hover:underline"
                  style={{ color: '#2D6A4F' }}
                >
                  <ExternalLink className="w-3 h-3" />
                  View original on Berkshire Hathaway
                </a>
              )}
            </header>

            {/* Top Ad */}
            <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="auto" variant="inline" />

            {/* Key Quotes */}
            {letter.keyQuotes.length > 0 && (
              <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: 'rgba(180, 83, 9, 0.05)', border: '1px solid rgba(180, 83, 9, 0.2)' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: '#B45309' }}>
                  <BookOpen className="w-3.5 h-3.5" />
                  Key Quotes
                </h3>
                <div className="space-y-4">
                  {letter.keyQuotes.map((quote, i) => (
                    <blockquote
                      key={i}
                      className="border-l-2 pl-4 text-sm italic leading-relaxed"
                      style={{ borderColor: '#B45309', color: '#18181B' }}
                    >
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Letter Text: use fullTexts if available, else letter.fullText */}
            <div className="letter-text">
              {(fullTexts[letter.slug] || letter.fullText) ? (
                <LetterText
                  html={(fullTexts[letter.slug] || letter.fullText)!}
                  entities={linkEntities}
                  className="letter-text"
                />
              ) : (
                <div className="rounded-xl p-8 text-center" style={{ backgroundColor: 'rgba(249, 247, 243, 0.5)' }}>
                  <p className="text-sm" style={{ color: '#71717A' }}>
                    Full letter text is being prepared.
                    <br />
                    <Link
                      href={letter.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: '#2D6A4F' }}
                    >
                      Read the original on Berkshire Hathaway &rarr;
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Editor's Annotations */}
            {interpretation?.annotations && interpretation.annotations.length > 0 && (
              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#18181B' }}>Editor&apos;s Annotations</h2>
                {interpretation.annotations.map((ann) => (
                  <div key={ann.id} className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(249, 247, 243, 0.8)', border: '1px solid #E6E2D9' }}>
                    <blockquote className="text-sm italic mb-3" style={{ color: '#B45309' }}>&ldquo;{ann.quote}&rdquo;</blockquote>
                    <p className="text-sm leading-relaxed" style={{ color: '#18181B' }}>{ann.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Letter Interpretation */}
            {interpretation && (
              <LetterInterpretation interpretation={interpretation} />
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Concept Tags */}
            {letterConcepts.length > 0 && (
              <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#18181B' }}>
                  Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {letterConcepts.map(
                    (concept) =>
                      concept && (
                        <Link
                          key={concept.slug}
                          href={`/concepts/${concept.slug}`}
                          className="tag-concept"
                        >
                          {concept.name}
                        </Link>
                      )
                  )}
                </div>
                <p className="text-xs mt-3" style={{ color: '#71717A' }}>
                  {letterConcepts.length} concept{letterConcepts.length !== 1 ? 's' : ''} in this letter
                </p>
              </div>
            )}

            {/* Company Mentions */}
            {letterCompanies.length > 0 && (
              <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#18181B' }}>
                  Companies
                </h3>
                <div className="space-y-2">
                  {letterCompanies.map(
                    (company) =>
                      company && (
                        <Link
                          key={company.slug}
                          href={`/companies/${company.slug}`}
                          className="flex items-center gap-2 text-sm transition-colors hover:text-zinc-900"
                          style={{ color: '#71717A' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#B45309' }} />
                          <span>{company.name}</span>
                          {company.ticker && (
                            <span className="text-xs font-mono" style={{ color: 'rgba(113, 113, 122, 0.6)' }}>
                              {company.ticker}
                            </span>
                          )}
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {/* People */}
            {letterPeople.length > 0 && (
              <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#18181B' }}>
                  People
                </h3>
                <div className="space-y-2">
                  {letterPeople.map(
                    (person) =>
                      person && (
                        <Link
                          key={person.slug}
                          href={`/people/${person.slug}`}
                          className="flex items-center gap-2 text-sm transition-colors hover:text-zinc-900"
                          style={{ color: '#71717A' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#3F3F46' }} />
                          <span>{person.name}</span>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {/* Links to This Page */}
            {backlinkGroups.length > 0 && <LetterBacklinks groups={backlinkGroups} />}

            {/* Related Letters */}
            {relatedLetters.length > 0 && (
              <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#18181B' }}>
                  Nearby Letters
                </h3>
                <div className="space-y-2">
                  {relatedLetters.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/letters/${rel.slug}`}
                      className="block text-sm transition-colors hover:text-zinc-900"
                      style={{ color: '#71717A' }}
                    >
                      <span className="font-mono text-xs mr-2" style={{ color: 'rgba(113, 113, 122, 0.6)' }}>
                        {rel.year}
                      </span>
                      {rel.title.length > 40 ? rel.title.slice(0, 40) + '...' : rel.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Bottom Ad */}
            <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="auto" variant="sidebar" />
          </aside>
        </div>
      </div>

      {/* ── Below content: ad + nav inside same max-w ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* ── Inline Advertisement ─────────────────────── */}
        <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="rectangle" variant="inline" />

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 pb-12" style={{ borderTop: '1px solid #E6E2D9' }}>
          <div className="flex items-center justify-between">
            {prevLetter ? (
              <Link
                href={`/letters/${prevLetter.slug}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-zinc-900 rounded-lg px-5 py-3"
                style={{ color: '#71717A', backgroundColor: '#F5F3EF', border: '1px solid #E6E2D9' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <div>
                  <div className="text-xs" style={{ color: '#71717A' }}>Previous</div>
                  <div className="font-medium" style={{ color: '#18181B' }}>{prevLetter.year}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextLetter ? (
              <Link
                href={`/letters/${nextLetter.slug}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-zinc-900 text-right rounded-lg px-5 py-3"
                style={{ color: '#71717A', backgroundColor: '#F5F3EF', border: '1px solid #E6E2D9' }}
              >
                <div>
                  <div className="text-xs" style={{ color: '#71717A' }}>Next</div>
                  <div className="font-medium" style={{ color: '#18181B' }}>{nextLetter.year}</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* Share & Tools Toolbar */}
      <ShareToolbar
        title={`${letter.year} — ${letter.title}`}
        sourceUrl={letter.sourceUrl}
        letterYear={letter.year}
      />
    </div>
  )
}
