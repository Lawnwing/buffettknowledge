import type { Book } from './types'

// ============================================================
//  Buffett's Recommended Books
// ============================================================

export const books: Book[] = [
  // ---- 1. The Intelligent Investor ----
  {
    slug: 'the-inteligent-investor',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    year: 1949,
    coverImage: '/books/the-intelligent-investor.jpg',
    buffettComment: "This is by far the best book on investing ever written. It teaches the difference between investing and speculating, and why you should let Mr. Market work for you, not against you.",
    keyTakeaway: 'Investing should be driven by analysis and margin of safety, not market sentiment. The intelligent investor is a realist who sells to optimists and buys from pessimists.',
    relatedConcepts: ['value-investing', 'mr-market', 'margin-of-safety', 'intrinsic-value'],
    amazonUrl: 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661',
    featured: true,
  },

  // ---- 2. Security Analysis ----
  {
    slug: 'security-analysis',
    title: 'Security Analysis',
    author: 'Benjamin Graham and David Dodd',
    year: 1934,
    coverImage: '/books/security-analysis.jpg',
    buffettComment: "I read the 1934 edition when I was nineteen and it gave me an investing road map that I am still using today. Graham and Dodd taught me that price is what you pay, value is what you get.",
    keyTakeaway: 'Rigorous fundamental analysis is the foundation of value investing. Focus on the business behind the stock, not the stock price movements.',
    relatedConcepts: ['fundamental-analysis', 'value-investing', 'margin-of-safety'],
    amazonUrl: 'https://www.amazon.com/Security-Analysis-Principles-Benjamin-Graham/dp/0071592539',
    featured: true,
  },

  // ---- 3. Common Stocks and Uncommon Profits ----
  {
    slug: 'common-stocks-uncommon-profits',
    title: 'Common Stocks and Uncommon Profits',
    author: 'Philip Fisher',
    year: 1958,
    coverImage: '/books/common-stocks-uncommon-profits.jpg',
    buffettComment: "I am 85% Graham and 15% Fisher. Fishers approach to evaluating growth companies and his scuttlebutt method of research complement Grahams value framework perfectly.",
    keyTakeaway: 'Look for companies with strong growth potential, excellent management, and competitive advantages that can sustain long-term growth. Do your homework by talking to customers, suppliers, and competitors.',
    relatedConcepts: ['growth-investing', 'scuttlebutt', 'competitive-advantage'],
    amazonUrl: 'https://www.amazon.com/Common-Stocks-Uncommon-Profits-Writings/dp/0471445509',
    featured: false,
  },

  // ---- 4. The Wealth of Nations ----
  {
    slug: 'the-wealth-of-nations',
    title: 'The Wealth of Nations',
    author: 'Adam Smith',
    year: 1776,
    coverImage: '/books/wealth-of-nations.jpg',
    buffettComment: "Understanding how markets and capitalism work is essential. Smiths insights into the invisible hand and division of labour are as relevant today as they were 250 years ago.",
    keyTakeaway: 'Free markets, division of labor, and self-interest drive economic prosperity. Understanding macroeconomics helps you understand the environment in which businesses operate.',
    relatedConcepts: ['capitalism', 'free-markets', 'economic-moat'],
    amazonUrl: 'https://www.amazon.com/Wealth-Nations-Adam-Smith/dp/150114778X',
    featured: false,
  },

  // ---- 5. The Little Book of Common Sense Investing ----
  {
    slug: 'little-book-common-sense-investing',
    title: 'The Little Book of Common Sense Investing',
    author: 'John C. Bogle',
    year: 2007,
    coverImage: '/books/little-book-common-sense.jpg',
    buffettComment: "Jack Bogles philosophy is simple: keep costs low and hold for the long term. Most investors would be better off putting their money in a low-cost index fund.",
    keyTakeaway: 'Low-cost index fund investing consistently beats active management over the long term. Minimize fees, diversify broadly, and think like a business owner.',
    relatedConcepts: ['index-investing', 'costs-matter', 'long-term-thinking'],
    amazonUrl: 'https://www.amazon.com/Little-Book-Common-Sense-Investing/dp/1119403922',
    featured: false,
  },

  // ---- 6. Business Adventures ----
  {
    slug: 'business-adventures',
    title: 'Business Adventures',
    author: 'John Brooks',
    year: 1969,
    coverImage: '/books/business-adventures.jpg',
    buffettComment: "Bill Gates asked me for my favorite business book, and I gave him this one. Its stil the best business book I have ever read. The twelve classic business stories are timeless.",
    keyTakeaway: 'Business is fundamentally about people, not just numbers. Understanding corporate culture, leadership, and human nature is key to understanding business success or failure.',
    relatedConcepts: ['business-culture', 'leadership', 'corporate-governance'],
    amazonUrl: 'https://www.amazon.com/Business-Adventures-John-Brooks/dp/0143127588',
    featured: true,
  },

  // ---- 7. The Essays of Warren Buffett ----
  {
    slug: 'essays-warren-buffett',
    title: 'The Essays of Warren Buffett: Lessons for Corporate America',
    author: 'Warren Buffett (edited by Lawrence Cunningham)',
    year: 1997,
    coverImage: '/books/essays-warren-buffett.jpg',
    buffettComment: "Larry Cunningham did a brilliant job organizing my letters into coherent themes. If you want to understand my thinking, this is the best single volume to read.",
    keyTakeaway: 'Corporate governance, capital allocation, and investor relations should all serve the long-term interests of shareholders. Transparency and integrity are the foundation of trust.',
    relatedConcepts: ['corporate-governance', 'capital-alocation', 'shareholder-value'],
    amazonUrl: 'https://www.amazon.com/Essays-Warren-Buffett-Corporate-America/dp/1611637585',
    featured: true,
  },

  // ---- 8. Poor Charlies Almanack ----
  {
    slug: 'poor-charlies-almanack',
    title: 'Poor Charlies Almanack',
    author: 'Charlie Munger',
    year: 2005,
    coverImage: '/books/poor-charlies-almanack.jpg',
    buffettComment: "Charlie is the architect of Berkshires success. His mental models and multidisciplinary thinking approach is something every investor and businessperson should study.",
    keyTakeaway: 'Use multidisciplinary mental models to make better decisions. Invert problems, think from multiple perspectives, and avoid the cognitive biases that lead to poor judgment.',
    relatedConcepts: ['mental-models', 'multidisciplinary-thinking', 'cognitive-biases'],
    amazonUrl: 'https://www.amazon.com/Poor-Charlies-Almanack-Charles-2005-10-01/dp/B01K0SOWAC',
    featured: true,
  },
]

// ============================================================
// Stats
// ============================================================
export const stats = {
  totalBooks: books.length,
}
