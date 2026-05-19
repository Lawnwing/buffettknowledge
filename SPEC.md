# BuffettKnowledge.com — Product Specification

**Version:** 1.0.0
**Last Updated:** 2026-05-15
**Domain:** buffettknowledge.com
**Status:** Pre-launch MVP

---

## 1. Concept & Vision

**What it is:**
A comprehensive, English-language knowledge base of Warren Buffett's shareholder letters (1956–2025), structured as an interconnected graph of ideas, companies, and people — built for serious value investors who want to go beyond quotes and into the original texts with full traceability.

**What it is NOT:**
A Buffett quotes aggregator. A news site. A brokerage review page. A blog.

**Core Value Proposition:**
> *"70 years of investment wisdom. 90+ letters. 3,939+ cross-references. All searchable, explorable, and traceable to the original text."*

**Target User:**
- Value investors (individual, institutional)
- Finance students and MBA candidates
- CFA charterholders
- Independent researchers
- Financial journalists and authors

**English-language advantage over learnbuffett.com (Chinese):**
- Captures the global English-speaking audience (US, UK, Canada, Australia, India)
- Original text in English — no translation quality variance
- Higher CPC/CPM for AdSense in English-speaking markets
- Better brandability for international audience

---

## 2. Design Language

### 2.1 Aesthetic Direction

**Reference:** The Economist meets Notion — authoritative, editorial, structured, and quietly confident. Not flashy. Not startup-y. The design should feel like a well-curated library, not a SaaS dashboard.

### 2.2 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Deep Navy | `#0F2444` | Headers, primary text, key UI elements |
| Secondary | Warm Gold | `#C8922A` | Accents, highlights, Buffett brand nod |
| Background | Off-White | `#FAFAF8` | Page background |
| Surface | White | `#FFFFFF` | Cards, content areas |
| Border | Light Gray | `#E5E5E0` | Dividers, card borders |
| Text Primary | Near Black | `#1A1A1A` | Body text |
| Text Secondary | Medium Gray | `#6B7280` | Meta info, captions |
| Tag Background | Soft Blue | `#EEF2FF` | Concept tags |
| Tag Text | Indigo | `#4338CA` | Tag labels |

### 2.3 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Site Title | Playfair Display | 700 | 28px |
| H1 (Letter Title) | Playfair Display | 700 | 32px |
| H2 | Playfair Display | 600 | 24px |
| H3 | Inter | 600 | 18px |
| Body | Inter | 400 | 16px |
| Meta / Caption | Inter | 400 | 13px |
| Code / Technical | JetBrains Mono | 400 | 14px |

### 2.4 Spacing & Layout

- **Max content width:** 1200px
- **Reading column:** 720px max (for letter text)
- **Base spacing unit:** 8px
- **Card padding:** 24px
- **Section spacing:** 64px
- **Mobile breakpoint:** 768px

### 2.5 Motion Philosophy

- **Minimal, purposeful motion only.** No decorative animations.
- Page transitions: Instant (SSG)
- Hover states: 150ms ease color/shadow transitions only
- Link underlines: Slide-in on hover (150ms)
- No scroll-triggered animations, no parallax, no loading spinners

### 2.6 Visual Assets

- **Icons:** Lucide React (consistent, clean, MIT licensed)
- **No images** except: favicon (B logo in gold/navy), Open Graph preview image
- **Decorative elements:** Subtle horizontal rules, dot separators, bracket notation for cross-references
- **Favicon:** "BK" monogram in Warm Gold on Deep Navy

---

## 3. Layout & Structure

### 3.1 Site Architecture

```
buffettknowledge.com
├── / (Home)
├── /letters
│   ├── / (All Letters — searchable/filterable list)
│   ├── /[slug] (Individual letter — full text + metadata)
│   ├── /partnership (Partnership Letters 1956-1969)
│   └── /berkshire (Berkshire Letters 1965-2025)
├── /concepts
│   ├── / (All Concepts — grid view)
│   └── /[slug] (Concept detail — definition + cross-refs)
├── /companies
│   ├── / (All Companies — grid view)
│   └── /[slug] (Company profile — Buffett mentions + timeline)
├── /people
│   ├── / (All People — grid view)
│   └── /[slug] (Person profile — relationships + quotes)
├── /about
├── /sitemap.xml
└── /robots.txt
```

### 3.2 Global Navigation

```
[BK Logo]  Letters  Concepts  Companies  People  [Search 🔍]
```

- Sticky top nav, white background with subtle bottom border
- Search: Opens a full-page overlay (Cmd+K on Mac, Ctrl+K on Windows)
- Mobile: Hamburger menu with slide-out drawer

### 3.3 Page Anatomy — Home

**Hero Section:**
- Headline: "Warren Buffett's Complete Investment Archive, 1956–2025"
- Subline: 90 letters · 3,939+ cross-references · 49 concepts · 61 companies
- CTA: "Browse All Letters →" and "Explore by Concept →"

**Stats Bar:**
- 4 stats: Total Letters / Partnership Letters / Berkshire Letters / Years Covered

**Featured Letters (3 cards):**
- 1977 Letter (first with "moat" concept)
- 1987 Letter (market crash reflection)
- 2025 Letter (Farewell Letter)

**Explore by Dimension (3 columns):**
- Concepts: "From Intrinsic Value to Capital Allocation — explore 49 investment concepts"
- Companies: "From See's Candies to Apple — 61 companies in Buffett's portfolio"
- People: "From Graham to Munger to Abel — the people who shaped Buffett's thinking"

**Newsletter CTA:**
- "Get key insights from Buffett's letters, delivered monthly"
- Email input + Subscribe button

### 3.4 Page Anatomy — Letter Detail

**Header:**
- Year + Letter Title ("1965 — To the Shareholders of Berkshire Hathaway")
- Letter type badge (Partnership / Berkshire / Special)
- Date published
- Key statistics: X concepts mentioned, Y companies mentioned, Z cross-references

**Body:**
- Full letter text, formatted with paragraph spacing
- Inline concept/company/person links (highlighted in gold, underline on hover)
- Clicking a link opens a tooltip card or navigates to the entity page

**Sidebar (desktop) / Bottom Section (mobile):**
- Related Letters (same year, adjacent years)
- Concept Tags (all concepts mentioned, clickable)
- Company Mentions (all companies mentioned)
- Key Quotes (3-5 highlighted quotes from the letter)

**Footer:**
- Navigation: ← Previous Letter | Year Navigator | Next Letter →
- "Cited in X concepts" / "Mentioned in Y letters"
- Source link to Berkshire Hathaway official site

### 3.5 Page Anatomy — Concept Detail

**Header:**
- Concept name (e.g., "Intrinsic Value")
- Definition (2-3 sentences, original Buffett definition synthesized)
- Citation count: "Mentioned in 83 letters across 69 years"

**Body:**
- Brief essay: How Buffett's view of this concept evolved over time
- Timeline: When was this concept first introduced, how did it mature

**Cross-Reference Table:**
| Year | Letter | Key Passage | Relevance |
|------|--------|-------------|-----------|
| 1965 | Berkshire Letter | "..." | First use of the term |
| 1977 | Berkshire Letter | "..." | Classic definition |
| 1992 | Berkshire Letter | "..." | Refinement |

**Related Concepts** (sidebar):
- Concepts that appear alongside this one in letters

---

## 4. Features & Interactions

### 4.1 Core Features

#### Letter Archive
- Full text of 90+ letters (partnership + Berkshire + special)
- Organized by: All / Partnership / Berkshire / Year / Type
- Filter by: Year range, letter type, concept tag
- Search: Full-text search within all letters
- Each letter page: reading mode, citation links, navigation between letters

#### Concept Index
- 49 investment concepts (e.g., Intrinsic Value, Margin of Safety, Moat, Circle of Competence)
- Each concept: definition, cross-reference table, evolution timeline
- Click concept → see all letters that mention it, with passage excerpts
- Concept pages are SEO powerhouses (high-intent long-tail keywords)

#### Company Index
- 61 companies mentioned in Buffett's letters
- Each company: Buffett's commentary timeline, positions held (if known), key quotes
- Company pages serve as mini case studies

#### People Index
- 7 key people: Benjamin Graham, Charlie Munger, Ajit Jain, Greg Abel, etc.
- Each person: relationship to Buffett, notable quotes, co-occurrence in letters

#### Knowledge Graph Visualization (v2)
- Interactive node graph: letters as nodes, concepts/companies as edges
- User can click a node and explore the network
- Lightweight implementation: use D3.js or vis.js for the graph

#### Search (Cmd+K / Ctrl+K)
- Full-page search overlay
- Search across: letters, concepts, companies, people
- Results grouped by type
- Keyboard navigable (arrow keys + Enter)
- Instant results (no server round-trip for v1, use client-side FlexSearch)

#### Newsletter Signup
- Email capture with ConvertKit or Beehiiv integration
- Monthly digest of key insights from one letter
- No spam, unsubscribe anytime

### 4.2 Interactions

| Element | Default | Hover | Click |
|---------|---------|-------|-------|
| Concept tag | Gold background pill | Underline + slight lift | Navigate to concept page |
| Company tag | Blue background pill | Underline | Navigate to company page |
| Letter card | White card, no shadow | Subtle shadow lift | Navigate to letter |
| Search input | Gray border | Blue border | Opens search overlay |
| Nav link | No underline | Underline slide-in | Navigate |
| Next/Prev nav | Ghost button | Solid border | Navigate |

### 4.3 Edge Cases

- **Letter not found:** 404 page with search bar and popular letters
- **Empty search:** Show recent/popular letters
- **No letters match filter:** "No letters found. Try adjusting your filters."
- **Long letter text:** Reading progress indicator at top of page
- **Broken external link (Berkshire Hathaway source):** Graceful 404 with Wayback Machine link suggestion

---

## 5. Component Inventory

### 5.1 Navigation

**TopNav**
- Logo + nav links + search icon
- States: Default (transparent on hero), Sticky (white bg + border)
- Mobile: Hamburger → slide-out drawer

**Breadcrumb**
- Example: Letters > Berkshire > 1965
- Chevron separator

**Pagination**
- Previous / Next buttons
- Year dropdown for quick navigation

### 5.2 Cards

**LetterCard**
- Year badge, letter title, date, concept count, company count
- Hover: shadow lift
- Used in: letter list, home featured, related letters

**ConceptCard**
- Concept name, brief definition, letter citation count
- Hover: border turns gold

**CompanyCard**
- Company name, ticker (if public), first mention year, quote excerpt
- Hover: shadow lift

**PersonCard**
- Name, role, relationship label, key quote

### 5.3 Content

**LetterBody**
- Prose-styled full text
- Highlighted concept/company/people mentions inline
- Section anchors (H2, H3)

**CrossReferenceTable**
- Sortable table: Year, Letter, Passage, Relevance
- Click row → navigate to letter
- Empty state: "No cross-references yet"

**ConceptTag / CompanyTag / PersonTag**
- Pill-shaped badges
- Color-coded by type (concept: gold, company: blue, person: green)
- Inline in text or in sidebar lists

### 5.4 Search

**SearchOverlay**
- Full-page overlay, Cmd+K trigger
- Input with instant results
- Results grouped: Letters / Concepts / Companies / People
- Keyboard navigation
- ESC or click-outside to close

**SearchResult**
- Title + snippet + type badge
- Highlight matching text

### 5.5 Newsletter

**NewsletterBanner**
- Inline on home page and letter pages
- Email input + subscribe button
- Success state: "Thanks for subscribing!"
- Error state: "Please enter a valid email"

---

## 6. Technical Approach

### 6.1 Tech Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Framework | Next.js 14 (App Router) | Same as freight-surcharge, proven, SSG support |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS | Fast iteration, consistent design |
| Content | MDX / Markdown | Letters stored as .mdx files, easy to maintain |
| Search | FlexSearch | Lightweight, client-side full-text search |
| Hosting | Cloudflare Pages | Same as freight-surcharge, free, global CDN |
| Analytics | Google Analytics 4 | Standard, free |
| Email | Beehiiv | Newsletter platform, easy integration |
| Fonts | Google Fonts (Playfair Display + Inter) | Editorial aesthetic |
| Icons | Lucide React | Clean, MIT licensed |

### 6.2 Data Model

#### Letter

```typescript
interface Letter {
  slug: string;              // e.g., "1965-berkshire-letter"
  year: number;             // 1965
  type: 'partnership' | 'berkshire' | 'special';
  title: string;            // "To the Shareholders of Berkshire Hathaway"
  date: string;             // "1965-03-10"
  summary: string;          // 200-word executive summary
  fullText: string;         // Full letter content (MDX)
  concepts: string[];       // Array of concept slugs
  companies: string[];       // Array of company slugs
  people: string[];          // Array of person slugs
  crossReferences: CrossReference[];
  keyQuotes: string[];       // 3-5 key quote excerpts
  featured: boolean;        // Show on homepage
  sourceUrl: string;        // Link to Berkshire Hathaway official
}
```

#### Concept

```typescript
interface Concept {
  slug: string;             // e.g., "intrinsic-value"
  name: string;             // "Intrinsic Value"
  definition: string;       // Buffett's definition (synthesized, 2-3 sentences)
  firstMentioned: number;    // Year of first mention
  letterCount: number;       // How many letters mention this
  crossReferences: CrossReference[];
  relatedConcepts: string[]; // Slugs of related concepts
}

interface CrossReference {
  letterSlug: string;
  year: number;
  passage: string;           // Key quote/excerpt (100-300 chars)
  relevance: 'first' | 'key' | 'mention' | 'refinement';
}
```

#### Company

```typescript
interface Company {
  slug: string;             // e.g., "coca-cola"
  name: string;              // "Coca-Cola"
  ticker?: string;           // "KO"
  industry: string;          // "Consumer Staples"
  firstMentioned: number;    // Year first mentioned
  letterCount: number;
  timeline: CompanyMention[]; // Key mentions with quotes
}

interface CompanyMention {
  year: number;
  letterSlug: string;
  passage: string;
  position?: string;         // "Overweight position", "Sold out", etc.
}
```

#### Person

```typescript
interface Person {
  slug: string;             // e.g., "charlie-munger"
  name: string;              // "Charlie Munger"
  role: string;             // "Vice Chairman, Berkshire Hathaway"
  firstMentioned: number;
  letterCount: number;
  relationship: string;      // Brief description of relationship
  quotes: PersonQuote[];
}

interface PersonQuote {
  year: number;
  letterSlug: string;
  passage: string;
}
```

### 6.3 File Structure

```
buffettknowledge/
├── app/
│   ├── layout.tsx           # Root layout with nav + footer
│   ├── page.tsx             # Home page
│   ├── globals.css           # Tailwind + custom styles
│   ├── letters/
│   │   ├── page.tsx         # All letters list
│   │   └── [slug]/page.tsx  # Letter detail
│   ├── concepts/
│   │   ├── page.tsx         # All concepts
│   │   └── [slug]/page.tsx  # Concept detail
│   ├── companies/
│   │   ├── page.tsx         # All companies
│   │   └── [slug]/page.tsx  # Company detail
│   ├── people/
│   │   ├── page.tsx         # All people
│   │   └── [slug]/page.tsx  # Person detail
│   └── about/page.tsx
├── components/
│   ├── TopNav.tsx
│   ├── Footer.tsx
│   ├── LetterCard.tsx
│   ├── ConceptCard.tsx
│   ├── CompanyCard.tsx
│   ├── PersonCard.tsx
│   ├── LetterBody.tsx
│   ├── CrossReferenceTable.tsx
│   ├── ConceptTag.tsx
│   ├── CompanyTag.tsx
│   ├── SearchOverlay.tsx
│   ├── NewsletterBanner.tsx
│   └── Breadcrumb.tsx
├── data/
│   ├── letters/             # MDX files for each letter
│   ├── concepts.ts          # Concept definitions
│   ├── companies.ts         # Company profiles
│   └── people.ts            # People profiles
├── lib/
│   ├── search.ts            # FlexSearch setup
│   └── references.ts        # Cross-reference builder
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 6.4 SEO Strategy

**Keyword Clusters:**

| Cluster | Primary Keywords | Long-tail Examples |
|---------|-----------------|-------------------|
| Letter Archive | Buffett shareholder letters, Berkshire Hathaway letters | Warren Buffett 1996 letter, Buffett 2008 letter |
| Concepts | Buffett concepts, value investing terms | Intrinsic value definition, Moat investing |
| Companies | Buffett companies, Berkshire portfolio | Buffett Apple investment, Buffett Coca-Cola |
| People | Buffett associates, Charlie Munger | Buffett Munger relationship |
| Archive | Buffett letters PDF, Buffett archive | Complete Buffett letters archive, Free Buffett letters |

**Structural SEO:**
- Every letter → unique H1, meta description, canonical URL
- Every concept → unique page with definition + cross-ref table
- Every company → unique page with timeline
- Sitemap: All 4 entity types (letters, concepts, companies, people)
- JSON-LD: Article schema on letter pages, FAQ schema on concept pages

---

## 7. MVP Scope (Phase 1)

### Must Have (MVP)
- [ ] Home page with hero, stats, featured letters, explore CTAs
- [ ] Letters archive page (filterable by year + type)
- [ ] Letter detail page with full text + cross-reference sidebar
- [ ] 4 entity types: Letters, Concepts, Companies, People
- [ ] Cross-linking between entities (concept tags, company tags in letter text)
- [ ] Client-side search (FlexSearch)
- [ ] Newsletter signup form
- [ ] Mobile responsive
- [ ] SEO: sitemap, meta tags, Open Graph
- [ ] 90+ letters data (from GitHub open-source)
- [ ] ~49 concepts (from learnbuffett.com reference + manual research)
- [ ] ~61 companies
- [ ] ~7 key people

### Nice to Have (Phase 2)
- [ ] Interactive knowledge graph visualization
- [ ] AI Q&A feature ("Ask Buffett")
- [ ] PDF bundle for sale
- [ ] Reading progress indicator
- [ ] Reading time estimate per letter
- [ ] Dark mode toggle

---

## 8. Content Data Plan

### Data Sources (Priority Order)

1. **GitHub: ReeceHarding/buffett-letters**
   - 48 letters (1977-2024) in clean Markdown
   - MIT license, high quality

2. **GitHub: jayleecn/Warren-Buffett-Letters-1956-2025**
   - 90+ letters (full archive)
   - Includes partnership letters 1956-1969

3. **Berkshire Hathaway Official**
   - Source URL for each letter (https://www.berkshirehathaway.com/letters/YYYY.html)

### Content Gap Strategy
- Partnership letters 1956-1969: Use GitHub source
- Berkshire letters 1965-1976: Use GitHub source or scrape official site
- 2025 letter: Manually download from official site

### Concept Extraction
- Reference learnbuffett.com's 49 concepts as a starting point
- Manually verify each concept against original letters
- Build cross-reference table per concept

---

## 9. Monetization Plan

### Phase 1 (0-6 months): Traffic Building
- Focus on content + SEO
- Google AdSense (apply after 6 months or when eligible)
- No aggressive monetization — trust building priority

### Phase 2 (6-12 months): Diversified Revenue
- **AdSense** (after site approval)
- **Affiliate**:
  - Interactive Brokers ($200/referral)
  - Seeking Alpha (subscription affiliate)
  - Amazon Associates (value investing books)
- **Newsletter** (Beehiiv with paid tier)

### Phase 3 (12+ months): Premium Products
- **PDF Bundle**: Formatted collection of all letters (similar to learnbuffett.com's bound edition)
- **Premium Newsletter**: Deep-dive analysis, exclusive content
- **Data/API**: Sell structured dataset to financial education platforms

---

*This spec is the source of truth. All implementation decisions must reference this document. Update this spec before making significant deviations from the plan.*
