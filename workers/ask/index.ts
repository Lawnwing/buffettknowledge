/**
 * BuffettKnowledge AI Ask API
 * Cloudflare Worker for RAG-based Q&A
 *
 * Deploy with: wrangler deploy
 * Requires: GEMINI_API_KEY in Cloudflare Workers secrets
 *
 * Free tier: Gemini 1.5 Flash
 *   - 15 requests/minute
 *   - 1500 requests/day
 *   - Completely free (no credit card required)
 */

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

interface AskResponse {
  answer: string
  sources: SourceRef[]
  error?: string
}

// ────────────────────────────────────────────────────────────
// In-memory search index (simplified version for Edge)
// ────────────────────────────────────────────────────────────

// Letter summaries and key quotes for context
const LETTERS_DATA = [
  { slug: '1957-partnership-letter', year: 1957, title: 'The First Year — 1957', summary: 'Warren Buffett 1957 letter discussing partnership performance and market conditions.' },
  { slug: '1962-partnership-letter', year: 1962, title: 'The Turnaround Year — 1962', summary: 'Partnership letter discussing American Express investment and market decline opportunities.' },
  { slug: '1977-berkshire-letter', year: 1977, title: 'The Owner Earnings Letter — 1977', summary: 'First letter introducing the concept of "economic moat" and owner earnings.' },
  { slug: '1985-berkshire-letter', year: 1985, title: 'The Textile Exit — 1985', summary: 'Buffett explains why he exited the textile business and the importance of capital allocation.' },
  { slug: '1987-berkshire-letter', year: 1987, title: 'The Crash Year — 1987', summary: 'Black Monday analysis and why the market crash did not change long-term prospects.' },
  { slug: '1988-berkshire-letter', year: 1988, title: 'The Coca-Cola Investment — 1988', summary: 'Major Coca-Cola investment announced at $592.5 million. Discusses brand value and franchise moat.' },
  { slug: '1996-berkshire-letter', year: 1996, title: 'The Derivatives Warning — 1996', summary: 'First detailed warning about derivatives and their systemic risks to the financial system.' },
  { slug: '2008-berkshire-letter', year: 2008, title: 'The Financial Crisis — 2008', summary: '"Buy American. I am." Famous letter written during financial crisis. Discusses financial contagion and long-term investing.' },
  { slug: '2014-berkshire-letter', year: 2014, title: 'The American Tailwind — 2014', summary: 'Celebrates America\'s economic dynamism and compound interest over 200 years.' },
  { slug: '2020-berkshire-letter', year: 2020, title: 'The Pandemic Year — 2020', summary: 'COVID-19 impact on Berkshire and businesses. Discusses resilience and long-term thinking.' },
  { slug: '2022-berkshire-letter', year: 2022, title: 'The Berkshire Annual Meeting — 2022', summary: 'Discussion of Berkshire Hathaway business structure and shareholder letter tradition.' },
  { slug: '2023-berkshire-letter', year: 2023, title: 'The Buybacks & Capital Allocation — 2023', summary: 'Explains Berkshire\'s stock buyback philosophy and capital allocation framework.' },
  { slug: '2024-berkshire-letter', year: 2024, title: 'The Charlie Tribute — 2024', summary: 'Tribute to Charlie Munger, partner and vice chairman. Discusses their 50+ year partnership.' },
  { slug: '2025-berkshire-letter', year: 2025, title: 'The Farewell Letter — 2025', summary: 'Farewell letter discussing Berkshire Hathaway journey and America\'s economic future.' },
]

// Concept definitions and key passages
const CONCEPTS_DATA = [
  { slug: 'intrinsic-value', name: 'Intrinsic Value', definition: 'The discounted value of the cash that can be taken out of a business during its remaining life.', passages: ['The intrinsic value is an estimate rather than a precise figure', 'Two key variables: future cash flows and discount rate'] },
  { slug: 'margin-of-safety', name: 'Margin of Safety', definition: 'Only buying securities when market price is significantly below intrinsic value.', passages: ['Margin of safety allows for errors in calculation', 'First articulated by Benjamin Graham'] },
  { slug: 'economic-moat', name: 'Economic Moat', definition: 'Sustainable competitive advantage allowing high returns on capital for long periods.', passages: ['A durable competitive advantage is the moat', 'Wider moat means more valuable business'] },
  { slug: 'owner-earnings', name: 'Owner Earnings', definition: 'Net income plus depreciation minus capital expenditures needed to maintain position.', passages: ['Owner earnings are the true measure of profitability', 'Better than accounting earnings for valuation'] },
  { slug: 'circle-of-competence', name: 'Circle of Competence', definition: 'Area around investors genuine expertise where they can evaluate with confidence.', passages: ['Know what you know and what you dont know', 'Stay within your circle of competence'] },
  { slug: 'free-cash-flow', name: 'Free Cash Flow', definition: 'Cash generated after all operating expenses and capital investments.', passages: ['Cash machine vs cash consumer', 'Key for evaluating business quality'] },
  { slug: 'float', name: 'Float', definition: 'Insurance float: premiums collected but not yet paid out in claims.', passages: ['Float is essentially free money we hold', 'Berkshire\'s insurance operations generate float'] },
  { slug: 'franchise', name: 'Franchise', definition: 'Business with pricing power granted by brand, patent, or monopoly status.', passages: ['Franchise businesses have durable competitive advantages', 'Pricing power is key indicator of franchise'] },
]

// Company mentions
const COMPANIES_DATA = [
  { slug: 'coca-cola', name: 'Coca-Cola', industry: 'Beverages', keyPoints: ['$592.5M investment in 1988', 'Brand value and global franchise', 'See\'s Candies acquired 1972'] },
  { slug: 'geico', name: 'GEICO', industry: 'Insurance', keyPoints: ['Acquired 1996 for $2.3B', 'Direct-to-consumer insurance model', 'Major competitive advantages in underwriting'] },
  { slug: 'berkshire-hathaway', name: 'Berkshire Hathaway', industry: 'Conglomerate', keyPoints: ['Textile company turned investment conglomerate', 'Insurance Float is core', 'Holdings in railroads, utilities, consumer brands'] },
  { slug: 'apple', name: 'Apple', industry: 'Technology', keyPoints: ['Began accumulating 2016', 'Consumer brand with pricing power', 'Largest holding by 2023'] },
  { slug: 'american-express', name: 'American Express', industry: 'Financial Services', keyPoints: ['Major partnership investment 1960s', 'Franchise business with pricing power', 'Economic moat through brand trust'] },
]

// ────────────────────────────────────────────────────────────
// Search function (simple keyword matching for Edge)
// ────────────────────────────────────────────────────────────

function search(query: string) {
  const q = query.toLowerCase()
  const results: Array<{ type: string; slug: string; title: string; context: string; score: number }> = []

  // Search letters
  LETTERS_DATA.forEach((letter) => {
    let score = 0
    if (letter.title.toLowerCase().includes(q)) score += 3
    if (letter.summary.toLowerCase().includes(q)) score += 2
    if (q.includes(letter.year.toString())) score += 2

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
    if (concept.name.toLowerCase().includes(q)) score += 3
    if (concept.definition.toLowerCase().includes(q)) score += 2
    concept.passages.forEach((p) => {
      if (p.toLowerCase().includes(q)) score += 1
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
    if (company.name.toLowerCase().includes(q)) score += 3
    company.keyPoints.forEach((p) => {
      if (p.toLowerCase().includes(q)) score += 1
    })

    if (score > 0) {
      results.push({
        type: 'company',
        slug: company.slug,
        title: company.name,
        context: `${company.industry}: ${company.keyPoints.join('. ')}`,
        score,
      })
    }
  })

  // Sort by score and return top results
  return results.sort((a, b) => b.score - a.score).slice(0, 5)
}

function buildContext(query: string): string {
  const results = search(query)

  if (results.length === 0) {
    return ''
  }

  const sections: string[] = ['Based on Warren Buffett shareholder letters:\n']

  results.forEach((r) => {
    if (r.type === 'letter') {
      sections.push(`Letter: ${r.title}`)
    } else if (r.type === 'concept') {
      sections.push(`Concept: ${r.title}`)
    } else if (r.type === 'company') {
      sections.push(`Company: ${r.title}`)
    }
    sections.push(r.context)
    sections.push('')
  })

  return sections.join('\n')
}

// ────────────────────────────────────────────────────────────
// Gemini API call (FREE tier — Gemini 1.5 Flash)
// ────────────────────────────────────────────────────────────

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
    : `User question: ${question}

Note: I don't have specific context about this topic in Buffett's letters. Please ask about investment philosophy, specific letters, companies mentioned, or concepts from Buffett's shareholder letters.`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate an answer.'
}

// ────────────────────────────────────────────────────────────
// Request handler
// ────────────────────────────────────────────────────────────

async function handleRequest(request: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const apiKey = GEMINI_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured. Please set GEMINI_API_KEY in Cloudflare Workers secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    let body: AskRequest
    try {
      body = await request.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { question } = body

    if (!question || typeof question !== 'string' || question.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid question (at least 2 characters).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build context from search
    const context = buildContext(question)

    // Generate answer using Gemini
    const answer = await generateAnswer(question, context, apiKey)

    // Get source references
    const searchResults = search(question)
    const sources: SourceRef[] = searchResults.map((r) => {
      let url = ''
      if (r.type === 'letter') url = `/letters/${r.slug}/`
      else if (r.type === 'concept') url = `/concepts/${r.slug}/`
      else if (r.type === 'company') url = `/companies/${r.slug}/`

      const letterData = r.type === 'letter' ? LETTERS_DATA.find((l) => l.slug === r.slug) : null

      return {
        type: r.type,
        slug: r.slug,
        title: r.title,
        year: letterData?.year,
        url,
      }
    })

    const response: AskResponse = { answer, sources }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling request:', error)

    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your question. Please try again.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

// ────────────────────────────────────────────────────────────
// Worker entry point
// ────────────────────────────────────────────────────────────

// Declare global for TypeScript
declare const GEMINI_API_KEY: string | undefined

export default {
  async fetch(request: Request, env: { GEMINI_API_KEY?: string }): Promise<Response> {
    // Set global for API key (in Cloudflare Workers, env vars are accessed via env)
    ;(globalThis as any).GEMINI_API_KEY = env.GEMINI_API_KEY
    return handleRequest(request)
  },
}
