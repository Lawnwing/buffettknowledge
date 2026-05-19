import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'
import type { Company } from '@/data/types'

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="block rounded-xl border card-hover p-5 group"
      style={{ backgroundColor: '#fff', borderColor: '#E6E2D9' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#FEF3C7' }}
        >
          <Building2 className="w-4 h-4" style={{ color: '#92400E' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold group-hover:text-sage transition-colors"
              style={{ color: '#18181B' }}
            >
              {company.name}
            </h3>
            {company.ticker && (
              <span
                className="text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}
              >
                {company.ticker}
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#71717A' }}>{company.industry}</p>
        </div>
      </div>

      {company.timeline.length > 0 && (
        <blockquote
          className="border-l-2 pl-3 text-sm italic mb-4 line-clamp-2"
          style={{ borderColor: '#FCD34D', color: '#71717A' }}
        >
          &ldquo;{company.timeline[0].passage.slice(0, 100)}...&rdquo;
        </blockquote>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#71717A' }}>
            Since {company.firstMentioned}
          </span>
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: '#F9F7F3', color: '#71717A' }}
          >
            {company.letterCount} mentions
          </span>
        </div>
        <span
          className="text-xs font-medium flex items-center gap-1 transition-transform"
          style={{ color: '#2D6A4F' }}
        >
          Explore <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
