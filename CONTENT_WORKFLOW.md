# Content Workflow

How articles are authored, validated, and published.

## Adding an article

```bash
cp content/_sample.mdx content/articles/<slug>.mdx
```

Then edit the frontmatter and body. `content/_sample.mdx` is a complete author reference with copy-paste examples for every component — it lives outside `content/articles/`, so the build never publishes it.

Publication rules (from `src/lib/content.ts`):

- Only `content/articles/*.mdx` files are loaded.
- Files with `draft: true` are excluded from listings, sitemap, and RSS, and return null for direct page loads. Publish by setting `draft: false`.
- Files missing a string `title` or `slug`, or with an invalid `category`, are skipped silently.
- Articles render at `/<category>/<slug>`; the filename should match the frontmatter `slug`.
- `##` (h2) headings become the table of contents automatically.
- An affiliate disclosure box and an end-of-article CTA render automatically when `products` is non-empty.
- Sorting everywhere is `publishedAt` descending.

## Frontmatter contract

| Key | Type | Required? | Notes |
|---|---|---|---|
| `title` | string | **Yes** | File skipped without it. |
| `description` | string | Recommended | Defaults to `""`. Used for meta description and RSS. |
| `slug` | string | **Yes** | File skipped without it. Must match the filename. |
| `category` | string | **Yes** | Must be one of: `pet-home`, `probiotic-cleaning`, `reviews`, `comparisons`, `science` (see `src/data/categories.ts`). Invalid → file skipped. |
| `searchIntent` | `"commercial" \| "informational"` | No | Defaults to `"informational"`. |
| `publishedAt` | string (ISO date) | Recommended | Defaults to `"1970-01-01"`. Drives sorting and RSS `pubDate`. |
| `updatedAt` | string (ISO date) | Recommended | Defaults to `publishedAt`. Drives sitemap `lastModified`. |
| `lastReviewed` | string (ISO date) | Recommended | Defaults to `updatedAt`. |
| `author` | string | No | Defaults to `"The Microbiome Home Editorial Team"`. |
| `keywords` | string[] | No | Defaults to `[]`. Non-string entries dropped. |
| `products` | string[] | No | Defaults to `[]`. Product slugs from `src/data/products.ts`. Non-empty → auto disclosure + end CTA. |
| `sources` | `{title, url, publisher?}[]` | No | Defaults to `[]`. Cited sources. |
| `faq` | `{q, a}[]` | No | Defaults to `[]`. |
| `draft` | boolean | No | Only literal `true` counts; anything else publishes. Keep `true` while writing. |

## MDX components

| Component | Usage |
|---|---|
| `<ProductCard slug="biologic-mini" />` | Single product showcase (price, features, labeled manufacturer claim, CTA through `/go/<slug>`). Tracks `product_card_view` once in view. |
| `<ProductComparison slugs="a,b,c" />` | Side-by-side table: price, coverage, format, refill cadence, best for. Unknown slugs skipped. Tracks `comparison_view` once in view. |
| `<ProsCons pros={[...]} cons={[...]} />` | Balanced verdict panel; pass arrays as JSX expressions. |
| `<EvidenceRating level="strong\|moderate\|limited" note="…" />` | Inline evidence badge; optional note shown as tooltip and to screen readers. |
| `<Callout type="info\|warning">…</Callout>` | Highlighted note box. |
| `<CTA product="biotica-800" placement="inline">Check pricing</CTA>` | Inline affiliate button through `/go/<slug>`; `placement` is `"inline"` or `"end"`. |

Rules:

- Affiliate links **never** go in raw markdown — use `<ProductCard>` or `<CTA>`.
- Plain markdown (bold, italic, links, code, lists, GFM tables, blockquotes, footnotes) works as usual; keep tables narrow for mobile.
- Manufacturer claims are always phrased "The manufacturer states…". No medical or health claims — see `/health-disclaimer`.

## Category rules

`category` must exist in `src/data/categories.ts`. Current slugs:

| Slug | Name | Scope |
|---|---|---|
| `pet-home` | Pet Home | Odor control, dander-aware routines |
| `probiotic-cleaning` | Probiotic Cleaning | Probiotic surface cleaners around kids and pets |
| `reviews` | Reviews | Methodology-driven single-product reviews |
| `comparisons` | Comparisons | Head-to-head spec comparisons |
| `science` | Science | Evidence explainers on the indoor microbiome |

Adding a new category is a code change (`src/data/categories.ts`), not a content task.

## Internal-link policy

Include **2–5 internal links per article** to related articles, category pages, or the quiz (`/quiz`) and reset guide (`/reset-guide`), using absolute site paths (e.g. `[probiotic cleaning guide](/probiotic-cleaning/getting-started)`).

## Claims policy

Follow [CLAIMS_POLICY.md](CLAIMS_POLICY.md): every claim sourced or labeled as a manufacturer statement, evidence labeled with `<EvidenceRating>`, no medical or health claims.

## Pre-publish checklist

- [ ] Frontmatter YAML parses (all required keys present, quoted strings, valid arrays).
- [ ] `category` is a valid slug; `products` slugs exist in `src/data/products.ts`.
- [ ] `draft: false` set; `publishedAt` / `updatedAt` / `lastReviewed` correct.
- [ ] `npm run build` passes.
- [ ] All internal links resolve; product components render (check the dev server page).
- [ ] Evidence labeled (`<EvidenceRating>`), manufacturer claims phrased "The manufacturer states…", sources listed in frontmatter.
- [ ] 2–5 internal links present.

## Updating an article

1. Edit the MDX body.
2. Bump `updatedAt` (drives sitemap `lastModified`).
3. Bump `lastReviewed` when the content was substantively re-verified against sources.
4. Do not change `slug` or `publishedAt` after publication (breaks URLs and RSS GUIDs).
