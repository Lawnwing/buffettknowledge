import { MetadataRoute } from 'next'
import { allLetters } from '@/data/letters'
import { concepts } from '@/data/concepts'
import { companies } from '@/data/companies'
import { people } from '@/data/people'
import { blogPosts } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buffettknowledge.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/letters`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/concepts`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/companies`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/people`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const letterPages = allLetters.map((letter) => ({
    url: `${baseUrl}/letters/${letter.slug}`,
    lastModified: new Date(`${letter.year}-01-01`),
    changeFrequency: 'monthly' as const,
    priority: letter.featured ? 0.8 : 0.6,
  }))

  const conceptPages = concepts.map((concept) => ({
    url: `${baseUrl}/concepts/${concept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: concept.featured ? 0.7 : 0.5,
  }))

  const companyPages = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: company.featured ? 0.7 : 0.5,
  }))

  const personPages = people.map((person) => ({
    url: `${baseUrl}/people/${person.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: person.featured ? 0.7 : 0.5,
  }))

  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
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
