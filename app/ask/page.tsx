/**
 * BuffettKnowledge - Ask Page
 *
 * Dedicated page for AI-powered Q&A about Buffett letters.
 * Features a full chat interface with conversation history.
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Send, Loader2, ExternalLink, BookOpen, ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: SourceRef[]
  timestamp: Date
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

// ─────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────

const ASK_API_URL = process.env.NEXT_PUBLIC_ASK_API_URL || ''

// ─────────────────────────────────────────────────────────────
// Default welcome message
// ─────────────────────────────────────────────────────────────

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Welcome to the Buffett Knowledge Q&A! I'm an AI assistant trained on Warren Buffett's shareholder letters.

I can help you explore:
• **Investment Philosophy** - Intrinsic value, margin of safety, value vs. growth
• **Specific Investments** - Coca-Cola, GEICO, Apple, American Express
• **Historical Events** - 1987 crash, 2008 financial crisis, COVID-19
• **Business Principles** - Capital allocation, moats, owner earnings

Feel free to ask anything about Buffett's wisdom across 70 years of letters!`,
  timestamp: new Date(),
}

// ─────────────────────────────────────────────────────────────
// Example questions
// ─────────────────────────────────────────────────────────────

const EXAMPLE_QUESTIONS = [
  { q: 'What is intrinsic value and how does Buffett calculate it?', category: 'Concepts' },
  { q: 'How did Buffett view the 2008 financial crisis?', category: 'History' },
  { q: 'What makes Coca-Cola a good investment?', category: 'Companies' },
  { q: 'What did Buffett learn from his mentor Benjamin Graham?', category: 'Philosophy' },
  { q: 'How does Buffett think about capital allocation?', category: 'Business' },
  { q: 'What is an economic moat?', category: 'Concepts' },
]

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle send
  const handleSend = async (question?: string) => {
    const q = question || input.trim()
    if (!q || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiUrl = ASK_API_URL || '/api/ask'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })

      const data: AskResponse = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an error processing your question. This might be because:

1. **API not configured** - The AI service needs to be set up (see .env.local.example)
2. **Network issue** - Please check your connection
3. **Rate limit** - Please try again in a moment

In the meantime, you can browse the letters directly using the navigation.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Page Header ─────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #E6E2D9', backgroundColor: '#fff' }}>
        <div className="px-6 sm:px-10 py-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: '#E9F5EF' }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: '#2D6A4F' }} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold" style={{ color: '#18181B' }}>
                Ask Buffett
              </h1>
              <p className="text-sm" style={{ color: '#71717A' }}>
                AI-powered Q&A based on 70 years of shareholder letters
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Chat Area ──────────────────────────────── */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#fff',
                border: '1px solid #E6E2D9',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                        message.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                      }`}
                      style={{
                        backgroundColor:
                          message.role === 'user' ? '#2D6A4F' : '#F5F3EF',
                        color: message.role === 'user' ? '#fff' : '#18181B',
                      }}
                    >
                      {/* Role indicator for assistant */}
                      {message.role === 'assistant' && message.id !== 'welcome' && (
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                          <span className="text-xs font-medium" style={{ color: '#2D6A4F' }}>
                            Buffett Knowledge AI
                          </span>
                        </div>
                      )}

                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content.split('\n').map((line, i) => {
                          const parts = line.split(/(\*\*[^*]+\*\*)/g)
                          return (
                            <p key={i} className="mb-1 last:mb-0">
                              {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={j} className="font-semibold">
                                      {part.slice(2, -2)}
                                    </strong>
                                  )
                                }
                                return part
                              })}
                            </p>
                          )
                        })}
                      </div>

                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                          <div className="text-xs mb-2 opacity-70">Sources:</div>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source) => (
                              <Link
                                key={source.slug}
                                href={source.url}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors"
                                style={{
                                  backgroundColor: 'rgba(45, 106, 79, 0.1)',
                                  color: '#2D6A4F',
                                }}
                              >
                                {source.title}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div
                      className="rounded-2xl rounded-bl-md px-5 py-4"
                      style={{ backgroundColor: '#F5F3EF' }}
                    >
                      <div className="flex items-center gap-2 text-sm" style={{ color: '#71717A' }}>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="p-4 border-t"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#FAFAF8' }}
              >
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about Buffett's letters..."
                    className="flex-1 px-4 py-3 rounded-xl text-sm resize-none outline-none"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #E6E2D9',
                      color: '#18181B',
                    }}
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="flex items-center justify-center px-6 rounded-xl font-medium transition-colors disabled:opacity-50"
                    style={{ backgroundColor: '#2D6A4F', color: '#fff' }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────── */}
          <div className="space-y-6">
            {/* About */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}
            >
              <h3 className="font-semibold mb-3" style={{ color: '#1B4332' }}>
                About This Feature
              </h3>
              <p className="text-sm mb-4" style={{ color: '#3F3F46' }}>
                This AI assistant is trained on Warren Buffett&apos;s shareholder letters
                spanning 70 years of investment wisdom.
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#2D6A4F' }}>
                <BookOpen className="w-4 h-4" />
                <Link href="/letters" className="hover:underline">
                  Browse all letters →
                </Link>
              </div>
            </div>

            {/* Example Questions */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
            >
              <h3 className="font-semibold mb-4" style={{ color: '#18181B' }}>
                Try These Questions
              </h3>
              <div className="space-y-3">
                {EXAMPLE_QUESTIONS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(item.q)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-lg text-sm transition-colors hover:shadow-sm disabled:opacity-50"
                    style={{
                      backgroundColor: '#FAFAF8',
                      color: '#3F3F46',
                      border: '1px solid #E6E2D9',
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{item.q}</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#2D6A4F' }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Related Links */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}
            >
              <h3 className="font-semibold mb-4" style={{ color: '#18181B' }}>
                Explore More
              </h3>
              <div className="space-y-2">
                <Link
                  href="/concepts"
                  className="flex items-center gap-2 text-sm p-2 rounded-lg transition-colors"
                  style={{ color: '#2D6A4F' }}
                >
                  <BookOpen className="w-4 h-4" />
                  Investment Concepts
                </Link>
                <Link
                  href="/companies"
                  className="flex items-center gap-2 text-sm p-2 rounded-lg transition-colors"
                  style={{ color: '#2D6A4F' }}
                >
                  <BookOpen className="w-4 h-4" />
                  Company Profiles
                </Link>
                <Link
                  href="/letters"
                  className="flex items-center gap-2 text-sm p-2 rounded-lg transition-colors"
                  style={{ color: '#2D6A4F' }}
                >
                  <BookOpen className="w-4 h-4" />
                  All Letters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
