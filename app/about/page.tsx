import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Github, BookOpen, Network, Search, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About BuffettKnowledge — the most comprehensive English archive of Warren Buffett shareholder letters, built for serious value investors.',
}

const features = [
  {
    icon: BookOpen,
    title: '70 Years of Letters',
    desc: 'Every partnership letter (1956–1970), Berkshire shareholder letter (1971–2025), and key special letter — fully indexed and searchable.',
  },
  {
    icon: Network,
    title: 'Concept Graph',
    desc: '150+ investment concepts cross-referenced across letters, with first appearance, refinement, and key-quote tags.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    desc: 'Search by concept, company, person, or keyword. Every entity is linked — click through to see every letter that mentions it.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Q&A',
    desc: 'Ask natural-language questions about any letter or concept. Our RAG engine retrieves the relevant passages and generates an answer.',
  },
]

const included = [
  '68 partnership & Berkshire shareholder letters (1956–2025)',
  '150+ investment concepts with cross-reference tags',
  '60+ company profiles with mention timelines',
  '17 key people — from Graham to Munger to Abel',
  '3,900+ cross-references between letters, concepts, and companies',
  'Key quotes extracted from every letter',
  'Interactive knowledge graph — explore concept relationships visually',
  'AI Q&A — ask questions in plain English',
]

const sources = [
  {
    label: 'Official Berkshire Hathaway Archive',
    url: 'https://www.berkshirehathaway.com',
  },
  {
    label: 'Open-Source Letter Transcripts',
    url: 'https://github.com/ReeceHarding/buffett-letters',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <div className="max-w-3xl">
        {/* Page Title */}
        <h1
          className="font-display text-4xl font-bold mb-2"
          style={{ color: '#18181B' }}
        >
          About BuffettKnowledge
        </h1>
        <p className="text-base mb-8" style={{ color: '#71717A' }}>
          Built for investors who want more than quotes.
        </p>

        {/* Hero Quote */}
        <div
          className="rounded-2xl p-8 mb-10"
          style={{ backgroundColor: '#2D6A4F' }}
        >
          <p className="text-white/85 text-lg leading-relaxed text-justify">
            The most comprehensive English-language archive of Warren Buffett&apos;s
            shareholder letters — from the first Partnership letter in 1956 to the
            2025 farewell. Every concept, company, and person is tagged, linked, and
            explorable.
          </p>
        </div>

        {/* What This Site Does */}
        <h2
          className="font-display text-2xl font-semibold mb-6"
          style={{ color: '#18181B' }}
        >
          What You Can Do Here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-5"
              style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
            >
              <f.icon
                className="w-5 h-5 mb-3"
                style={{ color: '#2D6A4F' }}
              />
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: '#18181B' }}
              >
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#3F3F46' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: '#18181B' }}
        >
          What&apos;s Included
        </h2>
        <ul className="space-y-3 mb-10">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3"
              style={{ color: '#3F3F46' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                style={{ backgroundColor: '#7EC39C' }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* How to Navigate */}
        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: '#18181B' }}
        >
          How to Navigate
        </h2>
        <div
          className="rounded-xl p-6 mb-10 space-y-4"
          style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}
        >
          {[
            {
              label: 'Letters',
              desc: 'Browse all letters chronologically. Filter by type (Partnership / Berkshire / Special). Click any letter to read the full text.',
            },
            {
              label: 'Concepts',
              desc: 'Explore 150+ investment concepts. Each concept page lists every letter that discusses it, tagged by relevance.',
            },
            {
              label: 'Companies',
              desc: 'See every Berkshire position and major holding. Each page shows all letters mentioning that company.',
            },
            {
              label: 'Graph',
              desc: 'Visualize connections between concepts. Zoom, pan, and click any node to dive into that concept.',
            },
            {
              label: 'Ask AI',
              desc: 'Type any question about Buffett\'s letters. The AI retrieves relevant passages and answers in its own words.',
            },
          ].map((item) => (
            <div key={item.label}>
              <span
                className="text-sm font-semibold"
                style={{ color: '#2D6A4F' }}
              >
                {item.label}
              </span>
              <span className="text-sm" style={{ color: '#3F3F46' }}>
                {' — '}{item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Data Sources */}
        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: '#18181B' }}
        >
          Data Sources
        </h2>
        <p
          className="text-base leading-relaxed text-justify mb-4"
          style={{ color: '#3F3F46' }}
        >
          All letter texts are sourced from the official Berkshire Hathaway website
          and open-source transcript projects. We do not claim copyright over any
          material — it is provided for educational and research purposes.
        </p>
        <div
          className="rounded-xl p-5 mb-10 space-y-3"
          style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
        >
          {sources.map((s) => (
            <div key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:underline"
                style={{ color: '#2D6A4F' }}
              >
                {s.label} →
              </a>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: '#18181B' }}
        >
          How Concepts Are Tagged
        </h2>
        <p
          className="text-base leading-relaxed text-justify mb-4"
          style={{ color: '#3F3F46' }}
        >
          Every letter is read and tagged with the investment concepts it discusses.
          A cross-reference is created when a concept is central to a letter
          (marked as &ldquo;key&rdquo;), marks its first appearance
          (&ldquo;first&rdquo;), represents a refinement of prior thinking
          (&ldquo;refinement&rdquo;), or is simply mentioned (&ldquo;mention&rdquo;).
        </p>
        <p
          className="text-base leading-relaxed text-justify mb-10"
          style={{ color: '#3F3F46' }}
        >
          Company and people mentions are identified by keyword matching and manual
          review. Each mention includes the relevant passage from the letter.
        </p>

        {/* Contribute */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}
        >
          <h3
            className="font-display text-lg font-semibold mb-2"
            style={{ color: '#18181B' }}
          >
            Contribute
          </h3>
          <p
            className="text-sm leading-relaxed text-justify mb-4"
            style={{ color: '#3F3F46' }}
          >
            This is an open project. If you find an error in letter text, concept
            assignment, or cross-reference, we welcome corrections. Open an issue
            or pull request on GitHub.
          </p>
          <a
            href="https://github.com/buffettknowledge/buffettknowledge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        {/* Disclaimer */}
        <div
          className="text-xs pt-6"
          style={{ color: '#A1A1AA', borderTop: '1px solid #E6E2D9' }}
        >
          <p>
            BuffettKnowledge is not affiliated with, endorsed by, or connected to
            Berkshire Hathaway Inc., Warren Buffett, or Charlie Munger. All
            trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </div>
  )
}
