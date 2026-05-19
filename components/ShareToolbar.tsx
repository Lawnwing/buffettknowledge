'use client'

import { useState, useEffect } from 'react'
import { Linkedin, Link2, FileDown, ExternalLink } from 'lucide-react'

interface ShareToolbarProps {
  title: string
  url?: string
  sourceUrl?: string
  letterYear?: number
}

export default function ShareToolbar({ title, url, sourceUrl, letterYear }: ShareToolbarProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const pageUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(pageUrl)

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = pageUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleOpenSource = () => {
    if (sourceUrl) window.open(sourceUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          .share-toolbar { display: none !important; }
        }
      `}</style>

      <div
        className="share-toolbar"
        style={{
          position: 'fixed',
          top: '120px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 40,
        }}
      >
        {/* Official Source */}
        {sourceUrl && (
          <button
            onClick={handleOpenSource}
            title={`Original ${letterYear} Letter`}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              border: '1px solid #E6E2D9',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
              color: '#18181B',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
              e.currentTarget.style.transform = 'scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <ExternalLink size={18} />
          </button>
        )}

        {/* Print / Save as PDF */}
        <button
          onClick={handlePrint}
          title="Save as PDF"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid #E6E2D9',
            backgroundColor: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
              color: '#18181B',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
            e.currentTarget.style.transform = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <FileDown size={18} />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          title={copied ? 'Copied!' : 'Copy Link'}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid #E6E2D9',
            backgroundColor: copied ? 'rgba(45,106,79,0.1)' : '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
            color: copied ? '#2D6A4F' : '#18181B',
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
              e.currentTarget.style.transform = 'scale(1.08)'
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#fff'
              e.currentTarget.style.transform = 'scale(1)'
            }
          }}
        >
          <Link2 size={18} />
        </button>

        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X (Twitter)"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid #E6E2D9',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
            color: '#18181B',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
            e.currentTarget.style.transform = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid #E6E2D9',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
            color: '#18181B',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
            e.currentTarget.style.transform = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <Linkedin size={18} />
        </a>
      </div>
    </>
  )
}
