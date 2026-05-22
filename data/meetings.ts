import type { Meeting } from './types'

// ============================================================
// Annual Meeting Q&A (1994–2025)
// ============================================================

export const meetings: Meeting[] = [
  // ---- 2025 ----
  {
    slug: '2025-annual-meeting',
    year: 2025,
    date: '2025-05-03',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `Warren Buffett's final annual meeting as CEO. A historic gathering reflecting on his 60-year legacy at Berkshire Hathaway.`,
    keyTakeaways: [
      'Buffett announces Greg Abel will succeed him as CEO',
      'Final Q&A session with classic Buffett wisdom',
      'Reflections on 60 years of capital allocation',
    ],
    featured: true,
  },

  // ---- 2024 ----
  {
    slug: '2024-annual-meeting',
    year: 2024,
    date: '2024-05-04',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2024 annual meeting, Charlie Munger's final meeting before his passing in November 2023. Discussions on succession, AI, and Berkshire's future.`,
    keyTakeaways: [
      'Buffett discusses Charlie Munger\'s enduring legacy',
      'Comments on AI and its impact on investments',
      'Greg Abel\'s expanding role in the company',
    ],
    featured: false,
  },

  // ---- 2023 ----
  {
    slug: '2023-annual-meeting',
    year: 2023,
    date: '2023-05-06',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2023 annual meeting, first fully in-person since COVID. Buffett and Munger discuss the economy, banking crisis, and Apple's position in Berkshire's portfolio.`,
    keyTakeaways: [
      'Banking crisis commentary: "It\'s a Lehman-like moment"',
      'Apple now represents 40%+ of Berkshire\'s equity portfolio',
      'Munger on crypto: "It\'s part of the investment madness of the crowd"',
    ],
    featured: false,
  },

  // ---- 2022 ----
  {
    slug: '2022-annual-meeting',
    year: 2022,
    date: '2022-04-30',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2022 annual meeting, first with a live audience since COVID. Buffett and Munger discuss inflation, interest rates, and the changing economy.`,
    keyTakeaways: [
      'Inflation discussion: "It\'s a tax on everybody"',
      'Interest rates are the gravity of valuation',
      'Munger on crypto: "I wish it had never been invented"',
    ],
    featured: false,
  },

  // ---- 2021 ----
  {
    slug: '2021-annual-meeting',
    year: 2021,
    date: '2021-05-01',
    location: 'Los Angeles, California',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger'],
    duration: '4 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2021 annual meeting, held in Los Angeles where Munger lives. A smaller, more intimate setting due to COVID. Buffett and Munger discuss the economy, stimulus, and ESG investing.`,
    keyTakeaways: [
      'Munger joins from Los Angeles (first time not in Omaha)',
      'Discussion on stimulus and its inflationary effects',
      'ESG investing criticisms from both Buffett and Munger',
    ],
    featured: false,
  },

  // ---- 2020 ----
  {
    slug: '2020-annual-meeting',
    year: 2020,
    date: '2020-05-02',
    location: 'Omaha, Nebraska (Virtual)',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '3 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The first virtual annual meeting due to COVID-19. Buffett discusses the economic impact of the pandemic, Berkshire's stock buybacks, and the uncertain future.`,
    keyTakeaways: [
      'First virtual meeting in Berkshire\'s history',
      'Buffett discusses the pandemic\'s economic impact',
      'Berkshire sold its airline stakes ("The world has changed")',
    ],
    featured: false,
  },

  // ---- 2019 ----
  {
    slug: '2019-annual-meeting',
    year: 2019,
    date: '2019-05-04',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2019 annual meeting. Buffett and Munger discuss the economy, stock buybacks, and the challenge of finding large acquisitions in a high-priced market.`,
    keyTakeaways: [
      'Buffett defends stock buybacks as "should be done when price < intrinsic value"',
      'Discussion on the challenge of deploying $100B+ in cash',
      'Munger on diversification: "The idea of diversification is madness"',
    ],
    featured: false,
  },

  // ---- 2018 ----
  {
    slug: '2018-annual-meeting',
    year: 2018,
    date: '2018-05-05',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2018 annual meeting. Buffett and Munger discuss trade with China, cryptocurrencies, and the rising cost of healthcare in the U.S.`,
    keyTakeaways: [
      'Buffett on trade war: "Trade wars are not good for the world"',
      'Munger on crypto: "I think it\'s totally asinine"',
      'Discussion on healthcare costs and the Amazon/Berkshire/JPMorgan partnership',
    ],
    featured: false,
  },

  // ---- 2017 ----
  {
    slug: '2017-annual-meeting',
    year: 2017,
    date: '2017-05-06',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger', 'greg-abel', 'ajit-jain'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2017 annual meeting. Buffett and Munger discuss the U.S. economy, tax reform, and the challenge of finding acquisitions in a high-priced market.`,
    keyTakeaways: [
      'Buffett supports corporate tax reform',
      'Discussion on AI and automation\'s impact on jobs',
      'Munger on diversification: "We don\'t believe in it"',
    ],
    featured: false,
  },

  // ---- 2016 ----
  {
    slug: '2016-annual-meeting',
    year: 2016,
    date: '2016-04-30',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2016 annual meeting. Buffett and Munger discuss the low-interest-rate environment, stock buybacks, and the U.S. economy.`,
    keyTakeaways: [
      'Buffett on low interest rates: "They\'re extraordinary, they\'re unnatural"',
      'Discussion on stock buybacks and when they make sense',
      'Munger on the economy: "I think we\'re living in a crazy era"',
    ],
    featured: false,
  },

  // ---- 2015 ----
  {
    slug: '2015-annual-meeting',
    year: 2015,
    date: '2015-05-02',
    location: 'Omaha, Nebraska',
    fullText: `[[PLACEHOLDER]]`,
    qaList: [],
    concepts: [],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett', 'charlie-munger'],
    duration: '5 hours',
    videoUrl: 'https://www.berkshirehathaway.com/meetings/meeting.html',
    summary: `The 2015 annual meeting. Buffett and Munger discuss the U.S. economy, oil prices, and the challenge of finding acquisitions.`,
    keyTakeaways: [
      'Buffett on oil prices: "It\'s a huge tax on American consumers"',
      'Discussion on the strong dollar\'s impact on Berkshire\'s earnings',
      'Munger on the Fed: "I don\'t think we should have a rule that says we must have a 2% inflation target"',
    ],
    featured: false,
  },
]

// ============================================================
// Stats
// ============================================================
export const stats = {
  totalMeetings: meetings.length,
  yearsCovered: `${Math.min(...meetings.map((m) => m.year))}–${Math.max(...meetings.map((m) => m.year))}`,
}
