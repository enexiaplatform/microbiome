# CLAIMS_POLICY.md — The Microbiome Home

> **Binding editorial standard.** Every published word on The Microbiome Home must comply with this document. It overrides style preference, SEO temptation, and conversion pressure. Adopted 2026-07-19; reviewed quarterly alongside the content audit.
> Related: BRAND.md (voice), RESEARCH.md (evidence base), CONTENT_STRATEGY.md (pre-publish checklist).

---

## 1. Purpose & Scope

This policy governs all factual, product, health-adjacent, and performance claims in articles, FAQs, product components, email content, and quiz outputs. Its goals: (1) never mislead a reader, (2) survive FTC scrutiny, (3) keep the site's independence credible — the trust that is our entire moat.

---

## 2. Attribution Rules

1. **Manufacturer claims are never editorial assertions.** Any claim originating from a brand — efficacy, safety, certifications, "chemical-free," coverage, ozone — is phrased **"The manufacturer states…"** (or "According to EnviroBiotics…" / "PureBiotics says…"). The site's data layer (`src/data/products.ts`) enforces this for product components; article prose must match.
2. **Specifications** (price, coverage, refill cadence) may be stated directly **only** when verified from the brand's official source, with an as-of date in the editorial workflow. Unpublished prices (e.g., E-Biotic Pro) are stated as "price not published."
3. **Research claims** are stated with citation in the article's `sources` frontmatter and an inline EvidenceRating (§3).
4. **Our own experience** (hands-on reviews) is first-person and clearly framed as one household's experience — never generalized into "works for everyone."
5. **Comparisons** against other products or categories cite verifiable specs or labeled manufacturer claims only. No invented head-to-head performance claims.

---

## 3. Evidence Levels

These definitions match the site's `EvidenceRating` component exactly. Writers must use these meanings — no drift.

| Level | Definition | Typical use on this site |
|-------|-----------|--------------------------|
| **strong** | Multiple well-designed studies (ideally randomized/controlled) in settings directly comparable to the claim's context, with consistent results | Rare at launch; would require home-setting trials that do not yet exist |
| **moderate** | Several credible studies with consistent findings, but with meaningful limitations in design, size, or setting transferability | The hospital/institutional probiotic-cleaning evidence base (RESEARCH.md §5) |
| **limited** | Preliminary, indirect, single-setting, or manufacturer-adjacent evidence; plausible but unproven for the reader's context | **Default for any home-use extrapolation**, and for air-dispersal device efficacy |

Rules:
- Every research-linked claim carries an inline level; the `note` explains the limitation in plain language.
- Evidence levels describe the *evidence*, never the product's worth. A `limited` rating is honesty, not a downvote.

---

## 4. Banned Phrases & Safe Rewrites

Banned phrases may not appear in editorial voice anywhere on the site. Where a rewrite exists, use it; where marked **banned entirely**, no phrasing of the claim is permitted.

| Banned phrase / claim | Safe rewrite |
|-----------------------|--------------|
| "Kills 99.9% of germs" (and any sterilization/"germ-killing" framing) | "is designed to reduce odor-causing bacteria on surfaces" — attributed to the manufacturer where it's their claim |
| "Relieves allergies" / "helps with asthma" / "reduces allergy symptoms" | **Banned entirely.** Health-outcome claims are never made, attributed or not |
| "Proven to work in your home" / "hospital-proven for your family" | "In hospital studies, probiotic cleaning was associated with… — results in hospitals don't automatically apply to homes, and home-use evidence is still limited" |
| "Better than bleach" / "outperforms disinfectants" (as editorial assertion) | Describe the hospital comparison data with full setting caveats and an EvidenceRating; let readers conclude |
| "Vet recommended" / "pediatrician approved" / "doctor trusted" | **Banned entirely** (unverified and health-adjacent) |
| "Chemical-free and completely safe for pets" | "The manufacturer states it is chemical-free and fragrance-free; as with any cleaning product, follow the label and keep pets away from wet surfaces until dry" |
| "Eliminates pet dander/allergens" | "The manufacturer states it reduces common allergens — including pet dander — in the air and on surfaces" + EvidenceRating limited |
| "Detox your home" / "toxic chemicals are poisoning your family" | **Banned entirely** (fear-based; violates brand voice) |
| "The #1 probiotic purifier" / "best on the market" (superlatives without basis) | "Our top pick for [specific use case], because [specific, verifiable reasons]" |
| "FDA approved" / "EPA approved" (for any product we cover) | **Banned entirely** unless verified in writing from official sources — currently UNVERIFIED for all covered products. (Legacy-project certification lists were never verified and must not be reused.) |
| "Guaranteed results" / "risk-free" | Describe the manufacturer's actual return policy, attributed, if verified — otherwise omit |

---

## 5. Mandatory Framing: Hospital Studies ≠ Home Results

Any article citing the evidence base (RESEARCH.md §5) must include, in the same section as the first citation:

1. A plain statement that the studies were conducted in **hospitals or institutional settings**, not homes.
2. A statement that **home-use evidence is limited**, and that hospital hygiene protocols (trained staff, controlled surfaces, measured dosing) don't transfer directly to a living room.
3. An EvidenceRating of **limited** on any sentence that extrapolates institutional findings to reader homes.
4. No implied health outcomes ("fewer infections in hospitals" must never be recast as "healthier family at home").

---

## 6. FTC Disclosure Standard

Compliance baseline: FTC Endorsement Guides, 16 CFR Part 255.

1. **Per-page disclosure.** Every page containing affiliate links or product components shows a disclosure **before the first affiliate link** (the build injects `<AffiliateDisclosure />` automatically when frontmatter `products` is non-empty; verify on every publish).
2. **Clear and conspicuous.** Plain language, readable size, no burying in footers. Standard wording: *"This article contains affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Our recommendations are based on our research and editorial judgment."*
3. **Amazon Associates pages** additionally carry the exact required line: *"As an Amazon Associate I earn from qualifying purchases."*
4. **Email and quiz outputs** containing affiliate links carry the same disclosure before the first link.
5. **No review may imply independence we don't have** (e.g., "we bought this with our own money" only when literally true); free samples, if ever accepted, are disclosed in the review itself.
6. Disclosure placement and wording are checked in the pre-publish checklist and the quarterly audit.

---

## 7. UNVERIFIED Labeling Convention

- Any fact we could not confirm from an official or primary source as of its verification date is labeled **UNVERIFIED** at the point of use — in docs, in product data (`verified: false` + `verificationNote`), and in article prose where it appears.
- UNVERIFIED items may be mentioned (transparently labeled) but may never anchor a recommendation, headline, or comparison conclusion.
- The label is removed only when the fact is confirmed from an official source, with the new as-of date recorded in the editorial workflow.
- Current standing UNVERIFIED items include: EnviroBiotics and PureBiotics affiliate program terms; PureBiotics pet-formula price/details; competitor article specifics for The Spruce / Wellness Mama; all candidate-merchant details (SCD, Aunt Fannie's, Chrisal/PIP, Counter Culture); Biotica 800 refill pricing (reseller-sourced).

---

## 8. Health Disclaimer Policy

1. **The site gives no medical or veterinary advice** — not in articles, FAQs, email, or quiz outputs.
2. Every article that touches health-adjacent territory (allergies, asthma, pet illness, chemical sensitivity) includes the standard pointer: *"This article is for general information and isn't medical or veterinary advice. For health concerns about your pet, consult your veterinarian; for your own health, consult your doctor."* (Linked to the `/health-disclaimer` page where present.)
3. We never interpret symptoms, recommend products *for* a health condition, or suggest replacing professional care, medication, or prescribed cleaning/hygiene protocols (e.g., for immunocompromised households — those readers are directed to their physician).
4. Safety content (e.g., are-probiotic-cleaning-products-safe-around-pets) is framed as "what we know and don't know," always ending on the consult-a-professional pointer.

---

## 9. Exceptions & Governance

**Exception approval:**

- Exceptions to this policy are rare and require **written sign-off from the site owner/founder** (the single accountable approver at MVP stage). There is no verbal exception.
- An exception request must state: the claim, the evidence, why standard phrasing fails, and the exact proposed wording. Approved exceptions are logged in the audit record (below).
- Exceptions are **never** granted for: health-outcome claims, banned-entirely phrases in §4, or removal/softening of FTC disclosures. Those have no exception path.

**Quarterly claim audit (with the content refresh, Jan / Apr / Jul / Oct):**

1. Re-read every published article against §§2–7 of this policy.
2. Check every "The manufacturer states…" claim against the brand's current official site — claims change; stale attributions are corrected or removed.
3. Verify disclosure renders before the first affiliate link on every commercial page; verify the Amazon line where applicable.
4. Re-check all UNVERIFIED labels: confirm-and-remove or keep.
5. Re-read new peer-reviewed literature relevant to the evidence base; update RESEARCH.md §5 and EvidenceRatings if the picture shifts.
6. Log: articles audited, violations found/fixed, exceptions in force, UNVERIFIED items resolved. The log lives with the quarterly content-refresh record.
7. Any violation found is fixed **before** the next publish cycle, and the pre-publish checklist is updated if the violation revealed a gap in it.

---

*This policy is a floor, not a ceiling. When in doubt, attribute, downgrade the claim, or cut it.*
