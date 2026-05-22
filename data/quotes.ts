import type { Quote } from './types'

// ============================================================
//  Warren Buffett Famous Quotes
// ============================================================

export const quotes: Quote[] = [
  // ---- Investing ----
  {
    slug: 'be-fearful-when-others-are-greedy',
    text: 'Be fearful when others are greedy, and greedy when others are fearful.',
    year: 2004,
    source: '2004 Berkshire Hathaway Annual Letter',
    sourceSlug: '2004-berkshire-letter',
    topicTags: ['investing', 'market-psychology', 'fear-vs-greed'],
    context: 'Buffett explaining his contrarian investment philosophy during market bubbles.',
    featured: true,
  },
  {
    slug: 'price-is-what-you-pay',
    text: 'Price is what you pay. Value is what you get.',
    year: 2008,
    source: '2008 Berkshire Hathaway Annual Letter',
    sourceSlug: '2008-berkshire-letter',
    topicTags: ['investing', 'value-investing', 'intrinsic-value'],
    context: 'Explaining the core of value investing — the difference between price and value.',
    featured: true,
  },
  {
    slug: 'never-depend-on-single-venture',
    text: 'Never depend on a single venture for your financial security.',
    year: 1991,
    source: '1991 Berkshire Hathaway Annual Letter',
    sourceSlug: '1991-berkshire-letter',
    topicTags: ['investing', 'risk-management', 'diversification'],
    context: 'Advising on the importance of not putting all eggs in one basket.',
    featured: false,
  },
  {
    slug: 'time-is-the-friend',
    text: 'Time is the friend of the wonderful business, the enemy of the mediocre.',
    year: 1989,
    source: '1989 Berkshire Hathaway Annual Letter',
    sourceSlug: '1989-berkshire-letter',
    topicTags: ['investing', 'quality', 'long-term', 'compounding'],
    context: 'Explaining why quality businesses compound value over time.',
    featured: true,
  },
  {
    slug: 'mr-market',
    text: 'Mr. Market is your servant, not your guide.',
    year: 1987,
    source: '1987 Berkshire Hathaway Annual Letter',
    sourceSlug: '1987-berkshire-letter',
    topicTags: ['investing', 'mr-market', 'market-psychology', 'value-investing'],
    context: 'Paraphrasing Benjamin Graham\'s Mr. Market allegory to explain market fluctuations.',
    featured: true,
  },

  // ---- Business ----
  {
    slug: 'integrity-is-everything',
    text: 'It takes 20 years to build a reputation and five minutes to ruin it.',
    year: 1998,
    source: '1998 University of Florida Speech',
    sourceSlug: '1998-university-of-florida',
    topicTags: ['business', 'integrity', 'reputation'],
    context: 'Speaking to MBA students about the importance of integrity in business.',
    featured: true,
  },
  {
    slug: 'hire-character-not-competence',
    text: 'In looking for people to hire, you look for three qualities: integrity, intelligence, and energy. But if they don\'t have the first, the other two will kill you.',
    year: 1998,
    source: '1998 University of Florida Speech',
    sourceSlug: '1998-university-of-florida',
    topicTags: ['business', 'hiring', 'integrity', 'management'],
    context: 'Explaining what matters most when building a team.',
    featured: true,
  },
  {
    slug: 'diffusion-of-responsibility',
    text: 'The bad terminated is better than the bad term.',
    year: 1989,
    source: '1989 Berkshire Hathaway Annual Letter',
    sourceSlug: '1989-berkshire-letter',
    topicTags: ['business', 'management', 'accounting'],
    context: 'Criticizing corporate accounting gimmicks that hide poor performance.',
    featured: false,
  },
  {
    slug: 'our-favorite-holding-period',
    text: 'Our favorite holding period is forever.',
    year: 1988,
    source: '1988 Berkshire Hathaway Annual Letter',
    sourceSlug: '1988-berkshire-letter',
    topicTags: ['investing', 'long-term', 'buy-and-hold'],
    context: 'Explaining Berkshire\'s approach to owning businesses rather than trading stocks.',
    featured: true,
  },

  // ---- Life & Wisdom ----
  {
    slug: 'success-is-loving-people',
    text: 'The measure of success is how many people you love love you.',
    year: 2006,
    source: '2006 Berkshire Hathaway Annual Letter',
    sourceSlug: '2006-berkshire-letter',
    topicTags: ['life', 'success', 'relationships'],
    context: 'Reflecting on what truly matters in life after a long career.',
    featured: false,
  },
  {
    slug: 'do-what-you-love',
    text: 'You don\'t have to be an expert on everything, but you have to know what you don\'t know.',
    year: 1998,
    source: '1998 University of Florida Speech',
    sourceSlug: '1998-university-of-florida',
    topicTags: ['life', 'wisdom', 'circle-of-competence'],
    context: 'Advice on staying within your circle of competence.',
    featured: false,
  },
  {
    slug: 'the-rich-escaped',
    text: 'The rich escaped, and the poor got stuck. That\'s the way it works.',
    year: 2006,
    source: '2006 Berkshire Hathaway Annual Meeting',
    sourceSlug: '2006-annual-meeting',
    topicTags: ['life', 'tax', 'fairness'],
    context: 'Commenting on the unfairness of the tax system during the 2006 annual meeting.',
    featured: false,
  },
  {
    slug: 'be-the-right-person',
    text: 'The best thing you can do is to be the right person. If you\'re the right person, the right things will happen.',
    year: 1998,
    source: '1998 University of Florida Speech',
    sourceSlug: '1998-university-of-florida',
    topicTags: ['life', 'character', 'success'],
    context: 'Advising students that character matters more than strategy.',
    featured: false,
  },

  // ---- Market Psychology ----
  {
    slug: 'stock-market-is-a-transfer',
    text: 'The stock market is a device for transferring money from the impatient to the patient.',
    year: 1997,
    source: '1997 Berkshire Hathaway Annual Letter',
    sourceSlug: '1997-berkshire-letter',
    topicTags: ['investing', 'patience', 'market-psychology'],
    context: 'Explaining why patience is the investor\'s greatest asset.',
    featured: true,
  },
  {
    slug: 'be-greedy-when-others-are-fearful',
    text: 'Be greedy when others are fearful, and fearful when others are greedy.',
    year: 2008,
    source: '2008 NYT Op-Ed: Buy American. I Am.',
    sourceSlug: undefined,
    topicTags: ['investing', 'fear-vs-greed', 'contrarian'],
    context: 'Written during the 2008 financial crisis to encourage buying when others panic.',
    featured: true,
  },
  {
    slug: 'margin-of-safety',
    text: 'You don\'t need to know a man\'s exact weight to know he\'s fat. You don\'t need to know a stock\'s exact value to know it\'s cheap.',
    year: 1992,
    source: '1992 Berkshire Hathaway Annual Letter',
    sourceSlug: '1992-berkshire-letter',
    topicTags: ['investing', 'margin-of-safety', 'value-investing'],
    context: 'Explaining that valuation is not about precision but about obvious mispricing.',
    featured: false,
  },
]

// ============================================================
// Stats
// ============================================================
export const stats = {
  totalQuotes: quotes.length,
}
