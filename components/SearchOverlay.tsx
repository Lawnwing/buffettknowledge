'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, X, FileText, BookOpen, Building2, Users } from 'lucide-react'
import type { Letter, Concept, Company, Person } from '@/data/types'

interface SearchOverlayProps {
  letters?: Letter[]
  concepts?: Concept[]
  companies?: Company[]
  people?: Person[]
}

const typeConfig = {
  letter: {
    icon: FileText,
    href: '/letters/',
    label: 'Letter',
    color: 'text-navy',
    bg: 'bg-navy/5',
  },
  concept: {
    icon: BookOpen,
    href: '/concepts/',
    label: 'Concept',
    color: 'text-tag-concept-text',
    bg: 'bg-tag-concept-bg',
  },
  company: {
    icon: Building2,
    href: '/companies/',
    label: 'Company',
    color: 'text-tag-company-text',
    bg: 'bg-tag-company-bg',
  },
  person: {
    icon: Users,
    href: '/people/',
    label: 'Person',
    color: 'text-tag-person-text',
    bg: 'bg-tag-person-bg',
  },
}

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Array<{ type: keyof typeof typeConfig; item: any }>>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // Client-side search (simplified — in production would use FlexSearch)
    const q = query.toLowerCase()
    const allResults: Array<{ type: keyof typeof typeConfig; item: any }> = []

    // This would be populated from props in a real implementation
    // For now, showing placeholder structure
    setResults(allResults.slice(0, 8))
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        const result = results[selectedIndex]
        const cfg = typeConfig[result.type]
        window.location.href = cfg.href + result.item.slug
        setIsOpen(false)
      }
    },
    [results, selectedIndex]
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute inset-x-4 top-[15vh] max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-surface-border">
          <Search className="w-5 h-5 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search letters, concepts, companies, people..."
            className="flex-1 text-base outline-none text-text-primary placeholder:text-text-secondary bg-transparent"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-surface transition-colors"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          )}
          <kbd className="text-xs bg-surface px-2 py-1 rounded border border-surface-border font-mono text-text-secondary">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-text-secondary">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : !query ? (
            <div className="px-4 py-6 text-center text-sm text-text-secondary">
              <p className="mb-3">
                Search across{' '}
                <span className="font-semibold text-navy">90+ letters</span>,{' '}
                <span className="font-semibold text-navy">49 concepts</span>,{' '}
                <span className="font-semibold text-navy">61 companies</span>, and{' '}
                <span className="font-semibold text-navy">7 key people</span>.
              </p>
              <p className="text-xs text-text-secondary/60">
                Try: &ldquo;intrinsic value&rdquo;, &ldquo;1977 letter&rdquo;, &ldquo;Coca-Cola&rdquo;, &ldquo;Charlie Munger&rdquo;
              </p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, i) => {
                const cfg = typeConfig[result.type]
                const Icon = cfg.icon
                const href = cfg.href + (result.item.slug || '')
                return (
                  <Link
                    key={result.item.slug}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      i === selectedIndex ? 'bg-surface' : 'hover:bg-surface/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary truncate">
                        {result.item.name || result.item.title}
                      </div>
                      <div className="text-xs text-text-secondary truncate">
                        {result.item.subtitle || result.item.definition?.slice(0, 80)}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>
                      {cfg.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-surface-border bg-surface/30 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-surface-border font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-surface-border font-mono">↵</kbd>
              select
            </span>
          </div>
          <span>Powered by BuffettKnowledge</span>
        </div>
      </div>
    </div>
  )
}
