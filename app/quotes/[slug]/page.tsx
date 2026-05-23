/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Tag, Star, BookOpen, ExternalLink } from 'lucide-react'
import { quotes } from '@/data/quotes'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import { QuoteLeftIcon } from '@/components/QuoteLeftIcon'
import { QuoteActionButtons } from '@/components/QuoteActionButtons'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const quote = quotes.find((q) => q.slug === params.slug)
  if (!quote) return {}
  return {
    title: `${quote.text.slice(0, 55)}${quote.text.length > 55 ? '...' : ''} — Warren Buffett Quote`,
    description: quote.context || `Warren Buffett quote from ${quote.source}. ${quote.text}`,
  }
}

export async function generateStaticParams() {
  return quotes.map((quote) => ({
    slug: quote.slug,
  }))
}

/* ── Sidebar components (server-rendered) ─────────────────────────── */

function FeaturedQuotesSidebar({ currentSlug }: { currentSlug: string }) {
  const featured = quotes.filter((q) => q.featured && q.slug !== currentSlug).slice(0, 5)
  if (featured.length === 0) return null

  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
        <h3 className="font-display text-sm font-bold" style={{ color: '#18181B' }}>
          Top Featured Quotes
        </h3>
      </div>
      <div className="space-y-3">
        {featured.map((q, i) => (
          <Link
            key={q.slug}
            href={`/quotes/${q.slug}`}
            className="block group"
          >
            <div className="flex gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm leading-snug group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#3F3F46' }}>
                  <span className="font-serif text-[#2D6A4F] opacity-30 mr-0.5">&#x201C;</span>
                  {q.text.length > 90 ? q.text.slice(0, 90) + '...' : q.text}
                  <span className="font-serif text-[#2D6A4F] opacity-30 ml-0.5">&#x201D;</span>
                </p>
                <p className="text-[11px] mt-1" style={{ color: '#71717A' }}>
                  {q.year} &bull; {q.source}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function RelatedQuotesSidebar({ currentQuote }: { currentQuote: typeof quotes[0] }) {
  const related = quotes.filter(
    (q) =>
      q.slug !== currentQuote.slug &&
      q.topicTags.some((t) => currentQuote.topicTags.includes(t))
  ).slice(0, 6)

  if (related.length === 0) return null

  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <div className="flex items-center gap-2 mb-4">
        <QuoteLeftIcon className="w-4 h-4" style={{ color: '#2D6A4F' }} />
        <h3 className="font-display text-sm font-bold" style={{ color: '#18181B' }}>
          Related Quotes
        </h3>
      </div>
      <div className="space-y-3">
        {related.map((q) => (
          <Link
            key={q.slug}
            href={`/quotes/${q.slug}`}
            className="block group p-3 rounded-lg transition hover:bg-[#F9F7F3]"
          >
            <p className="text-sm leading-snug group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#3F3F46' }}>
              <span className="font-serif text-[#2D6A4F] opacity-30 mr-0.5">&#x201C;</span>
              {q.text.length > 80 ? q.text.slice(0, 80) + '...' : q.text}
              <span className="font-serif text-[#2D6A4F] opacity-30 ml-0.5">&#x201D;</span>
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {q.topicTags
                .filter((t) => currentQuote.topicTags.includes(t))
                .slice(0, 2)
                .map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
                  >
                    {t.replace(/-/g, ' ')}
                  </span>
                ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SourceSidebar({ quote }: { quote: typeof quotes[0] }) {
  if (!quote.sourceSlug || quote.sourceSlug === 'undefined') return null

  const isMeeting = quote.sourceSlug.includes('meeting')
  const href = isMeeting ? `/meetings/${quote.sourceSlug}` : `/letters/${quote.sourceSlug}`

  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4" style={{ color: '#2D6A4F' }} />
        <h3 className="font-display text-sm font-bold" style={{ color: '#18181B' }}>
          Source
        </h3>
      </div>
      <Link
        href={href}
        className="flex items-center gap-2 p-3 rounded-lg transition hover:bg-[#F9F7F3] group"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#18181B' }}>
            {quote.source}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: '#71717A' }}>
            {isMeeting ? 'Annual Meeting' : 'Read the full letter'}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#A1A1AA' }} />
      </Link>
    </div>
  )
}

/* ── Main Page ────────────────────────────────────────────────────── */

export default function QuoteDetailPage({ params }: PageProps) {
  const quote = quotes.find((q) => q.slug === params.slug)

  if (!quote) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: quote.text,
    spokenByCharacter: { '@type': 'Person', name: 'Warren Buffett' },
    datePublished: quote.year ? `${quote.year}-01-01` : undefined,
    about: quote.topicTags.map((t) => t.replace(/-/g, ' ')).join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'BuffettKnowledge',
      url: 'https://buffettknowledge.com',
    },
  }

  const hasExtendedContent = quote.analysis || quote.whyItMatters || quote.howToApply

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/quotes" className="inline-flex items-center gap-1 text-sm hover:underline" style={{ color: '#2D6A4F' }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Quotes
            </Link>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
            >
              <QuoteLeftIcon className="w-3 h-3" />
              Famous Quote
            </div>
            {quote.featured && (
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
              >
                <Star className="w-3 h-3" /> Featured
              </div>
            )}
          </div>

          <div className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: '#18181B' }}>
            <span className="font-serif text-[#2D6A4F] opacity-20 text-4xl sm:text-5xl mr-1">&#x201C;</span>
            {quote.text}
            <span className="font-serif text-[#2D6A4F] opacity-20 text-4xl sm:text-5xl ml-1">&#x201D;</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm" style={{ color: '#71717A' }}>
            {quote.year && <span>Year: {quote.year}</span>}
            {quote.source && <span>Source: {quote.source}</span>}
          </div>

          <QuoteActionButtons text={quote.text} slug={quote.slug} variant="hero" />
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            {/* Left: Main content */}
            <div className="space-y-10">
              {/* Context */}
              {quote.context && (
                <div>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                    Context
                  </h2>
                  <div className="p-5 rounded-xl" style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      {quote.context}
                    </p>
                  </div>
                </div>
              )}

              {/* Analysis */}
              {quote.analysis && (
                <div>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                    Deep Dive
                  </h2>
                  <div className="p-5 rounded-xl" style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      {quote.analysis}
                    </p>
                  </div>
                </div>
              )}

              {/* Why It Matters */}
              {quote.whyItMatters && (
                <div>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                    Why It Matters Today
                  </h2>
                  <div className="p-5 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      {quote.whyItMatters}
                    </p>
                  </div>
                </div>
              )}

              {/* How to Apply */}
              {quote.howToApply && (
                <div>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                    How to Apply It
                  </h2>
                  <div className="p-5 rounded-xl" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      {quote.howToApply}
                    </p>
                  </div>
                </div>
              )}

              {/* Topics */}
              <div>
                <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                  Topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {quote.topicTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
                    >
                      <Tag className="w-3 h-3" /> {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* SEO-rich extended section for non-featured quotes */}
              {!hasExtendedContent && (
                <div>
                  <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                    About This Quote
                  </h2>
                  <div className="p-5 rounded-xl space-y-4" style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      This quote from Warren Buffett encapsulates a core principle of his investment and business philosophy.
                      Spoken in {quote.year || 'the early years of his career'}, it continues to resonate with investors,
                      entrepreneurs, and business leaders around the world.
                    </p>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      Buffett's ability to distill complex financial and business concepts into memorable, quotable wisdom
                      is one reason his annual letters and speeches are studied so widely. This particular quote touches on
                      themes including {quote.topicTags.slice(0, 3).map((t) => t.replace(/-/g, ' ')).join(', ')},
                      demonstrating the interconnected nature of his thinking across investing, business management, and life.
                    </p>
                    <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                      For more Buffett wisdom on related topics, explore our collection of{' '}
                      <Link href="/quotes" className="text-[#2D6A4F] hover:underline">quotes</Link>,{' '}
                      <Link href="/letters" className="text-[#2D6A4F] hover:underline">shareholder letters</Link>, and{' '}
                      <Link href="/books" className="text-[#2D6A4F] hover:underline">recommended books</Link>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="space-y-6">
              <FeaturedQuotesSidebar currentSlug={quote.slug} />
              <RelatedQuotesSidebar currentQuote={quote} />
              <SourceSidebar quote={quote} />

              {/* Quick Stats */}
              <div className="rounded-xl border p-5" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
                <h3 className="font-display text-sm font-bold mb-3" style={{ color: '#18181B' }}>
                  Quote Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F9F7F3' }}>
                    <div className="font-display font-bold text-lg" style={{ color: '#2D6A4F' }}>
                      {quote.year || '—'}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: '#71717A' }}>Year</div>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F9F7F3' }}>
                    <div className="font-display font-bold text-lg" style={{ color: '#2D6A4F' }}>
                      {quote.topicTags.length}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: '#71717A' }}>Topics</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-7xl mx-auto">
          <AdUnit variant="horizontal" />
        </div>
      </div>

      {/* Related Content */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Explore More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/quotes"
              className="block p-5 rounded-xl border hover:shadow-md transition group"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#F9F7F3' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <QuoteLeftIcon className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D6A4F' }}>All Quotes</span>
              </div>
              <p className="font-semibold group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#18181B' }}>
                Browse the full collection
              </p>
              <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                {quotes.length} quotes across {new Set(quotes.flatMap((q) => q.topicTags)).size} topics
              </p>
            </Link>

            <Link
              href="/letters"
              className="block p-5 rounded-xl border hover:shadow-md transition group"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#F9F7F3' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D6A4F' }}>Letters</span>
              </div>
              <p className="font-semibold group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#18181B' }}>
                Read shareholder letters
              </p>
              <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                Complete archive from 1956 to present
              </p>
            </Link>

            {quote.sourceSlug && quote.sourceSlug !== 'undefined' && (
              <Link
                href={quote.sourceSlug.includes('meeting') ? `/meetings/${quote.sourceSlug}` : `/letters/${quote.sourceSlug}`}
                className="block p-5 rounded-xl border hover:shadow-md transition group"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#F9F7F3' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D6A4F' }}>Source</span>
                </div>
                <p className="font-semibold group-hover:text-[#2D6A4F] transition-colors" style={{ color: '#18181B' }}>
                  {quote.source}
                </p>
                <p className="text-xs mt-1" style={{ color: '#71717A' }}>
                  Read the original document
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
