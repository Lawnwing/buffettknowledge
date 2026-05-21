/**
 * BuffettKnowledge AI Ask API
 * Cloudflare Pages Function — uses OpenRouter (free tier, no credit card)
 *
 * Endpoint: POST /api/ask
 * Requires: OPENROUTER_API_KEY in Cloudflare Pages environment variables
 * Get a free key at: https://openrouter.ai/keys
 */

import { LETTERS_DATA, CONCEPTS_DATA, COMPANIES_DATA } from './search-data'

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

interface AskRequest {
  question: string
  conversationHistory?: Array<{ role: string; content: string }>
}

interface SourceRef {
  type: string
  slug: string
  title: string
  year?: number
  url: string
}

// ────────────────────────────────────────────────────────────
// Search
// ────────────────────────────────────────────────────────────

function search(query: string) {
  const q = query.toLowerCase()
  const qWords = q.split(/\s+/).filter((w) => w.length >= 3)
  const results: Array<{
    type: string
    slug: string
    title: string
    context: string
    score: number
  }> = []

  // Search letters
  LETTERS_DATA.forEach((letter) => {
    let score = 0
    const title = letter.title.toLowerCase()
    const summary = letter.summary.toLowerCase()
    const concepts = (letter.concepts || []).join(' ').toLowerCase()
    const companies = (letter.companies || []).join(' ').toLowerCase()

    // Exact / substring matches
    if (title.includes(q)) score += 5
    if (summary.includes(q)) score += 3
    if (concepts.includes(q)) score += 4
    if (companies.includes(q)) score += 4
    if (q.includes(letter.year.toString())) score += 3

    // Word-by-word scoring
    qWords.forEach((word) => {
      if (title.includes(word)) score += 2
      if (summary.includes(word)) score += 1
      if (concepts.includes(word)) score += 2
      if (companies.includes(word)) score += 2
    })

    if (score > 0) {
      results.push({
        type: 'letter',
        slug: letter.slug,
        title: letter.title,
        context: letter.summary,
        score,
      })
    }
  })

  // Search concepts
  CONCEPTS_DATA.forEach((concept) => {
    let score = 0
    const name = concept.name.toLowerCase()
    const definition = concept.definition.toLowerCase()

    if (name === q) score += 10
    else if (name.includes(q)) score += 6
    else if (q.includes(name)) score += 4

    if (definition.includes(q)) score += 3

    qWords.forEach((word) => {
      if (name.includes(word)) score += 2
      if (definition.includes(word)) score += 1
    })

    if (score > 0) {
      results.push({
        type: 'concept',
        slug: concept.slug,
        title: concept.name,
        context: concept.definition,
        score,
      })
    }
  })

  // Search companies
  COMPANIES_DATA.forEach((company) => {
    let score = 0
    const name = company.name.toLowerCase()
    const industry = company.industry.toLowerCase()

    if (name === q) score += 10
    else if (name.includes(q)) score += 6
    else if (q.includes(name)) score += 4

    if (industry.includes(q)) score += 2

    qWords.forEach((word) => {
      if (name.includes(word)) score += 2
      if (industry.includes(word)) score += 1
    })

    if (score > 0) {
      results.push({
        type: 'company',
        slug: company.slug,
        title: company.name,
        context: `${company.industry}`,
        score,
      })
    }
  })

  return results.sort((a, b) => b.score - a.score).slice(0, 5)
}

function buildContext(query: string): string {
  const results = search(query)
  if (results.length === 0) return ''

  const sections: string[] = ['Based on Warren Buffett shareholder letters:\n']
  results.forEach((r) => {
    const label =
      r.type === 'letter' ? 'Letter' : r.type === 'concept' ? 'Concept' : 'Company'
    sections.push(`${label}: ${r.title}`)
    sections.push(r.context)
    sections.push('')
  })
  return sections.join('\n')
}

// ────────────────────────────────────────────────────────────
// OpenRouter API (OpenAI-compatible, free tier)
// ────────────────────────────────────────────────────────────

const OPENROUTER_MODEL = 'openrouter/free'
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions'

async function generateAnswer(
  question: string,
  context: string,
  apiKey: string
): Promise<string> {
  const systemPrompt = `You are an AI assistant specialized in Warren Buffett and Berkshire Hathaway shareholder letters. You help users understand Buffett's investment philosophy, business principles, and wisdom as expressed in his letters to shareholders.

Guidelines:
- Answer based on the provided context from Buffett letters
- Be conversational but informed
- Reference specific letters or years when relevant
- If you don't have enough context, say so honestly
- Never make up specific quotes or facts not in the provided context
- Keep answers focused and practical`

  const userPrompt = context
    ? `${context}\n\nUser question: ${question}`
    : `User question: ${question}\n\nNote: I don't have specific context about this topic in Buffett's letters.`

  const response = await fetch(OPENROUTER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://buffettknowledge.com',
      'X-Title': 'Buffett Knowledge',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'I could not generate an answer.'
}

// ────────────────────────────────────────────────────────────
// Handler — standard Pages Functions signature
// ────────────────────────────────────────────────────────────

export async function onRequestPost({
  request,
  env,
}: {
  request: Request
  env: Record<string, string>
}) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const apiKey = env.OPENROUTER_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'OpenRouter API key not configured.',
          hint: 'Set OPENROUTER_API_KEY in Cloudflare Pages Dashboard > Settings > Environment variables. Get a free key at https://openrouter.ai/keys',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Parse request
    let body: AskRequest
    try {
      body = await request.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { question } = body
    if (!question || typeof question !== 'string' || question.trim().length < 2) {
      return new Response(
        JSON.stringify({
          error: 'Please provide a valid question (at least 2 characters).',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Generate answer
    const ctx = buildContext(question)
    const answer = await generateAnswer(question, ctx, apiKey)

    // Build sources for UI
    const searchResults = search(question)
    const sources: SourceRef[] = searchResults.map((r) => {
      let url = ''
      if (r.type === 'letter') url = `/letters/${r.slug}/`
      else if (r.type === 'concept') url = `/concepts/${r.slug}/`
      else if (r.type === 'company') url = `/companies/${r.slug}/`
      const letterData =
        r.type === 'letter'
          ? LETTERS_DATA.find((l) => l.slug === r.slug)
          : null
      return {
        type: r.type,
        slug: r.slug,
        title: r.title,
        year: letterData?.year,
        url,
      }
    })

    return new Response(JSON.stringify({ answer, sources }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Ask API error:', error)
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your question.',
        detail: error?.message || String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
