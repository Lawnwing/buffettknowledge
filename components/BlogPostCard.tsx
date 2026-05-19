import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import type { BlogPost } from '@/data/blog-posts'
import { BlogTag } from './BlogTag'

interface BlogPostCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden border p-6 transition-all card-hover"
        style={{ backgroundColor: '#2D6A4F', borderColor: '#2D6A4F' }}
      >
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            Featured
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
            >
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>

        <h2
          className="font-display text-2xl font-bold mb-3 leading-snug text-white"
        >
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {post.author}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <Clock className="w-3 h-3" />
              {post.readingTimeMinutes} min read
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold transition-transform"
            style={{ color: '#fff' }}
          >
            Read more <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border overflow-hidden transition-all card-hover"
      style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: '#2D6A4F' }} />

      <div className="p-5 sm:p-6">
        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <BlogTag key={tag} tag={tag} small />
          ))}
        </div>

        {/* Title */}
        <h2
          className="font-display text-lg sm:text-xl font-bold mb-2 leading-snug group-hover:underline"
          style={{ color: '#18181B' }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed mb-5 line-clamp-3"
          style={{ color: '#71717A' }}
        >
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium" style={{ color: '#52525B' }}>
              {post.author}
            </span>
            <span className="w-px h-3" style={{ backgroundColor: '#E6E2D9' }} />
            <span className="flex items-center gap-1 text-xs" style={{ color: '#A1A1AA' }}>
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#A1A1AA' }}>
            <Clock className="w-3 h-3" />
            {post.readingTimeMinutes} min
          </span>
        </div>
      </div>
    </Link>
  )
}
