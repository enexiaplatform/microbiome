# CONTENT_STRATEGY.md — The Microbiome Home

> Editorial operating plan. Last reviewed: 2026-07-19.
> Governing documents: BRAND.md (voice), CLAIMS_POLICY.md (claims standard), RESEARCH.md (keywords & evidence).

---

## 1. Launch Map — 12 Articles

Funnel logic: informational articles build topical authority and capture problem-aware searchers; each routes readers forward to commercial reviews/comparisons where affiliate conversion happens.

| # | Slug | Category | Intent | Primary keyword | Funnel role |
|---|------|----------|--------|-----------------|-------------|
| 1 | best-probiotic-products-homes-with-pets | pet-home | Commercial | best probiotic products for homes with pets | **Money page** — category roundup |
| 2 | envirobiotics-biologic-mini-review | reviews | Commercial | BioLogic Mini review | **Money page** — flagship review (incl. BetterAir rebrand callout) |
| 3 | biologic-mini-vs-biotica-800 | comparisons | Commercial | BioLogic Mini vs Biotica 800 | **Money page** — head-to-head |
| 4 | best-probiotic-cleaners-pet-odor | probiotic-cleaning | Commercial | best probiotic cleaner for pet odor | **Money page** — surface-cleaning roundup |
| 5 | environmental-probiotics-what-they-can-cannot-do | science | Informational | environmental probiotics | **Science hub** — trust anchor; links to all four money pages |
| 6 | probiotic-cleaner-vs-enzyme-cleaner | probiotic-cleaning | Informational | probiotic cleaner vs enzyme cleaner | Comparison-adjacent assist → #4 |
| 7 | why-pet-odor-returns-after-cleaning | pet-home | Informational | why does pet odor come back after cleaning | Problem-aware entry → #4, #1 |
| 8 | clean-dog-bedding-without-harsh-fragrances | pet-home | Informational | how to clean dog bedding without harsh chemicals | Practical entry → #4 |
| 9 | are-probiotic-cleaning-products-safe-around-pets | pet-home | Informational | are probiotic cleaners safe for pets | Safety objection handler → #4, #1 |
| 10 | how-often-use-probiotic-cleaner | probiotic-cleaning | Informational | how often to use probiotic cleaner | Usage/post-purchase assist → #4 |
| 11 | probiotic-cleaner-vs-disinfectant | probiotic-cleaning | Informational | probiotic cleaner vs disinfectant | Science-adjacent assist → #5, #4 |
| 12 | microbiome-friendly-cleaning-routine-pet-owners | pet-home | Informational | microbiome-friendly cleaning routine | Routine builder; natural 7-Day Reset email-magnet tie-in → #1 |

**Publish order suggestion:** #5 (science hub) first, then the four money pages, then informational spokes — so every spoke launches into an existing internal-link graph.

---

## 2. Internal-Linking Rules

1. **Informational links forward to commercial.** Every informational article must link to at least one money page (#1–#4) where topically honest.
2. **Every article carries 2–5 internal links.** No orphan pages; no link stuffing.
3. **The science hub (#5) is the authority node.** Every article that cites research links to it once, with descriptive anchor text (never "click here").
4. **Commercial pages link laterally and down.** Reviews link to their comparisons (#2 ↔ #3) and to the science hub for evidence context; money pages do not need to link to every spoke.
5. **Anchor text describes the destination's promise**, e.g. "our BioLogic Mini vs Biotica 800 comparison," not bare product names.
6. **Category hubs** (pet-home, probiotic-cleaning, reviews, comparisons, science) list their articles and are linked from article breadcrumbs; keep hub intros under 150 words, updated as content grows.

---

## 3. On-Page Standards

### 3.1 Frontmatter contract (per `content/_sample.mdx`)

Required on every article:

- `title`, `description` — search-facing; description under ~160 characters, no hype
- `slug` — matches the launch map (§1)
- `category` — one of `pet-home | probiotic-cleaning | reviews | comparisons | science`
- `searchIntent` — `commercial | informational`
- `publishedAt`, `updatedAt`, `lastReviewed` — ISO dates; `lastReviewed` drives the refresh cadence (§4)
- `author` — "The Microbiome Home Editorial Team" until named authors exist
- `keywords` — primary keyword first
- `products` — product slugs from `src/data/products.ts`; non-empty triggers the automatic AffiliateDisclosure box and end-of-article CTA
- `sources` — title/url/publisher for every study or official page cited
- `faq` — 2–5 Q&As, plain language, no claims that would fail CLAIMS_POLICY.md
- `draft: false` only when the article passes the pre-publish checklist (§3.4)

### 3.2 EvidenceRating usage

- Use `<EvidenceRating level="strong|moderate|limited" note="..." />` inline wherever research is cited.
- Level definitions must match CLAIMS_POLICY.md §3 exactly.
- **Default for home-use extrapolations of hospital research: `limited`.**
- Institutional-settings evidence (the six studies in RESEARCH.md §5): `moderate` at most, with the setting limitation stated in the same paragraph.

### 3.3 Components & claims mechanics

- Manufacturer claims always phrased "The manufacturer states…" (enforced by the data layer and CLAIMS_POLICY.md §2).
- Affiliate links only via `<ProductCard>`, `<ProductComparison>`, or `<CTA>` — never raw markdown links.
- Use `<Callout type="info">` for the EnviroBiotics/BetterAir rebrand note; `<Callout type="warning">` for usage cautions (e.g., don't mix probiotic cleaners with disinfectants on the same surface at the same time).
- Every commercial article includes `<ProsCons>` with at least two genuine cons.
- H2s become the TOC — structure articles with descriptive `##` headings.

### 3.4 Pre-publish checklist

- [ ] Frontmatter complete and valid against §3.1
- [ ] Disclosure renders before the first affiliate component (automatic when `products` non-empty — verify)
- [ ] Every manufacturer claim attributed; every study in `sources`
- [ ] EvidenceRating present on research claims; hospital≠home framing where studies are cited
- [ ] 2–5 internal links, including one forward link if informational
- [ ] FAQ present; no banned phrases (CLAIMS_POLICY.md §4)
- [ ] UNVERIFIED items labeled as such

---

## 4. Refresh Cadence

- **Quarterly review** of every published article (calendar: Jan / Apr / Jul / Oct).
- On each review: verify prices, refill cadence, and product availability against official sources; re-check affiliate link destinations; re-read claims against CLAIMS_POLICY.md; update `lastReviewed` (and `updatedAt` if content changed materially).
- **Event-triggered refreshes** (don't wait for the quarter): product discontinuation, price change, rebrand news, new peer-reviewed evidence, affiliate program approval/rejection.
- Refresh priority: money pages (#1–#4) first, then the science hub, then spokes.

---

## 5. Expansion Backlog

Sequenced; each item requires its gate before work starts.

| Priority | Expansion | Gate |
|----------|-----------|------|
| 1 | Additional merchant content (SCD Probiotics, Aunt Fannie's, Chrisal/PIP, Counter Culture) | Product facts verified + monetization route confirmed (RESEARCH.md §4 rule) |
| 2 | Hands-on review upgrade (BioLogic Mini long-term test, photos, cartridge diary) | Sample unit acquired (BUSINESS.md §6) |
| 3 | High-competition head terms ("pet-safe cleaning products," dedicated enzyme-cleaner page) | Demonstrated rankings on launch long-tails |
| 4 | Email-magnet content upgrades (7-Day Reset article series feeding the Kit funnel) | Kit platform live with baseline signup data |
| 5 | Quiz content hub (quiz results pages as indexable, product-mapped landing content) | Quiz built; affiliate links live |
| 6 | Gut-health vertical (pet and/or human) | Minimum two consecutive quarters of KPI growth + separate claims-risk review — supplement claims carry materially higher regulatory risk |
| 7 | Skin-microbiome vertical | Same gate as gut; after gut launch if pursued |
| 8 | Legacy BetterAir keyword capture (dedicated rebrand explainer) | Only if search data shows meaningful legacy-term volume |

**Standing rule:** scope expansion never relaxes the claims standard. New verticals inherit CLAIMS_POLICY.md in full, plus a vertical-specific addendum before publication.
