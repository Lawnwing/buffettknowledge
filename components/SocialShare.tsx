'use client'

import { useState } from 'react'
import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
  excerpt?: string
  className?: string
}

export function SocialShare({ url, title, excerpt, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl = url.startsWith('http') ? url : `https://buffettknowledge.com${url}`
  const shareText = excerpt ? `${title} — ${excerpt}` : title

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
      color: '#1B4332',
      bg: '#E9F5EF',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: '#1B4332',
      bg: '#E9F5EF',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      color: '#1B4332',
      bg: '#E9F5EF',
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const input = document.createElement('input')
      input.value = fullUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={className}>
      <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#71717A' }}>
        Share
      </div>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105"
            style={{ backgroundColor: link.bg, color: link.color }}
            title={link.name}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: copied ? '#E9F5EF' : '#F4F4F5', color: copied ? '#2D6A4F' : '#71717A' }}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
