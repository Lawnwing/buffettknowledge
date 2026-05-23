'use client'

import { useState, useCallback } from 'react'
import { Copy, Share2, Check } from 'lucide-react'

export function QuoteActionButtons({
  text,
  slug,
  variant = 'card',
}: {
  text: string
  slug: string
  variant?: 'card' | 'hero'
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`"${text}" — Warren Buffett`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silently fail
    }
  }, [text])

  const handleShare = useCallback(() => {
    const shareText = `"${text}" — Warren Buffett`
    const shareUrl = `https://buffettknowledge.com/quotes/${slug}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }, [text, slug])

  const isHero = variant === 'hero'

  return (
    <div className={`flex items-center gap-2 ${isHero ? 'mt-4' : ''}`}>
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 rounded-lg text-xs font-medium transition hover:shadow-sm ${
          isHero ? 'px-4 py-2' : 'px-3 py-1.5'
        }`}
        style={{
          backgroundColor: isHero ? '#fff' : '#F9F7F3',
          border: '1px solid #E6E2D9',
          color: '#52525B',
        }}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-1.5 rounded-lg text-xs font-medium transition hover:shadow-sm ${
          isHero ? 'px-4 py-2' : 'px-3 py-1.5'
        }`}
        style={{
          backgroundColor: isHero ? '#fff' : '#F9F7F3',
          border: '1px solid #E6E2D9',
          color: '#52525B',
        }}
        title="Share on X / Twitter"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>
    </div>
  )
}
