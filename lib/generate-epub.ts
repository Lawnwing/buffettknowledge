/**
 * Client-side EPUB generator using JSZip.
 *
 * Produces a valid EPUB 3.0 file:
 *   mimetype
 *   META-INF/container.xml
 *   OEBPS/package.opf
 *   OEBPS/toc.xhtml
 *   OEBPS/css/style.css
 *   OEBPS/text/letter-<slug>.xhtml   (1 per letter)
 *
 * Call `generateEpup(letters, fileName)` from a "use client" component.
 */

import JSZip from 'jszip'

// ── helpers ─────────────────────────────────────────────────────────────

/** Strip HTML → plain text (very light; good enough for TOC labels). */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/h[1-6]>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/** Very small HTML → XHTML sanitizer (self-closing <br/>, <hr/> etc.). */
function toXhtml(html: string): string {
  return html
    // self-close void elements
    .replace(/<br\s*>/gi, '<br/>')
    .replace(/<hr\s*>/gi, '<hr/>')
    .replace(/<img([^>]*)>/gi, '<img$1/>')
    // ensure </p> etc. are present (basic)
    .replace(/<p>/gi, '<p>')
}

// ── EPUB builder ────────────────────────────────────────────────────────

export interface EpubLetter {
  slug: string
  title: string
  year: number
  date?: string
  fullText: string
}

export function generateEpub(letters: EpubLetter[], fileName: string): void {
  const zip = new JSZip()
  const uid = 'buffett-knowledge-archive'
  const lang = 'en'

  // ── 1. mimetype (must be FIRST, uncompressed) ──
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

  // ── 2. META-INF/container.xml ──
  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
  )

  // ── 3. OEBPS/css/style.css ──
  const css = `
body { font-family: Georgia, "Times New Roman", serif; margin: 2em; line-height: 1.6; }
h1 { font-size: 1.4em; margin: 1em 0 0.5em; }
h2 { font-size: 1.2em; margin: 1em 0 0.5em; color: #2D6A4F; }
p  { margin: 0 0 0.8em; text-align: justify; }
.nav-list { list-style: none; padding: 0; }
.nav-list li { margin: 0.4em 0; }
  `.trim()
  zip.file('OEBPS/css/style.css', css)

  // ── 4. manifest: build manifest items + spine ──
  const manifestItems: string[] = []
  const spineItems: string[] = []
  const tocLi: string[] = []

  const lettersWithText = letters.filter(
    (l) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )

  // ── 5. generate one XHTML chapter per letter ──
  lettersWithText.forEach((letter, idx) => {
    const chapId = `letter-${letter.slug}`
    const href = `text/${chapId}.xhtml`
    const titleEsc = letter.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // convert fullText (HTML) → very simple XHTML body
    const bodyHtml = toXhtml(letter.fullText || '').replace(
      /<h2([^>]*)>/gi,
      '<h2$1>',
    )

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${lang}">
<head>
  <title>${titleEsc}</title>
  <link rel="stylesheet" type="text/css" href="../css/style.css"/>
</head>
<body>
  <h1>${titleEsc}</h1>
  ${letter.date ? `<p><strong>${letter.date}</strong></p>` : ''}
  <div class="letter-body">
    ${bodyHtml || '<p>[No content available.]</p>'}
  </div>
</body>
</html>`.trim()

    zip.file(`OEBPS/${href}`, xhtml)

    const mime = 'application/xhtml+xml'
    manifestItems.push(`  <item id="${chapId}" href="${href}" media-type="${mime}"/>`)
    spineItems.push(`  <itemref idref="${chapId}"/>`)
    tocLi.push(
      `  <li class="nav-list"><a href="${href}">${letter.year} — ${titleEsc}</a></li>`,
    )
  })

  if (manifestItems.length === 0) {
    alert('No letters with full text available for EPUB generation.')
    return
  }

  // ── 6. OEBPS/package.opf ──
  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Warren Buffett Letters Archive</dc:title>
    <dc:creator>Warren Buffett</dc:creator>
    <dc:language>${lang}</dc:language>
    <dc:identifier id="bookid">urn:uuid:${uid}</dc:identifier>
    <meta property="dcterms:modified">${new Date().toISOString().split('T')[0]}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="css/style.css" media-type="text/css"/>
${manifestItems.join('\n')}
  </manifest>
  <spine>
${spineItems.join('\n')}
  </spine>
</package>`.trim()

  zip.file('OEBPS/package.opf', opf)

  // ── 7. OEBPS/toc.xhtml (EPUB 3.0 nav) ──
  const tocXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${lang}">
<head>
  <title>Table of Contents</title>
  <link rel="stylesheet" type="text/css" href="css/style.css"/>
</head>
<body>
  <nav epub:type="toc" xmlns:epub="http://www.idpf.org/2007/ops">
    <h1>Table of Contents</h1>
    <ol class="nav-list">
${tocLi.join('\n')}
    </ol>
  </nav>
</body>
</html>`.trim()

  zip.file('OEBPS/toc.xhtml', tocXhtml)

  // ── 8. generate & trigger download ──
  zip.generateAsync(
    { type: 'blob', mimeType: 'application/epub+zip' },
    (metadata) => {
      // progress callback (optional)
    },
  ).then((blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName.endsWith('.epub') ? fileName : `${fileName}.epub`
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  })
}

/**
 * Convenience wrapper: generate a single-book EPUB from all letters in `letters`.
 */
export function generateFullArchiveEpup(letters: EpubLetter[]): void {
  generateEpub(letters, 'buffett-letters-archive.epub')
}
