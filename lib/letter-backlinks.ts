// ============================================================
// Letter Backlinks — find concepts that reference a given letter
// ============================================================

import { concepts } from '@/data/concepts'
import type { Concept } from '@/data/types'

export interface BacklinkRef {
  letterSlug: string
  year: number
  passage: string
  relevance: string
}

export interface BacklinkGroup {
  concept: Concept
  refs: BacklinkRef[]
}

/**
 * Find all concepts whose crossReferences include the given letter slug.
 * Returns groups sorted by number of references (descending).
 */
export function getLetterBacklinks(letterSlug: string): BacklinkGroup[] {
  const groups: BacklinkGroup[] = []

  for (const concept of concepts) {
    const refs = concept.crossReferences.filter((r) => r.letterSlug === letterSlug)
    if (refs.length > 0) {
      groups.push({
        concept,
        refs: refs.map((r) => ({
          letterSlug: r.letterSlug,
          year: r.year,
          passage: r.passage,
          relevance: r.relevance,
        })),
      })
    }
  }

  // Sort by number of refs descending, then by concept name
  groups.sort((a, b) => {
    if (b.refs.length !== a.refs.length) return b.refs.length - a.refs.length
    return a.concept.name.localeCompare(b.concept.name)
  })

  return groups
}
