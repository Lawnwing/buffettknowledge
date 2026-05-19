import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Users } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { people, getPersonBySlug } from '@/data/people'
import { allLetters, getLetterBySlug } from '@/data/letters'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const person = getPersonBySlug(params.slug)
  if (!person) return {}
  return {
    title: person.name,
    description: `${person.name} — ${person.role}. Mentioned in ${person.letterCount} of Buffett's letters.`,
  }
}

export async function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }))
}

export default function PersonPage({ params }: PageProps) {
  const person = getPersonBySlug(params.slug)
  if (!person) notFound()

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: `${person.name} — ${person.role}. Mentioned in ${person.letterCount} of Buffett's letters.`,
    url: `https://buffettknowledge.com/people/${person.slug}`,
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
  }

  const relatedLetters = allLetters
    .filter((l) => l.people.includes(person.slug))
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)

  return (
    <div>
      <JsonLd value={jsonLdPerson} />
      {/* Breadcrumb */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm" style={{ borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center h-12">
            <Link
              href="/people"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: '#71717A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All People
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: '#F1F5F9' }}
            >
              <Users className="w-3.5 h-3.5" style={{ color: '#475569' }} />
              <span className="text-xs font-medium" style={{ color: '#475569' }}>Key Person</span>
            </div>

            <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#18181B' }}>
              {person.name}
            </h1>

            <p className="text-sm mb-3" style={{ color: '#71717A' }}>{person.role}</p>

            <div className="flex items-center gap-4 text-sm mb-6" style={{ color: '#71717A' }}>
              <span>Since <strong style={{ color: '#18181B' }}>{person.firstMentioned}</strong></span>
              <span>&bull;</span>
              <span><strong style={{ color: '#18181B' }}>{person.letterCount}</strong> mentions</span>
              {person.quotes.length > 0 && (
                <>
                  <span>&bull;</span>
                  <span><strong style={{ color: '#18181B' }}>{person.quotes.length}</strong> quotes</span>
                </>
              )}
            </div>

            <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
              {person.relationship}
            </p>
          </div>

          {/* Quotes */}
          {person.quotes.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
                Buffett on {person.name.split(' ')[0]}
              </h2>
              <div className="space-y-4">
                {person.quotes.map((quote, i) => {
                  const letter = getLetterBySlug(quote.letterSlug)
                  return (
                    <blockquote
                      key={i}
                      className="rounded-xl p-5 italic text-sm leading-relaxed"
                      style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9', borderLeft: '3px solid #7EC39C' }}
                    >
                      <p className="mb-3" style={{ color: '#18181B' }}>&ldquo;{quote.passage}&rdquo;</p>
                      <footer className="text-xs" style={{ color: '#71717A' }}>
                        {letter ? (
                          <Link href={`/letters/${letter.slug}`} className="hover:underline" style={{ color: '#2D6A4F' }}>
                            {letter.year} {letter.title}
                          </Link>
                        ) : (
                          <span>{quote.year}</span>
                        )}
                      </footer>
                    </blockquote>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Related Letters ────────────────────────────── */}
      {relatedLetters.length > 0 && (
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid #E6E2D9' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
              Letters Mentioning {person.name.split(' ').slice(-1)[0]}
            </h2>
            <Link href="/letters" className="text-sm" style={{ color: '#2D6A4F' }}>
              All Letters →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLetters.map((letter) => (
              <Link
                key={letter.slug}
                href={`/letters/${letter.slug}`}
                className="rounded-xl p-4 transition-shadow hover:shadow-md"
                style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
              >
                <div className="font-mono text-xs font-bold mb-2" style={{ color: '#2D6A4F' }}>
                  {letter.year}
                </div>
                <div className="text-sm font-medium mb-2 line-clamp-2" style={{ color: '#18181B' }}>
                  {letter.title}
                </div>
                <div className="text-xs line-clamp-2" style={{ color: '#71717A' }}>
                  {letter.summary}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
