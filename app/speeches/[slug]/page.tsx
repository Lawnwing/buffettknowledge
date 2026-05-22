/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Megaphone, MapPin, Clock, ArrowLeft, Quote } from 'lucide-react'
import { speeches } from '@/data/speeches'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import LetterText from '@/components/LetterText'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return speeches.map((speech) => ({
    slug: speech.slug,
  }))
}

export default function SpeechDetailPage({ params }: PageProps) {
  const speech = speeches.find((s) => s.slug === params.slug)

  if (!speech) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: speech.title,
    description: speech.summary,
    datePublished: speech.date,
    author: { '@type': 'Person', name: 'Warren Buffett' },
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
        <div >
          <Link href="/speeches" className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#2D6A4F' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Speeches
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ml-3"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <Megaphone className="w-3 h-3" />
            Speech
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            {speech.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: '#71717A' }}>
            <span className="inline-flex items-center gap-1"><Megaphone className="w-3.5 h-3.5" /> {speech.occasion}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {speech.location}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {speech.readingTimeMinutes} min read</span>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: '#3F3F46', hyphens: 'auto' }}>
            {speech.summary}
          </p>
        </div>
      </div>

      {/* Background */}
      {speech.background && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div >
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Background
            </h2>
            <div className="letter-text" style={{ backgroundColor: '#F9F7F3', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #E6E2D9' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>{speech.background}</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Text */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div >
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Full Transcript
          </h2>
          {speech.fullText === '[[PLACEHOLDER]]' ? (
            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
              <p className="text-sm" style={{ color: '#71717A' }}>Transcript coming soon. Check back later!</p>
            </div>
          ) : (
            <div className="letter-text">
              <LetterText html={speech.fullText} />
            </div>
          )}
        </div>
      </div>

      {/* Impact */}
      {speech.impact && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div >
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Impact & Legacy
            </h2>
            <div className="letter-text" style={{ backgroundColor: '#F0FFF4', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #A9D7BD' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>{speech.impact}</p>
            </div>
          </div>
        </div>
      )}

      {/* Key Quotes */}
      {speech.keyQuotes.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
          <div >
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Key Quotes
            </h2>
            <div className="space-y-3">
              {speech.keyQuotes.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                  <Quote className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#2D6A4F' }} />
                  <span className="text-sm leading-relaxed font-medium" style={{ color: '#3F3F46' }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
        <div >
          <AdUnit variant="horizontal" />
        </div>
      </div>

      {/* Related Content */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div >
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Related Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/speeches"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>View All</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>All Speeches</p>
            </Link>
            <Link href="/letters"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>Related</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>Berkshire Letters</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
