/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Megaphone, MapPin, Clock, Quote } from 'lucide-react'
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

/* ── Right-side illustration ─────────────────────────────────────── */

function SpeechesIllustration() {
  return (
    <div className="rounded-xl border p-5 w-full max-w-[380px]" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <svg viewBox="0 0 340 220" width="100%" className="overflow-visible">
        {/* Background circles */}
        <circle cx="170" cy="110" r="90" fill="#E9F5EF" opacity={0.5} />
        <circle cx="170" cy="110" r="65" fill="#E9F5EF" opacity={0.4} />

        {/* Podium body */}
        <rect x="130" y="115" width="80" height="55" rx="4" fill="#2D6A4F" opacity={0.9} />
        <rect x="140" y="105" width="60" height="12" rx="2" fill="#1B4332" opacity={0.8} />

        {/* Microphone stand */}
        <line x1="170" y1="105" x2="170" y2="75" stroke="#52525B" strokeWidth="2.5" />
        <line x1="170" y1="85" x2="185" y2="78" stroke="#52525B" strokeWidth="2" />

        {/* Microphone heads */}
        <ellipse cx="170" cy="72" rx="5" ry="8" fill="#71717A" />
        <ellipse cx="188" cy="76" rx="4" ry="6" fill="#71717A" />

        {/* Spotlight */}
        <polygon points="100,35 155,105 140,105" fill="#F59E0B" opacity={0.18} />
        <polygon points="240,35 185,105 200,105" fill="#F59E0B" opacity={0.18} />

        {/* Sound waves */}
        <path d="M 230 90 Q 255 80, 270 90" stroke="#2D6A4F" strokeWidth="2" fill="none" opacity={0.3} />
        <path d="M 235 100 Q 260 90, 275 100" stroke="#2D6A4F" strokeWidth="2" fill="none" opacity={0.25} />
        <path d="M 240 110 Q 265 100, 280 110" stroke="#2D6A4F" strokeWidth="2" fill="none" opacity={0.2} />

        {/* Stage floor */}
        <rect x="80" y="170" width="180" height="10" rx="3" fill="#2D6A4F" opacity={0.3} />

        {/* Decorative quote marks */}
        <text x="70" y="95" fontSize="32" fill="#2D6A4F" opacity={0.12} fontFamily="serif" fontWeight="bold">"</text>
        <text x="260" y="130" fontSize="32" fill="#2D6A4F" opacity={0.12} fontFamily="serif" fontWeight="bold">"</text>
      </svg>
      <div className="text-center mt-1">
        <div className="font-display text-sm font-semibold" style={{ color: '#18181B' }}>
          Influential Talks
        </div>
        <div className="text-[11px]" style={{ color: '#71717A' }}>
          {stats.totalSpeeches} speeches • Columbia, Florida & beyond
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function SpeechesPage() {
  const featured = speeches.filter((s) => s.featured)

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                <Megaphone className="w-3 h-3" />
                {stats.totalSpeeches} Famous Speeches
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
                Warren Buffett <span style={{ color: '#2D6A4F' }}>Speeches</span>
              </h1>
              <p className="text-base leading-relaxed text-justify" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                From Columbia Business School to the University of Florida, explore Buffett's most influential talks.
                Full transcripts, background analysis, and enduring investment wisdom.
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <SpeechesIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          <AdUnit variant="horizontal" />
        </div>
      </div>
    </div>
  )
}
