import Link from 'next/link'
import { Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E6E2D9' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-base mb-1" style={{ color: '#18181B' }}>
              BuffettKnowledge
            </div>
            <p className="text-sm" style={{ color: '#71717A' }}>
              The definitive English archive of Warren Buffett&apos;s wisdom — letters, meetings, speeches, books, and quotes.
              Build for serious value investors.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-sage"
              style={{ color: '#71717A' }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
            <Link
              href="mailto:hello@buffettknowledge.com"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-sage"
              style={{ color: '#71717A' }}
            >
              <Mail className="w-4 h-4" />
              Contact
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E6E2D9' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#A1A1AA' }}>
            This site provides commentary and analysis on Warren Buffett&apos;s publicly available shareholder
            letters. Letter texts are sourced from open-source archives and are reproduced for educational and
            research purposes under fair use. All original letter contents © Warren E. Buffett / Berkshire
            Hathaway Inc. This site is not affiliated with, endorsed by, or connected to Berkshire Hathaway.
          </p>
        </div>
      </div>
    </footer>
  )
}
