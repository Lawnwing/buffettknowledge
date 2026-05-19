import type { Metadata } from 'next'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { people } from '@/data/people'

export const metadata: Metadata = {
  title: 'Key People',
  description: `Explore the ${people.length} key figures who shaped Warren Buffett's investment thinking — from mentor Benjamin Graham to successor Greg Abel.`,
}

export default function PeoplePage() {
  const featuredPeople = people.filter((p) => p.featured)
  const otherPeople = people.filter((p) => !p.featured)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <div className="mb-10 page-header">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
          Key People
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
          {people.length} key figures who shaped Buffett&apos;s investment thinking,
          from mentor to successor. Each profile includes Buffett&apos;s own words
          about the relationship and their significance.
        </p>
      </div>

      {/* Featured People */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {featuredPeople.map((person) => (
          <Link
            key={person.slug}
            href={`/people/${person.slug}`}
            className="block rounded-2xl border card-hover p-6 group"
            style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F1F5F9' }}
              >
                <Users className="w-5 h-5" style={{ color: '#475569' }} />
              </div>
              <div>
                <h3
                  className="font-display text-xl font-semibold group-hover:text-sage transition-colors"
                  style={{ color: '#18181B' }}
                >
                  {person.name}
                </h3>
                <p className="text-sm" style={{ color: '#71717A' }}>{person.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717A' }}>
              {person.relationship.slice(0, 200)}...
            </p>
            <div className="flex items-center gap-3 text-xs" style={{ color: '#71717A' }}>
              <span>Since {person.firstMentioned}</span>
              <span>&bull;</span>
              <span>{person.letterCount} letters</span>
              {person.quotes.length > 0 && (
                <>
                  <span>&bull;</span>
                  <span>{person.quotes.length} quotes</span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Other People */}
      {otherPeople.length > 0 && (
        <>
          <h2 className="font-display text-xl font-semibold mb-5" style={{ color: '#18181B' }}>
            Other Associates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherPeople.map((person) => (
              <Link
                key={person.slug}
                href={`/people/${person.slug}`}
                className="block rounded-xl border card-hover p-5 group"
                style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
              >
                <h3
                  className="font-semibold group-hover:text-sage transition-colors mb-1"
                  style={{ color: '#18181B' }}
                >
                  {person.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: '#71717A' }}>{person.role}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color: '#71717A' }}>
                  <span>Since {person.firstMentioned}</span>
                  <span>&bull;</span>
                  <span>{person.letterCount} letters</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
