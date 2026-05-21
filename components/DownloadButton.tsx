'use client'

import { useState } from 'react'
import { FileDown, Loader2, BookOpen } from 'lucide-react'
import type { Letter } from '@/data/types'
import { generateLetterPdf, generateBundlePdf } from '@/lib/generate-pdf'

// ── single-letter download button ─────────────────────────────────────

interface DownloadPdfButtonProps {
  letter: Letter
}

export function DownloadPdfButton({ letter }: DownloadPdfButtonProps) {
  const [busy, setBusy] = useState(false)

  const handle = async () => {
    setBusy(true)
    try {
      const { generateLetterPdf } = await import('@/lib/generate-pdf')
      generateLetterPdf({
        slug: letter.slug,
        title: letter.title,
        year: letter.year,
        date: letter.date,
        fullText: letter.fullText,
      })
    } catch (e: any) {
      alert(`PDF generation failed: ${e.message}`)
    } finally {
      setTimeout(() => setBusy(false), 1200)
    }
  }

  const disabled = busy || !letter.fullText || letter.fullText.length < 50

  return (
    <button
      onClick={handle}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: disabled ? '#E5E7EB' : '#2D6A4F',
        color: '#FFFFFF',
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.target as HTMLElement).style.backgroundColor = '#235540'
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.target as HTMLElement).style.backgroundColor = '#2D6A4F'
      }}
    >
      {busy ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <FileDown className="w-3 h-3" />
      )}
      {busy ? 'PDF' : 'PDF'}
    </button>
  )
}

// ── bundle download button ─────────────────────────────────────────────

interface DownloadBundleButtonProps {
  label: string
  letters: Letter[]
  fileName: string
}

export function DownloadBundleButton({
  letters,
  fileName,
}: DownloadBundleButtonProps) {
  const [busy, setBusy] = useState(false)

  const handle = async () => {
    const withText = letters.filter(
      (l) => l.fullText && l.fullText.length > 50 && !l.fullText.includes('Placeholder'),
    )
    if (withText.length === 0) {
      alert('No letters with full text available for this bundle.')
      return
    }

    setBusy(true)
    try {
      const { generateBundlePdf } = await import('@/lib/generate-pdf')
      generateBundlePdf(
        fileName.replace('.pdf', '').replace(/-/g, ' '),
        withText.map((l) => ({
          slug: l.slug,
          title: l.title,
          year: l.year,
          date: l.date,
          fullText: l.fullText,
        })),
        fileName,
      )
    } catch (e: any) {
      alert(`Bundle PDF generation failed: ${e.message}`)
    } finally {
      setTimeout(() => setBusy(false), 1200)
    }
  }

  return (
    <button
      onClick={handle}
      disabled={busy}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: busy ? '#D1D5DB' : '#2D6A4F',
        color: '#FFFFFF',
      }}
      onMouseEnter={(e) => {
        if (!busy) (e.currentTarget as HTMLElement).style.backgroundColor = '#235540'
      }}
      onMouseLeave={(e) => {
        if (!busy) (e.currentTarget as HTMLElement).style.backgroundColor = '#2D6A4F'
      }}
    >
      {busy ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {busy ? 'Generating' : 'Download PDF'}
    </button>
  )
}

// ── epub download button ─────────────────────────────────────────────

interface DownloadEpubButtonProps {
  letters: Letter[]
  fileName: string
  size?: 'sm' | 'md'
}

export function DownloadEpubButton({
  letters,
  fileName,
  size = 'md',
}: DownloadEpubButtonProps) {
  const [busy, setBusy] = useState(false)

  const handle = async () => {
    const withText = letters.filter(
      (l) => l.fullText && l.fullText.length > 50 && !l.fullText.includes('Placeholder'),
    )
    if (withText.length === 0) {
      alert('No letters with full text available for EPUB.')
      return
    }

    setBusy(true)
    try {
      const { generateEpub } = await import('@/lib/generate-epub')
      generateEpub(
        withText.map((l) => ({
          slug: l.slug,
          title: l.title,
          year: l.year,
          date: l.date,
          fullText: l.fullText,
        })),
        fileName,
      )
    } catch (e: any) {
      alert(`EPUB generation failed: ${e.message}`)
    } finally {
      setTimeout(() => setBusy(false), 1500)
    }
  }

  const isSm = size === 'sm'

  return (
    <button
      onClick={handle}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-lg transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: busy ? '#D1D5DB' : '#D97706',
        color: '#FFFFFF',
        padding: isSm ? '6px 12px' : '10px 20px',
        fontSize: isSm ? '12px' : '14px',
        fontWeight: 600,
      }}
      onMouseEnter={(e) => {
        if (!busy) (e.currentTarget as HTMLElement).style.backgroundColor = '#B45309'
      }}
      onMouseLeave={(e) => {
        if (!busy) (e.currentTarget as HTMLElement).style.backgroundColor = '#D97706'
      }}
    >
      {busy ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <BookOpen className="w-3.5 h-3.5" />
      )}
      {busy ? 'EPUB' : 'EPUB'}
    </button>
  )
}
