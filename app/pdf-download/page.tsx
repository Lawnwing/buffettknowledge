import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileDown,
  FileText,
  BookOpen,
  Star,
  ArrowRight,
  Download,
  BookMarked,
  Lightbulb,
  Building2,
  Search,
  Smartphone,
  Globe,
  ChevronDown,
  Check,
  Users,
  GraduationCap,
  Briefcase,
  DollarSign,
  Shield,
  Clock,
  CreditCard,
  HelpCircle,
  Sparkles,
  FileCheck,
  Highlighter,
  Bookmark,
  AlignLeft,
} from 'lucide-react'
import { allLetters, partnershipLetters, berkshireLetters, specialLetters, stats } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { DownloadPdfButton, DownloadBundleButton, DownloadEpubButton } from '@/components/DownloadButton'
import { AdUnit } from '@/components/AdUnit'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Warren Buffett Letters PDF - Complete Archive Download | BuffettKnowledge',
  description:
    'Download the complete, professionally edited Warren Buffett letters PDF. 70+ years of partnership and Berkshire letters, cleaned and formatted for serious investors. Free single-year letters also available.',
  keywords: [
    'Warren Buffett letters PDF',
    'Buffett shareholder letters download',
    'Berkshire Hathaway letters archive',
    'Warren Buffett investment letters',
    'Buffett partnership letters PDF',
  ],
  alternates: { canonical: 'https://buffettknowledge.com/pdf-download' },
}

export const dynamic = 'force-static'

// ── era badge colours ─────────────────────────────────────
//
const ERA = {
  partnership: { bg: '#FEF3C7', text: '#92400E', dot: 'bg-amber-500', border: '#FDE68A' },
  berkshire:   { bg: '#ECFDF5', text: '#065F46', dot: 'bg-emerald-500', border: '#6EE7B7' },
  special:     { bg: '#E0E7FF', text: '#3730A3', dot: 'bg-indigo-500',  border: '#A5B4FC' },
} as const

export default function DownloadPage() {
  const withText = allLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const partnershipWithText = partnershipLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )
  const berkshireWithText = berkshireLetters.filter(
    (l: any) => l.fullText && l.fullText.length > 100 && !l.fullText.includes('Placeholder'),
  )

  // JSON-LD
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Warren Buffett Letters - Complete Edited PDF Archive',
    description: 'Professionally edited and formatted complete archive of Warren Buffett\'s partnership and Berkshire Hathaway shareholder letters, 1956-2025.',
    url: 'https://buffettknowledge.com/pdf-download',
    brand: { '@type': 'Brand', name: 'BuffettKnowledge' },
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* ════════════════════════════════════════════════════════
          HERO SECTION — Paid product + free option
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#F9F7F3' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5" style={{ backgroundColor: '#2D6A4F' }} />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: '#D97706' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── left: text ── */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Professionally Edited & Formatted
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: '#18181B' }}>
                The Complete Warren Buffett Letters Archive
                <span className="block" style={{ color: '#2D6A4F' }}>Professionally Edited PDF</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: '#52525B' }}>
                Every letter Warren Buffett has ever written — from his 1956 partnership
                days through Berkshire Hathaway&apos;s 2025 report — cleaned, formatted, and
                assembled into a single, searchable PDF.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#71717A' }}>
                Free single-year downloads also available below.
              </p>

              {/* price + CTA */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold" style={{ color: '#2D6A4F' }}>$29</span>
                  <span className="text-sm" style={{ color: '#71717A' }}>one-time</span>
                </div>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#2D6A4F' }}
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Complete PDF
                </a>
                <a
                  href="#free-downloads"
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-xl transition-colors border"
                  style={{ color: '#2D6A4F', borderColor: '#2D6A4F', backgroundColor: 'transparent' }}
                >
                  <Download className="w-4 h-4" />
                  Free Single Letters
                </a>
              </div>

              {/* trust badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: '#71717A' }}>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} /> Instant download</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} /> PDF + EPUB included</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} /> Free updates forever</span>
              </div>
            </div>

            {/* ── right: book preview ── */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* main book */}
                <div
                  className="w-64 h-80 rounded-r-xl rounded-l-sm shadow-2xl flex flex-col items-center justify-center relative"
                  style={{ backgroundColor: '#1a1a2e', transform: 'rotate(-2deg)' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-sm" style={{ backgroundColor: '#16213e' }} />
                  <BookMarked className="w-12 h-12 mb-3" style={{ color: '#D4AF37' }} />
                  <div className="text-center px-6">
                    <div className="font-display text-base font-bold text-white mb-1">The Complete</div>
                    <div className="font-display text-base font-bold text-white mb-2">Buffett Letters</div>
                    <div className="text-xs" style={{ color: '#A7C4B5' }}>1956 — 2025</div>
                    <div className="text-[10px] mt-2" style={{ color: '#D4AF37' }}>82 Letters · Edited & Formatted</div>
                  </div>
                  <div className="absolute bottom-3 text-[10px]" style={{ color: '#A7C4B5' }}>buffettknowledge.com</div>
                </div>
                {/* second book behind */}
                <div
                  className="absolute -top-3 -right-6 w-60 h-76 rounded-r-xl rounded-l-sm shadow-xl flex flex-col items-center justify-center"
                  style={{ backgroundColor: '#2D6A4F', transform: 'rotate(4deg)', zIndex: -1 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-sm" style={{ backgroundColor: '#1E4A36' }} />
                  <FileCheck className="w-10 h-10 mb-3 text-white opacity-60" />
                  <div className="text-center px-6">
                    <div className="font-display text-sm font-bold text-white">Free Bonus</div>
                    <div className="text-xs mt-1 text-white opacity-70">EPUB Edition</div>
                    <div className="text-[10px] mt-2 text-white opacity-50">Kindle · iPad · Phone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT'S INCLUDED (paid product features)
          ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#18181B' }}>
              What&apos;s Included
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#52525B' }}>
              One purchase gives you the complete, professionally edited archive — formatted
              for serious study, printing, and offline reading.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: BookMarked,
                title: `${stats.totalLetters} Letters, 1956–2025`,
                desc: 'Every partnership letter and every Berkshire Hathaway shareholder letter in one file. No missing years, no gaps.',
                color: '#2D6A4F',
                bg: '#ECFDF5',
              },
              {
                icon: Highlighter,
                title: 'Professionally Edited',
                desc: 'Spelling corrected, formatting cleaned, section headings added. Hundreds of hours of careful editing in every page.',
                color: '#D97706',
                bg: '#FEF3C7',
              },
              {
                icon: Search,
                title: 'Full-Text Searchable',
                desc: 'Every PDF has an embedded text layer. Search for any keyword, company name, or concept across the entire archive instantly.',
                color: '#7C3AED',
                bg: '#F3E8FF',
              },
              {
                icon: FileCheck,
                title: 'Print-Ready Formatting',
                desc: 'Optimized for printing. Clean margins, proper line spacing, and page numbers. Print at home or at a professional printer.',
                color: '#059669',
                bg: '#D1FAE5',
              },
              {
                icon: Smartphone,
                title: 'PDF + EPUB Bundle',
                desc: 'Get both formats. PDF for desktop and printing. EPUB for Kindle, iPad, and any e-reader. One price, both formats.',
                color: '#0284C7',
                bg: '#E0F2FE',
              },
              {
                icon: Clock,
                title: 'Free Lifetime Updates',
                desc: 'When new letters are released each year, you get the updated file free. One purchase, lifetime access to the growing archive.',
                color: '#DC2626',
                bg: '#FEE2E2',
              },
              {
                icon: Lightbulb,
                title: `${concepts.length} Investment Concepts`,
                desc: 'Each concept cross-linked to the original letter where Buffett first explained it. From margin of safety to intrinsic value.',
                color: '#D97706',
                bg: '#FEF3C7',
              },
              {
                icon: Building2,
                title: `${companies.length} Company Profiles`,
                desc: 'Full profiles of every company Buffett has written about. Track his buy-hold-sell decisions from acquisition to present.',
                color: '#7C3AED',
                bg: '#F3E8FF',
              },
              {
                icon: Users,
                title: `${people.length} Key People Profiles`,
                desc: 'From Warren Buffett and Charlie Munger to Benjamin Graham and the next generation. Understand who shaped the philosophy.',
                color: '#059669',
                bg: '#D1FAE5',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border transition-shadow hover:shadow-lg"
                style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHO IS THIS FOR
          ════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#18181B' }}>
              Who Is This For?
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#52525B' }}>
              The complete edited PDF is designed for anyone serious about understanding
              Buffett&apos;s investment philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: GraduationCap,
                title: 'Students & Researchers',
                desc: 'Easily cite, highlight, and reference specific letters. Perfect for essays, theses, and investment research.',
                color: '#2D6A4F',
              },
              {
                icon: Briefcase,
                title: 'Investment Professionals',
                desc: 'Keep the complete archive at your fingertips. Search for Buffett\'s view on any topic in seconds during meetings or analysis.',
                color: '#D97706',
              },
              {
                icon: Users,
                title: 'Serious Individual Investors',
                desc: 'Study Buffett\'s thinking year by year. Print and annotate the letters. Build your own investment framework from the source.',
                color: '#7C3AED',
              },
              {
                icon: BookOpen,
                title: 'Lifelong Learners',
                desc: 'Own the definitive collection. Read on any device, highlight key passages, and revisit Buffett\'s wisdom whenever you need it.',
                color: '#059669',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border text-center transition-shadow hover:shadow-lg"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E6E2D9' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRICING / PAID EXPLANATION
          ════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-14 sm:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mx-auto">

            {/* section header */}
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#18181B' }}>
                Simple, One-Time Purchase
              </h2>
              <p className="text-base" style={{ color: '#52525B' }}>
                No subscription. No recurring fees. One payment, lifetime access.
              </p>
            </div>

            {/* pricing card */}
            <div
              className="rounded-2xl p-8 sm:p-10 border-2 relative overflow-hidden"
              style={{ borderColor: '#2D6A4F', backgroundColor: '#F9F7F3' }}
            >
              {/* popular badge */}
              <div className="absolute top-5 right-5">
                <div
                  className="text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#2D6A4F', color: '#FFFFFF' }}
                >
                  MOST POPULAR
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-bold" style={{ color: '#2D6A4F' }}>$29</div>
                  <div className="text-sm" style={{ color: '#71717A' }}>one-time payment</div>
                </div>
                <div className="text-sm" style={{ color: '#52525B' }}>
                  <span className="line-through" style={{ color: '#A1A1AA' }}>$49</span>
                  <span className="ml-2 font-semibold" style={{ color: '#2D6A4F' }}>Launch Price</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold mb-1" style={{ color: '#18181B' }}>
                Complete Edited PDF Archive
              </h3>
              <p className="text-sm mb-6" style={{ color: '#71717A' }}>
                All {stats.totalLetters} letters, professionally edited, PDF + EPUB formats
              </p>

              {/* feature list */}
              <div className="space-y-3 mb-8">
                {[
                  `${stats.totalLetters} letters, 1956–2025, in one file`,
                  'Professionally cleaned and formatted text',
                  'Full-text searchable (embedded text layer)',
                  'Print-ready formatting (perfect for home printing)',
                  'EPUB version included (Kindle, iPad, e-reader)',
                  'Free updates when new letters are released',
                  'Instant download after purchase',
                  '30-day money-back guarantee',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2D6A4F' }} />
                    <span className="text-sm" style={{ color: '#3F3F46' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA button — links to payment processor */}
              <a
                href="https://checkout.stripe.com/your-link-here"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-base font-semibold px-8 py-4 rounded-xl text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
                style={{ backgroundColor: '#2D6A4F' }}
              >
                <span className="inline-flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Buy Now — $29
                </span>
              </a>

              {/* payment badges */}
              <div className="flex items-center justify-center gap-3 mt-4 text-xs" style={{ color: '#A1A1AA' }}>
                <Shield className="w-3.5 h-3.5" />
                Secure payment via Stripe
                <span className="mx-1">·</span>
                30-day refund guarantee
              </div>
            </div>

            {/* alternative: free option reminder */}
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: '#71717A' }}>
                Want to try before you buy?{' '}
                <a href="#free-downloads" className="font-medium underline" style={{ color: '#2D6A4F' }}>
                  Download any single letter for free
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FREE DOWNLOADS (single letters)
          ════════════════════════════════════════════════════════ */}
      <div id="free-downloads" className="max-w-7xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* ── MAIN COLUMN ───────────────────────────────────── */}
        <main className="min-w-0">

          {/* divider header */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: '#ECFDF5', color: '#065F46' }}
            >
              <Download className="w-4 h-4" />
              Free Downloads
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#18181B' }}>
              Download Individual Letters
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#52525B' }}>
              Every letter is free to download individually. No sign-up required.
              Want the complete edited archive?{' '}
              <a href="#pricing" className="font-medium underline" style={{ color: '#2D6A4F' }}>
                Upgrade to the paid version
              </a>.
            </p>
          </div>

          {/* ══════════════════════════════════════
              BUNDLE CARDS (free tiers)
              ══════════════════════════════════════ */}
          <section className="mb-14">
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#18181B' }}>
              Free Bundles
            </h3>
            <p className="text-sm mb-6" style={{ color: '#71717A' }}>
              Download an entire era in one file — free of charge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {partnershipWithText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#92400E' }}>
                      Partnership
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Partnership Era
                  </h4>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    {partnershipWithText.length} letters, 1957–1969
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    Buffett&apos;s early partnership letters — the foundation of his investment framework.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Partnership Era"
                      letters={partnershipWithText}
                      fileName="buffett-partnership-letters.pdf"
                    />
                    <DownloadEpubButton
                      letters={partnershipWithText}
                      fileName="buffett-partnership-letters.epub"
                    />
                  </div>
                </div>
              )}

              {berkshireWithText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#ECFDF5', borderColor: '#6EE7B7' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#065F46' }}>
                      Berkshire
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Berkshire Era
                  </h4>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    {berkshireWithText.length} letters, 1970–2025
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    The canonical shareholder letters that shaped modern value investing.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Berkshire Era"
                      letters={berkshireWithText}
                      fileName="buffett-berkshire-letters.pdf"
                    />
                    <DownloadEpubButton
                      letters={berkshireWithText}
                      fileName="buffett-berkshire-letters.epub"
                    />
                  </div>
                </div>
              )}

              {withText.length > 0 && (
                <div
                  className="rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#E0E7FF', borderColor: '#A5B4FC' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3730A3' }}>
                      Complete
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold mb-1" style={{ color: '#18181B' }}>
                    Complete Archive
                  </h4>
                  <p className="text-sm mb-1" style={{ color: '#78726A' }}>
                    All {withText.length} letters, 1956–2025
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: '#A1A1AA' }}>
                    Every partnership and Berkshire letter in a single file. Free, unedited version.
                  </p>
                  <div className="flex items-center gap-2">
                    <DownloadBundleButton
                      label="Complete Archive"
                      letters={withText}
                      fileName="buffett-complete-archive.pdf"
                    />
                    <DownloadEpubButton
                      letters={withText}
                      fileName="buffett-complete-archive.epub"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ══════════════════════════════════════
              LETTER LIST
              ══════════════════════════════════════ */}
          <LetterListSection
            title="Partnership Letters"
            subtitle={`${partnershipLetters.length} letters, 1956 to 1969`}
            letters={partnershipLetters}
            era="partnership"
            id="partnership"
          />

          <LetterListSection
            title="Berkshire Hathaway Letters"
            subtitle={`${berkshireLetters.length} letters, 1970 to 2025`}
            letters={berkshireLetters}
            era="berkshire"
            id="berkshire"
          />

          {specialLetters.length > 0 && (
            <LetterListSection
              title="Special Letters"
              subtitle={`${specialLetters.length} milestone letters`}
              letters={specialLetters}
              era="special"
              id="special"
            />
          )}

          {/* ══════════════════════════════════════
              FAQ
              ══════════════════════════════════════ */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-5" style={{ color: '#18181B' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: 'What is the difference between the free and paid versions?',
                  a: 'Free downloads are generated on-demand from our archive and are functional but unedited. The paid Complete PDF ($29) is a professionally edited, cleaned, and formatted file with proper headings, corrected spelling, print-ready formatting, and both PDF + EPUB formats. It represents hundreds of hours of careful editing work.',
                },
                {
                  q: 'How do I receive the paid PDF after purchase?',
                  a: 'After your payment is processed, you will receive an email with download links immediately. The links remain active for 30 days, and you can re-download the files as we release updates.',
                },
                {
                  q: 'Is there a money-back guarantee?',
                  a: 'Yes. If you are not satisfied with the quality of the edited PDF, contact us within 30 days of purchase for a full refund. No questions asked.',
                },
                {
                  q: 'Are the free downloads really free?',
                  a: 'Yes. Single letters and era bundles are free to download. Warren Buffett\'s shareholder letters are in the public domain. We provide the free downloads as a service to the investment community.',
                },
                {
                  q: 'What format are the files?',
                  a: 'The paid product includes both PDF (best for printing and desktop reading) and EPUB (best for Kindle, iPad, and e-readers). Free downloads are available in both formats as well.',
                },
                {
                  q: 'How are the files generated?',
                  a: 'Free downloads are generated directly in your browser using the letter content from our archive. The paid PDF is a pre-edited, professionally formatted file that you download after purchase.',
                },
                {
                  q: 'Do you offer updates when new letters are released?',
                  a: 'Yes. Berkshire Hathaway publishes a new letter each year (usually in February). If you purchased the Complete PDF, you will receive the updated file free of charge. Just email us with your order number.',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
                >
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#18181B' }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ── SIDEBAR ───────────────────────────────────── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">

            {/* Upgrade CTA */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#ECFDF5', borderColor: '#6EE7B7' }}
            >
              <h3 className="font-display text-sm font-semibold mb-2" style={{ color: '#065F46' }}>
                Upgrade to Complete PDF
              </h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: '#065F46' }}>
                Get the professionally edited, print-ready archive. $29 one-time.
              </p>
              <a
                href="#pricing"
                className="block text-center text-xs font-semibold px-4 py-2.5 rounded-lg text-white transition-colors"
                style={{ backgroundColor: '#2D6A4F' }}
              >
                View Pricing
              </a>
            </div>

            {/* Download Stats */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Archive Stats
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Total letters', value: allLetters.length },
                  { label: 'With full text', value: withText.length, highlight: true },
                  { label: 'Partnership era', value: partnershipLetters.length },
                  { label: 'Berkshire era', value: berkshireLetters.length },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between">
                    <span style={{ color: '#71717A' }}>{s.label}</span>
                    <span
                      className="font-mono font-medium"
                      style={{ color: s.highlight ? '#2D6A4F' : '#18181B' }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: '#F9F7F3', borderColor: '#E6E2D9' }}
            >
              <h3 className="font-display text-sm font-semibold mb-4" style={{ color: '#18181B' }}>
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { href: '#partnership', label: 'Partnership Letters', dot: 'bg-amber-500' },
                  { href: '#berkshire', label: 'Berkshire Letters', dot: 'bg-emerald-500' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                    style={{ color: '#3F3F46' }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${link.dot}`} />
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/ask"
                  className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-md hover:bg-[#E6E2D9] transition-colors"
                  style={{ color: '#2D6A4F' }}
                >
                  <ArrowRight className="w-3 h-3" />
                  Ask AI about letters
                </Link>
              </div>
            </div>

            {/* AdSense placeholder */}
            <AdUnit variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}

// ── Letter list section ─────────────────────────────────────────────
//
function LetterListSection({
  title,
  subtitle,
  letters,
  era,
  id,
}: {
  title: string
  subtitle: string
  letters: any[]
  era: keyof typeof ERA
  id: string
}) {
  const colors = ERA[era]

  return (
    <section className="mb-10" id={id}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.bg }}
        >
          <span className="text-xs font-bold" style={{ color: colors.text }}>
            {era === 'partnership' ? 'P' : era === 'berkshire' ? 'B' : 'S'}
          </span>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold" style={{ color: '#18181B' }}>
            {title}
          </h2>
          <p className="text-xs" style={{ color: '#71717A' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-0.5">
        {letters.map((letter: any) => (
          <LetterRow key={letter.slug} letter={letter} era={era} />
        ))}
      </div>
    </section>
  )
}

// ── Letter row ──────────────────────────────────────────────────────
//
function LetterRow({ letter, era }: { letter: any; era: keyof typeof ERA }) {
  const hasText = letter.fullText && letter.fullText.length > 100 && !letter.fullText.includes('Placeholder')
  const colors = ERA[era]

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#E6E2D9]/50"
    >
      {/* year badge */}
      <span
        className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
        style={{ backgroundColor: '#F4F4F5', color: '#71717A' }}
      >
        {letter.year}
      </span>

      {/* title */}
      <span className="text-sm flex-1 truncate" style={{ color: '#3F3F46' }}>
        {letter.title}
        {letter.featured && (
          <Star className="w-3 h-3 inline ml-1" style={{ color: '#EAB308' }} />
        )}
      </span>

      {/* action buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* view online */}
        <Link
          href={`/letters/${letter.slug}`}
          className="text-xs px-2 py-1 rounded hover:bg-[#E6E2D9] transition-colors"
          style={{ color: '#71717A' }}
          title="View online"
        >
          <FileText className="w-3.5 h-3.5" />
        </Link>

        {/* download PDF */}
        <DownloadPdfButton letter={letter} />

        {/* download EPUB */}
        {hasText && (
          <DownloadEpubButton
            letters={[letter]}
            fileName={`${letter.slug}.epub`}
            size="sm"
          />
        )}
      </div>
    </div>
  )
}
