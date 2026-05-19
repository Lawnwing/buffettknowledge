// ============================================================
// Knowledge Graph Data Builder
// Generates nodes and edges from letters / concepts / companies / people
// ============================================================

import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

export type NodeType = 'letter' | 'concept' | 'company' | 'person'

export interface GraphNode {
  id: string
  label: string
  type: NodeType
  weight: number   // controls node radius
  year?: number
  href: string
}

export interface GraphEdge {
  source: string
  target: string
  strength: number // 0-1
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export function buildGraphData(): GraphData {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const edgeSet = new Set<string>()

  const addEdge = (a: string, b: string, strength = 0.5) => {
    const key = [a, b].sort().join('||')
    if (!edgeSet.has(key)) {
      edgeSet.add(key)
      edges.push({ source: a, target: b, strength })
    }
  }

  // ── Featured letters as nodes ──────────────────────────
  const featuredLetters = allLetters.filter((l) => l.featured)
  for (const letter of featuredLetters) {
    nodes.push({
      id: `letter:${letter.slug}`,
      label: String(letter.year),
      type: 'letter',
      weight: 2,
      year: letter.year,
      href: `/letters/${letter.slug}`,
    })
  }

  // ── All concepts as nodes ──────────────────────────────
  for (const concept of concepts) {
    nodes.push({
      id: `concept:${concept.slug}`,
      label: concept.name,
      type: 'concept',
      weight: Math.min(concept.letterCount / 10, 5) + 1,
      href: `/concepts/${concept.slug}`,
    })

    // Edges: concept → letters via crossReferences
    for (const ref of concept.crossReferences) {
      const letterNode = featuredLetters.find((l) => l.slug === ref.letterSlug)
      if (letterNode) {
        const strength = ref.relevance === 'first' ? 1
          : ref.relevance === 'key' ? 0.8
          : ref.relevance === 'refinement' ? 0.6
          : 0.4
        addEdge(`concept:${concept.slug}`, `letter:${ref.letterSlug}`, strength)
      }
    }

    // Edges: concept → related concepts
    for (const relSlug of concept.relatedConcepts) {
      addEdge(`concept:${concept.slug}`, `concept:${relSlug}`, 0.7)
    }
  }

  // ── Featured companies as nodes ────────────────────────
  for (const company of companies.filter((c) => c.featured)) {
    nodes.push({
      id: `company:${company.slug}`,
      label: company.name,
      type: 'company',
      weight: Math.min(company.letterCount / 8, 4) + 1,
      href: `/companies/${company.slug}`,
    })

    // Edges: company → letters via timeline
    for (const mention of company.timeline) {
      const letterNode = featuredLetters.find((l) => l.slug === mention.letterSlug)
      if (letterNode) {
        addEdge(`company:${company.slug}`, `letter:${mention.letterSlug}`, 0.5)
      }
    }
  }

  // ── Featured people as nodes ───────────────────────────
  for (const person of people.filter((p) => p.featured)) {
    nodes.push({
      id: `person:${person.slug}`,
      label: person.name,
      type: 'person',
      weight: Math.min(person.letterCount / 8, 4) + 1,
      href: `/people/${person.slug}`,
    })

    // Edges: person → letters via quotes
    for (const quote of person.quotes) {
      const letterNode = featuredLetters.find((l) => l.slug === quote.letterSlug)
      if (letterNode) {
        addEdge(`person:${person.slug}`, `letter:${quote.letterSlug}`, 0.6)
      }
    }
  }

  return { nodes, edges }
}

// Pre-built (called at build time on the server)
export const graphData = buildGraphData()
