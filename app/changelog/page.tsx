import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Github, Zap, BookOpen, Lightbulb, Building2, Users, MessageCircle, ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'
import { stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'See how BuffettKnowledge has evolved — new letters, AI Q&A improvements, SEO enhancements, and the latest features.',
  alternates: { canonical: 'https://buffettknowledge.com/changelog' },
}

interface ChangelogEntry {
  date: string
  version: string
  title: string
  items: string[]
  highlight?: string
}

const changelog: ChangelogEntry[] = [
  {
    date: '2026-05-21',
    version: 'v2.0',
    title: 'Full-Text Expansion & Letter Intelligence',
    highlight: 'Major content push',
    items: [
      '1971–1976 Berkshire shareholder letters: full-text data entry complete (6 letters, ~73K words)',
      '1968–1970 partnership letters: full-text data entry complete (7 letters including dissolution notices)',
      'Rich interpretation framework launched: Market Context, Key Numbers, Then vs Now comparisons per letter',
      'Auto-linking in letter text: keywords now link to concepts, companies, and people inline',
      'About page redesigned with FAQ section, stats sidebar, and FAQPage structured data for SEO',
      'Changelog page upgraded with version sidebar navigation and archive highlights',
    ],
  },
  {
    date: '2026-05-20',
    version: 'v1.9',
    title: 'AI Q&A Reliability & Source Citations',
    highlight: 'Core feature fix',
    items: [
      'AI Q&A API migrated from Gemini to OpenRouter (free tier, no credit card required)',
      'Real search data integration: 82 letters, 49 concepts, 32 companies now powering AI retrieval',
      'Clickable source tags added under every AI answer — jump directly to referenced letters, concepts, or companies',
      'Typewriter effect race-condition bug fixed (infinite loading spinner resolved)',
      'Empty sources bug fixed: hardcoded test data replaced with live dataset via prebuild script',
      'AdSense sidebar placeholder added to AI Q&A page for future monetization',
      '"New Chat" button visibility improved (solid green background)',
    ],
  },
  {
    date: '2026-05-19',
    version: 'v1.8',
    title: 'Partnership Letters Full-Text Data Entry (1965)',
    items: [
      '1965 mid-year letter (Jul 9, 1965): fullText from 1965-1.docx — "First Half Performance", 10.4% vs 0.8% Dow (9.6pt advantage), Berkshire controlling interest acquisition discussed',
      '1965 special letter (Nov 1, 1965): fullText from 1965-2.docx — commitment letter for 1966, Ground Rule 7 introduced, Berkshire Hathaway valuation methodology explained',
      '1965 partnership letter (Jan 20, 1966): fullText from 1965-3.docx — "Our Performance in 1965", partnership gained 47.2% vs 14.2% Dow, widest margin in BPL history',
    ],
  },
  {
    date: '2026-05-19',
    version: 'v1.7',
    title: 'Partnership Letters Full-Text Data Entry (1963-1964)',
    items: [
      '1963 mid-year letter (Jul 10, 1963): fullText from 1963-1.docx — Dempster Mill turnaround, 14% vs 10% Dow',
      '1963 partnership letter (Jan 18, 1964): fullText from 1963-3.docx — "Our Performance in 1963", 38.7% vs 20.7% Dow',
      '1963 special letter (Nov 6, 1963): fullText from 1963-2.docx — annual administrative letter to partners for 1964',
      '1964 mid-year letter (Jul 8, 1964): fullText from 1964-1.docx — plus 8.1% vs Dow plus 3.8% in first half',
      '1964 partnership letter (Jan 18, 1965): fullText from 1964-2.docx — "Our Performance in 1964", 27.8% vs 18.7% Dow',
    ],
  },
  {
    date: '2026-05-19',
    version: 'v1.6',
    title: 'Partnership Letters Full-Text Data Entry (1960-1962)',
    items: [
      '1960 partnership letter (Jan 30, 1961): fullText populated from 1960.docx',
      '1961 mid-year letter (Jul 22, 1961): fullText populated from 1961.docx',
      '1961 partnership letter (Jan 24, 1962): fullText populated from 1961.docx',
      '1962 mid-year letter (Jul 6, 1962): fullText populated from 1962.docx',
      '1962 partnership letter corrected (Jan 18, 1963): replaced incorrect content from 1962-2.docx with correct text from 1962-3.docx',
      'Automated .docx parsing pipeline: HTML table extraction, format preservation, letters.ts injection',
    ],
  },
  {
    date: '2026-05-18',
    version: 'v1.5',
    title: 'UI Polish & Cross-Reference Enhancement',
    items: [
      'TopBar navigation: upgraded to white background with border and scroll shadow for clearer visual separation',
      'New "Links to This Page" sidebar module on every letter page — shows all concepts that reference the current letter',
      'AdSense ad placements on letter detail pages: inline ad below title, sidebar ad at bottom',
      'Full-site container width unified to max-w-7xl (1280px) across all 14 page types',
      'Footer width fixed: max-w-content replaced with max-w-7xl, matching body container',
      'About page: removed inner max-w-3xl constraint, full content width now used; text set to justify alignment',
      'Blog link removed from sidebar navigation',
    ],
  },
  {
    date: '2026-05-18',
    version: 'v1.4',
    title: 'Branding & Navigation Refinement',
    items: [
      'Sidebar branding upgrade: "Buffett" in theme color, slogan "Built for value investors."',
      'Favicon redesigned with lightbulb icon matching brand identity',
      'Sidebar nav restructured: Home link added, Archive section renamed to Browse',
      'AI Q&A moved from sidebar to top navigation bar (between Knowledge Graph and PDF Download)',
      'New Changelog page added under About section',
      'ShareToolbar added to every letter page with social sharing, copy link, print-to-PDF, and official source link',
      'LetterInterpretation component: categorized Explore Further (Concepts / Companies / People)',
    ],
  },
  {
    date: '2026-05-17',
    version: 'v1.3',
    title: 'AI Q&A (RAG) + SEO Enhancements',
    items: [
      'AI Q&A feature launched with RAG architecture (retrieval-augmented generation)',
      'Cloudflare Worker backend for OpenAI GPT-4o-mini integration',
      'ChatWidget floating component + dedicated /ask page',
      'JSON-LD structured data added across all pages (WebSite, Organization, Article, Person, etc.)',
      'AdSense ad unit system integrated (header, sidebar, inline, footer placements)',
      'Related Letters module added to company and person detail pages',
      'Metadata numbers updated: 101 letters, 152 concepts, 71 companies, 17 people',
      'public/ads.txt created for AdSense verification',
    ],
  },
  {
    date: '2026-05-16',
    version: 'v1.2',
    title: 'Knowledge Graph + Letter Interpretation',
    items: [
      'Interactive knowledge graph (Canvas force-directed graph, zero D3 dependency)',
      'Homepage TOP ranking blocks: Top Concepts, Top Companies, Top People',
      'Citation statistics engine (lib/citationStats.ts) for ranking by cited-in-letters count',
      'Sidebar count badges on nav items showing real data totals',
      'LetterInterpretation component: Overview, Key Takeaways, Sections, Explore Further',
      'Warren Buffett added as a featured person in the database',
      'All text justified with text-align: justify and hyphens: auto',
    ],
  },
  {
    date: '2026-05-15',
    version: 'v1.1',
    title: 'Data Expansion & Foundation',
    items: [
      'Letter count expanded from 68 to 101 total letters',
      'Partnership letters (1956-1970): 37 letters added',
      'Berkshire Hathaway letters (1971-2025): 62 letters added',
      'Special letters (3): Buffett Partnership dissolution, 1999 Sun Valley, 2025 Farewell',
      'Concept database expanded to 152 entries with cross-references',
      'Company database expanded to 71 entries with investment timelines',
      'People database: 17 key figures including Graham, Munger, Abel',
    ],
  },
  {
    date: '2026-05-14',
    version: 'v1.0',
    title: 'Initial Launch',
    items: [
      'BuffettKnowledge.com launched',
      'Next.js 14 + TypeScript + Tailwind CSS stack',
      'Letter archive with full-text search and year-based browsing',
      'Concept tagging system with cross-reference tables',
      'Company and people profiles with mention tracking',
      'Random Buffett quote generator in top bar',
      'PDF download hub for offline reading',
      'Dark sidebar + warm parchment content area design system',
    ],
  },
]

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://buffettknowledge.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Changelog',
      item: 'https://buffettknowledge.com/changelog',
    },
  ],
}

export default function ChangelogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <JsonLd value={jsonLdBreadcrumb} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        {/* Main Content */}
        <div className="min-w-0">
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
              Changelog
            </h1>
            <p className="text-base" style={{ color: '#71717A' }}>
              A running history of how BuffettKnowledge has evolved.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px"
              style={{ backgroundColor: '#E6E2D9' }}
            />

            <div className="space-y-10">
              {changelog.map((entry) => (
                <div key={`${entry.date}-${entry.version}`} className="relative pl-8" id={entry.version}>
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2"
                    style={{
                      backgroundColor: entry.highlight ? '#2D6A4F' : '#fff',
                      borderColor: '#2D6A4F',
                    }}
                  />

                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-mono font-medium px-2 py-0.5 rounded"
                      style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
                    >
                      {entry.date}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
                    >
                      {entry.version}
                    </span>
                    {entry.highlight && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1"
                        style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
                      >
                        <Zap className="w-3 h-3" />
                        {entry.highlight}
                      </span>
                    )}
                  </div>

                  <h2
                    className="font-display text-xl font-semibold mb-3"
                    style={{ color: '#18181B' }}
                  >
                    {entry.title}
                  </h2>

                  <ul className="space-y-2">
                    {entry.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                        style={{ color: '#3F3F46' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: '#7EC39C' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div
            className="mt-12 pt-6 text-xs text-center"
            style={{ color: '#A1A1AA', borderTop: '1px solid #E6E2D9' }}
          >
            Something missing?{' '}
            <a
              href="https://github.com/buffettknowledge/buffettknowledge/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:underline"
              style={{ color: '#2D6A4F' }}
            >
              Open an issue on GitHub
            </a>{' '}
            or{' '}
            <a
              href="mailto:hello@buffettknowledge.com"
              className="transition-colors hover:underline"
              style={{ color: '#2D6A4F' }}
            >
              send us an email
            </a>.
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Version Quick Nav */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: '#71717A' }}
            >
              Jump to Version
            </h3>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {changelog.map((entry) => (
                <a
                  key={entry.version}
                  href={`#${entry.version}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors hover:bg-[#F9F7F3]"
                  style={{ color: '#3F3F46' }}
                >
                  <span
                    className="font-mono font-medium flex-shrink-0"
                    style={{ color: '#2D6A4F', minWidth: '2.25rem' }}
                  >
                    {entry.version}
                  </span>
                  <span className="truncate">{entry.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Latest Highlight */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#2D6A4F' }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/70"
            >
              Latest Release
            </h3>
            <div className="text-white font-display font-bold text-lg mb-1">
              {changelog[0].version}
            </div>
            <div className="text-white/80 text-sm mb-3">
              {changelog[0].title}
            </div>
            <div className="text-white/60 text-xs mb-4">
              {changelog[0].date}
            </div>
            <a
              href={`#${changelog[0].version}`}
              className="inline-flex items-center gap-1.5 text-xs text-white/90 transition-colors hover:text-white"
            >
              View details <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Stats Card */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: '#71717A' }}
            >
              Current Archive
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Letters', value: stats.totalLetters, icon: BookOpen },
                { label: 'Concepts', value: concepts.length, icon: Lightbulb },
                { label: 'Companies', value: companies.length, icon: Building2 },
                { label: 'People', value: people.length, icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#E9F5EF' }}
                  >
                    <stat.icon className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#18181B' }}>
                      {stat.label}
                    </div>
                  </div>
                  <div
                    className="font-display font-bold text-sm"
                    style={{ color: '#2D6A4F' }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 text-center" style={{ borderTop: '1px solid #E6E2D9' }}>
              <span className="text-xs" style={{ color: '#A1A1AA' }}>
                {stats.yearsCovered} years covered
              </span>
            </div>
          </div>

          {/* AdSense Placeholder */}
          <AdUnit variant="sidebar" />

          {/* External Links */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}
          >
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#71717A' }}
            >
              Resources
            </h3>
            <div className="space-y-2">
              <a
                href="https://github.com/buffettknowledge/buffettknowledge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:underline"
                style={{ color: '#2D6A4F' }}
              >
                <Github className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm transition-colors hover:underline"
                style={{ color: '#2D6A4F' }}
              >
                <MessageCircle className="w-4 h-4" />
                About This Project
                <ArrowRight className="w-3 h-3 opacity-50" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
