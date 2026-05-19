'use client'

import { useState } from 'react'
import { BlogPostCard } from '@/components/BlogPostCard'
import { NewsletterBanner } from '@/components/NewsletterBanner'
import { getAllPosts, getFeaturedPost, getAllTags } from '@/data/blog-posts'
import { PenLine } from 'lucide-react'

const allPosts = getAllPosts()
const featuredPost = getFeaturedPost()
const allTags = getAllTags()

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const nonFeaturedPosts = allPosts.filter(
    (p) => !p.featured && (!activeTag || p.tags.includes(activeTag))
  )

  const filteredFeatured = activeTag
    ? featuredPost?.tags.includes(activeTag) ? featuredPost : null
    : featuredPost

  const displayPosts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts

  return (
    <div className="w-full px-6 sm:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <PenLine className="w-5 h-5" style={{ color: '#2D6A4F' }} />
            <span className="text-sm font-medium" style={{ color: '#2D6A4F' }}>
              BuffettKnowledge Blog
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#18181B' }}>
            Insights
          </h1>
          <p className="text-base" style={{ color: '#71717A' }}>
            {allPosts.length} articles on Buffett&apos;s investment philosophy, letter analysis, and value investing.
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6" style={{ borderBottom: '1px solid #E6E2D9' }}>
          <button
            onClick={() => setActiveTag(null)}
            className="inline-flex items-center rounded-full text-xs px-3 py-1.5 font-medium transition-colors"
            style={
              activeTag === null
                ? { backgroundColor: '#2D6A4F', color: '#fff' }
                : { backgroundColor: '#E9F5EF', color: '#1B4332' }
            }
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="inline-flex items-center rounded-full text-xs px-3 py-1.5 font-medium transition-colors"
              style={
                activeTag === tag
                  ? { backgroundColor: '#2D6A4F', color: '#fff' }
                  : { backgroundColor: '#E9F5EF', color: '#1B4332' }
              }
            >
              {tag.replace(/-/g, ' ')}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {filteredFeatured && (
          <div className="mb-8">
            <BlogPostCard post={filteredFeatured} variant="featured" />
          </div>
        )}

        {/* Article grid */}
        {(activeTag ? displayPosts.filter((p) => !p.featured) : nonFeaturedPosts).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {(activeTag ? displayPosts.filter((p) => !p.featured) : nonFeaturedPosts).map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {displayPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-base" style={{ color: '#71717A' }}>
              No articles found for this topic.
            </p>
            <button
              onClick={() => setActiveTag(null)}
              className="mt-3 text-sm font-medium"
              style={{ color: '#2D6A4F' }}
            >
              View all articles
            </button>
          </div>
        )}

        {/* Newsletter */}
        <NewsletterBanner />
      </div>
    </div>
  )
}
