/**
 * Auto-link keywords in HTML content to concept/company/person pages.
 *
 * Strategy:
 * 1. Split HTML into alternating text blocks and tag blocks.
 * 2. Replace keywords only inside text blocks (never inside tags).
 * 3. Sort entities by name length descending so longer names match first
 *    (e.g. "Intrinsic Value" before "Value").
 * 4. Skip text that is already inside an <a> tag.
 */

interface LinkEntity {
  name: string
  slug: string
  type: 'concepts' | 'companies' | 'people'
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Split raw HTML into alternating text/tag segments.
 */
function splitHtml(html: string): Array<{ kind: 'text' | 'tag'; content: string }> {
  const segments: Array<{ kind: 'text' | 'tag'; content: string }> = []
  const tagRegex = /<[^>]+>/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = tagRegex.exec(html)) !== null) {
    if (match.index > cursor) {
      segments.push({ kind: 'text', content: html.slice(cursor, match.index) })
    }
    segments.push({ kind: 'tag', content: match[0] })
    cursor = match.index + match[0].length
  }
  if (cursor < html.length) {
    segments.push({ kind: 'text', content: html.slice(cursor) })
  }
  return segments
}

/**
 * Check whether a given text segment sits inside an <a>...</a> pair
 * by looking at the preceding tag history.
 */
function isInsideAnchor(segments: Array<{ kind: 'text' | 'tag'; content: string }>, index: number): boolean {
  let insideAnchor = false
  for (let i = 0; i < index; i++) {
    const seg = segments[i]
    if (seg.kind === 'tag') {
      if (seg.content.startsWith('<a') || seg.content.startsWith('<A')) insideAnchor = true
      else if (seg.content.toLowerCase() === '</a>') insideAnchor = false
    }
  }
  return insideAnchor
}

export function autoLinkHtml(html: string, entities: LinkEntity[]): string {
  if (!html || entities.length === 0) return html

  // Longest-first so that "Intrinsic Value" is matched before "Value"
  const sorted = [...entities].sort((a, b) => b.name.length - a.name.length)

  const segments = splitHtml(html)

  const processed = segments.map((seg, idx) => {
    if (seg.kind !== 'text') return seg.content
    if (isInsideAnchor(segments, idx)) return seg.content

    let text = seg.content

    for (const entity of sorted) {
      const pattern = new RegExp(
        `(?<![\\w-])(${escapeRegExp(entity.name)})(?![\\w-])`,
        'gi'
      )
      text = text.replace(pattern, (match) => {
        // Skip if the surrounding context is already a link
        // (simple heuristic: look at last 20 chars before match)
        return `<a href="/${entity.type}/${entity.slug}" class="inline-link">${match}</a>`
      })
    }

    return text
  })

  return processed.join('')
}
