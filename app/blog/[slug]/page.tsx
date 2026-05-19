import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Building2,
  Tag,
  TrendingUp,
} from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { NewsletterBanner } from '@/components/NewsletterBanner'
import { BlogTag } from '@/components/BlogTag'
import { SocialShare } from '@/components/SocialShare'
import { AdUnit } from '@/components/AdUnit'
import { linkifyContent } from '@/lib/content-linker'
import {
  getPostBySlug,
  getAllPosts,
  blogPosts,
} from '@/data/blog-posts'
import { getLetterBySlug } from '@/data/letters'
import { getConceptBySlug } from '@/data/concepts'
import { getCompanyBySlug } from '@/data/companies'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const relatedLetters = post.relatedLetters
    .map((slug) => getLetterBySlug(slug))
    .filter(Boolean)
  const relatedConcepts = post.relatedConcepts
    .map((slug) => getConceptBySlug(slug))
    .filter(Boolean)
  const relatedCompanies = post.relatedCompanies
    .map((slug) => getCompanyBySlug(slug))
    .filter(Boolean)

  // Related posts (exclude current, same tags preferred)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.tags.filter((t) => post.tags.includes(t)).length
      const bMatch = b.tags.filter((t) => post.tags.includes(t)).length
      return bMatch - aMatch || new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 4)

  // Auto-link entities in content
  const linkedContent = linkifyContent(post.content)

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'BuffettKnowledge',
      url: 'https://buffettknowledge.com',
    },
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://buffettknowledge.com/blog/${post.slug}`,
    },
    isPartOf: { '@type': 'Blog', url: 'https://buffettknowledge.com/blog' },
  }

  return (
    <>
      <JsonLd value={jsonLdArticle} />

      <div className="w-full px-6 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* ── Left column: Article ─────────────────────── */}
            <div>
              {/* Breadcrumb */}
              <div className="mb-6">
                <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#71717A' }}>
                  <Link href="/blog" className="hover:underline" style={{ color: '#2D6A4F' }}>
                    Blog
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">{post.title}</span>
                </nav>
              </div>

              {/* Article header */}
              <div className="mb-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <BlogTag key={tag} tag={tag} />
                  ))}
                </div>

                {/* Title */}
                <h1
                  className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-snug"
                  style={{ color: '#18181B' }}
                >
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 pb-6" style={{ borderBottom: '1px solid #E6E2D9' }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#2D6A4F', color: '#fff' }}
                    >
                      B
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#52525B' }}>
                      {post.author}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm" style={{ color: '#71717A' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1 text-sm" style={{ color: '#71717A' }}>
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTimeMinutes} min read
                  </span>
                </div>
              </div>

              {/* Ad — article top */}
              <div className="mb-6">
                <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="auto" variant="inline" />
              </div>

              {/* Social share — top (mobile only) */}
              <div className="mb-6 lg:hidden">
                <SocialShare
                  url={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                />
              </div>

              {/* Article body */}
              <div>
                {/* Excerpt as lead */}
                <p
                  className="text-lg leading-relaxed mb-8 font-medium"
                  style={{ color: '#3F3F46', hyphens: 'auto', textAlign: 'justify', textAlignLast: 'left' }}
                >
                  {post.excerpt}
                </p>

                {/* Content */}
                <article className="prose-blog" dangerouslySetInnerHTML={{ __html: linkedContent }} />

                {/* Related Letters */}
                {relatedLetters.length > 0 && (
                  <div className="mt-10 pt-8" style={{ borderTop: '1px solid #E6E2D9' }}>
                    <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                      Related Letters
                    </h2>
                    <div className="space-y-2">
                      {relatedLetters.map(
                        (letter) =>
                          letter && (
                            <Link
                              key={letter.slug}
                              href={`/letters/${letter.slug}`}
                              className="flex items-center gap-3 p-3 rounded-xl border group transition-all card-hover"
                              style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: '#E9F5EF' }}
                              >
                                <BookOpen className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold truncate" style={{ color: '#18181B' }}>
                                  {letter.year} — {letter.title}
                                </div>
                                <div className="text-xs mt-0.5 truncate" style={{ color: '#71717A' }}>
                                  {letter.summary.slice(0, 80)}...
                                </div>
                              </div>
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Related Concepts */}
                {relatedConcepts.length > 0 && (
                  <div className="mt-8 pt-8" style={{ borderTop: '1px solid #E6E2D9' }}>
                    <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                      Related Concepts
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {relatedConcepts.map(
                        (concept) =>
                          concept && (
                            <Link
                              key={concept.slug}
                              href={`/concepts/${concept.slug}`}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl border group transition-all card-hover"
                              style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                            >
                              <Lightbulb className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                              <span className="text-sm font-medium" style={{ color: '#18181B' }}>
                                {concept.name}
                              </span>
                              <span className="text-xs" style={{ color: '#71717A' }}>
                                {concept.letterCount} letters
                              </span>
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Related Companies */}
                {relatedCompanies.length > 0 && (
                  <div className="mt-8 pt-8" style={{ borderTop: '1px solid #E6E2D9' }}>
                    <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#18181B' }}>
                      Related Companies
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {relatedCompanies.map(
                        (company) =>
                          company && (
                            <Link
                              key={company.slug}
                              href={`/companies/${company.slug}`}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl border group transition-all card-hover"
                              style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                            >
                              <Building2 className="w-4 h-4" style={{ color: '#2D6A4F' }} />
                              <span className="text-sm font-medium" style={{ color: '#18181B' }}>
                                {company.name}
                              </span>
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Ad — article bottom */}
                <div className="mt-10">
                  <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="auto" variant="inline" />
                </div>

                {/* Newsletter */}
                <div className="mt-10">
                  <NewsletterBanner />
                </div>

                {/* Post navigation */}
                <div
                  className="mt-10 pt-8 flex items-center justify-between"
                  style={{ borderTop: '1px solid #E6E2D9' }}
                >
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="flex items-center gap-2 text-sm font-medium group"
                      style={{ color: '#2D6A4F' }}
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      <span className="truncate max-w-[200px]">{prevPost.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="flex items-center gap-2 text-sm font-medium group"
                      style={{ color: '#2D6A4F' }}
                    >
                      <span className="truncate max-w-[200px]">{nextPost.title}</span>
                      <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Back to blog */}
                <div className="mt-6 text-center">
                  <Link href="/blog" className="text-sm font-medium" style={{ color: '#71717A' }}>
                    ← Back to Insights
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Right column: Sidebar ────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Share */}
                <div
                  className="p-5 rounded-xl border"
                  style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                >
                  <SocialShare
                    url={`/blog/${post.slug}`}
                    title={post.title}
                    excerpt={post.excerpt}
                  />
                </div>

                {/* Tags */}
                <div
                  className="p-5 rounded-xl border"
                  style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#71717A' }}>
                    Topics
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <BlogTag key={tag} tag={tag} small />
                    ))}
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div
                    className="p-5 rounded-xl border"
                    style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: '#2D6A4F' }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#71717A' }}>
                        Related Reading
                      </span>
                    </div>
                    <div className="space-y-3">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="block group"
                        >
                          <div
                            className="text-sm font-medium leading-snug group-hover:underline"
                            style={{ color: '#18181B' }}
                          >
                            {rp.title}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: '#71717A' }}>
                            {rp.readingTimeMinutes} min read
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ad — sidebar bottom */}
                <AdUnit client="ca-pub-XXXXXXXX" slot="XXXXXXXX" format="auto" variant="sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
