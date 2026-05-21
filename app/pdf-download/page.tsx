import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileDown,
  FileText,
  BookOpen,
  Building2,
  Star,
  ArrowRight,
  Download,
} from 'lucide-react'
import { allLetters, partnershipLetters, berkshireLetters, specialLetters, stats } from '@/data/letters'
import { DownloadPdfButton, DownloadBundleButton, DownloadEpubButton } from '@/components/DownloadButton'
import { AdUnit } from '@/components/AdUnit'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Download Center — BuffettKnowledge',
  description:
    'Download Warren Buffett shareholder letters as PDFs and EPUBs. Complete archive from 1956 to 2025, including Partnership and Berkshire eras.',
  alternates: { canonical: 'https://buffettknowledge.com/downloads' },
}

// ── era badge colours ─────────────────────────────────────

const ERA = {
  partnership: { bg: '#FEF3C7', text: '#92400E', dot: 'bg-[#F59E0B]' },
  berkshire:  { bg: '#D1FAE',  text: '#065F46', dot: 'bg-[#10B981]'  },
  special:     { bg: '#E0E7FF', text: '#3730A3', dot: 'bg-[#6366F1]' },
} as const

// ── server component ─────────────────────────────────────

export default function PdfDownloadPage() {
  // letters that actually have fullText
  const withText = allLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const partnershipWithText = partnershipLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const berkshireWithText = berkshireLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )

  // ── JSON-LD ──
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BuffettKnowledge — PDF & EPUB Download Center',
    description: `Download ${withText.length} Warren Buffett letters as PDFs and EPUBs.`,
    url: 'https://buffettknowledge.com/downloads',
    isPartOf: { '@type': 'WebSite', url: 'https://buffettknowledge.com' },
  }

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* ═════════════════════════════════════════════
          TWO-COLUMN LAYOUT
          ═════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* ── MAIN COLUMN ───────────────────────────── */}
        <main className="min-w-0">

          {/* page header */}
          <header className="mb-10 page-header">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#D1FAE' }}
              >
                <FileDown className="w-5 h-5" style={{ color: '#065F46' }} />
              </div>
              <h1 className="font-display text-4xl font-bold" style={{ color: '#18181B' }}>
                Download Center
              </h1>
            </div>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
              Generate and download Warren Buffett&rsquo;s shareholder letters as PDF or EPUB files.
              All content is sourced from the official Berkshire Hathaway archive
              and formatted for offline reading.
            </p>
          </header>

          {/* ═════════════════════════════════════════════
              BUNDLE CARDS
              ═════════════════════════════════════════════ */}
          <section className="mb-12">
            <h2 className="font-display text-lg font-semibold mb-5" style={{ color: '#18181B' }}>
              Complete Bundles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* ── Partnership bundle ── */}
              {partnershipWithText.length > 0 && (
                <div
                  className="rounded-xl p-5 border transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#92400E' }}>
                      Partnership
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#18181B' }}>
                    Partnership Era Bundle
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#78726A' }}>
                    {partnershipWithText.length} letters &middot; 1957&ndash;1969
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
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

              {/* ── Berkshire bundle ── */}
              {berkshireWithText.length > 0 && (
                <div
                  className="rounded-xl p-5 border transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#ECFDF5', borderColor: '#6EE7B7' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#065F46' }}>
                      Berkshire
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#18181B' }}>
                    Berkshire Hathaway Bundle
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#78726A' }}>
                    {berkshireWithText.length} letters &middot; 1970&ndash;2025
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
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

              {/* ── Complete archive bundle ── */}
              {withText.length > 0 && (
                <div
                  className="rounded-xl p-5 border transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: '#E0E7FF', borderColor: '#A5B4FC' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#3730A3' }}>
                      Complete
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#18181B' }}>
                    Complete Archive
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#78726A' }}>
                    All {withText.length} letters &middot; 1956&ndash;2025
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
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
              PARTNERSHIP LETTERS
              ═════════════════════════════════════════════ */}
          <section className="mb-10" id="partnership">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <span className="text-xs font-bold" style={{ color: '#92400E' }}>P</span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
                  Partnership Letters
                </h2>
                <p className="text-xs" style={{ color: '#71717A' }}>
                  {partnershipLetters.length} letters &middot; 1956 to 1969
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {partnershipLetters.map((letter: any) => (
                <LetterRow key={letter.slug} letter={letter} era="partnership" />
              ))}
            </div>
          </section>

          {/* ═════════════════════════════════════════════
              BERKSHIRE LETTERS
              ═════════════════════════════════════════════ */}
          <section className="mb-10" id="berkshire">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#D1FAE' }}
              >
                <span className="text-xs font-bold" style={{ color: '#065F46' }}>B</span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
                  Berkshire Hathaway Letters
                </h2>
                <p className="text-xs" style={{ color: '#71717A' }}>
                  {berkshireLetters.length} letters &middot; 1970 to 2025
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {berkshireLetters.map((letter: any) => (
                <LetterRow key={letter.slug} letter={letter} era="berkshire" />
              ))}
            </div>
          </section>

          {/* ═════════════════════════════════════════════
              SPECIAL LETTERS
              ═════════════════════════════════════════════ */}
          {specialLetters.length > 0 && (
            <section className="mb-10" id="special">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#E0E7FF' }}
                >
                  <span className="text-xs font-bold" style={{ color: '#3730A3' }}>S</span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
                    Special Letters
                  </h2>
                  <p className="text-xs" style={{ color: '#71717A' }}>
                    {specialLetters.length} milestone letters
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {specialLetters.map((letter: any) => (
                  <LetterRow key={letter.slug} letter={letter} era="special" />
                ))}
              </div>
            </section>
          )}

          {/* ═════════════════════════════════════════════
              FOOTER NOTE
              ═════════════════════════════════════════════ */}
          <div className="mt-12 p-5 rounded-xl" style={{ backgroundColor: '#F4F4F5', border: '1px solid #E6E2D9' }}>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#71717A' }} />
              <div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#3F3F46' }}>
                  About These Downloads
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#71717A' }}>
                  PDFs and EPUBs are generated in your browser using the letter content from
                  BuffettKnowledge. The original letters are hosted on the
                  {' '}
                  <a
                    href="https://www.berkshirehathaway.com/letters/letters.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#2D6A4F]"
                  >
                    official Berkshire Hathaway website
                  </a>
                  {' '}and are in the public domain. These files are
                  formatted for offline reading convenience.
                </p>
              </div>
            </div>
          </div>

        </main>

        {/* ── SIDEBAR ───────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">

            {/* ── Download Stats ── */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Download Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>Total letters</span>
                  <span className="font-mono font-medium" style={{ color: '#18181B' }}>{allLetters.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>With full text</span>
                  <span className="font-mono font-medium" style={{ color: '#2D6A4F' }}>{withText.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>Partnership era</span>
                  <span className="font-mono font-medium">{partnershipLetters.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#71717A' }}>Berkshire era</span>
                  <span className="font-mono font-medium">{berkshireLetters.length}</span>
                </div>
              </div>
            </div>

            {/* ── Quick Links (era anchors) ── */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Quick Links
              </h3>
              <div className="space-y-2">
                <a
                  href="#partnership"
                  className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                  style={{ color: '#3F3F46' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  Partnership Letters
                </a>
                <a
                  href="#berkshire"
                  className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                  style={{ color: '#3F3F46' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Berkshire Letters
                </a>
                {specialLetters.length > 0 && (
                  <a
                    href="#special"
                    className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                    style={{ color: '#3F3F46' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
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

            {/* ── AdSense placeholder ── */}
            <div className="sticky top-24">
              <AdUnit variant="sidebar" />
            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}

// ── Letter row (server component, renders client button) ─────────────

function LetterRow({ letter, era }: { letter: any; era: keyof typeof ERA }) {
  const hasText = letter.fullText && letter.fullText.length > 100 && !letter.fullText.includes('Placeholder')
  const colors = ERA[era]

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]/60"
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
          <FileText className="w-3 h-3" />
        </Link>

        {/* download PDF */}
        <DownloadPdfButton letter={letter} />

        {/* download EPUB (single letter) */}
        {hasText && (
          <DownloadEpubButton
            letters={[letter]}
            fileName={`${letter.slug}.epub`}
          />
        )}
      </div>
    </div>
  )
}
