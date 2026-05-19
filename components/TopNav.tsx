'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/letters', label: 'Letters' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/companies', label: 'Companies' },
  { href: '/people', label: 'People' },
  { href: '/about', label: 'About' },
]

export function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white border-b border-surface-border shadow-sm'
            : 'bg-white/90 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded bg-navy flex items-center justify-center flex-shrink-0 group-hover:bg-navy-600 transition-colors">
                <span className="text-gold font-display font-bold text-sm">BK</span>
              </div>
              <span className="font-display font-bold text-navy text-lg hidden sm:block">
                BuffettKnowledge
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link px-3 py-1.5 rounded text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Search + Mobile */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border text-sm text-text-secondary hover:border-gold hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Search</span>
                <kbd className="hidden sm:inline text-xs bg-surface px-1.5 py-0.5 rounded border border-surface-border font-mono">
                  ⌘K
                </kbd>
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5 text-text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <div className="md:hidden bg-white border-t border-surface-border">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-navy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay trigger */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="absolute inset-x-4 top-20 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border">
              <Search className="w-5 h-5 text-text-secondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search letters, concepts, companies, people..."
                className="flex-1 text-base outline-none text-text-primary placeholder:text-text-secondary"
                autoFocus
              />
              <kbd className="text-xs bg-surface px-2 py-1 rounded border border-surface-border font-mono text-text-secondary">
                ESC
              </kbd>
            </div>
            <div className="px-4 py-6 text-center text-sm text-text-secondary">
              Start typing to search across 90+ letters, 49 concepts, 61 companies, and 7 key people.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
