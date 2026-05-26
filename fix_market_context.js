const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'interpretations.ts');
let content = fs.readFileSync(FILE, 'utf8');

// Pre-written descriptions for 1992-1996
const DESCS = {
  '1992-berkshire-letter':
    "1992 was the year Warren Buffett returned full-time to Berkshire after a ten-month detour as Interim Chairman of Salomon Brothers. The U.S. economy was in early recovery from the 1990-1991 recession. The S&P 500 returned approximately 7.6% for the year. Interest rates were declining (Fed funds rate fell from ~6% to ~3% by year-end). Inflation was moderate at ~3%. The stock market was not yet in bubble territory, but valuations were becoming stretched for popular growth stocks. The Salomon crisis—where the firm nearly collapsed due to a Treasury auction scandal—had ended, and Buffett had returned to Omaha. This was the year Buffett articulated the 'look-through earnings' framework in its mature form and made two strikingly accurate predictions: that the S&P 500's next-decade return would be far lower than the 1980s, and that Berkshire's growing capital base would inevitably slow its compounding rate.",
  
  '1993-berkshire-letter':
    "1993 was a year of strong economic recovery in the U.S. The S&P 500 returned 10.1%. Interest rates continued to decline (Fed funds rate ~3% by year-end, down from ~6% in 1992). Inflation remained moderate at 2.7%. The economy was in the early stages of what would become the longest expansion in U.S. history (1991-2001). Berkshire's book value increased 14.3%, but the letter was dominated by accounting arcana: Buffett spent the first several pages explaining four non-operating items that affected net worth (GAAP tax accrual rule changes, corporate tax rate increase, market-value accounting adoption, and stock issuance). The letter also contained Buffett's most sustained critique of GAAP accounting to date. Dexter Shoe was acquired (entirely in Berkshire stock)—a deal Buffett would later call his worst. The insurance industry was adapting to a lower interest rate environment, where the 'float' was less valuable than in the 1980s.",
  
  '1994-berkshire-letter':
    "1994 was a weak year for the stock market: the S&P 500 returned only 1.3%, its worst year of the 1990s. Interest rates were rising (Fed funds rate increased from ~3% to ~5.5% by year-end) as the Federal Reserve, under Alan Greenspan, began tightening monetary policy to pre-empt inflation. Inflation was 2.6%. The economy was slowing but not yet in recession. Berkshire's book value grew 13.9%, but Buffett used the letter to deliver his most explicit warning yet: 'The future performance of Berkshire won't come close to matching the performance of the past.' The 'fat wallet' problem was now explicit. The letter also contained the famous Ted Williams analogy and the $100 million minimum deployment threshold. Scott Fetzer was used as a case study to illustrate the gap between book value and intrinsic value. Insurance float economics were discussed in the context of a rising interest rate environment (which made float more valuable).",
  
  '1995-berkshire-letter':
    "1995 was one of the strongest years in stock market history: the S&P 500 returned 37.6%. Interest rates were stable to slightly rising (Fed funds ~5.5% by year-end). Inflation was 2.8%. The economy was in a 'Goldilocks' phase: strong growth, low inflation, rising productivity. Technology stocks were beginning their assent, though the dot-com bubble had not yet fully inflated. Berkshire's book value grew 43.1%, but Buffett famously refused to take credit: 'There's no reason to do handsprings over 1995's gains. This was a year in which any fool could make a bundle in the stock market. And we did.' The real news was operational: three major acquisitions (Helzberg's Diamonds, R.C. Willey, and the remaining 49% of GEICO) roughly doubled Berkshire's revenues. The 'double-barreled approach' (whole businesses + part-interests via stock market) was articulated for the first time. Headquarters staff grew from 11 to 12. 'No sense going crazy.'",
  
  '1996-berkshire-letter':
    "1996 was another strong year for the stock market: the S&P 500 returned 23.0%. Interest rates were stable (Fed funds ~5.3% by year-end). Inflation was 3.0%. The economy was in its sixth year of expansion, with unemployment falling and productivity rising. The dot-com bubble was beginning to inflate, though few recognized it at the time. Berkshire's book value grew 31.8%, though the per-share number was diluated by the Class B share issuance and the FlightSafety stock deal. The landmark event of 1996 was the publication of 'An Owner's Manual' (13 principles defining Berkshire's economic philosophy), published in June after the Class B share issuance. The letter also covered the GEICO 'step acquisition' accounting arcana (a $478.4 million writedown required by GAAP but economically meaningless), the FlightSafety acquisition ($1.5 billion), and Buffett's most famous line on time horizon: 'If you aren't comfortable owning a stock for 10 years, don't own it for 10 minutes.'"
};

// For each year, find marketContext: { and add description if missing
let modified = 0;
for (const [slug, desc] of Object.entries(DESCR)) {
  // Find the entry for this slug
  const slugMarker = `'${slug}':`;
  const slugIdx = content.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.log(`NOT FOUND: ${slug}`);
    continue;
  }
  
  // Find marketContext: { after this slug
  const afterSlug = content.indexOf('marketContext:', slugIdx);
  if (afterSlug === -1) {
    console.log(`marketContext NOT FOUND for ${slug}`);
    continue;
  }
  
  // Find the { after marketContext:
  const braceIdx = content.indexOf('{', afterSlug);
  if (braceIdx === -1) {
    console.log(`opening { NOT FOUND for ${slug} marketContext`);
    continue;
  }
  
  // Check if description already exists
  const nextFewHundred = content.slice(afterSlug, afterSlug + 500);
  if (nextFewHundred.includes('description:')) {
    console.log(`ALREADY HAS description: ${slug}`);
    continue;
  }
  
  // Insert description after the {
  const insertPos = braceIdx + 1;
  const toInsert = `\n      description: ${JSON.stringify(desc)},\n`;
  content = content.slice(0, insertPos) + toInsert + content.slice(insertPos);
  modified++;
  console.log(`✓ Added description to ${slug}`);
}

if (modified > 0) {
  const backupPath = FILE + '.backup_desc_' + Date.now();
  fs.copyFileSync(FILE, backupPath);
  console.log(`Backup: ${backupPath}`);
  fs.writeFileSync(FILE, content, 'utf8');
  console.log(`✓ Modified ${modified} entries in interpretations.ts`);
} else {
  console.log('No modifications needed.');
}
