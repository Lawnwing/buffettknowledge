import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'See how BuffettKnowledge has evolved — from launch to the latest features.',
}

interface ChangelogEntry {
  date: string
  version: string
  title: string
  items: string[]
}

const changelog: ChangelogEntry[] = [
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

export default function ChangelogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
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
            <div key={entry.date} className="relative pl-8">
              {/* Dot */}
              <div
                className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2"
                style={{
                  backgroundColor: '#fff',
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
        Something missing? Let us know or open an issue on GitHub.
      </div>
    </div>
  )
}
