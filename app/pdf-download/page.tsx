import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileDown,
  FileText,
  BookOpen,
  Star,
  ArrowRight,
  Download,
  BookMarked,
  Lightbulb,
  Building2,
  Search,
  Smartphone,
  Globe,
  ChevronDown,
} from 'lucide-react'
import { allLetters, partnershipLetters, berkshireLetters, specialLetters, stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { DownloadPdfButton, DownloadBundleButton, DownloadEpubButton } from '@/components/DownloadButton'
import { AdUnit } from '@/components/AdUnit'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Download Center - Warren Buffett Letters Archive | BuffettKnowledge',
  description:
    'Download the complete Warren Buffett shareholder letters as PDF and EPUB. 70+ years of investment wisdom, formatted for offline reading on any device. Free forever.',
  keywords: [
    'Warren Buffett letters PDF download',
    'Buffett shareholder letters EPUB',
    'Berkshire Hathaway letters archive',
    'investment letters download',
    'Buffett letters free PDF',
  ],
  alternates: { canonical: 'https://buffettknowledge.com/downloads' },
}

// ── era badge colours ─────────────────────────────────────

const ERA = {
  partnership: { bg: '#FEF3C7', text: '#92400E', dot: 'bg-amber-500', border: '#FDE68A' },
  berkshire:   { bg: '#ECFDF5', text: '#065F46', dot: 'bg-emerald-500', border: '#6EE7B7' },
  special:     { bg: '#E0E7FF', text: '#3730A3', dot: 'bg-indigo-500',  border: '#A5B4FC' },
} as const

export default function DownloadPage() {
  const withText = allLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const partnershipWithText = partnershipLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const berkshireWithText = berkshireLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )

  // JSON-LD
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Warren Buffett Letters Archive - PDF & EPUB Download Center',
    description: `Download ${withText.length} Warren Buffett shareholder letters as PDF and EPUB files. Complete archive from 1956 to 2025.`,
    url: 'https://buffettknowledge.com/downloads',
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
    about: { '@type': 'Person', name: 'Warren Buffett' },
  }

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* ════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* ── left: text ── */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
              >
                <Download className="w-3.5 h-3.5" />
                Free Forever - No Sign-Up Required
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: '#18181B' }}>
                Download the Complete<br />
                Warren Buffett Letters<br />
                Archive
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: '#52525B' }}>
                Every shareholder letter Warren Buffett has ever written, from his early
                partnership days through the Berkshire Hathaway era. Available as PDF and
                EPUB - read offline on any device, anywhere.
              </p>

              {/* hero stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#2D6A4F' }}>{stats.totalLetters}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717A' }}>Letters</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#2D6A4F' }}>{concepts.length}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717A' }}>Concepts</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#2D6A4F' }}>{companies.length}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717A' }}>Companies</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#2D6A4F' }}>70+</div>
                  <div className="text-xs mt-1" style={{ color: '#71717A' }}>Years</div>
                </div>
              </div>

              {/* hero CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <DownloadBundleButton
                  label="Complete Archive"
                  letters={withText}
                  fileName="buffett-complete-archive.pdf"
                />
                <DownloadEpubButton
                  letters={withText}
                  fileName="buffett-complete-archive.epub"
                />
                <a
                  href="#bundles"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors hover:bg-emerald-100"
                  style={{ color: '#2D6A4F', backgroundColor: '#ECFDF5' }}
                >
                  View All Bundles
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ── right: visual ── */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* decorative book stack */}
                <div
                  className="w-64 h-80 rounded-r-xl rounded-l-sm shadow-2xl flex flex-col items-center justify-center relative"
                  style={{ backgroundColor: '#2D6A4F', transform: 'rotate(-3deg)' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-sm" style={{ backgroundColor: '#1E4A36' }} />
                  <BookMarked className="w-16 h-16 mb-4" style={{ color: '#D4AF37' }} />
                  <div className="text-center px-6">
                    <div className="font-display text-lg font-bold text-white mb-1">Warren Buffett</div>
                    <div className="text-xs" style={{ color: '#A7C4B5' }}>Shareholder Letters</div>
                    <div className="text-xs mt-2" style={{ color: '#A7C4B5' }}>1956 - 2025</div>
                  </div>
                  <div className="absolute bottom-4 text-xs" style={{ color: '#A7C4B5' }}>buffettknowledge.com</div>
                </div>
                {/* second book behind */}
                <div
                  className="absolute -top-4 -right-8 w-64 h-80 rounded-r-xl rounded-l-sm shadow-xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: '#D97706', transform: 'rotate(6deg)', zIndex: -1 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-sm" style={{ backgroundColor: '#B45309' }} />
                  <BookOpen className="w-14 h-14 mb-4 text-white opacity-80" />
                  <div className="text-center px-6">
                    <div className="font-display text-base font-bold text-white">Complete Archive</div>
                    <div className="text-xs mt-1 text-white opacity-70">EPUB Edition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VALUE PROPOSITION CARDS
          ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#18181B' }}>
              What You Get
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#52525B' }}>
              Every letter, concept, and company profile in your pocket. Formatted for
              serious study and offline reading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: BookMarked,
                title: `${stats.totalLetters} Letters`,
                desc: 'From the 1956 Partnership Agreement through the 2025 Berkshire Hathaway report. Every word, preserved.',
                color: '#2D6A4F',
                bg: '#ECFDF5',
              },
              {
                icon: Lightbulb,
                title: `${concepts.length} Core Concepts`,
                desc: 'Each investment concept cross-linked to the original letter where Buffett first explained it.',
                color: '#D97706',
                bg: '#FEF3C7',
              },
              {
                icon: Building2,
                title: `${companies.length} Company Profiles`,
                desc: 'Full profiles of every company Buffett has written about, with buy-hold-sell timelines.',
                color: '#7C3AED',
                bg: '#F3E8FF',
              },
              {
                icon: Search,
                title: 'Full-Text Searchable',
                desc: 'All PDFs are text-selectable. Search for any keyword across the entire archive in seconds.',
                color: '#059669',
                bg: '#D1FAE5',
              },
              {
                icon: Smartphone,
                title: 'PDF + EPUB Formats',
                desc: 'PDF for desktop printing and annotation. EPUB for Kindle, iPad, and every e-reader.',
                color: '#0284C7',
                bg: '#E0F2FE',
              },
              {
                icon: Globe,
                title: 'Free Forever',
                desc: 'No paywall, no sign-up, no tracking. These letters belong to the public domain. We just organize them.',
                color: '#DC2626',
                bg: '#FEE2E2',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border transition-shadow hover:shadow-lg"
                style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TWO-COLUMN LAYOUT (bundles + list + sidebar)
          ════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* ── MAIN COLUMN ───────────────────────────────────── */}
        <main className="min-w-0">

          {/* ═════════════════════════════════════════════
              BUNDLE CARDS
              ═════════════════════════════════════════════ */}
          <section className="mb-14" id="bundles">
            <h2 className="font-display text-xl font-semibold mb-2" style={{ color: '#18181B' }}>
              Download Bundles
            </h2>
            <p className="text-sm mb-6" style={{ color: '#71717A' }}>
              Get every letter from an era in a single file. Perfect for deep-dive study.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* Partnership bundle */}
              {partnershipWithText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#92400E' }}>
                      Partnership
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Partnership Era
                  </h3>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    {partnershipWithText.length} letters, 1957-1969
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    Buffett&apos;s early partnership letters reveal the raw investment framework before Berkshire.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Partnership Era"
                      letters={partnershipWithText}
                      fileName="buffett-partnership-letters.pdf"
                    />
                    <DownloadEpubButton
                      letters={partnershipWithText}
                      fileName="buffett-partnership-letters.epub"
                    />
                  </div>
                </div>
              )}

              {/* Berkshire bundle */}
              {berkshireWithText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#ECFDF5', borderColor: '#6EE7B7' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#065F46' }}>
                      Berkshire
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Berkshire Era
                  </h3>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    {berkshireWithText.length} letters, 1970-2025
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    The canonical shareholder letters that shaped modern value investing.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Berkshire Era"
                      letters={berkshireWithText}
                      fileName="buffett-berkshire-letters.pdf"
                    />
                    <DownloadEpubButton
                      letters={berkshireWithText}
                      fileName="buffett-berkshire-letters.epub"
                    />
                  </div>
                </div>
              )}

              {/* Complete bundle */}
              {withText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#E0E7FF', borderColor: '#A5B4FC' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3730A3' }}>
                      Complete
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Complete Archive
                  </h3>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    All {withText.length} letters, 1956-2025
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    The full collection. Every partnership letter and every Berkshire annual report.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Complete Archive"
                      letters={withText}
                      fileName="buffett-complete-archive.pdf"
                    />
                    <DownloadEpubButton
                      letters={withText}
                      fileName="buffett-complete-archive.epub"
                    />
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* ═════════════════════════════════════════════
              LETTER LIST
              ═════════════════════════════════════════════ */}
          <LetterListSection
            title="Partnership Letters"
            subtitle={`${partnershipLetters.length} letters, 1956 to 1969`}
            letters={partnershipLetters}
            era="partnership"
            id="partnership"
          />

          <LetterListSection
            title="Berkshire Hathaway Letters"
            subtitle={`${berkshireLetters.length} letters, 1970 to 2025`}
            letters={berkshireLetters}
            era="berkshire"
            id="berkshire"
          />

          {specialLetters.length > 0 && (
            <LetterListSection
              title="Special Letters"
              subtitle={`${specialLetters.length} milestone letters`}
              letters={specialLetters}
              era="special"
              id="special"
            />
          )}

          {/* ═════════════════════════════════════════════
              FAQ
              ═════════════════════════════════════════════ */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-5" style={{ color: '#18181B' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: 'Are these files really free?',
                  a: 'Yes. Warren Buffett\'s shareholder letters are in the public domain. We format and organize them for offline reading, but the content itself is free.',
                },
                {
                  q: 'What is the difference between PDF and EPUB?',
                  a: 'PDF preserves the exact layout and is best for printing and desktop reading. EPUB reflows to fit any screen size and is ideal for e-readers like Kindle, Kobo, and Apple Books.',
                },
                {
                  q: 'How are the files generated?',
                  a: 'PDFs and EPUBs are generated directly in your browser using the letter content from our archive. Nothing is uploaded to a server, and no data leaves your device.',
                },
                {
                  q: 'Why are some letters marked "no text available"?',
                  a: 'We are still digitizing the full text for some older letters. All letters with complete text are available for download; the rest will be added as soon as they are ready.',
                },
                {
                  q: 'Can I read the letters online without downloading?',
                  a: 'Absolutely. Every letter is available to read in full on this website. The downloads are just for offline convenience.',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
                >
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#18181B' }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═════════════════════════════════════════════
              FOOTER NOTE
              ═════════════════════════════════════════════ */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: '#F4F4F5', border: '1px solid #E6E2D9' }}>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#71717A' }} />
              <div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#3F3F46' }}>
                  About These Downloads
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#71717A' }}>
                  PDFs and EPUBs are generated in your browser using the letter content from
                  BuffettKnowledge. The original letters are hosted on the{' '}
                  <a
                    href="https://www.berkshirehathaway.com/letters/letters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#2D6A4F]"
                  >
                    official Berkshire Hathaway website
                  </a>
                  {' '}and are in the public domain.
                </p>
              </div>
            </div>
          </div>

        </main>

        {/* ── SIDEBAR ───────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">

            {/* Download Stats */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Archive Stats
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Total letters', value: allLetters.length },
                  { label: 'With full text', value: withText.length, highlight: true },
                  { label: 'Partnership era', value: partnershipLetters.length },
                  { label: 'Berkshire era', value: berkshireLetters.length },
                  { label: 'Core concepts', value: concepts.length },
                  { label: 'Companies', value: companies.length },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between">
                    <span style={{ color: '#71717A' }}>{s.label}</span>
                    <span
                      className="font-mono font-medium"
                      style={{ color: s.highlight ? '#2D6A4F' : '#18181B' }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { href: '#partnership', label: 'Partnership Letters', dot: 'bg-amber-500' },
                  { href: '#berkshire', label: 'Berkshire Letters', dot: 'bg-emerald-500' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                    style={{ color: '#3F3F46' }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${link.dot}`} />
                    {link.label}
                  </a>
                ))}
                {specialLetters.length > 0 && (
                  <a
                    href="#special"
                    className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                    style={{ color: '#3F3F46' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Special Letters
                  </a>
                )}
                <Link
                  href="/ask"
                  className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                  style={{ color: '#2D6A4F' }}
                >
                  <ArrowRight className="w-3 h-3" />
                  Ask AI about letters
                </Link>
              </div>
            </div>

            {/* AdSense placeholder */}
            <AdUnit variant="sidebar" />

          </div>
        </aside>

      </div>
    </div>
  )
}

// ── Letter list section ─────────────────────────────────────────────

function LetterListSection({
  title,
  subtitle,
  letters,
  era,
  id,
}: {
  title: string
  subtitle: string
  letters: any[]
  era: keyof typeof ERA
  id: string
}) {
  const colors = ERA[era]

  return (
    <section className="mb-10" id={id}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.bg }}
        >
          <span className="text-xs font-bold" style={{ color: colors.text }}>
            {era === 'partnership' ? 'P' : era === 'berkshire' ? 'B' : 'S'}
          </span>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold" style={{ color: '#18181B' }}>
            {title}
          </h2>
          <p className="text-xs" style={{ color: '#71717A' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-0.5">
        {letters.map((letter: any) => (
          <LetterRow key={letter.slug} letter={letter} era={era} />
        ))}
      </div>
    </section>
  )
}

// ── Letter row ──────────────────────────────────────────────────────

function LetterRow({ letter, era }: { letter: any; era: keyof typeof ERA }) {
  const hasText = letter.fullText && letter.fullText.length > 100 && !letter.fullText.includes('Placeholder')
  const colors = ERA[era]

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#E6E2D9]/50"
      style={{ borderBottom: '1px solid transparent' }}
    >
      {/* year badge */}
      <span
        className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
        style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
      >
        {letter.year}
      </span>

      {/* title */}
      <span className="text-sm flex-1 truncate" style={{ color: '#3F3F46' }}>
        {letter.title}
        {letter.featured && (
          <Star className="w-3 h-3 inline ml-1" style={{ color: '#EAB308' }} />
        )}
      </span>

      {/* action buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* view online */}
        <Link
          href={`/letters/${letter.slug}`}
          className="text-xs px-2 py-1 rounded hover:bg-[#E6E2D9] transition-colors"
          style={{ color: '#71717A' }}
          title="View online"
        >
          <FileText className="w-3.5 h-3.5" />
        </Link>

        {/* download PDF */}
        <DownloadPdfButton letter={letter} />

        {/* download EPUB */}
        {hasText && (
          <DownloadEpubButton
            letters={[letter]}
            fileName={`${letter.slug}.epub`}
            size="sm"
          />
        )}
      </div>
    </div>
  )
}
