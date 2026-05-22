'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  BookOpen,
  Lightbulb,
  Building2,
  Users,
  Info,
  Search,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Home,
  ClipboardList,
} from 'lucide-react'
import { stats as letterStats, allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'

// ── Navigation sections ─────────────────────────────────────────────

interface SubLink {
  href: string
  label: string
}

interface PrimaryLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  subLinks?: SubLink[]
}

function getLetterNavLabel(slug: string, type: string): string {
  if (type === 'berkshire') return 'Shareholder Letter'
  if (type === 'special') return 'Special Letter'
  if (slug.includes('midyear') || slug.includes('mid-year')) return 'Mid-Year Letter'
  if (slug.includes('controlled')) return 'Controlled Companies'
  if (slug.includes('dissolution')) return 'Dissolution Follow-up'
  if (slug.includes('commitment')) return 'Commitment Letter'
  return 'Partnership Letter'
}

const letterSubLinks: SubLink[] = [...allLetters]
  .sort((a, b) => a.year - b.year || a.slug.localeCompare(b.slug))
  .map((letter) => ({
    href: `/letters/${letter.slug}`,
    label: `${letter.year} ${getLetterNavLabel(letter.slug, letter.type)}`,
  }))

const primaryLinks: PrimaryLink[] = [
  { href: '/', label: 'Home', icon: Home },
  {
    href: '/letters',
    label: 'Letters',
    icon: BookOpen,
    count: letterStats.totalLetters,
    subLinks: letterSubLinks,
  },
  { href: '/concepts',  label: 'Concepts',  icon: Lightbulb, count: concepts.length },
  { href: '/companies', label: 'Companies', icon: Building2, count: companies.length },
  { href: '/people',    label: 'People',    icon: Users,     count: people.length },
]

const secondaryLinks = [
  { href: '/about', label: 'About', icon: Info },
  { href: '/changelog', label: 'Changelog', icon: ClipboardList },
]

// ── Tag badge colors for search results ──────────────────────────────

function getTypeColor(type: string) {
  switch (type) {
    case 'letter':  return { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' }
    case 'concept': return { bg: 'bg-sage-100',  text: 'text-sage-700',  dot: 'bg-sage-500' }
    case 'company': return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' }
    case 'person':  return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' }
    default:        return { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' }
  }
}

function getTypeHref(type: string, slug: string) {
  switch (type) {
    case 'letter':  return `/letters/${slug}`
    case 'concept': return `/concepts/${slug}`
    case 'company': return `/companies/${slug}`
    case 'person':  return `/people/${slug}`
    default:        return '/'
  }
}

// ── Sidebar nav link ─────────────────────────────────────────────────

function NavLink({
  href,
  label,
  icon: Icon,
  count,
  active,
  onClick,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link${active ? ' active' : ''}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {count != null && (
        <span
          className="text-xs px-1.5 py-0.5 rounded font-mono font-medium"
          style={{
            backgroundColor: active ? 'rgba(255,255,255,0.15)' : '#2D3A52',
            color: active ? '#fff' : '#8B9BB4',
          }}
        >
          {count}
        </span>
      )}
      {active && !count && (
        <ArrowRight className="w-3 h-3 ml-auto opacity-60" />
      )}
    </Link>
  )
}

// ── Collapsible nav item (with sub-links) ──────────────────────────────

function CollapsibleNavItem({
  link,
  active,
  pathname,
  onClick,
}: {
  link: PrimaryLink
  active: boolean
  pathname: string
  onClick?: () => void
}) {
  const [expanded, setExpanded] = useState(active)
  const Icon = link.icon

  // Keep expanded if active route matches
  useEffect(() => {
    if (active) setExpanded(true)
  }, [active])

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`nav-link w-full text-left${active ? ' active' : ''}`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1">{link.label}</span>
        {link.count != null && (
          <span
            className="text-xs px-1.5 py-0.5 rounded font-mono font-medium mr-1"
            style={{
              backgroundColor: active ? 'rgba(255,255,255,0.15)' : '#2D3A52',
              color: active ? '#fff' : '#8B9BB4',
            }}
          >
            {link.count}
          </span>
        )}
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>
      {expanded && link.subLinks && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#2D3A52] pl-3 max-h-96 overflow-y-auto sidebar-scroll">
          {link.subLinks.map((sub) => {
            const subActive = pathname === sub.href || pathname.startsWith(sub.href.split('#')[0])
            return (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onClick}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  subActive
                    ? 'text-white bg-[#2D6A4F]'
                    : 'text-[#8B9BB4] hover:text-[#2D6A4F] hover:bg-[#F5F3EF]'
                }`}
              >
                <span>{sub.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Search overlay ─────────────────────────────────────────────────────
//
// Uses flexsearch (via @/lib/search) for fast client-side full-text search.
// Shows recommended letters/concepts when the query is empty.
// Highlights matched keywords using <mark> (via highlightText in search.ts).

function SearchOverlay({
  onClose,
}: {
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [recommended, setRecommended] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recommended content when query is empty
  useEffect(() => {
    if (query.trim()) { setRecommended([]); return }
    ;(async () => {
      const { getRecommendedResults } = await import('@/lib/search')
      setRecommended(getRecommendedResults())
    })()
  }, [query])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const { search } = await import('@/lib/search')
        setResults(search(query))
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  // Keyboard: ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus() }, [])

  const displayResults = query.trim() ? results : recommended
  const showHeader = !query.trim() && recommended.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ backgroundColor: 'rgba(28,35,51,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#F9F7F3', border: '1px solid #E6E2D9' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #E6E2D9' }}>
          <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#71717A' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search letters, concepts, companies, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base outline-none bg-transparent"
            style={{ color: '#18181B' }}
          />
          <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: '#E6E2D9', color: '#71717A' }}>ESC</kbd>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded hover:bg-[#E6E2D9] transition-colors"
          >
            <X className="w-4 h-4" style={{ color: '#71717A' }} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-5 py-4 text-sm flex items-center gap-2" style={{ color: '#71717A' }}>
              <div className="w-3.5 h-3.5 border-2 border-[#71717A] border-t-transparent rounded-full animate-spin" />
              Searching...
            </div>
          )}

          {/* No results */}
          {!loading && query.trim() && results.length === 0 && (
            <div className="px-5 py-8 text-center">
              <div className="text-sm mb-1" style={{ color: '#52525B' }}>No results for &ldquo;{query}&rdquo;</div>
              <div className="text-xs" style={{ color: '#71717A' }}>Try a different keyword or check spelling.</div>
            </div>
          )}

          {/* Recommended header */}
          {showHeader && (
            <div className="px-5 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: '#71717A' }}>
              Recommended
            </div>
          )}

          {/* Result items */}
          {!loading && displayResults.map((result) => {
            const color = getTypeColor(result.type)
            return (
              <Link
                key={`${result.type}-${result.slug}`}
                href={getTypeHref(result.type, result.slug)}
                onClick={onClose}
                className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-[#E6E2D9]/60"
                style={{ borderBottom: '1px solid #E6E2D9' }}
              >
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${color.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>
                      {result.type}
                    </span>
                    {result.year && (
                      <span className="text-xs" style={{ color: '#71717A' }}>{result.year}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium leading-snug" style={{ color: '#18181B' }}>
                    {result.title}
                  </div>
                  {result.snippet && (
                    <div
                      className="text-xs mt-0.5 leading-relaxed line-clamp-2"
                      style={{ color: '#52525B' }}
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    />
                  )}
                  {!result.snippet && result.subtitle && (
                    <div className="text-xs mt-0.5 truncate" style={{ color: '#71717A' }}>
                      {result.subtitle}
                    </div>
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-1 opacity-30" style={{ color: '#71717A' }} />
              </Link>
            )
          })}

          {/* Empty state (no query, no recommendations) */}
          {!loading && !query.trim() && recommended.length === 0 && (
            <div className="px-5 py-8 text-center text-sm" style={{ color: '#71717A' }}>
              Start typing to search across letters, concepts, companies, and people.
            </div>
          )}
        </div>

        {/* Footer hint */}
        {query.trim() && results.length > 0 && (
          <div className="px-5 py-2 text-xs flex items-center justify-between" style={{ borderTop: '1px solid #E6E2D9', color: '#71717A' }}>
            <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
            <span>↑↓ to navigate · ESC to close</span>
          </div>
        )}
      </div>

      {/* <mark> highlight style */}
      <style dangerouslySetInnerHTML={{ __html: `
        mark {
          background-color: #FEF08A !important;
          color: #18181B !important;
          padding: 0 2px;
          border-radius: 2px;
        }
      `}} />
    </div>
  )
}

// ── Mobile hamburger ───────────────────────────────────────────────────

function MobileMenu({
  onClose,
}: {
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      style={{ backgroundColor: 'rgba(28,35,51,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-72"
        style={{ backgroundColor: '#1C2333' }}
        onClick={(e) => e.stopPropagation()}
      >
        <SidebarContent pathname={pathname} onLinkClick={onClose} isMobile />
      </div>
    </div>
  )
}

// ── Sidebar content (shared) ───────────────────────────────────────────

function SidebarContent({
  pathname,
  onLinkClick,
  isMobile,
}: {
  pathname: string
  onLinkClick?: () => void
  isMobile?: boolean
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  // Cmd+K handler (desktop only)
  useEffect(() => {
    if (isMobile) return
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isMobile])

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid #2D3A52' }}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#2D6A4F' }}
          >
            <Lightbulb className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-base leading-tight">
              <span style={{ color: '#2D6A4F' }}>Buffett</span>
              <span className="text-white">Knowledge</span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#8B9BB4' }}>
              Built for value investors.
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="search-trigger w-full"
          >
            <Search className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 text-left text-xs">Search...</span>
            <kbd className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: '#2D3A52', color: '#8B9BB4' }}>
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Primary nav */}
        <nav className="px-3 pt-2 pb-1" style={{ borderBottom: '1px solid #2D3A52' }}>
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#8B9BB4' }}>
            Browse
          </div>
          <div className="space-y-0.5">
            {primaryLinks.map((link) =>
              link.subLinks ? (
                <CollapsibleNavItem
                  key={link.href}
                  link={link}
                  active={pathname.startsWith(link.href)}
                  pathname={pathname}
                  onClick={onLinkClick}
                />
              ) : (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={pathname.startsWith(link.href)}
                  onClick={onLinkClick}
                />
              )
            )}
          </div>
        </nav>

        {/* Secondary nav */}
        <nav className="px-3 pt-3 pb-1">
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: '#8B9BB4' }}>
            More
          </div>
          <div className="space-y-0.5">
            {secondaryLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                active={pathname.startsWith(link.href)}
                onClick={onLinkClick}
              />
            ))}
          </div>
        </nav>

        {/* Bottom stats */}
        <div className="mt-auto px-4 py-4" style={{ borderTop: '1px solid #2D3A52' }}>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Letters', value: '90+' },
              { label: 'Concepts', value: '49' },
              { label: 'Companies', value: '61' },
              { label: 'Years', value: '1956–2025' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-lg" style={{ backgroundColor: '#2D3A52' }}>
                <div className="font-display font-bold text-sm text-white">{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#8B9BB4' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}

// ── Main Sidebar export ────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 flex-shrink-0 z-30"
        style={{ backgroundColor: '#1C2333' }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile: hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-lg"
        style={{ backgroundColor: '#1C2333', color: '#E8ECF4' }}
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Mobile: full-screen overlay menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  )
}
