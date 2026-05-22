import type { Speech } from './types'

// ============================================================
//  Famous Warren Buffett Speeches
// ============================================================

export const speeches: Speech[] = [
  // ---- 1998 - University of Florida Business School ---
  {
    slug: '1998-university-of-florida',
    title: 'The Ultimate Money Mindset Speech',
    date: '1998-10-15',
    location: 'University of Florida Business School',
    occasion: 'MBA Class Guest Lecture',
    fullText: `[[PLACEHOLDER]]`,
    summary: `One of Buffett's most famous speeches. He discusses the importance of integrity, how to choose a career, and why having "the right money mindset" matters more than IQ.`,
    concepts: ['integrity', 'reputation', 'career-advice', 'money-mindset'],
    companies: ['berkshire-hathaway'],
    people: ['warren-buffett'],
    keyQuotes: [
      '"It takes 20 years to build a reputation and five minutes to ruin it."',
      '"The difference between successful people and really successful people is that really successful people say no to almost everything."',
      '"You don\'t have to be an expert on every company, but you have to know what you don\'t know."',
    ],
    readingTimeMinutes: 25,
    sourceUrl: 'https://www.youtube.com/watch?v=ObRiRm_HTW8',
    background: `In October 1998, Warren Buffett visited the University of Florida Business School to speak with MBA students. This talk became legendary because of its candor and practical wisdom. Buffett spoke without notes for over an hour, answering questions on everything from career advice to investment philosophy.`,
    impact: `This speech is widely considered one of the best business talks ever given. It has been viewed millions of times on YouTube and is frequently quoted in business schools worldwide. The "money mindset" concept — that integrity and character matter more than raw intelligence — became a cornerstone of Buffett's public philosophy.`,
    featured: true,
  },

  // ---- 1984 - Columbia University Business School ---
  {
    slug: '1984-columbia-the-superinvestors-of-graham-and-doddsville',
    title: 'The Superinvestors of Graham-and-Doddsville',
    date: '1984-05-17',
    location: 'Columbia University Business School',
    occasion: 'Columbia Business School Commencement',
    fullText: `[[PLACEHOLDER]]`,
    summary: `Buffett's legendary defense of value investing. He presents statistical evidence that superior investment performance is not due to chance, but to following Graham & Dodd's value principles.`,
    concepts: ['value-investing', 'mr-market', 'intrinsic-value', 'margin-of-safety', 'efficient-market-hypothesis'],
    companies: ['berkshire-hathaway', 'geico'],
    people: ['warren-buffett', 'benjamin-graham', 'david-dodd'],
    keyQuotes: [
      '"The market, like the Lord, helps those who help themselves. But unlike the Lord, the market does not forgive those who know not what they do."',
      '"In the short run, the market is a voting machine — but in the long run, it is a weighing machine."',
      '"Value investing is not a concept that can be learned and applied gradually over time. It is either absorbed and adopted at once, or it is never truly learned."',
    ],
    readingTimeMinutes: 35,
    sourceUrl: 'https://www.columbia.edu/~hpd1/buffett.html',
    background: `In 1984, to commemorate the 50th anniversary of the publication of Benjamin Graham and David Dodd's "Security Analysis", Warren Buffett returned to his alma mater, Columbia Business School, to deliver this now-legendary speech. At the time, the academic finance world was enamored with the Efficient Market Hypothesis (EMH), which argued that beating the market was impossible. Buffett set out to prove them wrong.`,
    impact: `This speech single-handedly revived interest in value investing at a time when academic finance had all but declared it dead. By presenting the track records of investors who followed Graham & Dodd (Walter Schloss, Tom Knapp, Ed Anderson, Bill Ruane, Charlie Munger, and Buffett himself), Buffett showed that superior returns were not luck — they were the result of a disciplined, rational approach. The speech is now required reading at every major business school.`,
    featured: true,
  },

  // ---- 2008 - Toronto, Canada ---
  {
    slug: '2008-toronto-speech',
    title: 'Buy American. I Am.',
    date: '2008-10-17',
    location: 'Toronto, Canada',
    occasion: 'Business Roundtable / Media Interview',
    fullText: `[[PLACEHOLDER]]`,
    summary: `Given at the height of the 2008 financial crisis, Buffett explains why he's buying American stocks and why fear is the investor's worst enemy. This speech preceded his famous NYT op-ed by one day.`,
    concepts: ['fear-vs-greed', 'buy-when-there-is-blood', 'long-term-investing', 'market-timing'],
    companies: ['berkshire-hathaway', 'goldman-sachs', 'ge'],
    people: ['warren-buffett'],
    keyQuotes: [
      '"Be fearful when others are greedy, and greedy when others are fearful."',
      '"I\'ve been buying American stocks. This is my personal account — I don\'t own any bond or real estate."',
      '"You want to be greedy when others are fearful. And you want to be fearful when others are greedy."',
    ],
    readingTimeMinutes: 20,
    sourceUrl: 'https://www.cnbc.com/id/15840232',
    background: `In mid-October 2008, the global financial system was in freefall. Lehman Brothers had collapsed one month earlier, and the S&P 500 was down over 30% for the year. On October 16, 2008, Buffett published an op-ed in the New York Times titled "Buy American. I Am." The day before, he gave this speech in Toronto, laying out the same argument: fear is the investor's enemy, and this is the time to buy.`,
    impact: `This speech and the accompanying NYT op-ed are widely credited with helping to stabilize market sentiment in late 2008. Buffett's personal commitment to buying equities "with my own money" gave retail investors the confidence to stay the course. Within six months, the S&P 500 had bottomed and begun one of the great bull markets in history.`,
    featured: false,
  },

  // ---- 2017 - Fox Business Interview ---
  {
    slug: '2017-why-i-dont-carry-a-cellphone',
    title: 'Why I Don\'t Carry a Cellphone',
    date: '2017-02-27',
    location: 'Omaha, Nebraska',
    occasion: 'Fox Business Interview with Liz Claman',
    fullText: `[[PLACEHOLDER]]`,
    summary: `A shorter but revealing talk where Buffett explains his philosophy on technology, why he doesn't carry a smartphone, and how he maintains focus in a distracted world.`,
    concepts: ['focus', 'simplicity', 'technology-skepticism', 'productivity'],
    companies: ['berkshire-hathaway', 'apple'],
    people: ['warren-buffett', 'charlie-munger'],
    keyQuotes: [
      '"I don\'t carry a cellphone. I don\'t think it would help me make better decisions."',
      '"The most important thing is to keep the most important thing the most important thing."',
      '"I read and think. My life is not that complicated. I don\'t have a computer on my desk."',
    ],
    readingTimeMinutes: 15,
    sourceUrl: 'https://www.foxbusiness.com/',
    background: `In February 2017, Warren Buffett sat down with Fox Business host Liz Claman for a wide-ranging interview. One of the most memorable segments was Buffett's explanation of why, at age 86, he still did not carry a cellphone or have a computer on his desk. His reasoning revealed a deep commitment to focused, uninterrupted thinking.`,
    impact: `This interview went viral among productivity enthusiasts and knowledge workers. Buffett's "no cellphone" philosophy became a touchstone for the "deep work" movement. Cal Newport, author of "Deep Work", has cited this interview as a perfect example of why constant connectivity can undermine cognitive performance.`,
    featured: false,
  },
]

// ============================================================
// Stats
// ============================================================
export const stats = {
  totalSpeeches: speeches.length,
}
