import Link from 'next/link'
import { BookOpen, Star } from 'lucide-react'
import { books, stats } from '@/data/books'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Buffett\'s Recommended Books — BuffettKnowledge',
  description: `Explore ${stats.totalBooks} books recommended by Warren Buffett. Original commentary on why he recommends each book.`,
  url: 'https://buffettknowledge.com/books',
}

/* ── Right-side illustration ─────────────────────────────────────── */

function BooksIllustration() {
  return (
    <div className="rounded-xl border p-5 w-full max-w-[380px]" style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}>
      <svg viewBox="0 0 340 220" width="100%" className="overflow-visible">
        {/* Background circles */}
        <circle cx="170" cy="110" r="90" fill="#E9F5EF" opacity={0.5} />
        <circle cx="170" cy="110" r="65" fill="#E9F5EF" opacity={0.4} />

        {/* Book stack — left book (tilted) */}
        <rect x="95" y="95" width="55" height="75" rx="3" fill="#2D6A4F" opacity={0.85} transform="rotate(-8 122 132)" />
        <rect x="98" y="98" width="49" height="69" rx="2" fill="#E9F5EF" opacity={0.9} transform="rotate(-8 122 132)" />
        <line x1="100" y1="110" x2="145" y2="103" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.3} transform="rotate(-8 122 132)" />
        <line x1="101" y1="120" x2="146" y2="113" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.3} transform="rotate(-8 122 132)" />

        {/* Book stack — center book (upright) */}
        <rect x="142" y="85" width="56" height="85" rx="3" fill="#1B4332" opacity={0.9} />
        <rect x="145" y="88" width="50" height="79" rx="2" fill="#fff" opacity={0.95} />
        <line x1="150" y1="105" x2="190" y2="105" stroke="#2D6A4F" strokeWidth="2" opacity={0.25} />
        <line x1="150" y1="115" x2="188" y2="115" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} />
        <line x1="150" y1="123" x2="185" y2="123" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} />
        <line x1="150" y1="131" x2="189" y2="131" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.2} />

        {/* Book stack — right book (tilted other way) */}
        <rect x="190" y="100" width="52" height="70" rx="3" fill="#2D6A4F" opacity={0.75} transform="rotate(6 216 135)" />
        <rect x="193" y="103" width="46" height="64" rx="2" fill="#F9F7F3" opacity={0.9} transform="rotate(6 216 135)" />
        <line x1="195" y1="115" x2="237" y2="119" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.3} transform="rotate(6 216 135)" />
        <line x1="196" y1="125" x2="238" y2="129" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.3} transform="rotate(6 216 135)" />

        {/* Bookmark ribbon on center book */}
        <polygon points="170,88 170,105 176,100 182,105 182,88" fill="#F59E0B" opacity={0.8} />

        {/* Small open book at bottom */}
        <path d="M 145 180 Q 170 172, 195 180" stroke="#2D6A4F" strokeWidth="1.5" fill="none" opacity={0.4} />
        <path d="M 145 180 Q 157 175, 170 180" stroke="#2D6A4F" strokeWidth="1" fill="none" opacity={0.3} />
        <path d="M 170 180 Q 183 175, 195 180" stroke="#2D6A4F" strokeWidth="1" fill="none" opacity={0.3} />
        <line x1="170" y1="180" x2="170" y2="185" stroke="#2D6A4F" strokeWidth="1.5" opacity={0.4} />

        {/* Decorative stars */}
        <text x="75" y="85" fontSize="14" fill="#F59E0B" opacity={0.35}>★</text>
        <text x="250" y="80" fontSize="12" fill="#F59E0B" opacity={0.3}>★</text>
        <text x="260" y="160" fontSize="10" fill="#F59E0B" opacity={0.25}>★</text>
      </svg>
      <div className="text-center mt-1">
        <div className="font-display text-sm font-semibold" style={{ color: '#18181B' }}>
          Wisdom in Pages
        </div>
        <div className="text-[11px]" style={{ color: '#71717A' }}>
          {stats.totalBooks} books • Graham, Fisher & beyond
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function BooksPage() {
  const featured = books.filter((b) => b.featured)

  return (
    <div className="max-w-7xl mx-auto">
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                <BookOpen className="w-3 h-3" />
                {stats.totalBooks} Recommended Books
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
                Books <span style={{ color: '#2D6A4F' }}>Buffett Recommends</span>
              </h1>
              <p className="text-base leading-relaxed text-justify" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                Warren Buffett is a voracious reader — he claims to spend 80% of his working day reading.
                Here are the books he has publicly recommended, with his own commentary on why they matter.
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <BooksIllustration />
            </div>
          </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
              Featured Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`}
                  className="block p-4 rounded-xl border hover:shadow-lg transition"
                  style={{ borderColor: '#A9D7BD', backgroundColor: '#F7FFF9' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#2D6A4F' }}>{book.year}</div>
                  <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>
                    {book.title}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: '#71717A' }}>By {book.author}</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#3F3F46' }}>
                    {book.keyTakeaway.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#2D6A4F' }}>
                    <Star className="w-3 h-3" /> Featured
                  </div>
                </Link>
              ))}
            </div>
        </div>
      )}

      {/* All Books Grid */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#18181B' }}>
            All Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <Link key={book.slug} href={`/books/${book.slug}`}
                className="block p-4 rounded-xl border hover:shadow-md transition"
                style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
                <div className="text-sm font-semibold mb-1" style={{ color: '#2D6A4F' }}>{book.year}</div>
                <h3 className="font-display text-base font-semibold mb-2" style={{ color: '#18181B' }}>
                  {book.title}
                </h3>
                <p className="text-xs mb-2" style={{ color: '#71717A' }}>By {book.author}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>
                  {book.keyTakeaway.slice(0, 80)}...
                </p>
              </Link>
            ))}
          </div>
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
          <AdUnit variant="horizontal" />
      </div>
    </div>
  )
}
