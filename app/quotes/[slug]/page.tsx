/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Quote, ArrowLeft, Tag } from 'lucide-react'
import { quotes } from '@/data/quotes'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return quotes.map((quote) => ({
    slug: quote.slug,
  }))
}

export default function QuoteDetailPage({ params }: PageProps) {
  const quote = quotes.find((q) => q.slug === params.slug)

  if (!quote) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: quote.text.slice(0, 50) + '...',
    description: quote.text,
    text: quote.text,
    author: { '@type': 'Person', name: 'Warren Buffett' },
    datePublished: quote.year ? `${quote.year}-01-01` : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'BuffettKnowledge',
      url: 'https://buffettknowledge.com',
    },
  }

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/quotes" className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#2D6A4F' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Quotes
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ml-3"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <Quote className="w-3 h-3" />
            Famous Quote
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold mb-6 leading-tight"
            style={{ color: '#18181B' }}>
            "{quote.text}"
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: '#71717A' }}>
            {quote.year && <span>Year: {quote.year}</span>}
            {quote.source && <span>Source: {quote.source}</span>}
          </div>
        </div>
      </div>

      {/* Context */}
      {quote.context && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Context
            </h2>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}>
              <p className="text-base leading-relaxed" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                {quote.context}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Topics */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {quote.topicTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                <Tag className="w-3 h-3" /> {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <AdUnit variant="horizontal" />
        </div>
      </div>

      {/* Related Content */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Related Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quote.sourceSlug && quote.sourceSlug !== 'undefined' && (
              <Link href={quote.sourceSlug.includes('meeting') ? `/meetings/${quote.sourceSlug}` : `/letters/${quote.sourceSlug}`}
                className="block p-4 rounded-xl border hover:shadow-md transition"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>Source</p>
                <p className="font-semibold" style={{ color: '#18181B' }}>{quote.source}</p>
              </Link>
            )}
            <Link href="/quotes"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>View All</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>All Quotes</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
