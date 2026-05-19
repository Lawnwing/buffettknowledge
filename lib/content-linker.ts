// ============================================================
// Content Linker — Auto-link entities in blog post HTML
// ============================================================

import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

interface Entity {
  name: string
  slug: string
  type: 'concept' | 'company' | 'person'
}

// Build entity index
const entityIndex: Entity[] = [
  ...concepts.map((c) => ({ name: c.name, slug: c.slug, type: 'concept' as const })),
  ...companies.map((c) => ({ name: c.name, slug: c.slug, type: 'company' as const })),
  ...people.map((p) => ({ name: p.name, slug: p.slug, type: 'person' as const })),
]

// Sort by length descending so "Berkshire Hathaway" matches before "Berkshire"
const sortedEntities = [...entityIndex].sort((a, b) => b.name.length - a.name.length)

/**
 * Auto-link known entities in HTML content.
 * Skips content inside <a> tags, <code>, <pre>.
 * Only links the first occurrence of each entity.
 */
export function linkifyContent(html: string, excludeSlugs: string[] = []): string {
  const linkedSlugs = new Set<string>(excludeSlugs)

  // Process text nodes only — split by tags
  const parts: string[] = []
  let inTag = false
  let inAnchor = false
  let inCode = false
  let buffer = ''

  for (let i = 0; i < html.length; i++) {
    const char = html[i]

    if (char === '<') {
      if (buffer) {
        parts.push(inAnchor || inCode ? buffer : linkifyText(buffer, linkedSlugs))
        buffer = ''
      }
      inTag = true
      parts.push('<')
      continue
    }

    if (char === '>' && inTag) {
      inTag = false
      parts.push('>')
      // Check what tag we just closed/opened
      const tagContent = parts[parts.length - 2] || ''
      if (tagContent.toLowerCase().startsWith('a ')) inAnchor = true
      if (tagContent.toLowerCase() === '/a') inAnchor = false
      if (tagContent.toLowerCase().startsWith('code') || tagContent.toLowerCase() === 'code') inCode = true
      if (tagContent.toLowerCase() === '/code') inCode = false
      if (tagContent.toLowerCase().startsWith('pre') || tagContent.toLowerCase() === 'pre') inCode = true
      if (tagContent.toLowerCase() === '/pre') inCode = false
      continue
    }

    if (inTag) {
      parts[parts.length - 1] += char
    } else {
      buffer += char
    }
  }

  if (buffer) {
    parts.push(inAnchor || inCode ? buffer : linkifyText(buffer, linkedSlugs))
  }

  return parts.join('')
}

function linkifyText(text: string, linkedSlugs: Set<string>): string {
  let result = text

  for (const entity of sortedEntities) {
    if (linkedSlugs.has(entity.slug)) continue

    const escaped = entity.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`, 'g')

    if (regex.test(result)) {
      const urlPath = entity.type === 'concept'
        ? `/concepts/${entity.slug}`
        : entity.type === 'company'
          ? `/companies/${entity.slug}`
          : `/people/${entity.slug}`

      result = result.replace(regex, `<a href="${urlPath}" class="entity-link">${entity.name}</a>`)
      linkedSlugs.add(entity.slug)
    }
  }

  return result
}
