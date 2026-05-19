'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Network, FileDown, RefreshCw, Quote, MessageCircle, Bookmark, Share2, Link2, X, BookOpen } from 'lucide-react'
import { getRandomQuote, BuffettQuote } from '@/lib/quotes'

export function TopBar() {
  const [quote, setQuote] = useState<BuffettQuote | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuote(getRandomQuote())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close popup on outside click
  useEffect(() => {
    if (!popupOpen) return
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [popupOpen])

  const refreshQuote = () => {
    setQuote(getRandomQuote())
  }

  const handleShare = async () => {
    const shareData = {
      title: 'BuffettKnowledge',
      text: 'The most comprehensive archive of Warren Buffett shareholder letters.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://buffettknowledge.com',
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // user cancelled
      }
    } else {
      await handleCopyLink()
    }
    setPopupOpen(false)
  }

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleBookmark = () => {
    const isMac = navigator.platform.toUpperCase().includes('MAC')
    alert(`Press ${isMac ? 'Cmd + D' : 'Ctrl + D'} to bookmark this site.`)
    setPopupOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md border-[#E6E2D9]'
          : 'bg-white border-[#E6E2D9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12">
          {/* Left group: Nav + Quote */}
          <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-1 flex-shrink-0">
              <Link
                href="/graph"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors hover:bg-[#E9F5EF]"
                style={{ color: '#1B4332' }}
              >
                <Network className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                <span>Knowledge Graph</span>
              </Link>
              <Link
                href="/ask"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors hover:bg-[#E9F5EF]"
                style={{ color: '#1B4332' }}
              >
                <MessageCircle className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                <span>AI Q&A</span>
              </Link>
              <Link
                href="/pdf-download"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors hover:bg-[#E9F5EF]"
                style={{ color: '#1B4332' }}
              >
                <FileDown className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                <span>PDF Download</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors hover:bg-[#E9F5EF]"
                style={{ color: '#1B4332' }}
              >
                <BookOpen className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                <span>Blog</span>
              </Link>
            </nav>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 flex-shrink-0" style={{ backgroundColor: '#E6E2D9' }} />

            {/* Quote - takes remaining space */}
            {quote && (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Quote className="w-3.5 h-3.5 flex-shrink-0 hidden sm:block" style={{ color: '#A1A1AA' }} />
                <p
                  className="text-xs italic truncate"
                  style={{ color: '#71717A' }}
                  title={`${quote.text} — ${quote.source}`}
                >
                  {quote.text}
                </p>
                <button
                  onClick={refreshQuote}
                  className="p-1 rounded hover:bg-[#E6E2D9] transition-colors flex-shrink-0"
                  title="Next quote"
                >
                  <RefreshCw className="w-3 h-3" style={{ color: '#A1A1AA' }} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Bookmark & Share Popup - fixed on the right */}
          <div className="relative flex-shrink-0 ml-2" ref={popupRef}>
            <button
              onClick={() => setPopupOpen(!popupOpen)}
              className="p-2 rounded-md transition-colors hover:bg-[#E9F5EF]"
              style={{ color: '#1B4332' }}
              title="Bookmark & Share"
              aria-label="Bookmark and Share"
            >
              {popupOpen ? <X className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {popupOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border overflow-hidden"
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#E6E2D9',
                  zIndex: 50,
                }}
              >
                <button
                  onClick={handleBookmark}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[#F9F7F3]"
                  style={{ color: '#3F3F46' }}
                >
                  <Bookmark className="w-4 h-4 flex-shrink-0" style={{ color: '#2D6A4F' }} />
                  <span>Bookmark Site</span>
                </button>
                <div style={{ height: '1px', backgroundColor: '#E6E2D9' }} />
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[#F9F7F3]"
                  style={{ color: '#3F3F46' }}
                >
                  <Share2 className="w-4 h-4 flex-shrink-0" style={{ color: '#2D6A4F' }} />
                  <span>Share Site</span>
                </button>
                <div style={{ height: '1px', backgroundColor: '#E6E2D9' }} />
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[#F9F7F3]"
                  style={{ color: copied ? '#2D6A4F' : '#3F3F46' }}
                >
                  <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: copied ? '#2D6A4F' : '#2D6A4F' }} />
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
