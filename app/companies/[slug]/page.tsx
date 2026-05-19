import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Building2 } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { companies, getCompanyBySlug } from '@/data/companies'
import { allLetters, getLetterBySlug } from '@/data/letters'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = getCompanyBySlug(params.slug)
  if (!company) return {}
  return {
    title: company.name,
    description: `${company.name} (${company.industry}) — mentioned ${company.letterCount} times in Buffett's letters.`,
  }
}

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }))
}

export default function CompanyPage({ params }: PageProps) {
  const company = getCompanyBySlug(params.slug)
  if (!company) notFound()

  const jsonLdCompany = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: `${company.name} (${company.industry}) — mentioned ${company.letterCount} times in Buffett's letters.`,
    url: `https://buffettknowledge.com/companies/${company.slug}`,
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
  }

  const relatedLetters = allLetters
    .filter((l) => l.companies.includes(company.slug))
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)

  return (
    <div>
      <JsonLd value={jsonLdCompany} />
      {/* Breadcrumb */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm" style={{ borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center h-12">
            <Link
              href="/companies"
              className="flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: '#71717A' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Companies
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
              style={{ backgroundColor: '#FEF3C7' }}
            >
              <Building2 className="w-3.5 h-3.5" style={{ color: '#92400E' }} />
              <span className="text-xs font-medium" style={{ color: '#92400E' }}>
                Company
              </span>
            </div>

            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="font-display text-4xl font-bold" style={{ color: '#18181B' }}>
                {company.name}
              </h1>
              {company.ticker && (
                <span
                  className="font-mono text-sm px-2.5 py-1 rounded"
                  style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}
                >
                  {company.ticker}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm mb-4" style={{ color: '#71717A' }}>
              <span style={{ color: '#71717A' }}>{company.industry}</span>
              <span>&bull;</span>
              <span>First mentioned: <strong style={{ color: '#18181B' }}>{company.firstMentioned}</strong></span>
              <span>&bull;</span>
              <span><strong style={{ color: '#18181B' }}>{company.letterCount}</strong> letter mentions</span>
            </div>
          </div>

          {/* Investment Timeline */}
          {company.timeline.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#18181B' }}>
                Investment Timeline
              </h2>
              <div className="space-y-4">
                {company.timeline.map((event, i) => {
                  const letter = getLetterBySlug(event.letterSlug)
                  return (
                    <div
                      key={i}
                      className="flex gap-4"
                    >
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#7EC39C' }} />
                        {i < company.timeline.length - 1 && (
                          <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#E6E2D9', minHeight: '40px' }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-sm" style={{ color: '#18181B' }}>
                            {event.year}
                          </span>
                          {event.position && (
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
                            >
                              {event.position}
                            </span>
                          )}
                        </div>
                        <blockquote
                          className="text-sm leading-relaxed italic mb-1"
                          style={{ color: '#3F3F46' }}
                        >
                          &ldquo;{event.passage}&rdquo;
                        </blockquote>
                        {letter && (
                          <Link
                            href={`/letters/${letter.slug}`}
                            className="text-xs hover:underline"
                            style={{ color: '#2D6A4F' }}
                          >
                            {letter.year} {letter.title} &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
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
              Letters Mentioning {company.name}
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
