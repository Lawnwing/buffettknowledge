import { MetadataRoute } from 'next'
import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { blogPosts } from '@/data/blog-posts'

// Google requires lastmod in YYYY-MM-DD format (no milliseconds or timezone offset)
function today(): string {
  return new Date().toISOString().split('T')[0]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buffettknowledge.com'

  const staticPages = [
    { url: baseUrl, lastModified: today(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/letters`, lastModified: today(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/concepts`, lastModified: today(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/companies`, lastModified: today(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/people`, lastModified: today(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: today(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: today(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const letterPages = allLetters.map((letter) => ({
    url: `${baseUrl}/letters/${letter.slug}`,
    lastModified: `${letter.year}-01-01`,
    changeFrequency: 'monthly' as const,
    priority: letter.featured ? 0.8 : 0.6,
  }))

  const conceptPages = concepts.map((concept) => ({
    url: `${baseUrl}/concepts/${concept.slug}`,
    lastModified: today(),
    changeFrequency: 'monthly' as const,
    priority: concept.featured ? 0.7 : 0.5,
  }))

  const companyPages = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.slug}`,
    lastModified: today(),
    changeFrequency: 'monthly' as const,
    priority: company.featured ? 0.7 : 0.5,
  }))

  const personPages = people.map((person) => ({
    url: `${baseUrl}/people/${person.slug}`,
    lastModified: today(),
    changeFrequency: 'monthly' as const,
    priority: person.featured ? 0.7 : 0.5,
  }))

  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }))

  return [
    ...staticPages,
    ...letterPages,
    ...conceptPages,
    ...companyPages,
    ...personPages,
    ...blogPostPages,
  ]
}
