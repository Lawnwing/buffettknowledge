/**
 * Client-side PDF generation utility using jsPDF.
 *
 * Each letter is rendered as:
 *  – Page 1  : title + meta
 *  – Page 2+ : body text (HTML-stripped, auto-paged by jsPDF)
 *
 * Call `generateLetterPdf(letter)` from a "use client" component.
 */

import jsPDF from 'jspdf'

// ── helpers ───────────────────────────────────────────────────────────────────

/** Strip HTML tags & decode entities → plain text. */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li>/gi, '  • ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ── public API ─────────────────────────────────────────────────────────────────

export interface PdfLetter {
  slug: string
  title: string
  year: number
  date?: string
  fullText: string
}

/**
 * Generate and download a PDF for a single letter.
 * Must be called from a browser context ("use client").
 */
export function generateLetterPdf(letter: PdfLetter): void {
  if (!letter.fullText || letter.fullText.length < 50) {
    alert('This letter has no full text available for PDF download.')
    return
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })

  const MARGIN = 20 // mm
  const MAX_W  = 210 - MARGIN * 2 // A4 width − margins
  let   y      = MARGIN

  // ── helpers bound to this doc ──

  const addFooter = () => {
    const pg = (doc as any).internal.getCurrentPageInfo().pageNumber
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(String(pg), 105, 297 - 10, { align: 'center' })
    doc.setTextColor(0)
  }

  // ── title page ──

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  const titleLines = doc.splitTextToSize(letter.title, MAX_W)
  ;(doc as any).text(titleLines, MARGIN, y, { baseline: 'top' })
  y += titleLines.length * 8 + 4

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Warren Buffett — ${letter.year}`, MARGIN, y)
  y += 7

  if (letter.date) {
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(letter.date, MARGIN, y)
    doc.setTextColor(0)
    y += 7
  }

  y += 6
  doc.setFontSize(10)
  doc.setTextColor(45, 106, 79) // #2D6A4F
  doc.text('BuffettKnowledge.com — offline archive', MARGIN, y)
  doc.setTextColor(0)

  addFooter()
  doc.addPage()
  y = MARGIN

  // ── body ──

  const plain = stripHtml(letter.fullText)
  const paragraphs = plain.split(/\n{2,}/).filter(Boolean)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(30)

  for (const raw of paragraphs) {
    const para = raw.trim()
    if (!para) continue

    // heuristic: short all-caps → sub-heading
    const isHeading =
      para.length < 80 && para === para.toUpperCase() && /[A-Z]/.test(para)

    if (isHeading) {
      y += 3
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(45, 106, 79)
      const headLines = doc.splitTextToSize(para, MAX_W)
      ;(doc as any).text(headLines, MARGIN, y, { baseline: 'top' })
      y += headLines.length * 5 + 3
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30)
      continue
    }

    const lines: string[] = (doc as any).splitTextToSize(para, MAX_W)
    for (const line of lines) {
      if (y > 277) {
        addFooter()
        doc.addPage()
        y = MARGIN
      }
      ;(doc as any).text(line, MARGIN, y, { baseline: 'top' })
      y += 5.2
    }
    y += 2.8 // paragraph gap
  }

  // final footer
  addFooter()

  // ── download ──
  doc.save(`${letter.slug}.pdf`)
}

/**
 * Generate a single bundled PDF containing multiple letters.
 * (Used for "Partnership Bundle", "Berkshire Bundle", etc.)
 */
export function generateBundlePdf(
  label: string,
  letters: PdfLetter[],
  fileName: string,
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })

  const MARGIN = 20
  const MAX_W  = 210 - MARGIN * 2

  const addFooter = () => {
    const pg = (doc as any).internal.getCurrentPageInfo().pageNumber
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(String(pg), 105, 297 - 10, { align: 'center' })
    doc.setTextColor(0)
  }

  let y = MARGIN

  // ── cover page ──
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  const covLines = doc.splitTextToSize(label, MAX_W)
  ;(doc as any).text(covLines, MARGIN, y, { baseline: 'top' })
  y += covLines.length * 9 + 6

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  const years = letters.map(l => l.year).join(', ')
  doc.text(`Warren Buffett — ${years}`, MARGIN, y)
  y += 8

  doc.setFontSize(10)
  doc.setTextColor(45, 106, 79)
  doc.text(`BuffettKnowledge.com — ${letters.length} letters`, MARGIN, y)
  doc.setTextColor(0)

  addFooter()

  // ── each letter ──
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]
    if (!letter.fullText || letter.fullText.length < 50) continue

    doc.addPage()
    y = MARGIN

    // letter title
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    const tLines = doc.splitTextToSize(letter.title, MAX_W)
    ;(doc as any).text(tLines, MARGIN, y, { baseline: 'top' })
    y += tLines.length * 7 + 4

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Warren Buffett — ${letter.year}`, MARGIN, y)
    y += 7

    // body
    const plain = stripHtml(letter.fullText)
    const paragraphs = plain.split(/\n{2,}/).filter(Boolean)

    doc.setFontSize(10.5)
    doc.setTextColor(30)

    for (const raw of paragraphs) {
      const para = raw.trim()
      if (!para) continue

      const isHeading =
        para.length < 80 && para === para.toUpperCase() && /[A-Z]/.test(para)

      if (isHeading) {
        y += 3
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(45, 106, 79)
        const hLines = doc.splitTextToSize(para, MAX_W)
        ;(doc as any).text(hLines, MARGIN, y, { baseline: 'top' })
        y += hLines.length * 5 + 3
        doc.setFontSize(10.5)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(30)
        continue
      }

      const lines: string[] = (doc as any).splitTextToSize(para, MAX_W)
      for (const line of lines) {
        if (y > 277) {
          addFooter()
          doc.addPage()
          y = MARGIN
        }
        ;(doc as any).text(line, MARGIN, y, { baseline: 'top' })
        y += 5
      }
      y += 2.5
    }

    addFooter()
  }

  doc.save(fileName)
}
