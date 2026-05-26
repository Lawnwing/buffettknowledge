// ============================================================
// BuffettKnowledge — Core Type Definitions
// ============================================================

export type LetterType = 'partnership' | 'berkshire' | 'special'

export type CrossRefRelevance = 'first' | 'key' | 'mention' | 'refinement'

export interface CrossReference {
  letterSlug: string
  year: number
  passage: string
  relevance: CrossRefRelevance
}

// --------------------------------------------------------
// Letter Interpretation
// --------------------------------------------------------
export interface InterpretationSection {
  title: string
  content: string
  type?: 'key-point' | 'background' | 'principle' | 'insight' | 'quote' | 'event'
}

export interface MarketContext {
  description: string
  sp500Return?: string
  fedFundsRate?: string
  inflation?: string
  marketPhase?: 'bull' | 'bear' | 'recession' | 'stagflation' | 'recovery' | 'bull-late' | 'bubble-peak' | 'bubble-burst' | 'bear-crash'
}

export interface KeyNumber {
  label: string
  value: string
  unit?: string
  context?: string
}

export interface ThenVsNow {
  then: string
  now: string
}

export interface Annotation {
  id: string
  quote: string          // 原文摘录（简短关键句）
  comment: string        // 你的评论/解读
  positionHint?: string  // 插入位置提示（段落关键词）
}

export interface Interpretation {
  overview: string
  sections: InterpretationSection[]
  keyTakeaways: string[]
  relatedConcepts: string[]
  relatedCompanies: string[]
  relatedPeople: string[]
  marketContext?: MarketContext
  keyNumbers?: KeyNumber[] | Record<string, string>
  thenVsNow?: ThenVsNow
  publishedDate?: string
  lastUpdated?: string
  annotations?: Annotation[]  // 内嵌注释卡片
}

// --------------------------------------------------------
// Letter
// --------------------------------------------------------
export interface Letter {
  slug: string
  year: number
  type: LetterType
  title: string
  date: string
  summary: string
  fullText: string
  concepts: string[]
  companies: string[]
  people: string[]
  crossReferences: CrossReference[]
  keyQuotes: string[]
  featured: boolean
  sourceUrl: string
  readingTimeMinutes: number
  interpretation?: Interpretation
  annotations?: Annotation[]
}

// --------------------------------------------------------
// Concept
// --------------------------------------------------------
export interface Concept {
  slug: string
  name: string
  definition: string
  firstMentioned: number
  letterCount: number
  crossReferences: CrossReference[]
  relatedConcepts: string[]
  featured: boolean
}

// --------------------------------------------------------
// Company
// --------------------------------------------------------
export interface CompanyMention {
  year: number
  letterSlug: string
  passage: string
  position?: string
}

export interface Company {
  slug: string
  name: string
  ticker?: string
  industry: string
  firstMentioned: number
  letterCount: number
  timeline: CompanyMention[]
  featured: boolean
}

// --------------------------------------------------------
// Person
// --------------------------------------------------------
export interface PersonQuote {
  year: number
  letterSlug: string
  passage: string
}

export interface Person {
  slug: string
  name: string
  role: string
  firstMentioned: number
  letterCount: number
  relationship: string
  quotes: PersonQuote[]
  featured: boolean
}

// --------------------------------------------------------
// Search
// --------------------------------------------------------
export type SearchResultType = 'letter' | 'concept' | 'company' | 'person' | 'meeting' | 'speech' | 'book' | 'quote'

export interface SearchResult {
  type: SearchResultType
  slug: string
  title: string
  subtitle: string
  snippet?: string
  year?: number
}

// ============================================================
// Annual Meeting Q&A
// ============================================================
export interface MeetingQA {
  question: string
  answer: string
  topicTags: string[]
  timestamp?: string
}

export interface Meeting {
  slug: string
  year: number
  date: string
  location: string
  fullText: string
  qaList: MeetingQA[]
  concepts: string[]
  companies: string[]
  people: string[]
  duration?: string
  videoUrl?: string
  summary: string
  keyTakeaways: string[]
  featured: boolean
}

// ============================================================
// Speeches
// ============================================================
export interface Speech {
  slug: string
  title: string
  date: string
  location: string
  occasion: string
  fullText: string
  summary: string
  concepts: string[]
  companies: string[]
  people: string[]
  keyQuotes: string[]
  readingTimeMinutes: number
  sourceUrl: string
  background?: string
  impact?: string
  featured: boolean
}

// ============================================================
// Books
// ============================================================
export interface Book {
  slug: string
  title: string
  author: string
  year: number
  coverImage?: string
  buffettComment: string
  keyTakeaway: string
  relatedConcepts: string[]
  amazonUrl?: string
  featured: boolean
}

// ============================================================
// Quotes
// ============================================================
export interface Quote {
  slug: string
  text: string
  year?: number
  source: string
  sourceSlug?: string
  topicTags: string[]
  context?: string
  featured: boolean
  analysis?: string        // Original deep-dive analysis
  whyItMatters?: string    // Why this quote is still relevant today
  howToApply?: string      // Practical application guidance
}
