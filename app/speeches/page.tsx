/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Megaphone, MapPin, Clock } from 'lucide-react'
import { speeches, stats } from '@/data/speeches'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Warren Buffett Speeches — BuffettKnowledge',
  description: `Explore ${stats.totalSpeeches} famous Warren Buffett speeches. Full transcripts, background, and analysis.`,
  url: 'https://buffettknowledge.com/speeches',
}

export default function SpeechesPage() {
  const featured = speeches.filter((s) => s.featured)
  const others = speeches.filter((s) => !s.featured)

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <Megaphone className="w-3 h-3" />
            {stats.totalSpeeches} Famous Speeches
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            Warren Buffett <span style={{ color: '#2D6A4F' }}>Speeches</span>
          </h1>
          <p className="text-base leading-relaxed text-justify max-w-2xl" style={{ color: '#3F3F46', hyphens: 'auto' }}>
            From Columbia Business School to the University of Florida, explore Buffett's most influential talks.
            Full transcripts, background analysis, and enduring investment wisdom.
          </p>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
              Featured Speeches
            </h2>
            <div className="space-y-4">
              {featured.map((speech) => (
                <Link key={speech.slug} href={`/speeches/${speech.slug}`}
                  className="block p-6 rounded-xl border hover:shadow-lg transition"
                  style={{ borderColor: '#A9D7BD', backgroundColor: '#F7FFF9' }}>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm" style={{ color: '#71717A' }}>
                    <span className="inline-flex items-center gap-1"><Megaphone className="w-3.5 h-3.5" /> {speech.occasion}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {speech.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {speech.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#18181B' }}>
                    {speech.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#3F3F46' }}>{speech.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {speech.keyQuotes.slice(0, 2).map((q, i) => (
                      <span key={i} className="inline-flex items-start gap-1 text-xs p-2 rounded-lg"
                        style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                        "{q.slice(0, 80)}..."
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Speeches Grid */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
            All Speeches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {speeches.map((speech) => (
              <Link key={speech.slug} href={`/speeches/${speech.slug}`}
                className="block p-4 rounded-xl border hover:shadow-md transition"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
                <div className="text-sm font-semibold mb-2" style={{ color: '#2D6A4F' }}>{speech.date}</div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>{speech.title}</h3>
                <p className="text-sm mb-2 leading-relaxed" style={{ color: '#3F3F46' }}>{speech.summary.slice(0, 100)}...</p>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#71717A' }}>
                  <MapPin className="w-3 h-3" /> {speech.location}
                </div>
              </Link>
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
    </div>
  )
}
