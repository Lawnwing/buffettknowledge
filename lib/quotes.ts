// ============================================================
// BuffettQuotes — Classic quotes from shareholder letters
// ============================================================

export interface BuffettQuote {
  text: string
  year: number
  source: string
}

export const buffettQuotes: BuffettQuote[] = [
  {
    text: "Price is what you pay. Value is what you get.",
    year: 2008,
    source: "2008 Letter to Shareholders",
  },
  {
    text: "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price.",
    year: 1989,
    source: "1989 Letter to Shareholders",
  },
  {
    text: "Our favorite holding period is forever.",
    year: 1988,
    source: "1988 Letter to Shareholders",
  },
  {
    text: "Be fearful when others are greedy, and be greedy when others are fearful.",
    year: 1986,
    source: "1986 Letter to Shareholders",
  },
  {
    text: "The stock market is designed to transfer money from the Active to the Patient.",
    year: 1991,
    source: "1991 Letter to Shareholders",
  },
  {
    text: "Risk comes from not knowing what you're doing.",
    year: 1993,
    source: "1993 Letter to Shareholders",
  },
  {
    text: "In the short run, the market is a voting machine. In the long run, it's a weighing machine.",
    year: 2001,
    source: "2001 Letter to Shareholders",
  },
  {
    text: "You don't need to be a rocket scientist. Investing is not a game where the guy with the 160 IQ beats the guy with 130 IQ.",
    year: 1991,
    source: "1991 Letter to Shareholders",
  },
  {
    text: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.",
    year: 1996,
    source: "1996 Letter to Shareholders",
  },
  {
    text: "I never attempt to make money on the stock market. I buy on the assumption that they could close the market the next day and not reopen it for five years.",
    year: 1987,
    source: "1987 Letter to Shareholders",
  },
  {
    text: "Only buy something that you'd be perfectly happy to hold if the market shut down for 10 years.",
    year: 1987,
    source: "1987 Letter to Shareholders",
  },
  {
    text: "The business of investing is not the same as the business of picking stocks.",
    year: 2004,
    source: "2004 Letter to Shareholders",
  },
  {
    text: "Chains of habit are too light to be felt until they are too heavy to be broken.",
    year: 1989,
    source: "1989 Letter to Shareholders",
  },
  {
    text: "Time is the friend of the wonderful business, the enemy of the mediocre.",
    year: 1989,
    source: "1989 Letter to Shareholders",
  },
  {
    text: "The most important thing to do if you find yourself in a hole is to stop digging.",
    year: 1979,
    source: "1979 Letter to Shareholders",
  },
  {
    text: "I try to buy stock in businesses that are so wonderful that an idiot can run them. Because sooner or later, one will.",
    year: 1994,
    source: "1994 Letter to Shareholders",
  },
  {
    text: "The difference between successful people and really successful people is that really successful people say no to almost everything.",
    year: 2013,
    source: "2013 Letter to Shareholders",
  },
  {
    text: "Cash combined with courage in a time of crisis is priceless.",
    year: 2008,
    source: "2008 Letter to Shareholders",
  },
  {
    text: "Wide diversification is only required when investors do not understand what they are doing.",
    year: 1996,
    source: "1996 Letter to Shareholders",
  },
  {
    text: "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.",
    year: 2016,
    source: "2016 Letter to Shareholders",
  },
]

let currentIndex = Math.floor(Math.random() * buffettQuotes.length)

export function getCurrentQuote(): BuffettQuote {
  return buffettQuotes[currentIndex]
}

export function getNextQuote(): BuffettQuote {
  currentIndex = (currentIndex + 1) % buffettQuotes.length
  return buffettQuotes[currentIndex]
}

export function getRandomQuote(): BuffettQuote {
  currentIndex = Math.floor(Math.random() * buffettQuotes.length)
  return buffettQuotes[currentIndex]
}
