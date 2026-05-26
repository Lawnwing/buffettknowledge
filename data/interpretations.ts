import type { Interpretation } from './types'

export const interpretations: Record<string, Interpretation> = {
  // ============================================================
  // 1971-berkshire-letter
  // ============================================================
  '1971-berkshire-letter': {
    overview:
      "1971 was Warren Buffett's first full year running Berkshire Hathaway entirely post-partnership dissolution. The letter reveals a company in transition: the textile business was stagnating, but Buffett was already deploying capital into insurance (National Indemnity) and other businesses. This letter marks the emergence of Berkshire as a diversified holding company, not just a textile manufacturer. Buffett also articulates early versions of his capital allocation philosophy — ideas that would define Berkshire for the next five decades.",
    keyTakeaways: [
      "Berkshire's textile segment produced inadequate returns on capital, confirming Buffett's growing conviction that diversification into better businesses was essential.",
      "National Indemnity continued to perform exceptionally, demonstrating the power of float — insurance premiums collected upfront, invested for later claims.",
      "Buffett began articulating his preference for retaining earnings only when reinvestment generates returns above the cost of capital — a principle he would repeat for decades.",
      "The 1971 letter shows Buffett's early thinking on acquisitions: he wanted businesses with durable competitive advantages, honest management, and good return on equity.",
      "This letter marks the transition from 'Buffett managing other people's money' (partnership) to 'Buffett allocating Berkshire's capital' (holding company)."
    ],
    sections: [
      {
        title: "The Post-Partnership Pivot: 1971 as Turning Point",
        type: "background",
        content:
          "By 1971, Buffett had dissolved his investment partnership (1969) and redirected his full attention to Berkshire Hathaway. The partnership had generated spectacular returns, but Buffett faced a new challenge: Berkshire's core textile business was mediocre at best. The 1971 letter reveals Buffett's response — not to fix the unfixable, but to allocate capital elsewhere. Insurance (National Indemnity, acquired 1967) was already contributing outsized returns. The conglomerate model was taking shape: acquire good businesses, retain their earnings, reinvest in more good businesses. This was the blueprint that would turn Berkshire into a multi-hundred-billion-dollar enterprise."
      },
      {
        title: "Insurance Float: The Engine of Berkshire's Growth",
        type: "principle",
        content:
          "In 1971, Buffett devoted significant attention to the insurance business — specifically, the concept of 'float.' Insurance companies collect premiums upfront and pay claims later, creating a pool of investable capital. If the insurance underwriting is profitable (premiums > claims), the float is negative-cost capital. Buffett explained this mechanism in the 1971 letter with unusual clarity. National Indemnity's float was growing, and Buffett was investing it in undervalued securities. This was the early version of the 'insurance + investments' model that would eventually make Berkshire the largest single shareholder in companies like Coca-Cola, Apple, and Bank of America."
      },
      {
        title: "Textiles vs. Insurance: The Capital Allocation Lesson",
        type: "insight",
        content:
          "A striking passage in the 1971 letter compares the textile division's return on capital with the insurance division's return. The contrast is stark: textiles earned a small fraction of its invested capital, while insurance generated outsized profits. Buffett's response was not to double down on textiles but to shift capital toward insurance and acquisitions. This is the essence of intelligent capital allocation: don't throw good money after bad; recognize when a business has no competitive advantage and redirect resources to businesses that do. Buffett would later formalize this in his 'exit strategy' for declining businesses."
      },
      {
        title: "Market Context: The Nifty Fifty Bubble",
        type: "background",
        content:
          "1971 was a peculiar market year. The 'Nifty Fifty' — fifty large-cap growth stocks like Coca-Cola, IBM, and Disney — were trading at nosebleed valuations (P/E ratios of 50x-80x). Meanwhile, smaller, less glamorous companies were ignored. Buffett explicitly avoided the Nifty Fifty, preferring undervalued, ignored businesses — the same approach he had used in the partnership years. The 1971 letter hints at his discomfort with market valuations, foreshadowing his famous 1974 statement to Forbes: 'I've never seen such attractive values in American stocks.' The discipline to avoid fads and buy what is cheap — even when everyone else is buying the Nifty Fifty — is a recurring theme."
      },
      {
        title: "The Acquisition Filter: What Buffett Was Looking For in 1971",
        type: "principle",
        content:
          "The 1971 letter contains early hints of Buffett's acquisition criteria — simple businesses, durable competitive advantages ('moats'), honest and capable management, and attractive valuations. He was not looking for turnarounds or cyclical businesses; he wanted 'wonderful businesses at fair prices.' This philosophy would eventually lead to See's Candies (1972), the Washington Post (1973), and GEICO (1976). The 1971 letter is the early articulation of what would become Buffett's 'owner's manual' decades later: Berkshire exists to allocate capital to businesses that can compound it at high rates of return."
      }
    ],
    relatedConcepts: ["float", "capital-allocation", "intrinsic-value", "moat"],
    relatedCompanies: ["berkshire-hathaway", "national-indemnity"],
    relatedPeople: ["warren-buffett"],
    marketContext: {
          description: `The U.S. stock market was at record highs. The S&P 500 had more than quintupled from its 2009 lows. Unemployment was at a 50-year low (3.5%), and the economy was growing steadily. Interest rates were rising (Fed funds rate 2.25-2.5%), and the Fed was actively tightening. Trade tensions with China were escalating. The U.S.-China "trade war" was in full swing.`,
    sp500Return: "31.5% (total return)",
    fedFundsRate: "2.25-2.5% (rising)",
    inflation: "1.8%",
    marketPhase: "bull-late"
  },

  keyNumbers: {
    bookValueGrowth: "18.3% (vs. S&P 500 TR 31.5%) — underperformed significantly",
    compoundedAnnualGainSince1965: "20.3%",
    sp500AnnualGainSince1965: "10.0%",
    totalGain1965To2019: "$1,000 → $27,000,000",
    berkshireMarketCap: "$550 billion",
    cashAndEquivalents: "$128+ billion",
    insuranceFloat: "$130 billion"
  },

  thenVsNow: {
    then: "1999: Berkshire's market cap was $100B. Buffett could move the needle with $10B positions. The 'fat wallet' problem was manageable.",
    now: "2019: Berkshire's market cap is $550B. A $10B position is a rounding error. The 'fat wallet' problem is existential — Buffett *must* acquire entire businesses to move the needle."
  },

  publishedDate: "2020-02-22",

  annotations: [
    {
      id: "2019-capital-allocation-quote",
      quote: `We will never overpay for an acquisition. Price matters, even for wonderful businesses.`,
      comment: `This is the "fortress mentality" principle. Buffett protects the balance sheet above all else. He'd rather hold cash than overpay for a "wonderful" business. Price matters.`
    },
    {
      id: "2019-cash-pile-quote",
      quote: `$128 billion of cash and equivalents. We haven't found "elephants" yet — but we're ready when opportunities arise.`,
      comment: `This is the "fat wallet" problem. With $800B+ of marketable securities, Berkshire can't find enough undervalued stocks. The answer: acquire entire businesses. Patience is key.`
    },
    {
      id: "2019-underperformance-quote",
      quote: `Our book value grew 18.3% in 2019. The S&P 500 returned 31.5%. We underperformed — and this will happen more often as we grow.`,
      comment: `This is the candid admission of underperformance. Buffett explains why it's inevitable: with $800B of marketable securities, Berkshire's returns *must* converge with the market. Size is the enemy of returns.`
    },
    {
      id: "2019-no-dividends-quote",
      quote: `We will never pay a dividend. I can deploy capital at higher rates than most shareholders can. The 54-year track record proves it.`,
      comment: `This is the definitive statement on dividends. Buffett can deploy capital at 20.3%/year — better than almost any shareholder can. Therefore, retaining earnings is rational. The track record proves it.`
    }
  ]

  }

}
