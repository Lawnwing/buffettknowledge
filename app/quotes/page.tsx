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

/* ── Right-side illustration ─────────────────────────────────────── */

function QuotesIllustration() {
  return (
    <div className="rounded-xl border p-5 w-full max-w-[380px]" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <svg viewBox="0 0 340 220" width="100%" className="overflow-visible">
        {/* Background circles */}
        <circle cx="170" cy="110" r="90" fill="#E9F5EF" opacity={0.5} />
        <circle cx="170" cy="110" r="65" fill="#E9F5EF" opacity={0.4} />

        {/* Large decorative quote marks */}
        <text x="90" y="105" fontSize="72" fill="#2D6A4F" opacity={0.1} fontFamily="serif" fontWeight="bold">"</text>
        <text x="230" y="165" fontSize="72" fill="#2D6A4F" opacity={0.1} fontFamily="serif" fontWeight="bold">"</text>

        {/* Central quote bubble */}
        <rect x="115" y="75" width="110" height="70" rx="12" fill="#2D6A4F" opacity={0.85} />
        <polygon points="155,145 165,160 175,145" fill="#2D6A4F" opacity={0.85} />

        {/* Lines inside bubble */}
        <line x1="130" y1="95" x2="210" y2="95" stroke="#fff" strokeWidth="2" opacity={0.5} strokeLinecap="round" />
        <line x1="130" y1="108" x2="200" y2="108" stroke="#fff" strokeWidth="2" opacity={0.4} strokeLinecap="round" />
        <line x1="130" y1="121" x2="205" y2="121" stroke="#fff" strokeWidth="2" opacity={0.35} strokeLinecap="round" />

        {/* Small floating quote bubbles */}
        <rect x="80" y="55" width="36" height="24" rx="6" fill="#E9F5EF" opacity={0.9} />
        <polygon points="95,79 100,88 105,79" fill="#E9F5EF" opacity={0.9} />
        <line x1="88" y1="64" x2="108" y2="64" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.3} strokeLinecap="round" />
        <line x1="88" y1="71" x2="103" y2="71" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} strokeLinecap="round" />

        <rect x="225" y="60" width="40" height="26" rx="6" fill="#E9F5EF" opacity={0.85} />
        <polygon points="242,86 248,96 254,86" fill="#E9F5EF" opacity={0.85} />
        <line x1="233" y1="70" x2="257" y2="70" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.25} strokeLinecap="round" />
        <line x1="233" y1="77" x2="250" y2="77" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} strokeLinecap="round" />

        {/* Bottom small bubble */}
        <rect x="200" y="140" width="34" height="22" rx="5" fill="#E9F5EF" opacity={0.8} />
        <polygon points="212,162 217,170 222,162" fill="#E9F5EF" opacity={0.8} />
        <line x1="208" y1="148" x2="226" y2="148" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} strokeLinecap="round" />

        {/* Decorative stars */}
        <text x="70" y="145" fontSize="12" fill="#F59E0B" opacity={0.3}>★</text>
        <text x="265" y="125" fontSize="14" fill="#F59E0B" opacity={0.35}>★</text>
      </svg>
      <div className="text-center mt-1">
        <div className="font-display text-sm font-semibold" style={{ color: '#18181B' }}>
          Timeless Wisdom
        </div>
        <div className="text-[11px]" style={{ color: '#71717A' }}>
          {stats.totalQuotes} quotes • Investing, business & life
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function QuotesPage() {
  const featured = quotes.filter((q) => q.featured)
  const byTopic = (topic: string) => quotes.filter((q) => q.topicTags.includes(topic) && !q.featured)

  return (
    <div className="max-w-7xl mx-auto">
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                <Quote className="w-3 h-3" />
                {stats.totalQuotes} Quotes
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
                Warren Buffett <span style={{ color: '#2D6A4F' }}>Quotes</span>
              </h1>
              <p className="text-base leading-relaxed text-justify" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                The most famous, insightful, and witty things Warren Buffett has ever said.
                Categorized by topic: investing, business, and life wisdom.
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <QuotesIllustration />
            </div>
          </div>
      </div>

      {/* Featured Quotes */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
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
      )}

      {/* Quotes by Topic */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
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
                        {quote.year && <span>{quote.year} &bull; </span>}
                        <span>{quote.source}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
          <AdUnit variant="horizontal" />
      </div>
    </div>
  )
}
