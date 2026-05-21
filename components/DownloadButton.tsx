'use client'

import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
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
      // jsPDF triggers download in a new tick; small delay feels natural
      setTimeout(() => setBusy(false), 1200)
    }
  }

  return (
    <button
      onClick={handle}
      disabled={busy || !letter.fullText || letter.fullText.length < 50}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: busy ? '#ddd' : '#2D6A4F',
        color: '#FFFFF',
      }}
      onMouseEnter={(e) => {
        if (!busy) (e.target as HTMLElement).style.backgroundColor = '#1E4A36'
      }}
      onMouseLeave={(e) => {
        if (!busy) (e.target as HTMLElement).style.backgroundColor = '#2D6A4F'
      }}
    >
      {busy ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <FileDown className="w-3 h-3" />
      )}
      {busy ? 'Generating…' : 'PDF'}
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
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: busy ? '#ddd' : '#2D6A4F',
        color: '#FFFFF',
      }}
      onMouseEnter={(e) => {
        if (!busy) (e.currentTarget as HTMLElement).style.backgroundColor = '#1E4A36'
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
      {busy ? 'Generating…' : 'Download PDF'}
    </button>
  )
}
