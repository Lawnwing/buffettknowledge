import type { Metadata } from 'next'
import { CompanyCard } from '@/components/CompanyCard'
import { companies } from '@/data/companies'

export const metadata: Metadata = {
  title: 'Companies',
  description: `Explore ${companies.length} companies mentioned in Warren Buffett's shareholder letters — from See's Candies to Apple, with investment timelines and key passages.`,
}

export default function CompaniesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
      <div className="mb-10 page-header">
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: '#18181B' }}>
          Company Profiles
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3F3F46' }}>
          {companies.length} companies mentioned in Buffett&apos;s letters — from the
          partnership era to the 2025 farewell letter. Each profile includes
          Buffett&apos;s commentary, investment timeline, and key passages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </div>
  )
}
