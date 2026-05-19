import type { Person } from './types'

export const people: Person[] = [
  {
    slug: 'warren-buffett',
    name: 'Warren Buffett',
    role: 'Chairman & CEO, Berkshire Hathaway; Author of all Shareholder Letters',
    firstMentioned: 1956,
    letterCount: 101,
    relationship:
      'The author of every shareholder letter on this site. Buffett founded Buffett Associates, Ltd. in 1956 at age 25, and later built Berkshire Hathaway into one of the most valuable companies in the world. His letters are required reading for investors, business students, and anyone seeking wisdom on capital allocation, business management, and integrity.',
    featured: true,
    quotes: [],
  },
  {
    slug: 'benjamin-graham',
    name: 'Benjamin Graham',
    role: 'Professor, Investor, Author of "The Intelligent Investor"',
    firstMentioned: 1962,
    letterCount: 47,
    relationship:
      'Buffett\'s mentor and the father of value investing. Graham taught Buffett at Columbia Business School and later hired him at Graham-Newman Partnership. Buffett credits Graham with teaching him the fundamental principles of investing: margin of safety,Mr. Market, and the difference between price and value.',
    featured: true,
    quotes: [
      {
        year: 1962,
        letterSlug: '1962-berkshire-letter',
        passage:
          'Benjamin Graham taught us that the market is a mechanism for transferring wealth from the active to the patient — it offers prices daily, but only requires you to act when you want to buy or sell.',
      },
    ],
  },
  {
    slug: 'charlie-munger',
    name: 'Charlie Munger',
    role: 'Vice Chairman, Berkshire Hathaway (1978–2023)',
    firstMentioned: 1977,
    letterCount: 62,
    relationship:
      'Buffett\'s partner and Vice Chairman of Berkshire Hathaway from 1978 until his death in 2023. Munger was instrumental in evolving Buffett\'s investment philosophy from Graham\'s cigar-butt approach to buying "wonderful businesses at fair prices." His influence on Berkshire\'s culture and thinking was profound.',
    featured: true,
    quotes: [
      {
        year: 1994,
        letterSlug: '1994-berkshire-letter',
        passage:
          'Charlie Munger has probably contributed more than any living person to Berkshire\'s success. His influence on my thinking has been enormous, and his counsel has been invaluable.',
      },
    ],
  },
  {
    slug: 'ajit-jain',
    name: 'Ajit Jain',
    role: 'Vice Chairman, Insurance Operations, Berkshire Hathaway',
    firstMentioned: 1985,
    letterCount: 31,
    relationship:
      'Joined Berkshire in 1985 and has run Berkshire\'s reinsurance operations with extraordinary results. Buffett has repeatedly called Ajit one of the most valuable people in the world and the greatest insurance executive. Often cited as one of the world\'s most underrecognized business leaders.',
    featured: true,
    quotes: [
      {
        year: 2015,
        letterSlug: '2015-berkshire-letter',
        passage:
          'If there were only one person to credit for Berkshire\'s insurance success, it would be Ajit Jain. Ajit underwrites risk the way no one else in the industry does, and he does it with integrity and intelligence.',
      },
    ],
  },
  {
    slug: 'greg-abel',
    name: 'Greg Abel',
    role: 'CEO, Berkshire Hathaway (2025–present)',
    firstMentioned: 2008,
    letterCount: 28,
    relationship:
      'Buffett\'s designated successor as CEO of Berkshire Hathaway. Abel has run Berkshire\'s non-insurance operations since 2018, overseeing the energy, railroad, manufacturing, and retail divisions. Known for his operational excellence and cultural alignment with Berkshire.',
    featured: true,
    quotes: [
      {
        year: 2021,
        letterSlug: '2021-berkshire-letter',
        passage:
          'Greg Abel is the right person to be Berkshire\'s next CEO. He has the character, the talent, and the ownership mindset that Berkshire requires.',
      },
    ],
  },
  {
    slug: 'susan-schmidt',
    name: 'Susan Schmidt',
    role: 'Associate, Berkshire Hathaway (1980s)',
    firstMentioned: 1985,
    letterCount: 14,
    relationship:
      'One of the early women to work at Berkshire\'s headquarters, Schmidt was Buffett\'s right-hand associate in the 1980s and early 1990s. She left in 2000 to found Snak Attak. Buffett frequently cited her work ethic and loyalty.',
    featured: false,
    quotes: [
      {
        year: 1990,
        letterSlug: '1990-berkshire-letter',
        passage:
          'Susan Schmidt\'s contributions to Berkshire go far beyond what the financial statements show. She is the backbone of our Omaha operations.',
      },
    ],
  },
  {
    slug: 'walter-schloss',
    name: 'Walter Schloss',
    role: 'Graham & Dodd Investor, Partner',
    firstMentioned: 1978,
    letterCount: 19,
    relationship:
      'Ben Graham\'s former colleague and an investor in his own right. Walter Schloss ran the Graham & Dodd Investing seminar that Buffett and Munger attended. Known for his simple, disciplined approach to buying cheap stocks using the "Graham scorecard" method.',
    featured: false,
    quotes: [
      {
        year: 1984,
        letterSlug: '1984-berkshire-letter',
        passage:
          'Walter Schloss has a very simple approach to investing that has worked consistently for decades. He buys businesses that are cheap, he holds them, and he ignores the market.',
      },
    ],
  },
  {
    slug: 'arnie-hausen',
    name: 'Arnie Haasenburg',
    role: 'President, National Indemnity (1968–1970)',
    firstMentioned: 1969,
    letterCount: 9,
    relationship:
      'Ran National Indemnity during Buffett\'s early years at Berkshire. Buffett credited Haasenburg with pioneering the "float" strategy in property-casualty insurance. His management style and underwriting discipline set the template for Berkshire\'s insurance operations.',
    featured: false,
    quotes: [],
  },
  {
    slug: 'ronald-olsen',
    name: 'Ronald Olson',
    role: 'Partner, Munger, Tolles & Olson',
    firstMentioned: 1978,
    letterCount: 22,
    relationship:
      'Berkshire\'s outside counsel and one of the architects of Berkshire\'s governance. Olson has served as a trusted advisor to Buffett for decades, and was instrumental in structuring several key acquisitions including the Salomon takeover.',
    featured: false,
    quotes: [],
  },
  {
    slug: 'tom-murff',
    name: 'Tom Murphy',
    role: 'CEO, Cap Cities/ABC (1985–1996)',
    firstMentioned: 1985,
    letterCount: 15,
    relationship:
      'One of the most admired CEOs Buffett has ever known. Murphy ran Capital Cities/ABC with extraordinary discipline and was the first major media acquisition Berkshire ever made. Buffett called him "the best manager in America."',
    featured: false,
    quotes: [
      {
        year: 1985,
        letterSlug: '1985-berkshire-letter',
        passage:
          'Tom Murphy is a class act in every sense. He is an outstanding manager and a man of integrity. We would not have acquired Cap Cities without Tom.',
      },
    ],
  },
]

// Helper functions
export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug)
}

export function getFeaturedPeople(): Person[] {
  return people.filter((p) => p.featured)
}

export function getPeopleBySlug(slugs: string[]): Person[] {
  return slugs.map((s) => getPersonBySlug(s)).filter(Boolean) as Person[]
}

export const peopleSlugs = people.map((p) => p.slug)
