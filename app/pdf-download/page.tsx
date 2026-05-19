import type { Metadata } from 'next'
import Link from 'next/link'
import { allLetters, partnershipLetters, berkshireLetters, specialLetters } from '@/data/letters'
import { FileDown, ExternalLink, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PDF Download',
  description: 'Download Warren Buffett shareholder letters in PDF format. Complete archive from 1956 to 2025.',
}

function LetterDownloadRow({
  year,
  title,
  sourceUrl,
}: {
  year: number
  title: string
  sourceUrl: string
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-[#E6E2D9]">
      <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}>
        {year}
      </span>
      <span className="text-sm flex-1 truncate" style={{ color: '#3F3F46' }}>
        {title}
      </span>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md transition-colors"
        style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}
      >
        <ExternalLink className="w-3 h-3" />
        <span>Read Online</span>
      </a>
    </div>
  )
}

export default function PdfDownloadPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      {/* Header */}
      <div className="mb-10 page-header">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#E9F5EF' }}
          >
            <FileDown className="w-5 h-5" style={{ color: '#2D6A4F' }} />
          </div>
          <h1 className="font-display text-4xl font-bold" style={{ color: '#18181B' }}>
            PDF Archive
          </h1>
        </div>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
          Browse and access all {allLetters.length} shareholder letters from Warren Buffett,
          spanning the Partnership era (1956–1969) to the present day. Each link opens the
          official letter on the Berkshire Hathaway website.
        </p>
      </div>

      {/* Partnership Letters */}
      <section className="mb-10">
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
              {partnershipLetters.length} letters — 1956 to 1969
            </p>
          </div>
        </div>
        <div className="space-y-1">
          {partnershipLetters.map((letter) => (
            <LetterDownloadRow
              key={letter.slug}
              year={letter.year}
              title={letter.title}
              sourceUrl={letter.sourceUrl}
            />
          ))}
        </div>
      </section>

      {/* Berkshire Letters */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#E9F5EF' }}
          >
            <span className="text-xs font-bold" style={{ color: '#2D6A4F' }}>B</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold" style={{ color: '#18181B' }}>
              Berkshire Hathaway Letters
            </h2>
            <p className="text-xs" style={{ color: '#71717A' }}>
              {berkshireLetters.length} letters — 1965 to 2025
            </p>
          </div>
        </div>
        <div className="space-y-1">
          {berkshireLetters.map((letter) => (
            <LetterDownloadRow
              key={letter.slug}
              year={letter.year}
              title={letter.title}
              sourceUrl={letter.sourceUrl}
            />
          ))}
        </div>
      </section>

      {/* Special Letters */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#E4E4E7' }}
          >
            <span className="text-xs font-bold" style={{ color: '#52525B' }}>S</span>
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
          {specialLetters.map((letter) => (
            <LetterDownloadRow
              key={letter.slug}
              year={letter.year}
              title={letter.title}
              sourceUrl={letter.sourceUrl}
            />
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <div className="mt-12 p-5 rounded-xl" style={{ backgroundColor: '#F4F4F5', border: '1px solid #E6E2D9' }}>
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#71717A' }} />
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#3F3F46' }}>
              About the Archive
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#71717A' }}>
              All letters are hosted on the official Berkshire Hathaway website
              (berkshirehathaway.com). This archive provides curated metadata,
              cross-references, and analysis tools. For offline access, you may visit
              {' '}
              <a
                href="https://www.berkshirehathaway.com/letters/letters.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#2D6A4F]"
              >
                the official letters page
              </a>
              {' '}directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
