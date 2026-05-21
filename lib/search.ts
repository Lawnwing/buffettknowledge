import FlexSearch from 'flexsearch'
import type { SearchResult } from '@/data/types'
import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

// ============================================================
// Optimized client-side search using FlexSearch
// – Uses slug as the index key (O(1) lookup, no .find() loop)
// – Adds snippet/keyword highlight support
// ============================================================

// ── Letters ───────────────────────────────────────────────────

const letterIndex = new FlexSearch.Index({ tokenize: 'forward' })
const letterDocs: Record<string, { title: string; summary: string; year: number }> = {}

for (const letter of allLetters) {
  letterDocs[letter.slug] = { title: letter.title, summary: letter.summary, year: letter.year }
  letterIndex.add(letter.slug, `${letter.title} ${letter.summary}`)
}

// ── Concepts ─────────────────────────────────────────────────

const conceptIndex = new FlexSearch.Index({ tokenize: 'forward' })
const conceptDocs: Record<string, { name: string; definition: string }> = {}

for (const c of concepts) {
  conceptDocs[c.slug] = { name: c.name, definition: c.definition }
  conceptIndex.add(c.slug, `${c.name} ${c.definition}`)
}

// ── Companies ────────────────────────────────────────────────

const companyIndex = new FlexSearch.Index({ tokenize: 'forward' })
const companyDocs: Record<string, { name: string; industry: string }> = {}

for (const c of companies) {
  companyDocs[c.slug] = { name: c.name, industry: c.industry }
  companyIndex.add(c.slug, `${c.name} ${c.industry}`)
}

// ── People ───────────────────────────────────────────────────

const personIndex = new FlexSearch.Index({ tokenize: 'forward' })
const personDocs: Record<string, { name: string; role: string }> = {}

for (const p of people) {
  personDocs[p.slug] = { name: p.name, role: p.role }
  personIndex.add(p.slug, `${p.name} ${p.role}`)
}

// ── Helpers ──────────────────────────────────────────────────

/** Truncate text and append "..." */
function truncate(text: string, max = 80): string {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '...' : text
}

/** Highlight query keywords in text (wraps matches in <mark>) */
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const words = query.trim().split(/\s+/).filter(w => w.length >= 2)
  if (words.length === 0) return text
  let out = text
  for (const word of words) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')
    out = out.replace(regex, '<mark>$1</mark>')
  }
  return out
}

// ── Search ─────────────────────────────────────────────────────

export function search(query: string): SearchResult[] {
  if (!query.trim()) return []

  const results: SearchResult[] = []
  const seen = new Set<string>()

  const limitPerType = 8
  const totalLimit = 20

  // Search letters
  const letterHits = letterIndex.search(query, { limit: limitPerType }) as string[]
  for (const slug of letterHits) {
    if (seen.has(`letter-${slug}`)) continue
    seen.add(`letter-${slug}`)
    const doc = letterDocs[slug]
    if (!doc) continue
    results.push({
      type: 'letter',
      slug,
      title: doc.title,
      subtitle: truncate(doc.summary),
      year: doc.year,
      snippet: highlightText(doc.summary.slice(0, 160), query),
    })
    if (results.length >= totalLimit) break
  }

  // Search concepts
  const conceptHits = conceptIndex.search(query, { limit: limitPerType }) as string[]
  for (const slug of conceptHits) {
    if (seen.has(`concept-${slug}`)) continue
    seen.add(`concept-${slug}`)
    const doc = conceptDocs[slug]
    if (!doc) continue
    results.push({
      type: 'concept',
      slug,
      title: doc.name,
      subtitle: truncate(doc.definition),
      snippet: highlightText(doc.definition.slice(0, 160), query),
    })
    if (results.length >= totalLimit) break
  }

  // Search companies
  const companyHits = companyIndex.search(query, { limit: limitPerType }) as string[]
  for (const slug of companyHits) {
    if (seen.has(`company-${slug}`)) continue
    seen.add(`company-${slug}`)
    const doc = companyDocs[slug]
    if (!doc) continue
    results.push({
      type: 'company',
      slug,
      title: doc.name,
      subtitle: doc.industry,
      snippet: highlightText(doc.industry, query),
    })
    if (results.length >= totalLimit) break
  }

  // Search people
  const personHits = personIndex.search(query, { limit: limitPerType }) as string[]
  for (const slug of personHits) {
    if (seen.has(`person-${slug}`)) continue
    seen.add(`person-${slug}`)
    const doc = personDocs[slug]
    if (!doc) continue
    results.push({
      type: 'person',
      slug,
      title: doc.name,
      subtitle: doc.role,
      snippet: highlightText(doc.role, query),
    })
    if (results.length >= totalLimit) break
  }

  return results.slice(0, totalLimit)
}

// ── Recommended content (shown when query is empty) ─────────

const RECOMMEND_LETTERS = [
  '1956-partnership-letter',
  '1969-partnership-letter',
  '1977-berkshire-letter',
  '1987-berkshire-letter',
  '1998-berkshire-letter',
]

const RECOMMEND_CONCEPTS = [
  'intrinsic-value',
  'margin-of-safety',
  'economic-moat',
  'circle-of-competence',
  'mr-market',
]

export function getRecommendedResults(): SearchResult[] {
  const results: SearchResult[] = []

  for (const slug of RECOMMEND_LETTERS) {
    const doc = letterDocs[slug]
    if (!doc) continue
    results.push({ type: 'letter', slug, title: doc.title, subtitle: truncate(doc.summary), year: doc.year })
  }

  for (const slug of RECOMMEND_CONCEPTS) {
    const doc = conceptDocs[slug]
    if (!doc) continue
    results.push({ type: 'concept', slug, title: doc.name, subtitle: truncate(doc.definition) })
  }

  return results
}
