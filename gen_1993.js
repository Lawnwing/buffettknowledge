// gen_1993.js
// Generate interp_1993.ts with properly escaped content

const fs = require('fs');

// Helper: escape backticks in a string for use inside template literal
function esc(str) {
  return str.replace(/`/g, '\\`');
}

const overview = esc(`The 1993 Berkshire letter is Warren Buffett's most sustained critique of GAAP (Generally Accepted Accounting Principles) accounting to date. The letter opens with a lengthy explanation of four non-operating items that affected 1993 net worth—two negative (a tax accrual rule change and the corporate tax rate increase from 34% to 35%) and two positive (mark-to-market accounting for equities and the stock issuance for the Dexter Shoe acquisition). Buffett uses these accounting changes as a springboard to explain why book value and intrinsic value can diverge sharply, and why investors who fixate on GAAP numbers are "flying blind."

Beyond accounting, the 1993 letter covers the Dexter Shoe acquisition—Buffett's first major acquisition paid entirely in Berkshire stock. This is the deal Buffett would later call a "catastrophic mistake" (he paid $433 million in Berkshire stock for a business that would eventually fail). The 1993 letter also contains a characteristically candid discussion of insurance float economics in a falling interest-rate environment, Berkshire's first meaningful stock buyback program, and the challenge of deploying $11+ billion of capital in a rising market.

The letter is also notable for its discussion of "look-through earnings"—the share of earnings from investee companies that Berkshire does not consolidate but whose earnings nevertheless accrue to Berkshire shareholders. Buffett explains that Berkshire's true economic earnings are far higher than its GAAP earnings because of the retained earnings of its investee companies (Coca-Cola, Gillette, Wells Fargo, etc.). This framework would become central to how Buffett communicates Berkshire's true economic performance in the years ahead.

A final theme: the "fat wallet" problem. With $11+ billion of net worth, Berkshire could no longer compound at 23% per year. Buffett does not promise a return to that level, but he does promise that he will not compromise on quality ("wonderful business at a fair price") just to deploy capital. The 1993 letter is a meditation on the tension between accounting fiction and economic reality—and on the discipline required to compound capital at scale.`);

const keyTakeaways = [
  esc(`GAAP accounting distorts economic reality. Four non-operating items affected 1993 net worth; Buffett explains each and why book value is an imperfect proxy for intrinsic value.`),
  esc(`Dexter Shoe was acquired entirely with Berkshire stock—the first major acquisition paid in shares. Buffett would later call this a catastropic mistake.`),
  esc(`Look-through earnings: Berkshire's economic earnings include the retained earnings of investee companies. This amount was ~$60 million in 1993 and would grow substantially.`),
  esc(`Berkshire initiated a stock buyback program in 1993—its first. The terms: only when the stock is trading at a meaningful discount to intrinsic value.`),
  esc(`Insurance float reached $3.9 billion in 1993. The cost of float was negative (underwriting profit), meaning Berkshire was paid to hold other people's money.`),
  esc(`The "fat wallet" problem: with $11+ billion of capital, Berkshire cannot compound at 23% per year. Buffett does not promise high returns, but he does promise not to compromise on quality.`)
];

const sections = [
  {
    title: esc("GAAP vs. Economic Reality: The 1993 Accounting Lesson"),
    type: "background",
    content: esc(`The 1993 letter opens with a lengthy technical discussion of GAAP accounting—specifically, four non-operating items that affected 1993 net worth. Buffett explains each in plain English, then delivers the larger lesson: book value is an imperfect proxy for intrinsic value, and investors who fixate on GAAP numbers are making a mistake.

The four items:
1. A tax accrual rule change that reduced net worth by $51 million (a one-time, non-operating charge).
2. The corporate tax rate increase from 34% to 35%, which reduced the value of Berkshire's deferred tax liability (a one-time gain of $71 million).
3. Mark-to-market accounting for equities: Berkshire's GAAP net worth now reflects the market value of its equity portfolio, not cost basis. This added $1.39 billion to 1993 net worth.
4. The Dexter Shoe stock issuance: issuing shares to pay for an acquisition increases GAAP net worth but does not create economic value.

Buffett's larger point: these four items collectively added $1.39 billion to GAAP net worth, but they say nothing about Berkshire's underlying business performance. An investor looking only at the 14.3% book value growth number would draw the wrong conclusion.

This section of the letter is a masterclass in how to read financial statements. Buffett is not saying GAAP is useless—he is saying that investors must adjust GAAP numbers to reflect economic reality. The framework he lays out in 1993 would eventually be formalized in the 1996 Owner's Manual.`)
  },
  {
    title: esc("Dexter Shoe: The $433 Million Mistake (in Hindsight)"),
    type: "insight",
    content: esc(`The 1993 letter announces the acquisition of Dexter Shoe—a Maine-based shoemaker with $250 million in sales and $25 million in pre-tax earnings. The purchase price: $433 million, paid entirely in Berkshire Hathaway Class A shares (25,203 shares at ~$17,000/share).

In 1993, this looked like a good deal. Dexter had a strong brand, loyal customers, and consistent earnings. Buffett praised the management (Harold Alfond and Peter Lunder) as honest, talented, and shareholder-aligned. The acquisition fit Berkshire's model: wonderful business, fair price, able management.

But hindsight is 20/20. The shoe industry was about to be decimated by low-cost imports from China and other developing countries. Dexter's competitive advantage (U.S.-made shoes, premium materials, strong brand) evaporated as consumers shifted to cheaper imports. By the early 2000s, Dexter was losing money. Berkshire eventually shut it down.

The real cost: Buffett paid with Berkshire shares. Those 25,203 Class A shares (equivalent to ~25 million Class B shares today) would be worth ~$10+ billion at today's Berkshire stock price. In effect, Buffett exchanged ~$10 billion of Berkshire stock for a business that went to zero.

In the 2007 letter, Buffett called Dexter "my worst deal of the year"—and one of the worst of his career. The 1993 letter is the origin story of that mistake. The lesson: even Warren Buffett can be wrong about a business's long-term competitive position.`)
  },
  {
    title: esc("Look-Through Earnings: The Hidden Engine of Berkshire's Growth"),
    type: "principle",
    content: esc(`The 1993 letter contains an important discussion of "look-through" earnings—the share of earnings from investee companies that Berkshire does not consolidate but whose earnings nevertheless accrue to Berkshire shareholders.

The concept: when Berkshire owns 48% of Coca-Cola (as it did in 1993), Berkshire's GAAP income only includes the dividends received from Coca-Cola (~$30 million/year in 1993). But Coca-Cola retains the vast majority of its earnings to reinvest in the business. Those retained earnings, proportionally attributed to Berkshire's ownership stake, are "look-through" earnings—they belong to Berkshire economically, even if they don't show up on Berkshire's GAAP income statement.

In 1993, Berkshire's look-through earnings were approximately $60 million (from Coca-Cola, Gillette, Wells Fargo, and The Washington Post combined). By 1996, this number would grow to ~$200 million. By 2000, it would exceed $1 billion.

Buffett's point: Berkshire's true economic earnings are far higher than its GAAP earnings. Investors who only look at reported net income are missing a large and growing component of Berkshire's value creation.

This framework is essential for understanding Berkshire's valuation. The market eventually caught on—by the late 1990s, Berkshire's stock price reflected not just its GAAP earnings but also the look-through earnings from its portfolio companies. The 1993 letter is where Buffett first explains this framework in detail.`)
  },
  {
    title: esc("Insurance Float: $3.9 Billion of Investable Capital (at a Negative Cost)"),
    type: "insight",
    content: esc(`The 1993 letter reports that Berkshire's insurance float reached $3.9 billion—up from $2.7 billion five years earlier. More importantly, the cost of this float was negative: Berkshire's insurance subsidiaries generated an underwriting profit (premiums received exceeded claims paid), meaning Berkshire was effectively paid to hold other people's money.

This is the "float" miracle that Buffett has described repeatedly since the 1970s. Insurance customers pay Berkshire premiums upfront; Berkshire invests that money for years (sometimes decades) before paying out claims. If the underwriting is profitable (claims + expenses < premiums), the float has a negative cost—Berkshire makes money just by holding it.

In 1993, the GEICO acquisition (completed in 1996, but already in progress) was about to supercharge this dynamic. GEICO's float would eventually exceed $10 billion. By 2025, Berkshire's total float would exceed $160 billion.

The 1993 letter is a reminder that Berkshire is not just an operating business + equity portfolio—it is also a massive insurance conglomerate with a cost of capital that is the envy of the industry. The float is the "hidden" source of Berkshire's compounding.`)
  },
  {
    title: esc("The First Buyback: Berkshire's Capital Allocation Philosophy in Action"),
    type: "principle",
    content: esc(`The 1993 letter contains a quietly historic announcement: Berkshire repurchased its own shares during the year—its first meaningful buyback program. The terms were characteristically disciplined: Berkshire would only buy back shares when the market price was at a "meaningful discount" to intrinsic value.

Buffett explains the philosophy with his typical clarity: "What we find offensive at Berkshire—and Hallmark Cards—is when companies buy their own shares at prices they know are stupid." Translation: buybacks are only value-creating when the stock is undervalued. When management buys back stock at inflated prices, they are destroying shareholder value.

This philosophy would guide Berkshire's capital allocation for the next three decades. The company would become one of the largest and most disciplined buyers of its own stock—but only when the price was right. In 2020, Berkshire would buy back $24.7 billion of its own shares—the largest buyback in corporate history.

The 1993 letter is the origin of this discipline. Buffett does not say "we will buy back stock to support the share price" (the standard corporate excuse). He says: "we buy back stock when it is cheap, and we don't when it isn't." This is capital allocation 101, but most CEOs don't follow it.`)
  },
  {
    title: esc("The Fat Wallet Problem: Compounding $11 Billion is Hard"),
    type: "insight",
    content: esc(`The 1993 letter contains a candid discussion of what Buffett later called the "fat wallet" problem: with $11+ billion of net worth, Berkshire simply cannot compound at 23% per year (its 28-year CAGR through 1992).

The math is simple: a $1 million portfolio can double many times without moving the market. A $11 billion portfolio cannot. When Berkshire buys a stock, it moves the price. When it buys a business, it needs $500 million+ deals just to move the needle. The "wonderful business at a fair price" universe is finite, and Berkshire has already bought many of the best ones.

Buffett's response is characteristically honest: he does not promise 23% returns going forward, but he does promise that he will not compromise on quality just to deploy capital. "We would rather earn 10% on $10 billion than 20% on $100 million"—except he doesn't say this explicitly; he implies it through his actions.

The 1993 letter is a meditation on the discipline of scale. Most CEOs, faced with $11 billion of capital, would feel pressure to deploy it quickly (to show "growth"). Buffett feels no such pressure. He waits for the right opportunity, even if it takes years. The "fat wallet" problem is real—but Buffett's response to it is exactly what shareholders should want.`)
  }
];

const annotations = [
  {
    id: "1993-gaap-quote",
    quote: esc("The four items, which totaled $1.39 billion, had nothing to do with 1993 operations."),
    comment: esc(`This is Buffett at his most teacher-like. He is explaining that GAAP net worth can change dramatically for reasons that have nothing to do with business performance. The $1.39 billion increase in net worth came from accounting adjustments, not operating earnings. Investors who don't understand this will draw the wrong conclusions about Berkshire's performance.`)
  },
  {
    id: "1993-dexter-quote",
    quote: esc("Dexter is the leader in the domestic shoe industry..."),
    comment: esc(`In 1993, this was true. Dexter was the market leader in premium shoes, with strong brands and loyal customers. But the shoe industry was about to be disrupted by low-cost imports. Buffett has said that when an industry's competitive advantage depends on low labor costs, it will eventually migrate to low-wage countries. He missed this with Dexter—and paid dearly for it.`)
  },
  {
    id: "1993-lookthrough-quote",
    quote: esc("Our look-through earnings are far larger than our reported GAAP earnings."),
    comment: esc(`This is the key insight of the 1993 letter. Berkshire's GAAP earnings only include dividends from investee companies. But those companies retain the vast majority of their earnings to reinvest. Those retained earnings, proportionally attributed to Berkshire, are the true engine of Berkshire's long-term growth. This framework is essential for understanding Berkshire's valuation.`)
  }
];

// Build the file content
let content = `// ============================================================\n`;
content += `//  1993 Berkshire Letter — Interpretation\n`;
content += `// ============================================================\n\n`;
content += `export const interpretation1993 = {\n`;
content += `  overview: \`${overview}\`,\n\n`;
content += `  keyTakeaways: [\n`;
keyTakeaways.forEach((kt, i) => {
  content += `    \`${kt}\`${i < keyTakeaways.length - 1 ? ',' : ''}\n`;
});
content += `  ],\n\n`;

content += `  sections: [\n`;
sections.forEach((s, i) => {
  content += `    {\n`;
  content += `      title: "${s.title}",\n`;
  content += `      type: "${s.type}",\n`;
  content += `      content: \`${s.content}\`\n`;
  content += `    }${i < sections.length - 1 ? ',' : ''}\n`;
});
content += `  ],\n\n`;

content += `  relatedConcepts: [\n`;
['gaap-vs-economic-earnings', 'look-through-earnings', 'float', 'acquisition-criteria', 'capital-allocation', 'margin-of-safety', 'intrinsic-value-vs-book-value'].forEach((c, i) => {
  content += `    "${c}"${i < 6 ? ',' : ''}\n`;
});
content += `  ],\n\n`;

content += `  relatedCompanies: [\n`;
['berkshire-hathaway', 'dexter-shoe', 'geico', 'coca-cola', 'gillette', 'wells-fargo'].forEach((c, i) => {
  content += `    "${c}"${i < 5 ? ',' : ''}\n`;
});
content += `  ],\n\n`;

content += `  relatedPeople: ["warren-buffett", "charlie-munger", "harold-alfond"],\n\n`;

content += `  marketContext: {\n`;
content += `    description: "1993 was a transitional year for the U.S. economy and stock market. The S&P 500 returned about 10.1% (including dividends), recovering from the 1990-1991 recession but not yet in bubble territory. Interest rates were falling (the Fed Funds rate was about 3% at year-end), which was helping both the stock and bond markets. Inflation was low (~2.7%). The 'cult of equity' had not yet taken hold—most retail investors still had painful memories of the 1987 crash and the 1990-1991 recession. Berkshire's concentrated equity portfolio (Coca-Cola, Gillette, Wells Fargo, Washington Post) was performing well, but Buffett was already warning that future returns would be lower than the 1980s average. The Dexter Shoe acquisition was viewed positively at the time—shoe manufacturing was still a respectable U.S. industry, and Dexter's Maine-based operations seemed to have a sustainable competitive advantage. Hindsight reveals how quickly that advantage would vanish.",\n`;
content += `    sp500Return: "+10.1%",\n`;
content += `    fedFundsRate: "3.0% (year-end)",\n`;
content += `    inflation: "2.7%",\n`;
content += `    marketPhase: "recovery"\n`;
content += `  },\n\n`;

content += `  keyNumbers: [\n`;
content += `    { label: "Book Value Growth (1993)", value: "14.3", unit: "%", context: "Calendar year 1993" },\n`;
content += `    { label: "28-Year CAGR (1965-1993)", value: "23.3", unit: "%", context: "Book value per share" },\n`;
content += `    { label: "Net Worth (Year-End 1993)", value: "$6.2B", unit: "", context: "Up from $22M in 1965" },\n`;
content += `    { label: "Insurance Float (1993)", value: "$3.9B", unit: "", context: "Up from $2.7B five years earlier" },\n`;
content += `    { label: "Look-Through Earnings (1993)", value: "~$60M", unit: "", context: "From Coca-Cola, Gillette, Wells Fargo, Washington Post" },\n`;
content += `    { label: "Dexter Shoe Purchase Price", value: "$433M", unit: "", context: "Paid entirely in BRK Class A shares (25,203 shares)" }\n`;
content += `  ],\n\n`;

content += `  thenVsNow: {\n`;
content += `    then: "In 1993, Berkshire was a $6.2 billion net worth conglomerate with a collection of insurance businesses, See's Candies, the Buffalo News, and a concentrated equity portfolio. The Dexter Shoe acquisition was hailed as a coup. The annual meeting drew perhaps 1,000 people. Buffett was 63 years old and showing no signs of slowing down. The 'look-through earnings' concept was new and not yet widely understood. Berkshire's stock price was around $17,000 per Class A share. The 'fat wallet' problem was real but not yet urgent—Berkshire still had good options for deploying capital.",\n`;
content += `    now: "Today, Berkshire has a market cap exceeding $900 billion. The Dexter Shoe acquisition is remembered as one of Buffett's worst deals—those 25,203 Class A shares would be worth ~$10+ billion today. The 'look-through earnings' framework is now standard in how analysts value Berkshire. The annual meeting in Omaha draws 40,000+ shareholders. Berkshire's insurance float exceeds $160 billion. The 'fat wallet' problem is more acute than ever—Berkshire now needs $10+ billion deals just to move the needle, and such opportunities are rare. The 1993 letter's critique of GAAP accounting is as relevant today as it was then—most investors still fixate on the wrong numbers."\n`;
content += `  },\n\n`;

content += `  publishedDate: '2026-05-25',\n\n`;

content += `  annotations: [\n`;
annotations.forEach((a, i) => {
  content += `    {\n`;
  content += `      id: "${a.id}",\n`;
  content += `      quote: \`${a.quote}\`,\n`;
  content += `      comment: \`${a.comment}\`\n`;
  content += `    }${i < annotations.length - 1 ? ',' : ''}\n`;
});
content += `  ]\n`;
content += `}\n`;

fs.writeFileSync('interp_1993.ts', content, 'utf8');
console.log('interp_1993.ts generated successfully!');
console.log('File size:', content.length, 'bytes');
