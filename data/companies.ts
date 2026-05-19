import type { Company } from './types'

export const companies: Company[] = [
  {
    slug: 'berkshire-hathaway',
    name: 'Berkshire Hathaway',
    ticker: 'BRK.A / BRK.B',
    industry: 'Conglomerate / Holding Company',
    firstMentioned: 1965,
    letterCount: 61,
    featured: true,
    timeline: [
      {
        year: 1965,
        letterSlug: '1965-berkshire-letter',
        passage:
          'We took control of Berkshire Fine Spinning Associates, a New England textile manufacturer...',
        position: 'Acquisition (textile company)',
      },
      {
        year: 1967,
        letterSlug: '1967-berkshire-letter',
        passage:
          'Our textile operations continue to be a very minor factor in earnings... The insurance business proved far more attractive.',
        position: 'Diversification begins',
      },
      {
        year: 1985,
        letterSlug: '1985-berkshire-letter',
        passage:
          'The last textile operation... was closed in 1985. This elimination of our textile business is a milestone of sorts...',
        position: 'Textile exit',
      },
    ],
  },
  {
    slug: 'national-indemnity',
    name: 'National Indemnity',
    industry: 'Insurance / Reinsurance',
    firstMentioned: 1967,
    letterCount: 28,
    featured: true,
    timeline: [
      {
        year: 1967,
        letterSlug: '1967-berkshire-letter',
        passage:
          'We entered the insurance business in 1967 with the purchase of National Indemnity Company for $8.6 million...',
        position: 'Foundational acquisition',
      },
    ],
  },
  {
    slug: 'see-candies',
    name: "See's Candies",
    industry: 'Consumer Staples / Confectionery',
    firstMentioned: 1972,
    letterCount: 35,
    featured: true,
    timeline: [
      {
        year: 1972,
        letterSlug: '1972-berkshire-letter',
        passage:
          'Charlie and I found a very good business being sold to us by owners who wished to remain... See\'s Candy Shops... We paid $25 million for the business, which had earnings of about $4.2 million.',
        position: 'Acquisition at $25M',
      },
      {
        year: 2011,
        letterSlug: '2011-berkshire-letter',
        passage:
          'See\'s, despite its modest capital requirements, continued to gain market share and pricing power... Earnings have grown from $4.2 million to $83 million.',
        position: '40x earnings growth',
      },
    ],
  },
  {
    slug: 'wisconsin-ice',
    name: "Washington Post",
    ticker: 'WPO',
    industry: 'Media / Publishing',
    firstMentioned: 1973,
    letterCount: 18,
    featured: false,
    timeline: [
      {
        year: 1973,
        letterSlug: '1973-berkshire-letter',
        passage:
          'We own 10% of the Washington Post... which sells for $80 million... The business (the Post) could be sold today for $400 million... intrinsic value is at least $400 million.',
        position: '10% stake at $10.7M cost',
      },
    ],
  },
  {
    slug: 'times-mirror',
    name: 'GEICO',
    ticker: 'GEICO',
    industry: 'Insurance / Auto Insurance',
    firstMentioned: 1976,
    letterCount: 42,
    featured: true,
    timeline: [
      {
        year: 1976,
        letterSlug: '1976-berkshire-letter',
        passage:
          'GEICO is one of the largest auto insurers in the United States... the company\'s loss ratio (losses expressed as a percentage of premiums earned) has been moving toward an acceptable level.',
        position: 'Initial investment during crisis',
      },
      {
        year: 1995,
        letterSlug: '1995-berkshire-letter',
        passage:
          'Berkshire acquired the remaining 48% of GEICO it did not own... GEICO is now a wholly-owned subsidiary of Berkshire.',
        position: '100% ownership acquired',
      },
    ],
  },
  {
    slug: 'buffalo-evening-news',
    name: 'Buffalo Evening News',
    industry: 'Media / Newspaper',
    firstMentioned: 1977,
    letterCount: 22,
    featured: false,
    timeline: [
      {
        year: 1977,
        letterSlug: '1977-berkshire-letter',
        passage:
          'The News is the only daily newspaper in Buffalo and has dominated the market for decades... its competitive position is exceptionally strong.',
        position: 'Acquisition in 1977',
      },
    ],
  },
  {
    slug: 'federated-department-stores',
    name: 'Federated Department Stores',
    ticker: 'M',
    industry: 'Retail',
    firstMentioned: 1979,
    letterCount: 12,
    featured: false,
    timeline: [
      {
        year: 1979,
        letterSlug: '1979-berkshire-letter',
        passage:
          'We own a 9% interest in Federated Department Stores... which operates department stores in major metropolitan areas.',
        position: 'Minority stake',
      },
    ],
  },
  {
    slug: '多元零售',
    name: 'Blue Chip Stamps',
    industry: 'Finance / Trading Stamps',
    firstMentioned: 1977,
    letterCount: 15,
    featured: false,
    timeline: [
      {
        year: 1977,
        letterSlug: '1977-berkshire-letter',
        passage:
          'Blue Chip Stamps is a closely-held company engaged primarily in the trading stamp business in California.',
        position: 'Partnership with the Blumkin family',
      },
    ],
  },
  {
    slug: 'rex-company',
    name: 'Rex',
    ticker: 'Rex',
    industry: 'Manufacturing / Shoe Machinery',
    firstMentioned: 1980,
    letterCount: 8,
    featured: false,
    timeline: [
      {
        year: 1980,
        letterSlug: '1980-berkshire-letter',
        passage:
          'Rex Hall... had been losing money for several years and... the plant was eventually closed.',
        position: 'Bad acquisition — early lesson',
      },
    ],
  },
  {
    slug: 'scott-fetzer',
    name: 'Scott & Fetzer',
    industry: 'Manufacturing / Diversified',
    firstMentioned: 1984,
    letterCount: 24,
    featured: false,
    timeline: [
      {
        year: 1984,
        letterSlug: '1984-berkshire-letter',
        passage:
          'We purchased Scott & Fetzer at the end of 1984 for $315 million... The business includes World Book Encyclopedia, Kirby vacuum cleaners, and a large insurance operation.',
        position: 'Major acquisition — $315M',
      },
    ],
  },
  {
    slug: 'cap-cities',
    name: 'Capital Cities/ABC',
    ticker: 'CapCities (defunct)',
    industry: 'Media / Broadcasting',
    firstMentioned: 1985,
    letterCount: 16,
    featured: false,
    timeline: [
      {
        year: 1985,
        letterSlug: '1985-berkshire-letter',
        passage:
          'We acquired 100% of Capital Cities Broadcasting... in a transaction that involved $3.5 billion... This was the largest acquisition in Berkshire\'s history at that time.',
        position: '$3.5 billion acquisition',
      },
    ],
  },
  {
    slug: 'first-national-bank',
    name: 'First National Omaha',
    industry: 'Banking',
    firstMentioned: 1969,
    letterCount: 14,
    featured: false,
    timeline: [
      {
        year: 1969,
        letterSlug: '1969-berkshire-letter',
        passage:
          'First National Omaha is a bank holding company... that was operated at very high levels of capital relative to loans outstanding.',
        position: 'Early banking investment',
      },
    ],
  },
  {
    slug: 'us-airways',
    name: 'USAir',
    ticker: 'LUV',
    industry: 'Aviation / Airline',
    firstMentioned: 1989,
    letterCount: 8,
    featured: false,
    timeline: [
      {
        year: 1989,
        letterSlug: '1989-berkshire-letter',
        passage:
          'We made a $358 million preferred stock investment in US Air... We have occasionally written off our entire investment.',
        position: 'Preferred stock investment',
      },
    ],
  },
  {
    slug: 'pacificorp',
    name: 'PacificCorp',
    ticker: 'PAC (now BERK)',
    industry: 'Utilities / Energy',
    firstMentioned: 1991,
    letterCount: 7,
    featured: false,
    timeline: [
      {
        year: 1991,
        letterSlug: '1991-berkshire-letter',
        passage:
          'PacificCorp is a large electric utility operating in the western United States...',
        position: 'BNSF predecessor',
      },
    ],
  },
  {
    slug: 'greeley-co',
    name: 'Greeley坊',
    industry: 'Manufacturing / Shoe',
    firstMentioned: 1983,
    letterCount: 9,
    featured: false,
    timeline: [
      {
        year: 1983,
        letterSlug: '1983-berkshire-letter',
        passage:
          'We made a bad acquisition — the "acquisition" of a manufacturing process for low-priced housewares.',
        position: 'Bad acquisition — write-off',
      },
    ],
  },
  {
    slug: 'dexterity-shoes',
    name: 'Dexterity Shoes',
    industry: 'Manufacturing / Shoe',
    firstMentioned: 1993,
    letterCount: 6,
    featured: false,
    timeline: [
      {
        year: 1993,
        letterSlug: '1993-berkshire-letter',
        passage:
          'Dexterity was the largest acquisition Berkshire ever made... It proved to be a complete disaster... We eventually wrote off the entire investment.',
        position: 'Largest-ever bad acquisition — total write-off',
      },
    ],
  },
  {
    slug: 'david-lloyd',
    name: 'General Re',
    ticker: 'GRN (now Berkshire Re)',
    industry: 'Insurance / Reinsurance',
    firstMentioned: 1998,
    letterCount: 19,
    featured: false,
    timeline: [
      {
        year: 1998,
        letterSlug: '1998-berkshire-letter',
        passage:
          'Berkshire acquired General Reinsurance Corporation... the world\'s largest reinsurer... at a cost of $22.1 billion in stock.',
        position: '$22.1 billion stock-for-stock merger',
      },
    ],
  },
  {
    slug: 'uscharter',
    name: 'U.S. Freightways',
    industry: 'Transportation / Freight',
    firstMentioned: 2003,
    letterCount: 5,
    featured: false,
    timeline: [
      {
        year: 2003,
        letterSlug: '2003-berkshire-letter',
        passage:
          'We acquired U.S. Freightways in 2003... It was a competitive industry that required constant capital investment.',
        position: 'Acquisition with challenges',
      },
    ],
  },
  {
    slug: 'midamerican',
    name: 'MidAmerican Energy Holdings',
    industry: 'Utilities / Energy',
    firstMentioned: 2000,
    letterCount: 22,
    featured: false,
    timeline: [
      {
        year: 2000,
        letterSlug: '2000-berkshire-letter',
        passage:
          'We agreed to purchase MidAmerican Energy Holdings... for approximately $2 billion in cash and assumed debt.',
        position: '$2 billion acquisition',
      },
    ],
  },
  {
    slug: 'burlington-northern-santa-fe',
    name: 'Burlington Northern Santa Fe (BNSF)',
    ticker: 'BRK.B',
    industry: 'Transportation / Railroad',
    firstMentioned: 2009,
    letterCount: 28,
    featured: true,
    timeline: [
      {
        year: 2009,
        letterSlug: '2009-berkshire-letter',
        passage:
          'Berkshire made its largest acquisition ever — BNSF Railway — in a transaction valued at approximately $44 billion.',
        position: '$44 billion — largest acquisition ever',
      },
    ],
  },
  {
    slug: 'ibm',
    name: 'IBM',
    ticker: 'IBM',
    industry: 'Technology / IT Services',
    firstMentioned: 2011,
    letterCount: 8,
    featured: false,
    timeline: [
      {
        year: 2011,
        letterSlug: '2011-berkshire-letter',
        passage:
          'We purchased a significant stake in IBM in 2011 and now own about 5.5% of the company.',
        position: 'First big tech investment',
      },
    ],
  },
  {
    slug: 'byd',
    name: 'BYD',
    ticker: '1211.HK / BYDDY',
    industry: 'Automotive / Electric Vehicles',
    firstMentioned: 2008,
    letterCount: 15,
    featured: false,
    timeline: [
      {
        year: 2008,
        letterSlug: '2008-berkshire-letter',
        passage:
          'Our small investment in BYD, the Chinese automobile and battery company, was suggested by a member of the Munger family.',
        position: 'Initial investment via MidAmerican',
      },
    ],
  },
  {
    slug: 'coca-cola',
    name: 'Coca-Cola',
    ticker: 'KO',
    industry: 'Consumer Staples / Beverages',
    firstMentioned: 1988,
    letterCount: 44,
    featured: true,
    timeline: [
      {
        year: 1988,
        letterSlug: '1988-berkshire-letter',
        passage:
          'We established a new position of 14,166,500 shares of Coca-Cola... at a total cost of $592.5 million.',
        position: 'Initial position at $592.5M',
      },
      {
        year: 1993,
        letterSlug: '1993-berkshire-letter',
        passage:
          'Coca-Cola... has been one of the great success stories of American business... our current value of $3.8 billion.',
        position: '5x in 5 years',
      },
    ],
  },
  {
    slug: 'american-express',
    name: 'American Express',
    ticker: 'AXP',
    industry: 'Financial Services / Payments',
    firstMentioned: 1964,
    letterCount: 38,
    featured: false,
    timeline: [
      {
        year: 1964,
        letterSlug: '1964-berkshire-letter',
        passage:
          'American Express... had a business that we felt was not cyclical and had significant franchise value... We accumulated approximately 5% of the company.',
        position: 'Early accumulation during Salad Oil scandal',
      },
    ],
  },
  {
    slug: 'wells-fargo',
    name: 'Wells Fargo',
    ticker: 'WFC',
    industry: 'Banking / Financial Services',
    firstMentioned: 1989,
    letterCount: 32,
    featured: true,
    timeline: [
      {
        year: 1989,
        letterSlug: '1989-berkshire-letter',
        passage:
          'We own about 10% of Wells Fargo, one of the largest banks in the United States... purchased at a cost of $289 million.',
        position: 'Initial position',
      },
    ],
  },
  {
    slug: 'johnson-johnson',
    name: 'Johnson & Johnson',
    ticker: 'JNJ',
    industry: 'Healthcare / Pharmaceuticals',
    firstMentioned: 2006,
    letterCount: 11,
    featured: false,
    timeline: [
      {
        year: 2006,
        letterSlug: '2006-berkshire-letter',
        passage:
          'During 2006, we established new positions in Johnson & Johnson, Kraft, and others.',
        position: 'New position',
      },
    ],
  },
  {
    slug: 'procter-gamble',
    name: 'Procter & Gamble',
    ticker: 'PG',
    industry: 'Consumer Staples / Household Products',
    firstMentioned: 1990,
    letterCount: 18,
    featured: false,
    timeline: [
      {
        year: 1990,
        letterSlug: '1990-berkshire-letter',
        passage:
          'We own a significant position in Procter & Gamble... one of the world\'s most respected consumer products companies.',
        position: 'Significant position',
      },
    ],
  },
  {
    slug: 'moodys',
    name: "Moody's",
    ticker: 'MCO',
    industry: 'Financial Services / Credit Rating',
    firstMentioned: 2000,
    letterCount: 16,
    featured: false,
    timeline: [
      {
        year: 2000,
        letterSlug: '2000-berkshire-letter',
        passage:
          'We own about 16% of Moody\'s Corporation... the dominant credit rating agency in the United States.',
        position: '16% stake',
      },
    ],
  },
  {
    slug: 'apple',
    name: 'Apple',
    ticker: 'AAPL',
    industry: 'Technology / Consumer Electronics',
    firstMentioned: 2016,
    letterCount: 21,
    featured: true,
    timeline: [
      {
        year: 2016,
        letterSlug: '2016-berkshire-letter',
        passage:
          'We purchased our first 12 million shares of Apple in 2016... cost was $6.6 billion.',
        position: 'Initial position at $6.6B',
      },
      {
        year: 2018,
        letterSlug: '2018-berkshire-letter',
        passage:
          'Our Apple holding has performed well... the position now represents 25% of our equity portfolio.',
        position: '25% of equity portfolio',
      },
    ],
  },
  {
    slug: 'jpmorgan-chase',
    name: 'JPMorgan Chase',
    ticker: 'JPM',
    industry: 'Banking / Financial Services',
    firstMentioned: 2018,
    letterCount: 7,
    featured: false,
    timeline: [
      {
        year: 2018,
        letterSlug: '2018-berkshire-letter',
        passage:
          'During the fourth quarter of 2018, we purchased a small position in JPMorgan Chase.',
        position: 'New position — small',
      },
    ],
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    ticker: 'AMZN',
    industry: 'Technology / E-Commerce',
    firstMentioned: 2019,
    letterCount: 9,
    featured: false,
    timeline: [
      {
        year: 2019,
        letterSlug: '2019-berkshire-letter',
        passage:
          'Our investment in Amazon.com was made by one of our investment managers, Todd Combs.',
        position: 'Initial position via Todd Combs',
      },
    ],
  },
  {
    slug: 'dominion-energy',
    name: 'Dominion Energy',
    ticker: 'D',
    industry: 'Utilities / Energy',
    firstMentioned: 2020,
    letterCount: 5,
    featured: false,
    timeline: [
      {
        year: 2020,
        letterSlug: '2020-berkshire-letter',
        passage:
          'We acquired all of Dominion Energy\'s natural gas transmission and storage assets.',
        position: 'Natural gas assets acquisition',
      },
    ],
  },
]

// Helper functions
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug)
}

export function getFeaturedCompanies(): Company[] {
  return companies.filter((c) => c.featured)
}

export function getCompaniesBySlug(slugs: string[]): Company[] {
  return slugs.map((s) => getCompanyBySlug(s)).filter(Boolean) as Company[]
}

export const companySlugs = companies.map((c) => c.slug)
