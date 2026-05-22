import Link from 'next/link'
import {
  ArrowRight, BookOpen, Building2, Users, FileText, Sparkles,
  MessageCircle, Network, Download, Lightbulb, BrainCircuit,
  Calendar, Megaphone, Quote
} from 'lucide-react'
import { LetterCard } from '@/components/LetterCard'
import { NewsletterBanner } from '@/components/NewsletterBanner'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import { allLetters, berkshireLetters, partnershipLetters, stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { meetings } from '@/data/meetings'
import { speeches } from '@/data/speeches'
import { books } from '@/data/books'
import { quotes } from '@/data/quotes'

const jsonLdHome = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'BuffettKnowledge — Warren Buffett Wisdom Archive',
  description: `Explore ${stats.totalLetters} shareholder letters, ${meetings.length} annual meetings, ${speeches.length} speeches, ${books.length} recommended books, and ${quotes.length} quotes from Warren Buffett (${partnershipLetters[0]?.year}–${berkshireLetters[berkshireLetters.length - 1]?.year}).`,
  url: 'https://buffettknowledge.com',
  isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
}

export default function HomePage() {
  const featuredLetters = allLetters.filter((l) => l.featured).slice(0, 3)

  // Top concepts and companies by letter count
  const topConcepts = [...concepts].sort((a, b) => b.letterCount - a.letterCount).slice(0, 4)
  const topCompanies = [...companies].sort((a, b) => b.letterCount - a.letterCount).slice(0, 4)

  // Compute partnership / berkshire year ranges dynamically
  const partnershipYears = partnershipLetters.map((l) => l.year)
  const berkshireYears = berkshireLetters.map((l) => l.year)
  const partnershipRange = `${Math.min(...partnershipYears)}–${Math.max(...partnershipYears)}`
  const berkshireRange = `${Math.min(...berkshireYears)}–${Math.max(...berkshireYears)}`

  return (
    <div>
      <JsonLd value={jsonLdHome} />

      {/* ═══════════════════════════════════════════════
          HERO SECTION — Two-column with book illustration
          ═══════════════════════════════════════════════ */}
      <div style={{ borderBottom: '1px solid #E6E2D9', backgroundColor: '#fff' }}>
        <div className="px-6 sm:px-10 py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* ── Left: Text content ── */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                <Sparkles className="w-3 h-3" />
                Updated with the 2025 Farewell Letter
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold mb-4 leading-tight"
                style={{ color: '#18181B' }}>
                The Definitive <span style={{ color: '#2D6A4F' }}>Buffett Knowledge Archive</span>
              </h1>

              <p className="text-base leading-relaxed mb-8 text-justify"
                style={{ color: '#3F3F46', hyphens: 'auto' }}>
                The most comprehensive English archive of Warren Buffett&apos;s wisdom.
                Explore {stats.totalLetters} shareholder letters, {meetings.length} annual meetings,
                {speeches.length} speeches, {books.length} recommended books, and {quotes.length} quotes
                — spanning {stats.yearsCovered} years of investment insight.
              </p>

              {/* Stats row — unique metrics, not duplicated in feature cards */}
              <div className="flex flex-wrap gap-0 mb-10">
                {[
                  { value: stats.yearsCovered + '', label: 'Years of Wisdom' },
                  { value: stats.totalLetters + '', label: 'Shareholder Letters' },
                  { value: meetings.length + '', label: 'Annual Meetings' },
                  { value: books.length + '', label: 'Recommended Books' },
                ].map((s, i) => (
                  <div key={s.label}
                    className="flex-1 min-w-[100px] text-center py-3 px-2"
                    style={{
                      borderRight: i < 3 ? '1px solid #E6E2D9' : 'none',
                    }}>
                    <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#18181B' }}>{s.value}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: '#71717A' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick-reference cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Most-cited concepts */}
                <div className="rounded-xl p-4" style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D6A4F' }}>
                      Most-Cited Concepts
                    </span>
                    <Link href="/concepts" className="text-xs" style={{ color: '#2D6A4F' }}>
                      View all &rarr;
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    {topConcepts.map((c, i) => (
                      <Link
                        key={c.slug}
                        href={`/concepts/${c.slug}`}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-mono w-4 text-center flex-shrink-0"
                            style={{ color: '#7EC39C' }}>#{i + 1}</span>
                          <span className="text-sm truncate group-hover:underline" style={{ color: '#18181B' }}>
                            {c.name}
                          </span>
                        </div>
                        <span className="text-xs flex-shrink-0 ml-2 px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: '#D4EBDE', color: '#1B4332' }}>
                          {c.letterCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Most-mentioned companies */}
                <div className="rounded-xl p-4" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#92400E' }}>
                      Most-Mentioned Companies
                    </span>
                    <Link href="/companies" className="text-xs" style={{ color: '#92400E' }}>
                      View all &rarr;
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    {topCompanies.map((c, i) => (
                      <Link
                        key={c.slug}
                        href={`/companies/${c.slug}`}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-mono w-4 text-center flex-shrink-0"
                            style={{ color: '#FCD34D' }}>#{i + 1}</span>
                          <span className="text-sm truncate group-hover:underline" style={{ color: '#18181B' }}>
                            {c.name}
                          </span>
                        </div>
                        <span className="text-xs flex-shrink-0 ml-2 px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                          {c.letterCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Book illustration ── */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src="/hero-book.svg"
                alt="Buffett Letters Archive Book"
                className="w-full max-w-[440px] h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURE NAVIGATION CARDS
          ═══════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 py-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: 'Letters', count: stats.totalLetters, desc: 'Complete archive', href: '/letters', color: '#2D6A4F', bg: '#E9F5EF' },
            { icon: Lightbulb, label: 'Concepts', count: concepts.length, desc: 'Investment ideas', href: '/concepts', color: '#92400E', bg: '#FEF3C7' },
            { icon: Building2, label: 'Companies', count: companies.length, desc: 'Company profiles', href: '/companies', color: '#1B4332', bg: '#D4EBDE' },
            { icon: Users, label: 'People', count: people.length, desc: 'Key figures', href: '/people', color: '#475569', bg: '#F1F5F9' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: item.bg }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: '#A1A1AA' }} />
              </div>
              <div className="font-display text-xl font-bold" style={{ color: '#18181B' }}>{item.count}</div>
              <div className="text-sm font-medium" style={{ color: '#18181B' }}>{item.label}</div>
              <div className="text-xs mt-0.5" style={{ color: '#71717A' }}>{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* EXPANDED CONTENT CARDS */}
      <div className="px-6 sm:px-10 py-10 w-full">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: '#18181B' }}>
            More Wisdom
          </h2>
          <p className="text-sm" style={{ color: '#71717A' }}>
            Explore Buffett&apos;s insights beyond the letters
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Annual Meetings', count: meetings.length, desc: 'Q&A transcripts', href: '/meetings', color: '#2D6A4F', bg: '#E9F5EF' },
            { icon: Megaphone, label: 'Speeches', count: speeches.length, desc: 'Famous talks', href: '/speeches', color: '#7C3AED', bg: '#EDE9FE' },
            { icon: BookOpen, label: 'Books', count: books.length, desc: 'Buffett recommends', href: '/books', color: '#1D4ED8', bg: '#DBEAFE' },
            { icon: Quote, label: 'Quotes', count: quotes.length, desc: 'Famous sayings', href: '/quotes', color: '#D97706', bg: '#FEF3C7' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: item.bg }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: '#A1A1AA' }} />
              </div>
              <div className="font-display text-xl font-bold" style={{ color: '#18181B' }}>{item.count}</div>
              <div className="text-sm font-medium" style={{ color: '#18181B' }}>{item.label}</div>
              <div className="text-xs mt-0.5" style={{ color: '#71717A' }}>{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED LETTERS */}
      <div className="px-6 sm:px-10 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-1" style={{ color: '#18181B' }}>
              Essential Letters
            </h2>
            <p className="text-sm" style={{ color: '#71717A' }}>
              The most influential letters in Buffett&apos;s history
            </p>
          </div>
          <Link
            href="/letters"
            className="hidden sm:flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: '#2D6A4F' }}
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredLetters.map((letter) => (
            <LetterCard key={letter.slug} letter={letter} variant="featured" />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          AI Q&A CTA SECTION
          ═══════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 pb-10 w-full">
        <div className="rounded-2xl p-8 sm:p-10 relative overflow-hidden"
          style={{ backgroundColor: '#1B2A23' }}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #7EC39C 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: 'rgba(212,168,83,0.15)', color: '#D4A853', border: '1px solid rgba(212,168,83,0.3)' }}>
                <BrainCircuit className="w-3 h-3" />
                AI POWERED
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#F5F5F0' }}>
                Ask Buffett Anything
              </h2>
              <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: '#A7C9B5' }}>
                Have an investment question? Ask our AI trained on all {stats.totalLetters} letters.
                Every answer traces back to the original source text.
              </p>
              <Link
                href="/ask"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#D4A853', color: '#1B2A23' }}
              >
                <MessageCircle className="w-4 h-4" />
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden md:flex flex-col gap-3">
              {[
                'What is economic moat?',
                'How does Buffett value a company?',
                'What did he say about tech stocks?',
              ].map((q) => (
                <div key={q}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#A7C9B5', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#7EC39C' }} />
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          THREE DIMENSIONS
          ═══════════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid #E6E2D9', borderBottom: '1px solid #E6E2D9', backgroundColor: '#fff' }}>
        <div className="px-6 sm:px-10 py-14 w-full">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: '#18181B' }}>
              Explore Three Dimensions
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: '#71717A' }}>
              Navigate Buffett&apos;s investment wisdom by concept, company, or person —
              cross-referenced across {stats.totalLetters} letters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concepts */}
            <div className="rounded-2xl border p-6 transition-colors hover:shadow-md"
              style={{ borderColor: '#E6E2D9' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ backgroundColor: '#E9F5EF' }}>
                <BookOpen className="w-6 h-6" style={{ color: '#2D6A4F' }} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#18181B' }}>
                Investment Concepts
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#71717A' }}>
                From <em>Intrinsic Value</em> to <em>Economic Moat</em> — {concepts.length} core ideas
                that shaped value investing, with cross-references to every letter.
              </p>
              <ul className="space-y-2 mb-6">
                {concepts.filter((c) => c.featured).slice(0, 4).map((c) => (
                  <li key={c.slug} className="flex items-center gap-2 text-sm" style={{ color: '#71717A' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#7EC39C' }} />
                    {c.name}
                  </li>
                ))}
              </ul>
              <Link href="/concepts" className="btn-ghost text-sm w-full justify-center">
                Explore {concepts.length} Concepts
              </Link>
            </div>

            {/* Companies */}
            <div className="rounded-2xl border p-6 transition-colors hover:shadow-md"
              style={{ borderColor: '#E6E2D9' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ backgroundColor: '#FEF3C7' }}>
                <Building2 className="w-6 h-6" style={{ color: '#92400E' }} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#18181B' }}>
                Company Profiles
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#71717A' }}>
                {companies.length} companies that appeared in Buffett&apos;s letters —
                from See&apos;s Candies to Apple — with investment thesis and timeline.
              </p>
              <ul className="space-y-2 mb-6">
                {companies.filter((c) => c.featured).slice(0, 4).map((c) => (
                  <li key={c.slug} className="flex items-center gap-2 text-sm" style={{ color: '#71717A' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FCD34D' }} />
                    {c.name}
                  </li>
                ))}
              </ul>
              <Link href="/companies" className="btn-ghost text-sm w-full justify-center">
                Explore {companies.length} Companies
              </Link>
            </div>

            {/* People */}
            <div className="rounded-2xl border p-6 transition-colors hover:shadow-md"
              style={{ borderColor: '#E6E2D9' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ backgroundColor: '#F1F5F9' }}>
                <Users className="w-6 h-6" style={{ color: '#475569' }} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#18181B' }}>
                Key People
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#71717A' }}>
                {people.length} key figures who shaped Buffett&apos;s thinking —
                from mentor Benjamin Graham to successor Greg Abel.
              </p>
              <ul className="space-y-2 mb-6">
                {people.filter((p) => p.featured).map((p) => (
                  <li key={p.slug} className="flex items-center gap-2 text-sm" style={{ color: '#71717A' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#94A3B8' }} />
                    {p.name}
                  </li>
                ))}
              </ul>
              <Link href="/people" className="btn-ghost text-sm w-full justify-center">
                Explore {people.length} People
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          TWO ERAS
          ═══════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 py-14 w-full">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: '#18181B' }}>
            Two Eras of Buffett
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: '#71717A' }}>
            The Buffett Partnership (1956–1969) and Berkshire Hathaway (1965–2025) —
            two distinct phases of the greatest investment career in history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Partnership */}
          <div className="rounded-2xl border p-6" style={{ borderColor: '#FDE68A', backgroundColor: '#FFFBEB' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <FileText className="w-5 h-5" style={{ color: '#92400E' }} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
                  Partnership Letters
                </h3>
                <p className="text-xs" style={{ color: '#71717A' }}>
                  {partnershipLetters.length} letters, {partnershipRange}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717A' }}>
              Strict Graham-style value investing — cigar butts, workouts, and margin of safety.
              These letters reveal the analytical foundations that would later evolve
              into Berkshire&apos;s quality focus.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Margin of Safety', 'Cigar Butts', 'Workouts', 'Compounding'].map((tag) => (
                <span key={tag} className="tag-concept text-xs">{tag}</span>
              ))}
            </div>
            <Link href="/letters" className="btn-amber text-sm">
              Read Partnership Letters
            </Link>
          </div>

          {/* Berkshire */}
          <div className="rounded-2xl border p-6" style={{ borderColor: '#A9D7BD', backgroundColor: '#F0FFF4' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4EBDE' }}>
                <FileText className="w-5 h-5" style={{ color: '#1B4332' }} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
                  Berkshire Letters
                </h3>
                <p className="text-xs" style={{ color: '#71717A' }}>
                  {berkshireLetters.length} letters, {berkshireRange}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717A' }}>
              Where Buffett evolved from cigar-butts to &ldquo;wonderful businesses at fair prices,&rdquo;
              built an insurance conglomerate, and created the most legendary long-term investment record.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Economic Moat', 'Float', 'Capital Allocation', 'Fair Price'].map((tag) => (
                <span key={tag} className="tag-concept text-xs">{tag}</span>
              ))}
            </div>
            <Link href="/letters" className="btn-primary text-sm">
              Read Berkshire Letters
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          KNOWLEDGE GRAPH + PDF DOWNLOAD — Premium cards
          ═══════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Knowledge Graph CTA */}
          <Link href="/graph"
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-md overflow-hidden"
            style={{ borderColor: '#A9D7BD', backgroundColor: '#F0FFF4' }}>
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: '#2D6A4F' }} />
            {/* Icon */}
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl"
              style={{ backgroundColor: '#D4EBDE' }}>
              <Network className="w-7 h-7" style={{ color: '#1B4332' }} />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold mb-1" style={{ color: '#18181B' }}>
                Knowledge Graph
              </h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#71717A' }}>
                Visualize connections between letters, concepts, companies, and people.
              </p>
              <div className="flex items-center gap-3 text-xs" style={{ color: '#2D6A4F' }}>
                <span className="font-semibold">{stats.totalLetters} nodes</span>
                <span>&middot;</span>
                <span className="font-semibold">3,900+ links</span>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex-shrink-0 hidden sm:block">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                style={{ backgroundColor: '#2D6A4F', color: '#fff' }}>
                Explore
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* PDF Download CTA */}
          <Link href="/pdf-download"
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-md overflow-hidden"
            style={{ borderColor: '#FDE68A', backgroundColor: '#FFFBEB' }}>
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: '#D4A853' }} />
            {/* Icon */}
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl"
              style={{ backgroundColor: '#FEF3C7' }}>
              <Download className="w-7 h-7" style={{ color: '#92400E' }} />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold mb-1" style={{ color: '#18181B' }}>
                PDF Download
              </h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#71717A' }}>
                Download the complete collection, organized by era and year.
              </p>
              <div className="flex items-center gap-3 text-xs" style={{ color: '#92400E' }}>
                <span className="font-semibold">{stats.totalLetters} letters</span>
                <span>&middot;</span>
                <span className="font-semibold">PDF format</span>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex-shrink-0 hidden sm:block">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                style={{ backgroundColor: '#D4A853', color: '#1B2A23' }}>
                Download
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          ADVERTISEMENT
          ═══════════════════════════════════════════════ */}
      <div className="w-full mx-auto px-6 sm:px-10">
        <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="horizontal" variant="header" />
      </div>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
          ═══════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 pb-16 w-full">
        <NewsletterBanner />
      </div>
    </div>
  )
}
