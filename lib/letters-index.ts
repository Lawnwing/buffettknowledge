/**
 * BuffettKnowledge - Letter Search Index
 *
 * Provides full-text search across letters, concepts, and companies.
 * Uses simple keyword matching optimized for Edge/runtime environments.
 *
 * Search sources:
 * - Letter titles and summaries
 * - Concept names, definitions, and cross-reference passages
 * - Company names and timeline passages
 */

import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface SearchHit {
  type: 'letter' | 'concept' | 'company'
  slug: string
  title: string
  subtitle?: string
  year?: number
  passage?: string
  relevanceScore: number
}

export interface SearchResults {
  hits: SearchHit[]
  query: string
  totalHits: number
}

// ─────────────────────────────────────────────────────────────
// Pre-build search corpus
// ─────────────────────────────────────────────────────────────

interface SearchDoc {
  type: 'letter' | 'concept' | 'company'
  slug: string
  title: string
  year?: number
  content: string
}

// Build search corpus
const searchCorpus: SearchDoc[] = []

// Index all letters
allLetters.forEach((letter) => {
  searchCorpus.push({
    type: 'letter',
    slug: letter.slug,
    title: letter.title,
    year: letter.year,
    content: [
      letter.title,
      letter.summary,
      letter.keyQuotes.join(' '),
      letter.concepts.join(' '),
      letter.companies.join(' '),
    ].join(' ').toLowerCase(),
  })
})

// Index all concepts
concepts.forEach((concept) => {
  const crossRefsText = concept.crossReferences
    .map((ref) => ref.passage)
    .join(' ')

  searchCorpus.push({
    type: 'concept',
    slug: concept.slug,
    title: concept.name,
    content: [
      concept.name,
      concept.definition,
      crossRefsText,
    ].join(' ').toLowerCase(),
  })
})

// Index all companies
companies.forEach((company) => {
  const timelineText = company.timeline
    .map((t) => t.passage)
    .join(' ')

  searchCorpus.push({
    type: 'company',
    slug: company.slug,
    title: company.name,
    content: [
      company.name,
      company.industry,
      timelineText,
    ].join(' ').toLowerCase(),
  })
})

// ─────────────────────────────────────────────────────────────
// Search function
// ─────────────────────────────────────────────────────────────

/**
 * Calculate relevance score based on query match
 */
function scoreDocument(doc: SearchDoc, query: string): number {
  const q = query.toLowerCase()
  const words = q.split(/\s+/)

  let score = 0
  const titleLower = doc.title.toLowerCase()

  // Title exact match gets highest score
  if (titleLower === q) score += 10
  else if (titleLower.includes(q)) score += 5

  // Word-by-word scoring
  words.forEach((word) => {
    if (word.length < 2) return

    // Title contains word
    if (titleLower.includes(word)) score += 3

    // Content contains word
    const matches = doc.content.split(word).length - 1
    score += matches * 0.5
  })

  // Bonus for letters (most relevant type)
  if (doc.type === 'letter') score *= 1.2
  else if (doc.type === 'concept') score *= 1.1

  return score
}

/**
 * Search across letters, concepts, and companies
 * @param query - Search query string
 * @param limit - Maximum results (default: 5)
 * @returns SearchResults with hits from all categories
 */
export function searchLetters(
  query: string,
  limit: number = 5
): SearchResults {
  if (!query || query.trim().length < 2) {
    return { hits: [], query, totalHits: 0 }
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Score all documents
  const scored = searchCorpus.map((doc) => ({
    doc,
    score: scoreDocument(doc, normalizedQuery),
  }))

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)

  // Convert to SearchHit
  const hits: SearchHit[] = scored
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => {
      const doc = item.doc

      if (doc.type === 'letter') {
        return {
          type: 'letter' as const,
          slug: doc.slug,
          title: doc.title,
          year: doc.year,
          relevanceScore: item.score,
        }
      } else if (doc.type === 'concept') {
        const concept = concepts.find((c) => c.slug === doc.slug)
        return {
          type: 'concept' as const,
          slug: doc.slug,
          title: doc.title,
          subtitle: concept?.definition.slice(0, 150) + '...',
          passage: concept?.crossReferences[0]?.passage,
          relevanceScore: item.score,
        }
      } else {
        const company = companies.find((c) => c.slug === doc.slug)
        return {
          type: 'company' as const,
          slug: doc.slug,
          title: doc.title,
          subtitle: company?.industry,
          passage: company?.timeline[0]?.passage,
          relevanceScore: item.score,
        }
      }
    })

  return {
    hits,
    query,
    totalHits: hits.length,
  }
}

/**
 * Get letter context for AI prompt building
 * Returns a formatted string with relevant letters for RAG
 */
export function getLetterContext(query: string, maxLetters: number = 5): string {
  const results = searchLetters(query, maxLetters)

  if (results.hits.length === 0) {
    return ''
  }

  const letterHits = results.hits.filter((h) => h.type === 'letter')
  const conceptHits = results.hits.filter((h) => h.type === 'concept')
  const companyHits = results.hits.filter((h) => h.type === 'company')

  const sections: string[] = []

  // Add letter context
  if (letterHits.length > 0) {
    sections.push('## Relevant Letters\n')
    letterHits.forEach((hit) => {
      const letter = allLetters.find((l) => l.slug === hit.slug)
      if (letter) {
        sections.push(`**${letter.title}** (${letter.year})`)
        sections.push(`Summary: ${letter.summary}`)
        if (letter.keyQuotes.length > 0) {
          sections.push(`Key Quote: "${letter.keyQuotes[0]}"`)
        }
        sections.push('')
      }
    })
  }

  // Add concept context
  if (conceptHits.length > 0) {
    sections.push('## Relevant Concepts\n')
    conceptHits.forEach((hit) => {
      const concept = concepts.find((c) => c.slug === hit.slug)
      if (concept) {
        sections.push(`**${concept.name}**`)
        sections.push(`Definition: ${concept.definition}`)
        if (hit.passage) {
          sections.push(`From Buffett: "${hit.passage}"`)
        }
        sections.push('')
      }
    })
  }

  // Add company context
  if (companyHits.length > 0) {
    sections.push('## Relevant Companies\n')
    companyHits.forEach((hit) => {
      const company = companies.find((c) => c.slug === hit.slug)
      if (company) {
        sections.push(`**${company.name}** (${company.industry})`)
        if (hit.passage) {
          sections.push(`Buffett wrote: "${hit.passage}"`)
        }
        sections.push('')
      }
    })
  }

  return sections.join('\n')
}

/**
 * Get source references for displaying in UI
 */
export function getSourceReferences(
  query: string,
  limit: number = 3
): Array<{ type: string; slug: string; title: string; year?: number; url: string }> {
  const results = searchLetters(query, limit)

  return results.hits.slice(0, limit).map((hit) => {
    let url = ''
    if (hit.type === 'letter') {
      url = `/letters/${hit.slug}/`
    } else if (hit.type === 'concept') {
      url = `/concepts/${hit.slug}/`
    } else if (hit.type === 'company') {
      url = `/companies/${hit.slug}/`
    }

    return {
      type: hit.type,
      slug: hit.slug,
      title: hit.title,
      year: hit.year,
      url,
    }
  })
}
