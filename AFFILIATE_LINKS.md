# Affiliate Links

All outbound product links route through a centralized redirect: `/go/<slug>`. No raw affiliate or product URLs appear in MDX content.

## How it works

```
MDX article
  <ProductCard slug="biologic-mini" />  or  <CTA product="..." placement="inline|end">
        │
        ▼   renders a link (rel="nofollow sponsored")
/go/biologic-mini?source=<page-path>&placement=<placement>
        │
        ▼   GET src/app/go/[slug]/route.ts  (server-side, force-dynamic)
  1. getAffiliateLink(slug)  →  env var AFFILIATE_<SLUG> if set, else fallback URL
  2. copy utm_* and subid query params onto the destination
  3. write a JSON affiliate_click record to the server log
  4. 302 redirect to the destination
        │
        ▼
merchant / product page
```

Resolution happens **server-side only**, so affiliate URLs from env vars are never exposed to the client bundle. Unknown slugs log `affiliate_click_unknown_slug` and 302 to `/`. A malformed env URL fails safe to `/`.

## Env-var-per-product convention

One env var per product slug, defined in `src/data/affiliate-links.ts` (`ENV_KEYS`) and `.env.example`:

| Slug | Env var | Fallback URL (when env unset) | Merchant |
|---|---|---|---|
| `biologic-mini` | `AFFILIATE_BIOLOGIC_MINI` | `https://shop.envirobiotics.com/products/biologic-mini` | EnviroBiotics |
| `biotica-800` | `AFFILIATE_BIOTICA_800` | `https://shop.envirobiotics.com/products/biotica-800` | EnviroBiotics |
| `ba-2080` | `AFFILIATE_BA_2080` | `https://envirobiotics.com` | EnviroBiotics |
| `e-biotic-pro` | `AFFILIATE_E_BIOTIC_PRO` | `https://envirobiotics.com` | EnviroBiotics |
| `purebiotics-all-purpose` | `AFFILIATE_PUREBIOTICS_ALL_PURPOSE` | `https://purebioticsusa.com` | PureBiotics |
| `purebiotics-pet` | `AFFILIATE_PUREBIOTICS_PET` | `https://purebioticsusa.com` | PureBiotics |

**Verification status** (as of 2026-07-19, per `src/data/products.ts`):

- **Public affiliate programs: UNVERIFIED for all products.** Whether EnviroBiotics or PureBiotics run public affiliate programs is unconfirmed — hence every destination is env-driven with a plain (non-affiliate) fallback. Until a program is confirmed, leave the env vars empty.
- **Product detail verification:** `biologic-mini`, `biotica-800`, `ba-2080`, `e-biotic-pro`, and `purebiotics-all-purpose` are `verified: true`. `purebiotics-pet` is `verified: false` (price and details to confirm) — the UI surfaces its verification note instead of hiding it.

## Connecting real affiliate links later (no code changes)

1. Apply to the merchant's affiliate program and get approved.
2. Copy your affiliate URL for the product.
3. Paste it into the matching `AFFILIATE_*` variable — locally in `.env.local`, in production in the Vercel dashboard (**Project Settings → Environment Variables**).
4. Redeploy. Every `/go/<slug>` link on the site now resolves to the affiliate URL. Content, components, and tracking params are untouched.

## Adding a NEW product link

Three coordinated additions:

1. **`src/data/products.ts`** — add a `Product` entry to `PRODUCTS`: `slug`, `name`, `brand`, `category` (`"air-purification"` or `"surface-cleaning"`), `price` (number or `null`), `coverage`, `format`, `refillCadence`, `bestFor`, `keyFeatures`, `manufacturerClaims` (phrased "The manufacturer states…"), `certifications` (verified only), `imageAlt`, `affiliateEnvKey`, `verified`, and `verificationNote` (required when `verified: false`).
2. **`src/data/affiliate-links.ts`** — add the slug to `DEFAULT_LINKS` (fallback `url` + `merchant`) and to `ENV_KEYS` (mapping to the new env var name).
3. **`.env.example`** — add the new `AFFILIATE_*` variable (empty).

Use the slug everywhere consistently: `products.ts` slug = `affiliate-links.ts` key = `<ProductCard slug="...">` / `<CTA product="...">` = `/go/<slug>`.

## Campaign tracking: subid / utm passthrough

The redirect route copies only `utm_*` and `subid` query params from the incoming `/go` URL onto the destination URL. To run a campaign:

```
/go/biotica-800?source=/reviews/biotica-800&placement=inline&subid=launch-email&utm_campaign=launch
```

`subid` is the conventional affiliate-network sub-ID; it lands on the merchant URL and in the click log. `source` and `placement` are recorded in the log but are **not** forwarded to the destination.

## What each click records

Every click writes one JSON line to the server log (`console.log` in the route — visible in Vercel logs or `next start` output):

```json
{
  "event": "affiliate_click",
  "merchant": "EnviroBiotics",
  "product": "biologic-mini",
  "source": "/reviews/biologic-mini",
  "placement": "inline",
  "subid": null,
  "ts": "2026-07-19T12:00:00.000Z"
}
```

Fields: `merchant`, `product` (slug), `source` (page path), `placement` (`card` / `inline` / `end`), `subid`, `ts` (ISO timestamp). Unknown slugs log `affiliate_click_unknown_slug` instead. A client-side `affiliate_click` analytics event also fires on click (see [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md)); the server log is the durable record.

## FTC disclosure

An affiliate disclosure box is **auto-rendered near the top of any article whose frontmatter `products` list is non-empty** — authors do not add it manually. A standalone disclosure page lives at `/affiliate-disclosure`. All affiliate anchors carry `rel="nofollow sponsored"`. Do not bypass `/go/` with raw outbound product links in MDX.
