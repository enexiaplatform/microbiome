# Analytics Setup

All analytics are env-driven and optional. When an env var is unset, its provider renders nothing and all tracking calls no-op safely — builds never break.

## Architecture

- `src/components/Analytics.tsx` (client, mounted in the root layout) loads provider snippets with `next/script` `strategy="afterInteractive"`, gated per env var.
- `src/lib/track.ts` `trackEvent(name, params)` is the single event API. On every call it:
  1. pushes `{ event: name, ...params }` onto `window.dataLayer` — **always**, even with no providers configured (useful for GTM-style debugging in DevTools), and
  2. forwards to `window.posthog.capture(name, params)` when the PostHog snippet is loaded.
- `trackEvent` is a no-op during SSR and swallows all errors — analytics can never break the page.
- GA4 receives events through the shared `dataLayer`/gtag; Clarity records sessions (no custom event wiring); PostHog receives explicit captures.

## Provider setup

### Google Analytics 4

1. GA → **Admin → Data Streams → Add stream (Web)** → create a GA4 property.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. Set `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX`.
4. Redeploy (the ID is inlined at build time). The gtag snippet loads only when this is set.

### Microsoft Clarity

1. [clarity.microsoft.com](https://clarity.microsoft.com) → **New project**.
2. Copy the **Project ID** from Settings → Setup.
3. Set `NEXT_PUBLIC_CLARITY_ID=<project-id>`. Redeploy.

### PostHog

1. PostHog → Project → **Settings → Project API Key**.
2. Set:
   - `NEXT_PUBLIC_POSTHOG_KEY=<project-api-key>`
   - `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com` (default; use `https://eu.i.posthog.com` for EU Cloud)
3. Redeploy. Initialized with `person_profiles: 'identified_only'`.

### Google Search Console

1. GSC → **Add property** (domain or URL-prefix).
2. Choose the **HTML tag** verification method; copy only the `content` attribute value.
3. Set `NEXT_PUBLIC_GSC_VERIFICATION=<token>` and redeploy.
4. Click **Verify** in GSC, then **Sitemaps → submit** `https://themicrobiomehome.com/sitemap.xml`.

## Events reference

| Event | Params | Where it fires |
|---|---|---|
| `article_view` | `article` (slug), `category`, `title` | `src/components/ArticleViewTracker.tsx` — on article page mount (`/<category>/<slug>`). |
| `affiliate_click` | `merchant`, `product`, `source_page`, `placement`, `subid` | `src/components/mdx/CTA.tsx` and `src/components/mdx/ProductCard.tsx` — on click of any affiliate link. A durable server-side JSON record also logs in `/go/[slug]` (see [AFFILIATE_LINKS.md](AFFILIATE_LINKS.md)). |
| `product_card_view` | `product`, `merchant`, `source_page`, `placement` | `src/components/mdx/ProductCard.tsx` — IntersectionObserver, fires once when the card is ≥35% visible. |
| `comparison_view` | `products` (comma-separated slugs), `source_page` | `src/components/mdx/ProductComparison.tsx` — IntersectionObserver, once when ≥35% visible. |
| `quiz_start` | — | `src/components/QuizClient.tsx` — on quiz mount and on restart. |
| `quiz_complete` | `categories`, `products` (comma-separated recommendation slugs) | `src/components/QuizClient.tsx` — once when a recommendation is computed. |
| `email_signup` | `source` | `src/components/NewsletterForm.tsx` — after a successful `/api/newsletter` response. The API route also logs `email_signup` server-side with `mode: "kit"` or `mode: "placeholder"`. |

## Behavior when envs are unset

| Condition | Behavior |
|---|---|
| No provider envs set | No snippets load; `trackEvent` still pushes to `window.dataLayer` (inspect in DevTools console: `dataLayer`). |
| `NEXT_PUBLIC_POSTHOG_KEY` unset | PostHog forwarding inside `trackEvent` silently skipped. |
| Newsletter `KIT_*` unset | `/api/newsletter` still validates and returns `{ ok: true, mode: "placeholder" }`; signup logged server-side. |

To verify wiring locally: run `npm run dev`, open DevTools console, type `dataLayer`, and click a product CTA — an `affiliate_click` object appears regardless of provider configuration.
