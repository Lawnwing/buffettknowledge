import type { CrossReference } from '@/data/types'
import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'

// ============================================================
// Concept → first-mentioned year (ground truth from concept data)
// ============================================================
const conceptFirstYears: Record<string, number> = {}
for (const c of concepts) {
  conceptFirstYears[c.slug] = c.firstMentioned
}

// Key letters per concept — the letter(s) where this concept was most importantly discussed
// Maps concept slug → Set of years marked as "key"
const conceptKeyYears: Record<string, Set<number>> = {
  'intrinsic-value': new Set([1962, 1988, 2008, 2025]),
  'margin-of-safety': new Set([1959, 1962, 1987]),
  'compounding': new Set([1960, 1961, 1986, 1988, 2008, 2016, 2020, 2025]),
  'value-investing': new Set([1958, 1962]),
  'long-term-investing': new Set([1987, 1996, 2008, 2020, 2025]),
  'cigar-butts': new Set([1964, 1965, 1985]),
  'franchise': new Set([1977, 1986]),
  'opportunity-cost': new Set([1966, 1967, 2008]),
  'capital-allocation': new Set([1967, 1977, 1996, 2016, 2020, 2025]),
  'economic-moat': new Set([1986, 1988, 2025]),
  'fair-price': new Set([2016]),
  'circle-of-competence': new Set([2016]),
  'acquisition': new Set([1985, 1996, 2020, 2025]),
  'leverage': new Set([1987]),
}

// Which concepts got major refinements in later years
const conceptRefinementYears: Record<string, Set<number>> = {
  'intrinsic-value': new Set([1985, 1988]),
  'margin-of-safety': new Set([1987]),
  'capital-allocation': new Set([1996, 2016, 2020]),
  'compounding': new Set([1988, 2014]),
}

// ============================================================
// Determine relevance for a concept-letter pair
// ============================================================
function assignRelevance(
  conceptSlug: string,
  letterYear: number,
): 'first' | 'key' | 'mention' | 'refinement' {
  const firstYear = conceptFirstYears[conceptSlug]
  const keyYears = conceptKeyYears[conceptSlug]
  const refYears = conceptRefinementYears[conceptSlug]

  if (firstYear === letterYear) return 'first'
  if (keyYears?.has(letterYear)) return 'key'
  if (refYears?.has(letterYear)) return 'refinement'
  return 'mention'
}

// ============================================================
// Build cross-references between letters and concepts
// ============================================================

/**
 * Build a Map of concept slug → CrossReference[].
 * Used to populate concept.crossReferences at data-generation time,
 * and can also be called at runtime for derived cross-refs.
 */
export function buildLetterConceptRefs(): Map<string, CrossReference[]> {
  const refs = new Map<string, CrossReference[]>()

  for (const letter of allLetters) {
    for (const conceptSlug of letter.concepts) {
      const existing = refs.get(conceptSlug) || []
      const passage = letter.keyQuotes[0] || letter.summary.slice(0, 200)
      const relevance = assignRelevance(conceptSlug, letter.year)

      existing.push({
        letterSlug: letter.slug,
        year: letter.year,
        passage,
        relevance,
      })
      refs.set(conceptSlug, existing)
    }
  }

  // Sort each concept's references by year
  for (const [slug, letterRefs] of refs) {
    refs.set(
      slug,
      letterRefs.sort((a, b) => a.year - b.year),
    )
  }

  return refs
}

// ============================================================
// Compute actual cross-reference count from current data
// ============================================================

export function getActualCrossRefCount(): number {
  return concepts.reduce((sum, c) => sum + c.crossReferences.length, 0)
}

// ============================================================
// Get statistics about the knowledge graph
// ============================================================

export function getGraphStats() {
  const allConcepts = new Set<string>()
  const allCompanies = new Set<string>()
  const allPeople = new Set<string>()

  for (const letter of allLetters) {
    letter.concepts.forEach((c) => allConcepts.add(c))
    letter.companies.forEach((c) => allCompanies.add(c))
    letter.people.forEach((c) => allPeople.add(c))
  }

  return {
    uniqueConcepts: allConcepts.size,
    uniqueCompanies: allCompanies.size,
    uniquePeople: allPeople.size,
    totalLetters: allLetters.length,
    totalCrossRefs: allLetters.reduce((sum, l) => sum + l.concepts.length, 0),
    actualConceptCrossRefs: getActualCrossRefCount(),
  }
}
