/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft, ExternalLink, Star } from 'lucide-react'
import { books } from '@/data/books'
import { JsonLd } from '@/components/JsonLd'
import { AdUnit } from '@/components/AdUnit'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }))
}

export default function BookDetailPage({ params }: PageProps) {
  const book = books.find((b) => b.slug === params.slug)

  if (!book) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author },
    datePublished: book.year,
    description: book.keyTakeaway,
    publisher: {
      '@type': 'Organization',
      name: 'BuffettKnowledge',
      url: 'https://buffettknowledge.com',
    },
  }

  return (
    <div>
      <JsonLd value={jsonLd} />

      {/* Hero */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F0FFF4', borderBottom: '1px solid #E6E2D9' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/books" className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#2D6A4F' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Books
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ml-3"
            style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
            <BookOpen className="w-3 h-3" />
            Buffett's Recommended Books
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#18181B' }}>
            {book.title}
          </h1>
          <p className="text-lg leading-relaxed mb-2" style={{ color: '#3F3F46' }}>
            By {book.author} ({book.year})
          </p>
          {book.amazonUrl && (
            <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-sm hover:underline"
              style={{ color: '#2D6A4F' }}>
              View on Amazon <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Buffett's Comment */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Why Buffett Recommends This Book
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#F0FFF4', border: '1px solid #A9D7BD' }}>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#2D6A4F' }} />
              <p className="text-base leading-relaxed" style={{ color: '#3F3F46', hyphens: 'auto' }}>
                {book.buffettComment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Key Takeaway
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E6E2D9' }}>
            <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
              {book.keyTakeaway}
            </p>
          </div>
        </div>
      </div>

      {/* AdSense */}
      <div className="px-6 sm:px-10 py-8" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <AdUnit variant="horizontal" />
        </div>
      </div>

      {/* Related Concepts */}
      {book.relatedConcepts.length > 0 && (
        <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#F9F7F3' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
              Related Concepts
            </h2>
            <div className="flex flex-wrap gap-2">
              {book.relatedConcepts.map((conceptSlug) => (
                <Link key={conceptSlug} href={`/concepts/${conceptSlug}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium hover:shadow-md transition"
                  style={{ backgroundColor: '#E9F5EF', color: '#2D6A4F' }}>
                  {conceptSlug.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Content */}
      <div className="px-6 sm:px-10 py-10" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: '#18181B' }}>
            Related Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/books"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>View All</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>All Recommended Books</p>
            </Link>
            <Link href="/letters"
              className="block p-4 rounded-xl border hover:shadow-md transition"
              style={{ borderColor: '#E6E2D9', backgroundColor: '#fff' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2D6A4F' }}>Related</p>
              <p className="font-semibold" style={{ color: '#18181B' }}>Berkshire Letters</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
