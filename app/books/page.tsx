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

export default function BooksPage() {
  const featured = books.filter((b) => b.featured)
  const others = books.filter((b) => !b.featured)

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-12" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <BookOpen className="w-3 h-3" />
            {stats.totalBooks} Recommended Books
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            Books <span style={{ color: '#2D6A4F' }}>Buffett Recommends</span>
          </h1>
          <p className="text-base leading-relaxed text-justify " style={{ color: '#3F3F46', hyphens: 'auto' }}>
            Warren Buffett is a voracious reader — he claims to spend 80% of his working day reading.
            Here are the books he has publicly recommended, with his own commentary on why they matter.
          </p>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
          <div >
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
        </div>
      )}

      {/* All Books Grid */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div >
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
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
        <div >
          <AdUnit variant="horizontal" />
        </div>
      </div>
    </div>
  )
}
