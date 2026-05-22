/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Quote, Tag, Star } from 'lucide-react'
import { quotes, stats } from '@/data/quotes'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

// Group quotes by topic
const topics = [...new Set(quotes.flatMap((q) => q.topicTags))].sort()

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Warren Buffett Quotes — BuffettKnowledge',
  description: `Explore ${stats.totalQuotes} Warren Buffett quotes, categorized by topic. Investing, business, and life wisdom.`,
  url: 'https://buffettknowledge.com/quotes',
}

export default function QuotesPage() {
  const featured = quotes.filter((q) => q.featured)
  const byTopic = (topic: string) => quotes.filter((q) => q.topicTags.includes(topic) && !q.featured)

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <Quote className="w-3 h-3" />
            {stats.totalQuotes} Quotes
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            Warren Buffett <span style={{ color: '#2D6A4F' }}>Quotes</span>
          </h1>
          <p className="text-base leading-relaxed text-justify " style={{ color: '#3F3F46', hyphens: 'auto' }}>
            The most famous, insightful, and witty things Warren Buffett has ever said.
            Categorized by topic: investing, business, and life wisdom.
          </p>
        </div>
      </div>

      {/* Featured Quotes */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div >
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
              Featured Quotes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {featured.map((quote) => (
                <Link key={quote.slug} href={`/quotes/${quote.slug}`}
                  className="block p-5 rounded-xl border hover:shadow-lg transition"
                  style={{ borderColor: '#A9D7BD', backgroundColor: '#F7FFF9' }}>
                  <div className="text-lg font-medium mb-3 leading-relaxed" style={{ color: '#18181B' }}>
                    "{quote.text}"
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quote.topicTags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                        <Tag className="w-2.5 h-2.5" /> {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                  {quote.year && (
                    <div className="text-xs mt-2" style={{ color: '#71717A' }}>{quote.year}</div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quotes by Topic */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div >
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
            Browse by Topic
          </h2>
          {topics.map((topic) => {
            const topicQuotes = byTopic(topic)
            if (topicQuotes.length === 0) return null
            return (
              <div key={topic} className="mb-6">
                <h3 className="font-display text-lg font-semibold mb-3 capitalize" style={{ color: '#2D6A4F' }}>
                  {topic.replace(/-/g, ' ')}
                </h3>
                <div className="space-y-2">
                  {topicQuotes.map((quote) => (
                    <Link key={quote.slug} href={`/quotes/${quote.slug}`}
                      className="block p-3 rounded-lg border hover:shadow-md transition"
                      style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
                      <p className="text-sm leading-relaxed mb-1" style={{ color: '#18181B' }}>
                        "{quote.text}"
                      </p>
                      <div className="text-xs" style={{ color: '#71717A' }}>
                        {quote.year && <span>{quote.year} • </span>}
                        <span>{quote.source}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
        <div >
          <AdUnit variant="horizontal" />
        </div>
      </div>
    </div>
  )
}
