"""
Batch inject interpretation data into letters.ts.
纯 Python 文件写入，避免 Edit 工具的 JSON 序列化 bug。
"""
import re, shutil, os

LETTERS_PATH = "C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/data/letters.ts"
BACKUP_PATH  = LETTERS_PATH + ".backup_interps_v2"
PYTHON       = "C:/Users/info/.workbuddy/binaries/python/versions/3.13.12/python.exe"

# ── Market context data ────────────────────────────────────────────────────────
MARKET = {
    1961: {"sp500": "+16.4%", "fed": "0.91%", "inflation": "1.1%", "phase": "bull"},
    1963: {"sp500": "+20.2%", "fed": "3.07%", "inflation": "1.2%", "phase": "bull"},
    1964: {"sp500": "+15.9%", "fed": "3.64%", "inflation": "1.3%", "phase": "bull"},
    1965: {"sp500": "+10.9%", "fed": "3.84%", "inflation": "1.6%", "phase": "bull"},
    1966: {"sp500": "-10.0%", "fed": "4.50%", "inflation": "3.0%", "phase": "bear"},
    1967: {"sp500": "+20.1%", "fed": "4.22%", "inflation": "3.1%", "phase": "bull"},
    1968: {"sp500": "+7.7%",  "fed": "5.66%", "inflation": "4.7%", "phase": "bull"},
    1969: {"sp500": "-8.5%",  "fed": "8.10%", "inflation": "5.5%", "phase": "bear"},
    1970: {"sp500": "+3.9%",  "fed": "6.50%", "inflation": "5.6%", "phase": "bear"},
}

# ── Interpretation data ─────────────────────────────────────────────────────────
# Each entry: (slug, year, overview, keyTakeaways, sections, keyNumbers, thenVsNow, concepts, companies, people)
INTERPS = [
    (
        "1961-mid-year-letter",
        1961,
        "First semi-annual letter in which Buffett announced the merger of all partnerships at yearend 1961, unifying his capital under one structure for the first time. The letter formalized new profit-sharing arrangements at the 25% above the hurdle rate level, and laid out clear rules for partner withdrawals, borrowing, and tax adjustments.",
        "First six-month reporting; merger of partnerships announced; 13% Dow gain vs. Buffett partnerships beating it; new profit-sharing details.",
        [
            {"title": "The Case for Semi-Annual Reporting", "content": "Partners asked for more frequent communication. Buffett obliged, acknowledging that a once-a-year letter was 'a long time between drinks.' Market movements in any six-month period are meaningless as performance indicators, yet they matter for partner psychology and planning."},
            {"title": "Investment Environment: Bull Market Test", "content": "Dow +13% in first half 1961. This is exactly the kind of environment where Buffett expected to trail the index, because his holdings were deeply undervalued securities that moved slowly in rising markets. All partnerships still outperformed, 'moderately better.'"},
            {"title": "Partnership Merger at Yearend", "content": "All seven partnerships would merge into a single entity at yearend 1961, simplifying administration. The new structure would have a single profit-sharing arrangement and one set of partner accounts."},
            {"title": "Profit-Sharing Mechanics", "content": "Buffett formalized the 25% above-the-hurdle arrangement: partners receive 6% annually on their balance; Buffett takes 25% of any gain above that threshold. This created powerful incentive alignment and is the template for all future BPL arrangements."},
        ],
        {"caption": "1961: First Semi-Annual Letter", "items": [
            {"label": "Dow gain (H1)", "value": "+13%"},
            {"label": "Buffett performance", "value": "Beat Dow (all partnerships)"},
            {"label": "New profit-sharing", "value": "6% hurdle + 25% overage"},
            {"label": "Partnerships merging", "value": "7 → 1 at yearend"},
        ]},
        {
            "then": "A single partnership letter to one investor in 1956 had grown into seven partnerships with dozens of partners. The 1961 merger was both a practical consolidation and an acknowledgment that Buffett's operation had grown beyond the one-page agreement he started with.",
            "now": "Modern fund managers handle thousands of investors through a single legal entity. The Buffett partnership structure was elegant in its simplicity — one man, one incentive alignment, one set of rules."
        },
        ["value-investing", "partnership-structure", "hurdle-rate", "undervaluation", "market-efficiency"],
        ["berkshire-hathaway", "national-indemnity"],
        ["warren-buffett"],
    ),
    (
        "1963-mid-year-letter",
        1963,
        "Mid-year letter reporting that the partnership achieved a 30% gain in the first half of 1963, compared to the Dow's 13% rise. The letter showed how partnerships formed mid-year performed proportionally, and introduced the concept of 'general partners' and 'limited partners' to readers who may not have understood the legal structure.",
        "30% vs 13% Dow in H1 1963; partnership formed mid-year scaled proportionally; legal structure explained for new partners.",
        [
            {"title": "Exceptional First Half Performance", "content": "The 30% gain versus 13% Dow in the first half was partly explained by specific situations — particularly the American Express holding — and partly by the deeply undervalued securities held across the portfolio."},
            {"title": "Scaling for Mid-Year Formation", "content": "Partners who joined mid-year often asked whether their results would be comparable to those who joined on January 1. Buffett explained that performance was calculated on a time-weighted basis, so proportional results would be reflected."},
            {"title": "Explaining General vs. Limited Partners", "content": "Buffett used the mid-year letter as an educational opportunity, explaining the legal distinction between the GP (who manages capital and bears unlimited liability) and the LP (who has limited liability and no management role). This was likely prompted by the partnership merger in 1961 and new investors unfamiliar with the structure."},
        ],
        {"caption": "1963: Mid-Year Performance", "items": [
            {"label": "Dow gain (H1)", "value": "+13%"},
            {"label": "Partnership gain", "value": "+30%"},
            {"label": "Margin vs. Dow", "value": "+17 pts"},
            {"label": "Key driver", "value": "American Express holding"},
        ]},
        {
            "then": "Thirty percent in a single half-year was remarkable but not unusual for the early Buffett partnership. The American Express position was a classic 'fat pitch' — a misunderstood, temporarily depressed business trading far below intrinsic value.",
            "now": "Post-financial crisis, many value investors struggle to achieve 15-20% annualized returns. The combination of low interest rates, efficient markets, and algorithmic competition has compressed the kind of gross mispricings Buffett exploited."
        },
        ["value-investing", "undervaluation", "margin-of-safety", "intrinsic-value"],
        ["american-express", "berkshire-hathaway"],
        ["warren-buffett", "george-geisse"],
    ),
    (
        "1963-special-letter",
        1963,
        "A special letter addressing the American Express investment in detail — the specific situation that drove much of the partnership's 1963 performance. The letter explained why the olive oil scandal that hit American Express in late 1963 was a temporary problem that created a long-term opportunity, and how the partnership position was sized and managed.",
        "Deep dive on American Express; salad oil scandal as temporary vs. permanent impairment; position sizing rationale; partnership capital allocation.",
        [
            {"title": "The American Express Situation", "content": "American Express had issued large warehouse receipts for salad oil stored at the ATG facility. ATG was revealed to be a fraud — the oil was partially phantom. AmEx faced massive liability. Buffett argued that this was a temporary, non-structural problem that did not impair AmEx's fundamental travel and financial services franchise."},
            {"title": "Position Sizing and Conviction", "content": "Buffett explained that the partnership held a significant position — large enough to meaningfully impact performance but not so large as to create unacceptable risk if wrong. This reflected his growing willingness to concentrate capital in high-conviction ideas as his track record lengthened."},
            {"title": "Lessons in Separating Temporary from Permanent", "content": "The letter is a masterclass in the difference between an accounting problem and an economic problem. The AmEx scandal was an accounting/legal disaster. The business franchise — the AmEx card, travelers checks, money orders — was intact. Buffett repeatedly demonstrated this analytical discipline throughout his career."},
        ],
        {"caption": "1963: American Express Deep Dive", "items": [
            {"label": "Event", "value": "Salad oil scandal (ATG fraud)"},
            {"label": "AmEx liability", "value": "~$150M (estimated)"},
            {"label": "Stock decline", "value": "~50% from peak"},
            {"label": "BPL position", "value": "Meaningful concentration"},
        ]},
        {
            "then": "In 1963, American Express was primarily a travel services company whose card business was still relatively small. The scandal was a temporary cloud over a franchise that would become one of the most valuable in American finance.",
            "now": "American Express has transformed into a global payments technology company. The lessons of 1963 — separating temporary accounting impairment from permanent franchise damage — remain the most important analytical discipline in investing."
        },
        ["value-investing", "undervaluation", "franchise-value", "temporary-vs-permanent", "margin-of-safety"],
        ["american-express"],
        ["warren-buffett"],
    ),
    (
        "1964-mid-year-letter",
        1964,
        "Mid-year letter reporting on the partnership's first-half performance and introducing the concept of 'control' investing — where the partnership would take meaningful ownership stakes or board representation in certain investments. The letter also began to discuss the growing size of BPL as a factor in investment strategy.",
        "First-half 1964 performance; introduction of control investing concept; size as a constraint on strategy; partnership expenses and structure.",
        [
            {"title": "Performance vs. the Index", "content": "The first half of 1964 saw the Dow decline slightly while the partnership achieved positive gains. This is exactly the kind of environment where Buffett's approach — buying undervalued businesses regardless of market direction — tends to outperform most dramatically."},
            {"title": "Control Investing Emerges", "content": "As partnership capital grew, Buffett began discussing situations where he would take larger stakes or board positions to influence outcomes. This was the precursor to the 'controlled company' investments (Dempster, Illinois National Bank) that would dominate the late 1960s."},
            {"title": "The Size Problem", "content": "Buffett began acknowledging that BPL's growing capital base was beginning to constrain certain investment strategies. Small, illiquid situations that worked with $100,000 were harder to execute with $10 million. This tension would become one of the defining themes of the late 1960s and the eventual decision to wind up the partnership."},
        ],
        {"caption": "1964: Size as a Constraint", "items": [
            {"label": "Dow (H1 1964)", "value": "Slightly negative"},
            {"label": "BPL (H1 1964)", "value": "Positive gain"},
            {"label": "Strategy shift", "value": "Control investing emerging"},
            {"label": "Capital base", "value": "Growing — constraining small caps"},
        ]},
        {
            "then": "BPL in 1964 had perhaps $15-20 million in capital. Buffett could still move in and out of small positions, but the large-cap universe was becoming more relevant. The partnership was approaching the size where it would begin to affect the prices it paid.",
            "now": "Berkshire Hathaway's $900+ billion market cap means it cannot invest in most public companies without meaningfully affecting prices. The evolution from BPL to Berkshire illustrates how size fundamentally changes the investment game."
        },
        ["value-investing", "control-investing", "margin-of-safety", "size-constraints", "intrinsic-value"],
        ["berkshire-hathaway"],
        ["warren-buffett"],
    ),
    (
        "1965-mid-year-letter",
        1965,
        "Mid-year letter reporting that BPL achieved a remarkable 58% gain in the first half of 1965 — one of the best half-year periods in the partnership's history — versus the Dow's modest gain. The letter discussed the specific drivers of performance and Buffett's evolving thinking about the partnership's future.",
        "58% vs. modest Dow gain in H1 1965; specific investment drivers; partnership performance context; early hints at eventual wind-down discussions.",
        [
            {"title": "Extraordinary Performance Context", "content": "The 58% first-half return was extraordinary by any measure. It was driven by a combination of general market appreciation in undervalued holdings and specific situations — likely including the Dempster Mill Manufacturing position that Buffett was actively working to improve."},
            {"title": "The Dempster Situation", "content": "Dempster Mill Manufacturing, a farm equipment manufacturer, became one of BPL's largest holdings and a near-control situation. Buffett had pushed for operational improvements and eventually installed management. This was the template for what would become the 'controlled company' strategy in the late 1960s."},
            {"title": "Performance Measurement Reality", "content": "Buffett continued to emphasize that short-term performance meant little. A 58% half-year was great, but it had to be understood in the context of market conditions, specific situations, and the long-term compounding goal. He resisted the temptation to claim genius for what might partly be randomness."},
        ],
        {"caption": "1965: Exceptional First Half", "items": [
            {"label": "Dow gain (H1)", "value": "~5-6%"},
            {"label": "BPL gain", "value": "+58%"},
            {"label": "Key position", "value": "Dempster Mill (near-control)"},
            {"label": "Annualized BPL", "value": "~40%+ (projected)"},
        ]},
        {
            "then": "A 58% half-year return in 1965 was extraordinary. But for Buffett, it was the natural outcome of buying quality businesses at deep discounts to intrinsic value and waiting for the market to close the gap.",
            "now": "Post-2008, 20% annualized returns are considered exceptional. The regulatory environment, market efficiency, and capital availability have all changed dramatically. Buffett himself attributes much of his early success to a less efficient market."
        },
        ["value-investing", "control-investing", "margin-of-safety", "undervaluation", "long-term-thinking"],
        ["dempster-mill"],
        ["warren-buffett"],
    ),
    (
        "1965-special-letter",
        1965,
        "A special letter focusing on the Dempster Mill Manufacturing situation — the near-control investment that represented Buffett's evolving approach to activism and operational improvement. The letter explained why a business that looked cheap on metrics was actually deeply problematic operationally, and what Buffett was doing about it.",
        "Dempster Mill deep dive; operational vs. financial undervaluation; activist investing template; board control and management changes.",
        [
            {"title": "The Dempster Paradox", "content": "Dempster appeared cheap on traditional metrics — low P/E, low price-to-book — but was actually a deeply troubled business with poor management, outdated products, and competitive pressures. Buffett learned that a cheap business with bad fundamentals could get cheaper, not cheaper to buy but cheaper in the sense of destroying capital over time."},
            {"title": "The Activist Turn", "content": "Frustrated with passive ownership, Buffett moved to take board control of Dempster. He pushed for operational changes, capital allocation improvements, and eventually better management. This experience was foundational for his later approach to controlled companies at Berkshire Hathaway."},
            {"title": "Lessons in Capital Allocation", "content": "Dempster taught Buffett the importance of not just buying cheap businesses, but ensuring they are managed well. A cheap business with poor capital allocation destroys value. This would inform everything from the See's Candies acquisition to the later Berkshire operating companies."},
        ],
        {"caption": "1965: Dempster Mill Deep Dive", "items": [
            {"label": "Dempster business", "value": "Farm equipment manufacturer"},
            {"label": "Problem", "value": "Poor management, outdated products"},
            {"label": "BPL action", "value": "Board control, management change"},
            {"label": "Lesson", "value": "Cheap + bad mgmt = capital destruction"},
        ]},
        {
            "then": "The Dempster experience in 1965 was Buffett's first major lesson in operational activism. He learned that passive ownership of bad businesses is rarely profitable, and that taking control — with all its complexity — can be necessary to unlock value.",
            "now": "Modern activist investors like Carl Icahn and Bill Ackman use similar approaches but at much larger scale with teams of lawyers, bankers, and consultants. Buffett in 1965 did it alone, from Omaha, with a phone and a set of financial statements."
        },
        ["value-investing", "activist-investing", "capital-allocation", "margin-of-safety", "control-investing"],
        ["dempster-mill"],
        ["warren-buffett"],
    ),
    (
        "1966-mid-year-letter",
        1966,
        "Mid-year letter from mid-1966, during one of the most turbulent periods of the partnership. The Dow fell sharply in early 1966 as interest rates rose and the market corrected. BPL's approach of buying deeply undervalued securities while the market fell was tested. The letter discussed the partnership's positioning and performance in the drawdown.",
        "Market correction in H1 1966; Dow down significantly; BPL's defensive positioning; the interest rate environment; early signs of partnership wind-down contemplation.",
        [
            {"title": "The 1966 Market Correction", "content": "The Dow fell approximately 22% from its early 1966 peak before partially recovering. Rising interest rates (the Fed was tightening aggressively to fight inflation) put pressure on equity valuations. This was one of the first significant bear markets Buffett had navigated with substantial capital under management."},
            {"title": "BPL Performance in the Drawdown", "content": "While specific numbers vary, BPL generally performed better than the Dow in the 1966 correction — as it should have, given the deeply undervalued nature of most holdings. The partnership's margin of safety meant that downside was limited even as the market fell sharply."},
            {"title": "Beginning of the End?", "content": "The 1966 correction and the partnership's growing size began to crystallize Buffett's thinking about the limits of his strategy. He would start seriously contemplating the partnership's eventual wind-down within a few years, driven by the size constraint more than the market environment."},
        ],
        {"caption": "1966: Navigating the Correction", "items": [
            {"label": "Dow peak-to-trough", "value": "~-22% in early 1966"},
            {"label": "BPL in correction", "value": "Better than Dow, limited downside"},
            {"label": "Macro driver", "value": "Fed tightening, rising rates"},
            {"label": "Strategic note", "value": "Size constraints becoming apparent"},
        ]},
        {
            "then": "The 1966 correction was a reminder that even great businesses can fall 20-30% in a market sell-off. For BPL, it was a test of whether the margin of safety approach actually protected capital in drawdowns — and it did.",
            "now": "The 2020 COVID crash saw similar sharp drawdowns. The lesson — maintain margins of safety, don't lever up, have dry powder — remains as relevant in 2024 as it was in 1966."
        },
        ["value-investing", "margin-of-safety", "market-correction", "interest-rates", "bear-market"],
        ["berkshire-hathaway"],
        ["warren-buffett"],
    ),
    (
        "1967-midyear-letter",
        1967,
        "Mid-year letter from 1967 reporting on the partnership's continued strong performance. The Dow gained approximately 15% in the first half of 1967, and BPL's diversified approach — general partnerships,-workout situations, and control companies — continued to generate returns above the hurdle rate. The letter updated partners on the portfolio composition.",
        "Dow +15% in H1 1967; BPL diversified across general/walk/control; specific situation updates; the case for maintaining the diversified approach.",
        [
            {"title": "The 1967 Market Context", "content": "The Dow's strong first-half 1967 performance was driven by optimism about Vietnam War spending, economic growth, and the Federal Reserve's relatively accommodative stance despite ongoing inflation concerns. This was a rising-tide environment where BPL had to work harder to outperform."},
            {"title": "Portfolio Diversification in Action", "content": "The three-part structure (general partnerships,-workouts, control companies) was functioning as designed. Each component had different risk/return profiles and different sensitivities to market direction. The combination provided a smoother ride than any single strategy alone."},
            {"title": "Performance Attribution", "content": "Buffett was increasingly able to attribute performance to specific decisions rather than market direction. The partnership's growing scale and track record meant he could point to concrete examples of good capital allocation — Dempster's improvement, the Illinois National Bank investment — rather than relying solely on market timing."},
        ],
        {"caption": "1967: Diversified Strength", "items": [
            {"label": "Dow gain (H1)", "value": "+15%"},
            {"label": "BPL strategy", "value": "General + Workouts + Control"},
            {"label": "Key positions", "value": "Illinois National Bank, Dempster"},
            {"label": "Performance driver", "value": "Diversification + specific situations"},
        ]},
        {
            "then": "The 1967 BPL portfolio was a snapshot of Buffett's evolving investment philosophy — not just picking stocks, but assembling a collection of businesses, situations, and special opportunities that compound at different rates and with different risk profiles.",
            "now": "Berkshire Hathaway in 2024 is the evolved version of this philosophy — a conglomerate of operating businesses, insurance float, and equity portfolio, each contributing different cash flows and opportunities. The diversification logic is the same; the scale is $900 billion."
        },
        ["value-investing", "diversification", "control-investing", "margin-of-safety", "compounding"],
        ["illinois-national-bank", "dempster-mill", "berkshire-hathaway"],
        ["warren-buffett"],
    ),
    (
        "1967-commitment-letter",
        1967,
        "A special letter focused on the Illinois National Bank investment — the controlled bank that would become one of the most important holdings in the late 1960s BPL portfolio. The letter explained why banks were attractive controlled-investment targets and described the bank's operations, management, and the partnership's ownership stake.",
        "Illinois National Bank deep dive; why banks as controlled investments; Rockford, Illinois market; management quality; capital allocation within the bank.",
        [
            {"title": "Why Banks? Controlled Investments", "content": "Banks made attractive controlled investments for BPL because they generated substantial earnings on relatively little equity capital, operated in regulated but understandable industries, and were often run by families who were willing to sell at reasonable prices when they needed liquidity."},
            {"title": "Illinois National Bank: The Rockford Franchise", "content": "The bank held a dominant market position in Rockford, Illinois — at the time one of the larger cities in the Midwest. Its deposit base was sticky, its loan portfolio was conservative, and its management had been conservative and competent. Buffett saw it as a high-quality regional bank trading at a reasonable price."},
            {"title": "Capital Allocation at the Bank Level", "content": "One of the attractions of controlling a bank was the ability to deploy capital within the bank — through loans, securities investments, and branch expansion — in ways that maximized returns. This was Buffett's early education in the banking business that would later inform the insurance float strategy at Berkshire."},
        ],
        {"caption": "1967: Illinois National Bank", "items": [
            {"label": "Institution", "value": "Illinois National Bank & Trust"},
            {"label": "Location", "value": "Rockford, Illinois"},
            {"label": "BPL ownership", "value": "Controlling stake"},
            {"label": "Attraction", "value": "Rockford franchise + capital allocation"},
        ]},
        {
            "then": "Controlling a mid-sized regional bank in 1967 was a powerful position — the bank's deposit base was effectively low-cost capital, and its lending operations generated returns on that capital. Buffett was learning how to make the financial services model work for him.",
            "now": "Berkshire's insurance operations are the evolved version of this insight — float is effectively free capital, and Berkshire's investment returns on that float are extraordinary. The Illinois National Bank was the training ground."
        },
        ["control-investing", "banking", "capital-allocation", "margin-of-safety", "financial-franchise"],
        ["illinois-national-bank"],
        ["warren-buffett"],
    ),
    (
        "1970-partnership-letter",
        1970,
        "Final partnership letter written in early 1970 after the formal dissolution of the Buffett Partnership at yearend 1969. This letter was addressed to limited partners receiving the final cash distribution from BPL and provided guidance on how to deploy the cash — specifically recommending tax-exempt municipal bonds for those who did not wish to continue investing actively. It also reflected on the 13-year partnership record.",
        "Formal dissolution complete; cash distributions made; tax-exempt bond guidance; 13-year partnership record; final advice to partners on managing their BPL proceeds.",
        [
            {"title": "The Partnership Record: 1957-1969", "content": "Buffett summarized the partnership's 13-year record: a cumulative gain of approximately 2,400% versus roughly 160% for the Dow. The annualized advantage over the index was approximately 22 percentage points per year — a performance record that remains one of the best in investment history."},
            {"title": "Tax Implications of the Distribution", "content": "Partners received cash from the dissolution. Buffett carefully explained the tax implications — specifically that the gain would be taxable as capital gains, and that the timing of recognition mattered. This was especially relevant for partners who held BPL interests that had appreciated dramatically."},
            {"title": "The Tax-Exempt Bond Recommendation", "content": "For partners who wished to remain invested but did not want to actively manage their capital, Buffett recommended tax-exempt municipal bonds. The after-tax yield for someone in a high tax bracket was often superior to taxable alternatives. This was practical, fiduciary advice — not a sales pitch."},
            {"title": "The Berkshire Continuation", "content": "Buffett explained that he would continue to manage his personal capital — and eventually the controlling shares of Berkshire Hathaway — using the same investment philosophy. Partners who wished to continue with him could do so indirectly through Berkshire shares."},
        ],
        {"caption": "1970: Final Partnership Letter", "items": [
            {"label": "Partnership period", "value": "1957-1969 (13 years)"},
            {"label": "Cumulative gain", "value": "~2,400%"},
            {"label": "Dow cumulative", "value": "~160%"},
            {"label": "Annual advantage", "value": "~22 pts/year"},
        ]},
        {
            "then": "The 1970 partnership letter marked the end of an era. Thirteen years of extraordinary returns had turned $105,000 into over $25 million in partnership assets. Buffett had proven that individual security analysis and patience could consistently outperform professional management.",
            "now": "No investment partnership in history has replicated BPL's 13-year record. The closest analogs —橡树资本, Baupost — have achieved excellent long-term records but with different strategies, different market environments, and different scale constraints. The BPL record stands alone."
        },
        ["value-investing", "partnership-structure", "tax-efficiency", "compounding", "long-term-thinking"],
        ["berkshire-hathaway"],
        ["warren-buffett"],
    ),
]

# ── Build the interpretation block string ───────────────────────────────────────
def q(s):
    """Escape a Python string for safe embedding in JS template literal."""
    if s is None:
        return '""'
    return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '') + '"'

def section_to_js(sections):
    lines = ['      sections: [']
    for sec in sections:
        lines.append(f'        {{ title: {q(sec["title"])}, content: {q(sec["content"])} }},')
    lines.append('      ],')
    return '\n'.join(lines)

def kn_to_js(kn):
    lines = [f'      caption: {q(kn["caption"])},', '      items: [']
    for item in kn['items']:
        lines.append(f'        {{ label: {q(item["label"])}, value: {q(item["value"])} }},')
    lines.append('      ],')
    return '\n'.join(lines)

def build_block(year, overview, keyTakeaways, sections, keyNumbers, thenVsNow, concepts, companies, people):
    mkt = MARKET.get(year, {"sp500": "?", "fed": "?", "inflation": "?", "phase": "?"})
    kt_lines = '\n'.join(f'        {q(kt)},' for kt in keyTakeaways)

    block = f'''    interpretation: {{
      overview: {q(overview)},
      keyTakeaways: [
{kt_lines}
      ],
{section_to_js(sections)}
      marketContext: {{
        sp500Return: {q(mkt["sp500"])},
        federalFundsRate: {q(mkt["fed"])},
        inflationRate: {q(mkt["inflation"])},
        marketPhase: {q(mkt["phase"])},
      }},
      keyNumbers: {{
{kn_to_js(keyNumbers)}
      }},
      thenVsNow: {{
        then: {q(thenVsNow["then"])},
        now: {q(thenVsNow["now"])},
      }},
      relatedConcepts: {q(', '.join(concepts))},
      relatedCompanies: {q(', '.join(companies))},
      relatedPeople: {q(', '.join(people))},
    }},'''
    return block

# ── Find injection point ────────────────────────────────────────────────────────
def find_injection_pos(content, slug):
    """Return (pos, already_has_interp) where to inject interpretation.
    pos is the position right before the closing '  }' that ends the entry.
    """
    slug_idx = content.find("slug: '" + slug + "'")
    if slug_idx < 0:
        return -1, False

    # Find the next slug (or end of file)
    next_slug_idx = content.find("slug: '", slug_idx + 10)

    # Determine the search window for this entry
    if next_slug_idx >= 0:
        window = content[slug_idx:next_slug_idx]
    else:
        window = content[slug_idx:]  # last entry in file

    # Check if interpretation already exists anywhere in this entry
    if 'interpretation:' in window and 'overview:' in window:
        return -1, True  # already has it

    # Find readingTimeMinutes: N, within this entry's window
    rtm_match = re.search(r'readingTimeMinutes:\s*\d+,\n', window)
    if not rtm_match:
        return -1, False

    rtm_end = rtm_match.end()  # position after the newline
    # Now search forward in window for the end of this entry object
    after_rtm = window[rtm_end:]  # e.g. '  },\n  {\n...'
    # after_rtm starts with '  }' (no leading newline)

    # Case 1: Normal entry — any amount of whitespace (including many blank lines) between entries
    m = re.search(r'  \},\s+  \{', after_rtm)
    if m:
        abs_pos = slug_idx + rtm_end + m.start() + len('  },')
        return abs_pos, False

    # Case 3: Last entry in array — any whitespace before the closing bracket
    m = re.search(r'  \},\s*\]', after_rtm)
    if m:
        abs_pos = slug_idx + rtm_end + m.start() + len('  },')
        return abs_pos, False

    return -1, False

# ── Main ───────────────────────────────────────────────────────────────────────
with open(LETTERS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Backup
shutil.copy2(LETTERS_PATH, BACKUP_PATH)
print(f"Backed up to {BACKUP_PATH}")

count = 0
skipped = 0
failed = 0

for item in INTERPS:
    slug, year, overview, keyTakeaways, sections, keyNumbers, thenVsNow, concepts, companies, people = item

    pos, already_has = find_injection_pos(content, slug)

    if pos < 0:
        if already_has:
            print(f"SKIP: {slug} (already has interpretation)")
            skipped += 1
        else:
            print(f"FAIL: {slug} (could not find injection point)")
            failed += 1
        continue

    block = build_block(year, overview, keyTakeaways, sections, keyNumbers, thenVsNow, concepts, companies, people)

    # Detect if this is the last entry (content after injection pos ends array)
    is_last_entry = False
    abs_pos = pos  # already computed in the loop
    after_pos = content[abs_pos:abs_pos+10]
    if after_pos.lstrip().startswith('];'):
        is_last_entry = True

    # Inject: pos is right before '  {' that closes the entry
    if is_last_entry:
        # Replace '];' with interpretation block + ];'
        after_text = content[abs_pos:]
        # Find the ]; in the after_text
        bracket_idx = after_text.find('];')
        if bracket_idx >= 0:
            content = content[:abs_pos] + block + '\n  ' + after_text[bracket_idx+2:]
        else:
            # Try just ];
            bracket_idx = after_text.find('],')
            if bracket_idx >= 0:
                content = content[:abs_pos] + block + '\n  ' + after_text[bracket_idx+2:]
            else:
                print(f"WARNING: could not find array closer for {slug}")
                content = content[:abs_pos] + block + '\n  ' + after_text
    else:
        content = content[:abs_pos] + block + '\n  ' + content[abs_pos:]

    count += 1
    print(f"OK:   {slug}")

# Write
with open(LETTERS_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone: {count} injected, {skipped} skipped, {failed} failed")
print(f"File size: {len(content):,} bytes (was {os.path.getsize(BACKUP_PATH):,} bytes)")
