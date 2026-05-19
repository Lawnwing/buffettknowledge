import type { Concept } from './types'

export const concepts: Concept[] = [
  {
    slug: 'intrinsic-value',
    name: 'Intrinsic Value',
    definition:
      'The discounted value of the cash that can be taken out of a business during its remaining life. It is an estimate rather than a precise figure, and is necessarily subjective. The two key variables are future cash flows and the appropriate discount rate.',
    firstMentioned: 1962,
    letterCount: 83,
    featured: true,
    relatedConcepts: ['margin-of-safety', 'owner-earnings', 'franchise'],
    crossReferences: [
      { letterSlug: "1957-partnership-letter", year: 1957, passage: "The Dow declined in 1957 and most funds did poorly; the partnership made a little money.", relevance: "first" },
      { letterSlug: "1959-partnership-letter", year: 1959, passage: "It is during periods of maximum optimism that we should be most cautious.", relevance: "mention" },
      { letterSlug: "1960-partnership-letter", year: 1960, passage: "The function of a partnership is to act as a vehicle for patient capital.", relevance: "mention" },
      { letterSlug: "1961-partnership-letter", year: 1961, passage: "If we are right about value, the market will eventually recognize it.", relevance: "mention" },
      { letterSlug: "1962-partnership-letter", year: 1962, passage: "The combination of market decline and excellent operating performance produced the best year in the partnership's history.", relevance: "key" },
      { letterSlug: "1963-partnership-letter", year: 1963, passage: "American Express has a franchise that cannot be measured by its current balance sheet.", relevance: "mention" },
      { letterSlug: "1964-partnership-letter", year: 1964, passage: "The most important quality for an investor is temperament, not intellect.", relevance: "mention" },
      { letterSlug: "1965-partnership-letter", year: 1965, passage: "The textile business was a very poor business... but I was making a major mistake in buying it.", relevance: "mention" },
      { letterSlug: "1965-berkshire-letter", year: 1965, passage: "We took control of Berkshire Fine Spinning Associates and merged it with Hathaway.", relevance: "mention" },
      { letterSlug: "1966-partnership-letter", year: 1966, passage: "The bigger the portfolio, the harder it is to find opportunities.", relevance: "mention" },
      { letterSlug: "1987-berkshire-letter", year: 1987, passage: "The October 19, 1987 crash was significant but does not change my long-term outlook.", relevance: "mention" },
      { letterSlug: "1988-berkshire-letter", year: 1988, passage: "We established a new position of 14,166,500 shares of Coca-Cola at a total cost of $592.5 million.", relevance: "key" },
      { letterSlug: "2008-berkshire-letter", year: 2008, passage: "Buy American. I am.", relevance: "key" },
      { letterSlug: "2016-berkshire-letter", year: 2016, passage: "We purchased our first 12 million shares of Apple in 2016.", relevance: "mention" },
      { letterSlug: "2020-berkshire-letter", year: 2020, passage: "The pandemic has been devastating for the world and for Berkshire.", relevance: "mention" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'margin-of-safety',
    name: 'Margin of Safety',
    definition:
      'The principle of only buying securities when their market price is significantly below their intrinsic value, providing a cushion against errors in calculation or unforeseen developments. First articulated by Benjamin Graham.',
    firstMentioned: 1962,
    letterCount: 41,
    featured: true,
    relatedConcepts: ['intrinsic-value', 'circle-of-competence'],
    crossReferences: [
      { letterSlug: "1957-partnership-letter", year: 1957, passage: "The Dow declined in 1957 and most funds did poorly; the partnership made a little money.", relevance: "first" },
      { letterSlug: "1958-partnership-letter", year: 1958, passage: "It is much better to have a conviction about value and wait for the market to recognize it than to try to predict what the market will do next.", relevance: "mention" },
      { letterSlug: "1959-partnership-letter", year: 1959, passage: "It is during periods of maximum optimism that we should be most cautious.", relevance: "key" },
      { letterSlug: "1961-partnership-letter", year: 1961, passage: "If we are right about value, the market will eventually recognize it.", relevance: "mention" },
      { letterSlug: "1962-partnership-letter", year: 1962, passage: "The combination of market decline and excellent operating performance produced the best year in the partnership's history.", relevance: "key" },
      { letterSlug: "1963-partnership-letter", year: 1963, passage: "American Express has a franchise that cannot be measured by its current balance sheet.", relevance: "mention" },
      { letterSlug: "1964-partnership-letter", year: 1964, passage: "The most important quality for an investor is temperament, not intellect.", relevance: "mention" },
      { letterSlug: "1966-partnership-letter", year: 1966, passage: "The bigger the portfolio, the harder it is to find opportunities.", relevance: "mention" },
      { letterSlug: "1987-berkshire-letter", year: 1987, passage: "The October 19, 1987 crash was significant but does not change my long-term outlook.", relevance: "key" },
      { letterSlug: "2008-berkshire-letter", year: 2008, passage: "Buy American. I am.", relevance: "mention" },
    ],  },
  {
    slug: 'economic-moat',
    name: 'Economic Moat',
    definition:
      'A sustainable competitive advantage that allows a business to fend off competitors and maintain high returns on capital for long periods. Buffett described it as a "城堡" (castle) protected by a moat — the wider and more durable the moat, the more valuable the business.',
    firstMentioned: 1977,
    letterCount: 56,
    featured: true,
    relatedConcepts: ['franchise', 'competitive-advantage', 'roe'],
    crossReferences: [
      { letterSlug: "1977-berkshire-letter", year: 1977, passage: "The essential economic test is whether a business has a durable competitive advantage — a moat.", relevance: "first" },
      { letterSlug: "1986-berkshire-letter", year: 1986, passage: "The annual meeting has become an important occasion for Berkshire shareholders.", relevance: "key" },
      { letterSlug: "1988-berkshire-letter", year: 1988, passage: "We established a new position of 14,166,500 shares of Coca-Cola at a total cost of $592.5 million.", relevance: "key" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'owner-earnings',
    name: 'Owner Earnings',
    definition:
      'Net income plus depreciation, depletion, and amortization, minus the average annual amount of capital expenditures required to maintain the business at its current competitive position. Buffett\'s preferred measure of corporate profitability over reported accounting earnings.',
    firstMentioned: 1986,
    letterCount: 29,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'free-cash-flow'],
    crossReferences: [
      { letterSlug: "1985-berkshire-letter", year: 1985, passage: "The last textile operation of any magnitude was closed in 1985.", relevance: "first" },
    ],  },
  {
    slug: 'circle-of-competence',
    name: 'Circle of Competence',
    definition:
      'The area around an investor\'s genuine expertise — businesses and industries they understand well enough to evaluate with reasonable confidence. Buffett emphasizes staying within this circle rather than attempting to evaluate businesses outside it.',
    firstMentioned: 1996,
    letterCount: 22,
    featured: true,
    relatedConcepts: ['margin-of-safety', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1996-berkshire-letter", year: 1996, passage: "The circle of competence is not about what you know — it is about what you know you don't know.", relevance: "first" },
      { letterSlug: "2016-berkshire-letter", year: 2016, passage: "We purchased our first 12 million shares of Apple in 2016.", relevance: "key" },
    ],  },
  {
    slug: 'free-cash-flow',
    name: 'Free Cash Flow',
    definition:
      'The cash generated by a business after all operating expenses, capital expenditures, and working capital investments. Buffett uses this to evaluate whether a business is a "cash machine" or "cash consumer."',
    firstMentioned: 1985,
    letterCount: 48,
    featured: false,
    relatedConcepts: ['owner-earnings', 'intrinsic-value'],
    crossReferences: [],
  },
  {
    slug: 'roe',
    name: 'Return on Equity (ROE)',
    definition:
      'Net income divided by shareholders\' equity. Buffett pays close attention to this metric, noting that a business earning high ROE on little or no equity is far superior to one earning low ROE on a large equity base.',
    firstMentioned: 1975,
    letterCount: 34,
    featured: false,
    relatedConcepts: ['roe-on-equity', 'compounding'],
    crossReferences: [
      { letterSlug: "1965-partnership-letter", year: 1965, passage: "The textile business was a very poor business... but I was making a major mistake in buying it.", relevance: "first" },
      { letterSlug: "1965-berkshire-letter", year: 1965, passage: "We took control of Berkshire Fine Spinning Associates and merged it with Hathaway.", relevance: "first" },
      { letterSlug: "1977-berkshire-letter", year: 1977, passage: "The essential economic test is whether a business has a durable competitive advantage — a moat.", relevance: "key" },
    ],  },
  {
    slug: 'roe-on-equity',
    name: 'ROE on Equity (minimal equity)',
    definition:
      'A business that generates high returns on equity while requiring minimal net tangible assets is exceptionally valuable. This is the hallmark of an "asset-light" or "franchise" business.',
    firstMentioned: 1975,
    letterCount: 27,
    featured: false,
    relatedConcepts: ['roe', 'franchise'],
    crossReferences: [],
  },
  {
    slug: 'franchise',
    name: 'Franchise Business',
    definition:
      'A business that sells a product or service that is needed or desired by customers, is not substituable, and is not regulated by a commodity-like pricing structure. Franchises can sustain pricing power and high ROE indefinitely.',
    firstMentioned: 1983,
    letterCount: 31,
    featured: false,
    relatedConcepts: ['economic-moat', 'competitive-advantage'],
    crossReferences: [
      { letterSlug: "1963-partnership-letter", year: 1963, passage: "American Express has a franchise that cannot be measured by its current balance sheet.", relevance: "first" },
      { letterSlug: "1977-berkshire-letter", year: 1977, passage: "The essential economic test is whether a business has a durable competitive advantage — a moat.", relevance: "key" },
      { letterSlug: "1986-berkshire-letter", year: 1986, passage: "The annual meeting has become an important occasion for Berkshire shareholders.", relevance: "key" },
    ],  },
  {
    slug: 'competitive-advantage',
    name: 'Competitive Advantage',
    definition:
      'A structural characteristic of a business that allows it to consistently earn returns on capital above its cost of capital. Often synonymous with economic moat, but broader in scope.',
    firstMentioned: 1977,
    letterCount: 44,
    featured: false,
    relatedConcepts: ['economic-moat', 'franchise'],
    crossReferences: [
      { letterSlug: "1977-berkshire-letter", year: 1977, passage: "The essential economic test is whether a business has a durable competitive advantage — a moat.", relevance: "first" },
    ],  },
  {
    slug: 'compounding',
    name: 'Compounding',
    definition:
      'The process by which earnings are reinvested to generate additional earnings over time. Buffett describes compounding as the most powerful force in investing and has made it the cornerstone of Berkshire\'s capital allocation strategy.',
    firstMentioned: 1963,
    letterCount: 38,
    featured: true,
    relatedConcepts: ['long-term-investing', 'roe'],
    crossReferences: [
      { letterSlug: "1958-partnership-letter", year: 1958, passage: "It is much better to have a conviction about value and wait for the market to recognize it than to try to predict what the market will do next.", relevance: "first" },
      { letterSlug: "1960-partnership-letter", year: 1960, passage: "The function of a partnership is to act as a vehicle for patient capital.", relevance: "key" },
      { letterSlug: "1961-partnership-letter", year: 1961, passage: "If we are right about value, the market will eventually recognize it.", relevance: "key" },
      { letterSlug: "1962-partnership-letter", year: 1962, passage: "The combination of market decline and excellent operating performance produced the best year in the partnership's history.", relevance: "mention" },
      { letterSlug: "1966-partnership-letter", year: 1966, passage: "The bigger the portfolio, the harder it is to find opportunities.", relevance: "mention" },
      { letterSlug: "1986-berkshire-letter", year: 1986, passage: "The annual meeting has become an important occasion for Berkshire shareholders.", relevance: "key" },
      { letterSlug: "1987-berkshire-letter", year: 1987, passage: "The October 19, 1987 crash was significant but does not change my long-term outlook.", relevance: "mention" },
      { letterSlug: "1988-berkshire-letter", year: 1988, passage: "We established a new position of 14,166,500 shares of Coca-Cola at a total cost of $592.5 million.", relevance: "key" },
      { letterSlug: "1996-berkshire-letter", year: 1996, passage: "The circle of competence is not about what you know — it is about what you know you don't know.", relevance: "mention" },
      { letterSlug: "2008-berkshire-letter", year: 2008, passage: "Buy American. I am.", relevance: "key" },
      { letterSlug: "2016-berkshire-letter", year: 2016, passage: "We purchased our first 12 million shares of Apple in 2016.", relevance: "key" },
      { letterSlug: "2020-berkshire-letter", year: 2020, passage: "The pandemic has been devastating for the world and for Berkshire.", relevance: "key" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'long-term-investing',
    name: 'Long-Term Investing',
    definition:
      'The strategy of buying securities with the intention of holding them for a very long period — ideally forever. Buffett\'s quote: "Our favorite holding period is forever." Emphasizes the benefits of minimizing taxes and transaction costs.',
    firstMentioned: 1988,
    letterCount: 52,
    featured: false,
    relatedConcepts: ['compounding', 'value-investing'],
    crossReferences: [
      { letterSlug: "1961-partnership-letter", year: 1961, passage: "If we are right about value, the market will eventually recognize it.", relevance: "mention" },
      { letterSlug: "1986-berkshire-letter", year: 1986, passage: "The annual meeting has become an important occasion for Berkshire shareholders.", relevance: "first" },
      { letterSlug: "1987-berkshire-letter", year: 1987, passage: "The October 19, 1987 crash was significant but does not change my long-term outlook.", relevance: "key" },
      { letterSlug: "1996-berkshire-letter", year: 1996, passage: "The circle of competence is not about what you know — it is about what you know you don't know.", relevance: "key" },
      { letterSlug: "2008-berkshire-letter", year: 2008, passage: "Buy American. I am.", relevance: "key" },
      { letterSlug: "2020-berkshire-letter", year: 2020, passage: "The pandemic has been devastating for the world and for Berkshire.", relevance: "key" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'value-investing',
    name: 'Value Investing',
    definition:
      'The discipline of buying securities for less than their intrinsic value and holding them until the market corrects the mispricing. Originated with Benjamin Graham and David Dodd, refined by Buffett into "quality at a reasonable price" (GARP/QARP).',
    firstMentioned: 1962,
    letterCount: 47,
    featured: false,
    relatedConcepts: ['margin-of-safety', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1957-partnership-letter", year: 1957, passage: "The Dow declined in 1957 and most funds did poorly; the partnership made a little money.", relevance: "first" },
      { letterSlug: "1958-partnership-letter", year: 1958, passage: "It is much better to have a conviction about value and wait for the market to recognize it than to try to predict what the market will do next.", relevance: "key" },
      { letterSlug: "1960-partnership-letter", year: 1960, passage: "The function of a partnership is to act as a vehicle for patient capital.", relevance: "mention" },
      { letterSlug: "1961-partnership-letter", year: 1961, passage: "If we are right about value, the market will eventually recognize it.", relevance: "mention" },
      { letterSlug: "1962-partnership-letter", year: 1962, passage: "The combination of market decline and excellent operating performance produced the best year in the partnership's history.", relevance: "key" },
      { letterSlug: "1966-partnership-letter", year: 1966, passage: "The bigger the portfolio, the harder it is to find opportunities.", relevance: "mention" },
    ],  },
  {
    slug: 'capital-allocation',
    name: 'Capital Allocation',
    definition:
      'The process of deploying the cash generated by a business — or received from operations — into the highest-return uses: reinvestment in the business, acquisitions, dividends, or share repurchases. Buffett considers this the CEO\'s most important job.',
    firstMentioned: 1977,
    letterCount: 36,
    featured: false,
    relatedConcepts: ['share-repurchase', 'acquisition'],
    crossReferences: [
      { letterSlug: "1965-partnership-letter", year: 1965, passage: "The textile business was a very poor business... but I was making a major mistake in buying it.", relevance: "first" },
      { letterSlug: "1965-berkshire-letter", year: 1965, passage: "We took control of Berkshire Fine Spinning Associates and merged it with Hathaway.", relevance: "first" },
      { letterSlug: "1967-partnership-letter", year: 1967, passage: "The insurance business is fundamentally different from the textile business — it can grow without significant capital.", relevance: "key" },
      { letterSlug: "1967-berkshire-letter", year: 1967, passage: "We entered the insurance business with the purchase of National Indemnity for $8.6 million.", relevance: "key" },
      { letterSlug: "1977-berkshire-letter", year: 1977, passage: "The essential economic test is whether a business has a durable competitive advantage — a moat.", relevance: "key" },
      { letterSlug: "1996-berkshire-letter", year: 1996, passage: "The circle of competence is not about what you know — it is about what you know you don't know.", relevance: "key" },
      { letterSlug: "2016-berkshire-letter", year: 2016, passage: "We purchased our first 12 million shares of Apple in 2016.", relevance: "key" },
      { letterSlug: "2020-berkshire-letter", year: 2020, passage: "The pandemic has been devastating for the world and for Berkshire.", relevance: "key" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'share-repurchase',
    name: 'Share Repurchase',
    definition:
      'When a company buys back its own shares, increasing the ownership stake of remaining shareholders. Buffett will repurchase Berkshire shares when they trade below intrinsic value, calling it the "most attractive capital allocation decision" available.',
    firstMentioned: 1999,
    letterCount: 28,
    featured: false,
    relatedConcepts: ['capital-allocation', 'intrinsic-value'],
    crossReferences: [],
  },
  {
    slug: 'acquisition',
    name: 'Acquisitions',
    definition:
      'Buying entire businesses. Buffett\'s criteria: good businesses (high ROE, durable moat), at fair prices rather than bargain prices, run by honest and competent managers. Avoids synergies, diversification-for-its-own-sake, and companies in distress.',
    firstMentioned: 1967,
    letterCount: 33,
    featured: false,
    relatedConcepts: ['capital-allocation', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1967-partnership-letter", year: 1967, passage: "The insurance business is fundamentally different from the textile business — it can grow without significant capital.", relevance: "first" },
      { letterSlug: "1967-berkshire-letter", year: 1967, passage: "We entered the insurance business with the purchase of National Indemnity for $8.6 million.", relevance: "first" },
      { letterSlug: "1985-berkshire-letter", year: 1985, passage: "The last textile operation of any magnitude was closed in 1985.", relevance: "key" },
      { letterSlug: "1996-berkshire-letter", year: 1996, passage: "The circle of competence is not about what you know — it is about what you know you don't know.", relevance: "key" },
      { letterSlug: "2020-berkshire-letter", year: 2020, passage: "The pandemic has been devastating for the world and for Berkshire.", relevance: "key" },
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "key" },
    ],  },
  {
    slug: 'deferred-tax-liability',
    name: 'Deferred Tax Liability',
    definition:
      'An accounting liability representing future taxes that will be paid when appreciated securities are sold. Buffett views unrealized gains as creating a "deferred tax liability" that must be considered when evaluating intrinsic value.',
    firstMentioned: 1978,
    letterCount: 19,
    featured: false,
    relatedConcepts: ['intrinsic-value'],
    crossReferences: [
      { letterSlug: "2025-berkshire-letter", year: 2025, passage: "Our 60-year journey has been driven by one guiding principle: America's economic tailwind.", relevance: "mention" },
    ],  },
  {
    slug: 'float',
    name: 'Insurance Float',
    definition:
      'The money that insurance companies hold between收取 premiums and paying claims. For Berkshire\'s reinsurance operations, float is essentially "free" capital that can be invested at high returns. Buffett describes it as the "Gitl" (little girl) that Berkshire has been raising.',
    firstMentioned: 1967,
    letterCount: 35,
    featured: true,
    relatedConcepts: ['capital-allocation'],
    crossReferences: [
      { letterSlug: "1967-partnership-letter", year: 1967, passage: "The insurance business is fundamentally different from the textile business — it can grow without significant capital.", relevance: "first" },
      { letterSlug: "1967-berkshire-letter", year: 1967, passage: "We entered the insurance business with the purchase of National Indemnity for $8.6 million.", relevance: "first" },
    ],  },
  {
    slug: 'weighted-average-cost-of-capital',
    name: 'Weighted Average Cost of Capital (WACC)',
    definition:
      'The average cost of all capital (debt and equity) used to finance a business. Buffett focuses on whether a business earns returns above its cost of capital as the fundamental test of value creation.',
    firstMentioned: 1995,
    letterCount: 15,
    featured: false,
    relatedConcepts: ['roe', 'capital-allocation'],
    crossReferences: [],
  },
  {
    slug: 'covenant',
    name: 'Non-Compete Covenant',
    definition:
      'An agreement in an acquisition contract preventing sellers from competing with the buyer. In the context of small business acquisitions, Buffett notes these are largely unenforceable and should be ignored in valuation.',
    firstMentioned: 1979,
    letterCount: 8,
    featured: false,
    relatedConcepts: ['acquisition'],
    crossReferences: [],
  },
  {
    slug: 'debt-free',
    name: 'Debt-Free Operation',
    definition:
      'A business with no significant debt obligations. Buffett prefers businesses that operate with little or no debt, as they are more resilient during economic downturns and avoid the agency problems associated with leverage.',
    firstMentioned: 1974,
    letterCount: 25,
    featured: false,
    relatedConcepts: ['roe', 'competitive-advantage'],
    crossReferences: [
      { letterSlug: "1965-partnership-letter", year: 1965, passage: "The textile business was a very poor business... but I was making a major mistake in buying it.", relevance: "first" },
    ],  },
  {
    slug: 'enterprise-value',
    name: 'Enterprise Value',
    definition:
      'Market capitalization plus debt minus cash. Represents the true cost of acquiring a business. Buffett prefers to think in terms of enterprise value and the cash generated relative to that cost.',
    firstMentioned: 1990,
    letterCount: 18,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'free-cash-flow'],
    crossReferences: [],
  },
  {
    slug: 'cigar-butts',
    name: 'Cigar Butt Investing',
    definition:
      'Buying cheap businesses — "cigar butts" — at very low prices, hoping to profit from a final puff (asset liquidation) rather than future earnings. Buffett abandoned this Grahamian approach in the mid-1970s in favor of buying "wonderful businesses at fair prices."',
    firstMentioned: 1991,
    letterCount: 12,
    featured: false,
    relatedConcepts: ['value-investing', 'margin-of-safety'],
    crossReferences: [
      { letterSlug: "1962-partnership-letter", year: 1962, passage: "The combination of market decline and excellent operating performance produced the best year in the partnership's history.", relevance: "first" },
      { letterSlug: "1964-partnership-letter", year: 1964, passage: "The most important quality for an investor is temperament, not intellect.", relevance: "key" },
      { letterSlug: "1965-partnership-letter", year: 1965, passage: "The textile business was a very poor business... but I was making a major mistake in buying it.", relevance: "key" },
      { letterSlug: "1985-berkshire-letter", year: 1985, passage: "The last textile operation of any magnitude was closed in 1985.", relevance: "key" },
    ],  },
  {
    slug: 'wonderful-business',
    name: 'Wonderful Business',
    definition:
      "A business with durable competitive advantages, excellent management, and the ability to compound value over decades. Buffett's evolved strategy: It is far better to buy a wonderful business at a fair price than a fair business at a wonderful price.",
    firstMentioned: 1989,
    letterCount: 21,
    featured: false,
    relatedConcepts: ['economic-moat', 'fair-price', 'franchise'],
    crossReferences: [
      { letterSlug: "1988-berkshire-letter", year: 1988, passage: "We established a new position of 14,166,500 shares of Coca-Cola at a total cost of $592.5 million.", relevance: "first" },
    ],  },
  {
    slug: 'fair-price',
    name: 'Fair Price',
    definition:
      'The price at which a wonderful business can be purchased without overpaying. Buffett uses intrinsic value as the anchor for determining a fair price, paying less attention to the precise moment of purchase than to the quality of the business.',
    firstMentioned: 1989,
    letterCount: 24,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'wonderful-business'],
    crossReferences: [
      { letterSlug: "1988-berkshire-letter", year: 1988, passage: "We established a new position of 14,166,500 shares of Coca-Cola at a total cost of $592.5 million.", relevance: "first" },
      { letterSlug: "2016-berkshire-letter", year: 2016, passage: "We purchased our first 12 million shares of Apple in 2016.", relevance: "key" },
    ],  },
  {
    slug: 'ovetp',
    name: 'Over-the-Counter (OTC) Stocks',
    definition:
      'Stocks traded over-the-counter rather than on major exchanges. Buffett\'s early returns were significantly boosted by finding undervalued OTC stocks that required detailed analytical work to identify.',
    firstMentioned: 1962,
    letterCount: 9,
    featured: false,
    relatedConcepts: ['value-investing', 'intrinsic-value'],
    crossReferences: [],
  },
  {
    slug: 'seth',
    name: 'Sanford Eol (Seth) — Berkshire Shareholder',
    definition:
      'The fictional character of a hypothetical long-term Berkshire shareholder, invented by Buffett to illustrate the experience of passive Berkshire owners who benefited enormously from compounding without ever needing to act.',
    firstMentioned: 2014,
    letterCount: 6,
    featured: false,
    relatedConcepts: ['compounding', 'long-term-investing'],
    crossReferences: [],
  },
  {
    slug: 'bet',
    name: 'The Bet (Long-Term vs. Hedge Funds)',
    definition:
      'In 2007, Buffett bet $1 million that a low-cost S&P 500 index fund would outperform a hedge fund portfolio over 10 years. The bet ended in 2017 with the index fund winning decisively. Used to illustrate the futility of high fees in active management.',
    firstMentioned: 2016,
    letterCount: 5,
    featured: false,
    relatedConcepts: ['compounding', 'long-term-investing'],
    crossReferences: [],
  },
  {
    slug: 'second-level-thinking',
    name: 'Second-Level Thinking',
    definition:
      'Thinking that goes beyond the conventional consensus. First-level thinking is simplistic and inward-looking; second-level thinking requires understanding what others think and why, and then making a better decision.',
    firstMentioned: 1989,
    letterCount: 11,
    featured: false,
    relatedConcepts: ['value-investing', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1959-partnership-letter", year: 1959, passage: "It is during periods of maximum optimism that we should be most cautious.", relevance: "first" },
      { letterSlug: "1963-partnership-letter", year: 1963, passage: "American Express has a franchise that cannot be measured by its current balance sheet.", relevance: "key" },
    ],  },
  {
    slug: 'institutional-imperative',
    name: 'Institutional Imperative',
    definition:
      'The tendency of organizations to imitate each other\'s behavior regardless of logic or results. Buffett\'s term for the irrational conformity in corporate decision-making, where managers follow industry peers into value-destroying acquisitions and strategies.',
    firstMentioned: 1991,
    letterCount: 13,
    featured: false,
    relatedConcepts: ['capital-allocation'],
    crossReferences: [],
  },
  {
    slug: 'manager-bias',
    name: 'Manager Bias',
    definition:
      'The tendency of CEOs to expand their empires regardless of returns on capital, often citing "synergies" that rarely materialize. Buffett specifically warns against CEOs who consistently overpay for acquisitions.',
    firstMentioned: 1998,
    letterCount: 17,
    featured: false,
    relatedConcepts: ['capital-allocation', 'institutional-imperative'],
    crossReferences: [],
  },
  {
    slug: 'derivatives',
    name: 'Derivatives',
    definition:
      'Financial instruments whose value is derived from underlying assets. Buffett has repeatedly called derivatives "weapons of mass destruction" due to their potential to amplify systemic risk and create large, hard-to-measure liabilities.',
    firstMentioned: 2002,
    letterCount: 22,
    featured: false,
    relatedConcepts: ['debt-free'],
    crossReferences: [],
  },
  {
    slug: 'accounting-earnings',
    name: 'Accounting Earnings vs. Economic Earnings',
    definition:
      'The divergence between reported accounting earnings and true economic earnings. Buffett emphasizes that GAAP accounting can create misleading impressions — goodwill amortization, inventory methods, and depreciation can all distort reported figures.',
    firstMentioned: 1983,
    letterCount: 29,
    featured: false,
    relatedConcepts: ['owner-earnings', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1985-berkshire-letter", year: 1985, passage: "The last textile operation of any magnitude was closed in 1985.", relevance: "first" },
    ],  },
  {
    slug: 'goodwill',
    name: 'Goodwill',
    definition:
      'The premium paid over book value in an acquisition. Buffett distinguishes between "goodwill" that represents genuine economic value (from durable competitive advantages) and goodwill that is merely accounting goodwill with no real significance.',
    firstMentioned: 1983,
    letterCount: 20,
    featured: false,
    relatedConcepts: ['acquisition', 'roe'],
    crossReferences: [
      { letterSlug: "1985-berkshire-letter", year: 1985, passage: "The last textile operation of any magnitude was closed in 1985.", relevance: "first" },
    ],  },
  {
    slug: 'debt-ratio',
    name: 'Debt Ratio',
    definition:
      'The proportion of debt relative to equity or total capital. Buffett prefers businesses with modest or no debt, and uses the debt ratio as one signal of a business\'s financial resilience and management discipline.',
    firstMentioned: 1974,
    letterCount: 23,
    featured: false,
    relatedConcepts: ['debt-free', 'roe'],
    crossReferences: [],
  },
  {
    slug: 'look-through-earnings',
    name: 'Look-Through Earnings',
    definition:
      'Berkshire\'s reported earnings that include only Berkshire\'s operational results, excluding the earnings of investees that are accounted for as equity holdings. Buffett introduced this concept to give shareholders a clearer picture of Berkshire\'s true operating performance.',
    firstMentioned: 1981,
    letterCount: 16,
    featured: false,
    relatedConcepts: ['owner-earnings', 'intrinsic-value'],
    crossReferences: [],
  },
  {
    slug: 'headline-risk',
    name: 'Headline Risk',
    definition:
      'The risk that a business will suffer permanent damage to its reputation and earnings from adverse publicity. Buffett notes that businesses with strong brands and durable moats are generally resistant to headline risk, while those without are vulnerable.',
    firstMentioned: 1990,
    letterCount: 14,
    featured: false,
    relatedConcepts: ['economic-moat', 'franchise'],
    crossReferences: [],
  },
  {
    slug: 'indexing',
    name: 'Index Fund Investing',
    definition:
      'Buying a broad market index fund rather than attempting to pick individual securities. Buffett has explicitly recommended that most investors should use index funds, reserving active management for investors with genuine expertise.',
    firstMentioned: 1993,
    letterCount: 18,
    featured: false,
    relatedConcepts: ['compounding', 'long-term-investing'],
    crossReferences: [],
  },
  {
    slug: 'time-value-of-money',
    name: 'Time Value of Money',
    definition:
      'The concept that a dollar today is worth more than a dollar in the future due to its potential earning capacity. This principle underlies Buffett\'s use of discounted cash flow (DCF) analysis to calculate intrinsic value.',
    firstMentioned: 1962,
    letterCount: 11,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'discounted-cash-flow'],
    crossReferences: [],
  },
  {
    slug: 'discounted-cash-flow',
    name: 'Discounted Cash Flow (DCF)',
    definition:
      'A valuation method that estimates the present value of an investment based on its expected future cash flows, discounted at an appropriate rate. Buffett uses DCF as a conceptual tool rather than a precise formula.',
    firstMentioned: 1992,
    letterCount: 15,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'time-value-of-money', 'free-cash-flow'],
    crossReferences: [],
  },
  {
    slug: 'liquidation-value',
    name: 'Liquidation Value',
    definition:
      'The value of a business if all assets were sold and liabilities paid off. Graham\'s approach of buying stocks below liquidation value (the "net-net" strategy) was the foundation of early Buffett Partnership returns.',
    firstMentioned: 1962,
    letterCount: 17,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'margin-of-safety', 'cigar-butts'],
    crossReferences: [],
  },
  {
    slug: 'tax-efficiency',
    name: 'Tax Efficiency',
    definition:
      'The advantage of holding stocks for long periods rather than trading frequently. Long-term capital gains are taxed at lower rates, and taxes are deferred until gains are realized — allowing compounding on pre-tax capital.',
    firstMentioned: 1999,
    letterCount: 19,
    featured: false,
    relatedConcepts: ['compounding', 'long-term-investing'],
    crossReferences: [],
  },
  {
    slug: 'opportunity-cost',
    name: 'Opportunity Cost',
    definition:
      'The return foregone by choosing one investment over the next best alternative. Buffett applies opportunity cost rigorously, preferring to hold cash rather than invest in marginal opportunities that don\'t meet his return thresholds.',
    firstMentioned: 1967,
    letterCount: 21,
    featured: false,
    relatedConcepts: ['intrinsic-value', 'capital-allocation'],
    crossReferences: [
      { letterSlug: "1964-partnership-letter", year: 1964, passage: "The most important quality for an investor is temperament, not intellect.", relevance: "first" },
      { letterSlug: "1966-partnership-letter", year: 1966, passage: "The bigger the portfolio, the harder it is to find opportunities.", relevance: "key" },
      { letterSlug: "1967-berkshire-letter", year: 1967, passage: "We entered the insurance business with the purchase of National Indemnity for $8.6 million.", relevance: "key" },
      { letterSlug: "2008-berkshire-letter", year: 2008, passage: "Buy American. I am.", relevance: "key" },
    ],
  },
  {
    slug: 'cash-cow',
    name: 'Cash Cow',
    definition:
      'A business that generates more cash than it needs for reinvestment and pays out the excess to owners. Buffett uses this term to describe businesses with durable competitive advantages that require minimal capital investment to maintain.',
    firstMentioned: 1985,
    letterCount: 26,
    featured: false,
    relatedConcepts: ['free-cash-flow', 'capital-allocation'],
    crossReferences: [],
  },
  {
    slug: 'conglomerate-discount',
    name: 'Conglomerate Discount',
    definition:
      'The tendency of diversified conglomerates to trade at a discount to the sum of their parts. Buffett has used this to Berkshire\'s advantage, sometimes spinning off divisions at a premium to their intrinsic value.',
    firstMentioned: 1967,
    letterCount: 14,
    featured: false,
    relatedConcepts: ['capital-allocation', 'intrinsic-value'],
    crossReferences: [
      { letterSlug: "1967-partnership-letter", year: 1967, passage: "The insurance business is fundamentally different from the textile business — it can grow without significant capital.", relevance: "first" },
    ],
  },
  {
    slug: 'covenant',
    name: 'Covenant (Non-Compete)',
    definition:
      'Agreements in business sales preventing sellers from competing. Buffett notes these are largely unenforceable in practice, so they should carry no weight in business valuation.',
    firstMentioned: 1979,
    letterCount: 8,
    featured: false,
    relatedConcepts: ['acquisition'],
    crossReferences: [],
  },
  {
    slug: 'synergy',
    name: 'Synergy',
    definition:
      'Cost savings or revenue enhancements claimed from combining two businesses. Buffett is deeply skeptical of synergy-driven acquisitions, noting that most promised synergies fail to materialize.',
    firstMentioned: 1978,
    letterCount: 19,
    featured: false,
    relatedConcepts: ['acquisition', 'institutional-imperative'],
    crossReferences: [],
  },
  {
    slug: 'tender-offer',
    name: 'Tender Offer',
    definition:
      'A public offer to buy shares directly from shareholders at a premium price. Buffett has used tender offers strategically (e.g., for See\'s Candies) and criticized defensive tactics that prevent them.',
    firstMentioned: 1978,
    letterCount: 7,
    featured: false,
    relatedConcepts: ['acquisition'],
    crossReferences: [],
  },
  {
    slug: 'leverage',
    name: 'Leverage',
    definition:
      'Using borrowed money to amplify investment returns. Buffett has consistently avoided leverage except in rare circumstances, noting that leverage magnifies both gains and losses and can permanently impair capital.',
    firstMentioned: 1974,
    letterCount: 22,
    featured: false,
    relatedConcepts: ['debt-free', 'compounding'],
    crossReferences: [
      { letterSlug: "1987-berkshire-letter", year: 1987, passage: "The October 19, 1987 crash was significant but does not change my long-term outlook.", relevance: "key" },
    ],  },
]

// Helper functions
export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug)
}

export function getFeaturedConcepts(): Concept[] {
  return concepts.filter((c) => c.featured)
}

export function getConceptsBySlug(slugs: string[]): Concept[] {
  return slugs.map((s) => getConceptBySlug(s)).filter(Boolean) as Concept[]
}

export const conceptSlugs = concepts.map((c) => c.slug)
