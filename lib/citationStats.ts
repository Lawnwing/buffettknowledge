// ============================================================
// Citation Stats — dynamic counts derived from data at build time
// ============================================================

import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { allLetters } from '@/data/letters'

// ── Per-concept citation stats ────────────────────────────
export interface ConceptStats {
  slug: string
  name: string
  citedInLetters: number   // unique letter slugs in crossReferences
  keyCount: number         // refs with relevance 'first' | 'key'
  firstMentioned: number
}

export const conceptStats: ConceptStats[] = concepts
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    citedInLetters: new Set(c.crossReferences.map((r) => r.letterSlug)).size,
    keyCount: c.crossReferences.filter((r) => r.relevance === 'first' || r.relevance === 'key').length,
    firstMentioned: c.firstMentioned,
  }))
  .sort((a, b) => b.citedInLetters - a.citedInLetters)

// ── Per-company citation stats ────────────────────────────
export interface CompanyStats {
  slug: string
  name: string
  citedInLetters: number
  firstMentioned: number
}

export const companyStats: CompanyStats[] = companies
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    citedInLetters: new Set(c.timeline.map((t) => t.letterSlug)).size,
    firstMentioned: c.firstMentioned,
  }))
  .sort((a, b) => b.citedInLetters - a.citedInLetters)

// ── Per-person citation stats ─────────────────────────────
export interface PersonStats {
  slug: string
  name: string
  citedInLetters: number
  firstMentioned: number
}

export const personStats: PersonStats[] = people
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    citedInLetters: new Set(p.quotes.map((q) => q.letterSlug)).size,
    firstMentioned: p.firstMentioned,
  }))
  .sort((a, b) => b.citedInLetters - a.citedInLetters)

// ── Aggregate totals ──────────────────────────────────────
export const citationTotals = {
  totalConceptRefs: concepts.reduce((sum, c) => sum + c.crossReferences.length, 0),
  totalCompanyRefs: companies.reduce((sum, c) => sum + c.timeline.length, 0),
  totalPersonRefs: people.reduce((sum, p) => sum + p.quotes.length, 0),
  totalCrossRefs: allLetters.reduce((sum, l) => sum + l.crossReferences.length, 0),
}

// ── Helper: get stats for a single concept ────────────────
export function getConceptStats(slug: string): ConceptStats | undefined {
  return conceptStats.find((s) => s.slug === slug)
}

export function getCompanyStats(slug: string): CompanyStats | undefined {
  return companyStats.find((s) => s.slug === slug)
}

export function getPersonStats(slug: string): PersonStats | undefined {
  return personStats.find((s) => s.slug === slug)
}
