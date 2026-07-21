# Setup

## Prerequisites

- Node.js 18.18+ or 20+ (Next.js 15 requirement)
- npm (ships with Node)
- Git Bash or any shell on Windows/macOS/Linux

## Clone and install

```bash
git clone <repo-url>
cd Microbiome
npm install
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in as needed:

```bash
cp .env.example .env.local
```

**Everything works with no variables set**: analytics render nothing, affiliate links fall back to plain product URLs, and the newsletter endpoint runs in placeholder mode.

| Variable | Required? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute site URL used for metadata, canonical URLs, sitemap, RSS, and JSON-LD. Defaults to `https://themicrobiomehome.com`. |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). When set, the gtag snippet loads. |
| `NEXT_PUBLIC_CLARITY_ID` | Optional | Microsoft Clarity project ID. When set, the Clarity snippet loads. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | PostHog project API key. When set, the PostHog snippet loads. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | PostHog API host. Defaults to `https://us.i.posthog.com`. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console verification token (meta tag content value). |
| `KIT_API_KEY` | Optional | Kit (ConvertKit) v3 API key. With `KIT_FORM_ID`, `/api/newsletter` forwards signups to Kit. |
| `KIT_FORM_ID` | Optional | Kit form ID. Both Kit vars must be set or the endpoint uses placeholder mode. |
| `AFFILIATE_BIOLOGIC_MINI` | Optional | Affiliate URL override for `biologic-mini`. Empty → plain product URL. |
| `AFFILIATE_BIOTICA_800` | Optional | Affiliate URL override for `biotica-800`. Empty → plain product URL. |
| `AFFILIATE_BA_2080` | Optional | Affiliate URL override for `ba-2080`. Empty → plain product URL. |
| `AFFILIATE_E_BIOTIC_PRO` | Optional | Affiliate URL override for `e-biotic-pro`. Empty → plain product URL. |
| `AFFILIATE_PUREBIOTICS_ALL_PURPOSE` | Optional | Affiliate URL override for `purebiotics-all-purpose`. Empty → plain product URL. |
| `AFFILIATE_PUREBIOTICS_PET` | Optional | Affiliate URL override for `purebiotics-pet`. Empty → plain product URL. |

Notes:

- `NEXT_PUBLIC_*` vars are inlined into the client bundle — never put secrets in them.
- `KIT_*` and `AFFILIATE_*` are server-only; affiliate URLs are resolved in the `/go/[slug]` route and never exposed to the client.
- After changing `.env.local`, restart the dev server.

## Run the dev server

```bash
npm run dev
```

Open http://localhost:3000. Verify the build any time with:

```bash
npm run build
npm run lint
npm run typecheck
```

## Where content lives

- Articles: `content/articles/<slug>.mdx` — see [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md).
- Author reference (not published): `content/_sample.mdx`.
- Product data: `src/data/products.ts`.
- Categories: `src/data/categories.ts`.
- Affiliate destinations: `src/data/affiliate-links.ts` (+ `AFFILIATE_*` env overrides).

## Common issues

| Symptom | Cause / fix |
|---|---|
| Empty article lists, empty sitemap articles section | Expected when `content/articles/` is empty or missing. The build works with zero articles. |
| Article not appearing | `draft: true` in frontmatter, invalid/missing `title`/`slug`, or a `category` not in `src/data/categories.ts` — such files are skipped silently. |
| New article 404s in dev | Dev server caches file reads in some setups; restart `npm run dev`. |
| Affiliate link goes to home page | Unknown product slug in `/go/<slug>`, or a malformed `AFFILIATE_*` URL — the route fails safe to `/` and logs the event server-side. |
| Env change has no effect | Restart the dev server; `NEXT_PUBLIC_*` values are inlined at build time for production. |
| `legacy/` directory | Archived predecessor static site. Not part of the app; do not edit or document as active. |
