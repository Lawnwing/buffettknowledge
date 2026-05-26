import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { concepts, getConceptBySlug } from '@/data/concepts'
import { getLetterBySlug } from '@/data/letters'
import { getConceptStats } from '@/lib/citationStats'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const concept = getConceptBySlug(params.slug)
  if (!concept) return {}
  const pageUrl = `https://buffettknowledge.com/concepts/${concept.slug}`
  return {
    title: concept.name,
    description: concept.definition,
    openGraph: {
      title: `${concept.name} — Buffett Investment Concept`,
      description: concept.definition,
      url: pageUrl,
      siteName: 'BuffettKnowledge',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'BuffettKnowledge',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${concept.name} — BuffettKnowledge`,
      description: concept.definition,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export async function generateStaticParams() {
  return concepts.map((concept) => ({
    slug: concept.slug,
  }))
}

export default function ConceptPage({ params }: PageProps) {
  const concept = getConceptBySlug(params.slug)
  if (!concept) notFound()

  const jsonLdConcept = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: concept.name,
    description: concept.definition,
    url: `https://buffettknowledge.com/concepts/${concept.slug}`,
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'BuffettKnowledge Investment Concepts',
      url: 'https://buffettknowledge.com/concepts',
    },
  }

  const cStats = getConceptStats(params.slug)
  const citedCount = cStats?.citedInLetters ?? concept.crossReferences.length
  const keyCount = cStats?.keyCount ?? 0

  const relevantLetters = concept.crossReferences
    .map((ref) => getLetterBySlug(ref.letterSlug))
    .filter(Boolean)

  const relatedConcepts = concept.relatedConcepts
    .map((slug) => concepts.find((c) => c.slug === slug))
    .filter(Boolean)

  return (
    <div>
      <JsonLd value={jsonLdConcept} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://buffettknowledge.com/' },
          { name: 'Concepts', item: 'https://buffettknowledge.com/concepts' },
          { name: concept.name, item: `https://buffettknowledge.com/concepts/${concept.slug}` },
        ]}
      />
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm" style={{ borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center h-12">
            <Link
              href="/concepts"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-zinc-900"
              style={{ color: '#71717A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Concepts
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: 'rgba(45, 106, 79, 0.1)' }}>
              <span className="text-xs font-medium" style={{ color: '#2D6A4F' }}>
                Investment Concept
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
              {concept.name}
            </h1>

            {/* Citation stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{ color: '#71717A' }}>
              <span>First mentioned: <strong style={{ color: '#18181B' }}>{concept.firstMentioned}</strong></span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                Cited in{' '}
                <strong style={{ color: '#18181B' }}>{citedCount} letters</strong>
              </span>
              {keyCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }}>
                  {keyCount} key reference{keyCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed" style={{ color: '#18181B' }}>
              {concept.definition}
            </p>
          </div>

          {/* Cross Reference Table */}
          {concept.crossReferences.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
                Letters Mentioning &ldquo;{concept.name}&rdquo;
              </h2>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: '#E6E2D9', backgroundColor: 'rgba(249, 247, 243, 0.5)' }}>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#71717A' }}>Year</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: '#71717A' }}>Letter</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#71717A' }}>Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#E6E2D9' }}>
                    {concept.crossReferences.map((ref, i) => (
                      <tr key={i} className="transition-colors" style={{ backgroundColor: 'rgba(249, 247, 243, 0.5)' }}>
                        <td className="px-4 py-3 font-mono font-medium" style={{ color: '#18181B' }}>
                          {ref.year}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell" style={{ color: '#71717A' }}>
                          <Link
                            href={`/letters/${ref.letterSlug}`}
                            className="hover:underline"
                            style={{ color: '#2D6A4F' }}
                          >
                            View letter &rarr;
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              ref.relevance === 'first'
                                ? ''
                                : ref.relevance === 'key'
                                ? ''
                                : ref.relevance === 'refinement'
                                ? ''
                                : ''
                            }`}
                            style={
                              ref.relevance === 'first'
                                ? { backgroundColor: 'rgba(180, 83, 9, 0.1)', color: '#B45309' }
                                : ref.relevance === 'key'
                                ? { backgroundColor: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }
                                : ref.relevance === 'refinement'
                                ? { backgroundColor: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }
                                : { backgroundColor: '#F9F7F3', color: '#71717A' }
                            }
                          >
                            {ref.relevance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Related Concepts */}
          {relatedConcepts.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
                Related Concepts
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedConcepts.map(
                  (rel) =>
                    rel && (
                      <Link
                        key={rel.slug}
                        href={`/concepts/${rel.slug}`}
                        className="tag-concept"
                      >
                        {rel.name}
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
