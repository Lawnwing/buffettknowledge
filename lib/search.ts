import FlexSearch from 'flexsearch'
import type { SearchResult } from '@/data/types'
import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

// ============================================================
// Simple client-side search using FlexSearch
// ============================================================

// Simple search index using FlexSearch
const letterIndex = new FlexSearch.Index({ tokenize: 'forward' })
const letterMap: Record<string, { title: string; summary: string; year: number }> = {}

for (let i = 0; i < allLetters.length; i++) {
  const letter = allLetters[i]
  letterIndex.add(i, `${letter.title} ${letter.summary}`)
  letterMap[i.toString()] = { title: letter.title, summary: letter.summary, year: letter.year }
}

const conceptIndex = new FlexSearch.Index({ tokenize: 'forward' })
const conceptMap: Record<string, { name: string; definition: string }> = {}

for (let i = 0; i < concepts.length; i++) {
  const concept = concepts[i]
  conceptIndex.add(i, `${concept.name} ${concept.definition}`)
  conceptMap[i.toString()] = { name: concept.name, definition: concept.definition }
}

const companyIndex = new FlexSearch.Index({ tokenize: 'forward' })
const companyMap: Record<string, { name: string; industry: string }> = {}

for (let i = 0; i < companies.length; i++) {
  const company = companies[i]
  companyIndex.add(i, `${company.name} ${company.industry}`)
  companyMap[i.toString()] = { name: company.name, industry: company.industry }
}

const personIndex = new FlexSearch.Index({ tokenize: 'forward' })
const personMap: Record<string, { name: string; role: string }> = {}

for (let i = 0; i < people.length; i++) {
  const person = people[i]
  personIndex.add(i, `${person.name} ${person.role}`)
  personMap[i.toString()] = { name: person.name, role: person.role }
}

export function search(query: string): SearchResult[] {
  if (!query.trim()) return []

  const results: SearchResult[] = []
  const seen = new Set<string>()

  // Search letters
  const letterResults = letterIndex.search(query, { limit: 10 }) as string[]
  for (const id of letterResults) {
    const data = letterMap[id]
    if (!data || seen.has(`letter-${id}`)) continue
    seen.add(`letter-${id}`)
    const letter = allLetters.find((l) => l.slug === Object.keys(letterMap).find((k) => letterMap[k] === data))
    results.push({
      type: 'letter',
      slug: letter?.slug || id,
      title: data.title,
      subtitle: data.summary.slice(0, 80) + '...',
      year: data.year,
    })
  }

  // Search concepts
  const conceptResults = conceptIndex.search(query, { limit: 10 }) as string[]
  for (const id of conceptResults) {
    const data = conceptMap[id]
    if (!data || seen.has(`concept-${id}`)) continue
    seen.add(`concept-${id}`)
    const concept = concepts.find((c) => c.slug === Object.keys(conceptMap).find((k) => conceptMap[k] === data))
    results.push({
      type: 'concept',
      slug: concept?.slug || id,
      title: data.name,
      subtitle: data.definition.slice(0, 80) + '...',
    })
  }

  // Search companies
  const companyResults = companyIndex.search(query, { limit: 10 }) as string[]
  for (const id of companyResults) {
    const data = companyMap[id]
    if (!data || seen.has(`company-${id}`)) continue
    seen.add(`company-${id}`)
    const company = companies.find((c) => c.slug === Object.keys(companyMap).find((k) => companyMap[k] === data))
    results.push({
      type: 'company',
      slug: company?.slug || id,
      title: data.name,
      subtitle: data.industry,
    })
  }

  // Search people
  const personResults = personIndex.search(query, { limit: 10 }) as string[]
  for (const id of personResults) {
    const data = personMap[id]
    if (!data || seen.has(`person-${id}`)) continue
    seen.add(`person-${id}`)
    const person = people.find((p) => p.slug === Object.keys(personMap).find((k) => personMap[k] === data))
    results.push({
      type: 'person',
      slug: person?.slug || id,
      title: data.name,
      subtitle: data.role,
    })
  }

  return results.slice(0, 20)
}
