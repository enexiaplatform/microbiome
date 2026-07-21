# BUSINESS.md — The Microbiome Home

> Business model and operating plan. Last reviewed: 2026-07-19.
> Items labeled **UNVERIFIED** are assumptions, not facts — confirm before committing spend or making public statements.

---

## 1. Business Model

**Affiliate content publishing.** The Microbiome Home produces independent, science-first editorial content about microbiome-friendly home and pet products, and earns commissions when readers purchase through tracked outbound links.

**The unit economics in one line:** organic search traffic → trust-built informational content → commercial reviews/comparisons → affiliate clicks → commissions, with an email list as the owned-audience hedge against SEO volatility.

**Why this model fits:** the niche has real product prices ($98–$995 for air units; ~$15 for cleaners, with recurring refill cartridges), an engaged problem-aware audience (pet owners with recurring odor/dander issues), and a content landscape with no credible independent hub — so trust itself is the moat.

---

## 2. MVP Scope

**In scope (MVP):**

- **Home + Pet vertical only.** Environmental probiotic air purification (EnviroBiotics line) and probiotic surface cleaners (PureBiotics and future merchants).
- US market, English language.
- 12 launch articles (see CONTENT_STRATEGY.md) across 5 categories: pet-home, probiotic-cleaning, reviews, comparisons, science.

**Explicitly out of scope (future phases):**

- Gut-health and skin-microbiome verticals (human or pet supplements/topicals).
- Non-US markets and localization.
- Display advertising, sponsored posts, own products.

**Why the narrow scope:** domain authority and topical focus compound. Covering gut/skin now would dilute the topical graph, expand the claims-risk surface, and drag the brand toward the supplement-spam register it is defined against (see BRAND.md §6).

---

## 3. Market

US pet owners, 28–55 (BRAND.md §3). Pet ownership and pet-wellness spending in the US are large and durable; "non-toxic / pet-safe cleaning" and "indoor air quality" are established, growing search territories. Specific market-size figures: **UNVERIFIED** — do not quote numbers in pitch materials until sourced.

---

## 4. Revenue Streams & Verification Status

| # | Stream | Status (as of 2026-07-19) | Notes |
|---|--------|---------------------------|-------|
| 1 | **EnviroBiotics affiliate program** | **UNVERIFIED** — no confirmed public program terms | Brand and product facts verified (envirobiotics.com/products). Whether a public affiliate/partner program exists, its commission rate, and cookie window are unconfirmed. Site is built env-driven (`AFFILIATE_*` env keys) so links slot in later without code changes. |
| 2 | **PureBiotics affiliate program** | **UNVERIFIED** — no confirmed public program terms | Brand/products verified (purebioticsusa.com). Program existence and terms unconfirmed. |
| 3 | **Amazon Associates** (fallback) | Program exists; our enrollment **UNVERIFIED** | Fallback channel for cleaning products. Mandatory disclosure: "As an Amazon Associate I earn from qualifying purchases." Lower commissions but immediate coverage. |
| 4 | Additional merchants (SCD Probiotics, Aunt Fannie's, Chrisal/PIP, Counter Culture) | **UNVERIFIED** — candidates only | See RESEARCH.md §4. Do not build content around them until products AND affiliate terms are confirmed. |
| 5 | Email-driven repeat revenue | Mechanism, not a stream per se | List monetizes via affiliate features in the newsletter once programs are live. |

**Commission rates, cookie windows, and payout terms for every stream above: UNVERIFIED.** No revenue projections should be published internally or externally until at least one program's terms are confirmed in writing.

**Implication of the env-driven build:** the site can launch with placeholder/routed links (`/go/<slug>`) and swap destinations via environment variables the day a program is approved — zero content rewrites.

---

## 5. Lead-Gen Strategy

Owning the audience is the hedge against SEO ramp time and merchant dependence.

- **Platform:** Kit (email marketing platform). Account setup and pricing tier: **UNVERIFIED**.
- **Lead magnet:** the **"7-Day Reset"** — a one-week, low-chemical, microbiome-friendly home reset plan for pet owners (room-by-room routine, what to stop doing, what actually moves the needle on odor/dander). Educational, not product-gated; products appear as optional, disclosed recommendations.
- **Quiz:** an interactive "which setup fits your home/pet situation" quiz routing visitors to the right product class (room size, pet count, odor vs. dander priority). Dual purpose: conversion assist + email capture gate for results. (Concept carried over from the legacy project's 3-question product quiz, rebuilt multi-brand.)
- **Capture placements:** end-of-article CTA on informational posts, inline on the science hub article, exit-intent **UNVERIFIED** (test post-launch).

---

## 6. Cost Structure (Lean)

| Item | Notes |
|------|-------|
| Domain | themicrobiomehome.com — register immediately (unregistered as of 2026-07-19) |
| Hosting | Static/Next.js deployment; hobby tier sufficient at launch |
| Email (Kit) | Free/low tier until list crosses threshold — pricing **UNVERIFIED** |
| Product samples | BioLogic Mini ($98) is the priority hands-on review unit; others as revenue allows |
| Content | Founder-written at MVP; no freelance budget |
| Tools | Analytics + search console (free); no paid SEO tools at MVP |

No paid acquisition at MVP. Total fixed monthly burn target: near-zero beyond email platform and hosting.

---

## 7. KPIs

| KPI | Definition | Why it leads |
|-----|-----------|--------------|
| `affiliate_click` CTR | Affiliate clicks / product-component views (ProductCard, comparison, CTA — tracked in the site build) | Closest leading indicator of revenue; shows whether commercial pages persuade |
| `email_signup` rate | Signups / unique sessions | Measures owned-audience growth, the SEO hedge |
| Organic sessions | Search Console + analytics | The top of the funnel; expect a slow ramp (see risks) |

Secondary diagnostics: `product_card_view` and `comparison_view` (already instrumented), informational→commercial internal click-through, per-article rankings for mapped keywords (RESEARCH.md §3). Targets are deliberately unset until 90 days of baseline data exist.

---

## 8. Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Single-merchant dependence** — launch catalog is EnviroBiotics-heavy for air, PureBiotics for surface | High | Env-driven links; active merchant diversification backlog (RESEARCH.md §4); Amazon Associates fallback; never write "only one good option" content |
| **Unverified affiliate programs** — no confirmed terms for either primary merchant | High | Confirm programs before launch-week link activation; Amazon Associates covers cleaning products meanwhile; do not promise revenue timelines |
| **SEO ramp time** — new domain, competitive SERPs with generalist publishers | Medium–High | Target low/med-competition long-tails first (RESEARCH.md §3); informational hub-and-spoke structure for topical authority; email list as non-SEO channel |
| **Rebrand confusion** — EnviroBiotics rebranded from BetterAir in 2025; old reviews/keywords use the old name | Medium | Address the rebrand explicitly in review content (Callout component exists for this); capture BetterAir legacy queries editorially |
| **Evidence gap** — the science is hospital/institutional; home-use evidence is limited | Medium | This is a positioning asset, not just a risk: honest EvidenceRating and hospital≠home framing (CLAIMS_POLICY.md) is the differentiator |
| **Claims/FTC exposure** | Medium | Binding CLAIMS_POLICY.md; per-page disclosure before first link; quarterly claim audits |
| **Platform dependence (Google)** | Medium | Email list, Pinterest distribution later (**UNVERIFIED** priority) |

---

## 9. Milestones

1. **Pre-launch (now):** register domain; verify EnviroBiotics + PureBiotics affiliate terms; enroll in Amazon Associates; publish 12 launch articles; set up Kit + 7-Day Reset magnet.
2. **90 days:** baseline KPIs; hands-on BioLogic Mini review content; first merchant-diversification decision.
3. **Quarterly:** content refresh + claims audit (CLAIMS_POLICY.md §8); reassess gut/skin vertical expansion only after two consecutive quarters of KPI growth.
