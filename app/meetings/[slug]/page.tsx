/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft, Star, MessageCircle } from 'lucide-react'
import { meetings } from '@/data/meetings'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import LetterText from '@/components/LetterText'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return meetings.map((meeting) => ({
    slug: meeting.slug,
  }))
}

export default function MeetingDetailPage({ params }: PageProps) {
  const meeting = meetings.find((m) => m.slug === params.slug)

  if (!meeting) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Berkshire Hathaway Annual Meeting ${meeting.year}`,
    description: meeting.summary,
    datePublished: meeting.date,
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
        <div className="max-w-4xl mx-auto">
          <Link href="/meetings" className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#2D6A4F' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Meetings
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ml-3"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <Calendar className="w-3 h-3" />
            Annual Meeting
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            {meeting.year} Annual Meeting
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: '#71717A' }}>
            <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {meeting.date}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {meeting.location}</span>
            {meeting.duration && <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meeting.duration}</span>}
          </div>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: '#3F3F46', hyphens: 'auto' }}>
            {meeting.summary}
          </p>
        </div>
      </div>

      {/* Original Transcript */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Full Transcript
          </h2>
          {meeting.fullText === '[[PLACEHOLDER]]' ? (
            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}>
              <p className="text-sm" style={{ color: '#71717A' }}>Transcript coming soon. Check back later!</p>
            </div>
          ) : (
            <div className="letter-text">
              <LetterText html={meeting.fullText} />
            </div>
          )}
        </div>
      </div>

      {/* Key Takeaways */}
      {meeting.keyTakeaways.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {meeting.keyTakeaways.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
                  <Star className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#2D6A4F' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Q&A Highlights */}
      {meeting.qaList.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Q&A Highlights
            </h2>
            <div className="space-y-6">
              {meeting.qaList.map((qa, i) => (
                <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}>
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#2D6A4F' }}>
                      <MessageCircle className="w-3 h-3" /> Question
                    </span>
                    <p className="font-semibold" style={{ color: '#18181B' }}>{qa.question}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#2D6A4F' }}>
                      Buffett's Answer
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
            <Link href={`/letters/${meeting.year}-berkshire-letter`}
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>Related Letter</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>{meeting.year} Berkshire Letter</p>
            </Link>
            <Link href="/meetings"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>View All</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>All Annual Meetings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
