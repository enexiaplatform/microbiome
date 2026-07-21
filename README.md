# The Microbiome Home

Science-backed guides to a microbiome-friendly home — for you and your pets. An affiliate content website publishing guides, reviews, and comparisons of microbiome-friendly products (environmental probiotic purifiers, probiotic cleaners). Every claim is sourced, manufacturer statements are labeled, and no medical claims are made.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + `@tailwindcss/typography`
- MDX content via `next-mdx-remote` (gray-matter frontmatter, remark-gfm, rehype-slug)
- No database — content is files in `content/articles/`, product data is typed TypeScript in `src/data/`

## Repo structure

```
.
├── content/
│   ├── _sample.mdx          # author reference; NOT published (outside articles/)
│   ├── articles/            # published MDX articles (<slug>.mdx)
│   └── lead-magnet/         # lead magnet assets
├── legacy/                  # archived predecessor static site — NOT active, do not edit
├── src/
│   ├── app/
│   │   ├── [category]/      # category index + [slug] article pages
│   │   ├── go/[slug]/       # affiliate redirect route (302 + click log)
│   │   ├── api/newsletter/  # newsletter signup endpoint (Kit / placeholder)
│   │   ├── rss.xml/         # RSS 2.0 feed route
│   │   ├── sitemap.ts       # dynamic sitemap
│   │   ├── robots.ts        # robots.txt (disallows /go/ and /api/)
│   │   ├── quiz/            # recommendation quiz
│   │   ├── reset-guide/     # gated lead magnet page
│   │   ├── search/          # client-side search
│   │   └── ...              # about, contact, legal/policy pages
│   ├── components/          # UI components; components/mdx/ holds MDX-only blocks
│   ├── data/                # products.ts, affiliate-links.ts, categories.ts, quiz.ts, top-picks.ts
│   └── lib/                 # content.ts (MDX loading), track.ts, site.ts, search.ts, format.ts
├── .env.example             # every supported env var, commented
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. See [SETUP.md](SETUP.md) for prerequisites and env configuration.

## Scripts

| Command | Runs | Purpose |
|---|---|---|
| `npm run dev` | `next dev` | Local dev server |
| `npm run build` | `next build` | Production build |
| `npm run start` | `next start` | Serve production build |
| `npm run lint` | `next lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` | TypeScript check |

## Documentation

| Doc | Covers |
|---|---|
| [SETUP.md](SETUP.md) | Local setup, env vars, common issues |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel deploy, custom domain, post-deploy checklist |
| [AFFILIATE_LINKS.md](AFFILIATE_LINKS.md) | The `/go/[slug]` redirect system, env overrides, adding products |
| [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md) | Authoring MDX articles, frontmatter contract, pre-publish checklist |
| [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) | GA4 / Clarity / PostHog / GSC setup, event reference |
| [BRAND.md](BRAND.md) | Brand voice and positioning |
| [CLAIMS_POLICY.md](CLAIMS_POLICY.md) | Claims and evidence rules for authors |

## Content system in 5 lines

1. Articles are MDX files at `content/articles/<slug>.mdx` with a typed frontmatter contract (`src/lib/content.ts`).
2. Files with `draft: true` are excluded from listings, sitemap, and RSS; missing `content/articles/` is fine — the build works with zero articles.
3. Articles render at `/<category>/<slug>`; `category` must be one of the five slugs in `src/data/categories.ts`.
4. Product data and affiliate destinations live in `src/data/products.ts` and `src/data/affiliate-links.ts`; outbound clicks route through `/go/<slug>` with a server-side click log.
5. An affiliate disclosure box and an end-of-article CTA render automatically when frontmatter `products` is non-empty.

## Status

- **Content:** in progress — article pipeline is ready, `content/articles/` is being populated.
- **Code:** deploy-ready — builds with zero articles; all analytics, affiliate, and newsletter integrations degrade gracefully when env vars are unset.
- **Domain:** themicrobiomehome.com not yet purchased (owner action — see [DEPLOYMENT.md](DEPLOYMENT.md)).
