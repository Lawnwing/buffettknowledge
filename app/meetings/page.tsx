/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Calendar, MapPin, Clock, Star } from 'lucide-react'
import { meetings, stats } from '@/data/meetings'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Berkshire Hathaway Annual Meetings — BuffettKnowledge',
  description: `Explore ${stats.totalMeetings} Berkshire Hathaway annual meeting Q&A sessions (2015–2025). Full transcripts, key takeaways, and Buffett's wisdom.`,
  url: 'https://buffettknowledge.com/meetings',
}

/* ── Right-side illustration ─────────────────────────────────────── */

function MeetingsIllustration() {
  return (
    <div className="rounded-xl border p-5 w-full max-w-[380px]" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <svg viewBox="0 0 340 220" width="100%" className="overflow-visible">
        {/* Background circle */}
        <circle cx="170" cy="110" r="90" fill="#E9F5EF" opacity={0.5} />
        <circle cx="170" cy="110" r="70" fill="#E9F5EF" opacity={0.4} />

        {/* Stage platform */}
        <rect x="90" y="155" width="160" height="12" rx="4" fill="#2D6A4F" opacity={0.85} />
        <rect x="100" y="167" width="140" height="6" rx="2" fill="#2D6A4F" opacity={0.4} />

        {/* Podium */}
        <rect x="150" y="125" width="40" height="30" rx="3" fill="#2D6A4F" opacity={0.9} />
        <rect x="155" y="115" width="30" height="12" rx="2" fill="#1B4332" opacity={0.8} />

        {/* Microphone */}
        <line x1="170" y1="115" x2="170" y2="95" stroke="#52525B" strokeWidth="2" />
        <circle cx="170" cy="92" r="6" fill="#71717A" />
        <circle cx="170" cy="92" r="3" fill="#A1A1AA" />

        {/* Spotlight beams */}
        <polygon points="120,40 160,125 140,125" fill="#F59E0B" opacity={0.15} />
        <polygon points="220,40 180,125 200,125" fill="#F59E0B" opacity={0.15} />

        {/* Audience dots (top arc = back row) */}
        {[
          [50, 65], [75, 55], [105, 48], [140, 45], [170, 44], [200, 45], [235, 48], [265, 55], [290, 65],
          [40, 85], [68, 75], [98, 68], [135, 63], [170, 62], [205, 63], [242, 68], [272, 75], [300, 85],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#2D6A4F" opacity={0.25 + (i % 3) * 0.08} />
        ))}

        {/* Year labels on stage */}
        <text x="170" y="148" textAnchor="middle" fontSize="9" fill="#fff" fontWeight={600}>
          1994 — 2025
        </text>
      </svg>
      <div className="text-center mt-1">
        <div className="font-display text-sm font-semibold" style={{ color: '#18181B' }}>
          Woodstock for Capitalists
        </div>
        <div className="text-[11px]" style={{ color: '#71717A' }}>
          {stats.totalMeetings} meetings • {stats.yearsCovered}
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function MeetingsPage() {
  const featured = meetings.filter((m) => m.featured)

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
                <Calendar className="w-3 h-3" />
                {stats.totalMeetings} Annual Meetings
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
                Berkshire Hathaway <span style={{ color: '#2D6A4F' }}>Annual Meetings</span>
              </h1>
              <p className="text-base leading-relaxed text-justify" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                Every year, thousands gather in Omaha for "Woodstock for Capitalists."
                Explore full transcripts, key Q&A highlights, and Buffett's most candid moments from {stats.yearsCovered}.
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <MeetingsIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
              Featured Meeting
            </h2>
            {featured.map((meeting) => (
              <Link key={meeting.slug} href={`/meetings/${meeting.slug}`}
                className="block p-6 rounded-xl border hover:shadow-lg transition"
                style={{ borderColor: '#A9D7BD', backgroundColor: '#F7FFF9' }}>
                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm" style={{ color: '#71717A' }}>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {meeting.date}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {meeting.location}</span>
                  {meeting.duration && <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meeting.duration}</span>}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#18181B' }}>
                  {meeting.year} Annual Meeting
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#3F3F46' }}>{meeting.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {meeting.keyTakeaways.slice(0, 3).map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                      <Star className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Meetings Grid */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
            All Meetings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map((meeting) => (
              <Link key={meeting.slug} href={`/meetings/${meeting.slug}`}
                className="block p-4 rounded-xl border hover:shadow-md transition"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
                <div className="text-2xl font-bold mb-2" style={{ color: '#2D6A4F' }}>{meeting.year}</div>
                <p className="text-sm mb-2 leading-relaxed" style={{ color: '#3F3F46' }}>{meeting.summary.slice(0, 120)}...</p>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#71717A' }}>
                  <MapPin className="w-3 h-3" /> {meeting.location}
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
