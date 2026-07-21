# Deployment

Primary target: **Vercel**. Alternative: any Node.js host via `next build` + `next start`.

## Vercel (recommended)

### 1. Import the repo

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project → Import Git Repository**.
3. Framework is auto-detected as **Next.js**. Leave defaults:
   - Build command: `next build`
   - Output: default (`.next`)
   - Install command: `npm install`

### 2. Set environment variables

In **Project Settings → Environment Variables**:

| Variable | Scope | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | `https://themicrobiomehome.com` (once the domain is live). |
| `NEXT_PUBLIC_GA4_ID` | Production | Optional — GA4 measurement ID. |
| `NEXT_PUBLIC_CLARITY_ID` | Production | Optional — Clarity project ID. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Production | Optional — PostHog project API key. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Production | Optional; defaults to `https://us.i.posthog.com`. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Production | Optional — GSC verification token (see step 5). |
| `KIT_API_KEY` + `KIT_FORM_ID` | Production | Optional — enables real newsletter signups via Kit. |
| `AFFILIATE_*` (6 vars) | Production | Optional — real affiliate URLs once programs are approved. See [AFFILIATE_LINKS.md](AFFILIATE_LINKS.md). |

No variable is required for a working deploy.

### 3. Production vs preview

- **Production**: deploys from the default branch; uses Production-scoped env vars.
- **Preview**: every PR/branch gets a preview URL. Keep analytics and affiliate vars Production-scoped so preview traffic doesn't pollute analytics or generate affiliate clicks.

### 4. Custom domain — themicrobiomehome.com

> **Owner action required:** the domain is **not yet purchased**.

1. Register `themicrobiomehome.com` at any registrar.
2. Vercel → **Project Settings → Domains → Add** `themicrobiomehome.com` (and `www.themicrobiomehome.com`).
3. At the registrar, point DNS per Vercel's instructions (A record `76.76.21.21` for apex, CNAME `cname.vercel-dns.com` for `www`).
4. Wait for issuance of the SSL certificate (automatic).
5. Set `NEXT_PUBLIC_SITE_URL=https://themicrobiomehome.com` in Vercel and **redeploy** — `NEXT_PUBLIC_*` values are inlined at build time, so a redeploy is required.

### 5. Post-deploy checklist

| Check | How |
|---|---|
| `sitemap.xml` | Visit `https://<domain>/sitemap.xml` — static routes, category routes, and article routes (if any) listed. |
| `robots.txt` | Visit `https://<domain>/robots.txt` — must disallow `/go/` and `/api/` and reference the sitemap. |
| `rss.xml` | Visit `https://<domain>/rss.xml` — RSS 2.0 feed of published articles (empty feed is valid with zero articles). |
| GSC verification | In Google Search Console, add the property, choose **HTML tag** verification, copy the `content` token into `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, verify. |
| Submit sitemap | GSC → Sitemaps → submit `https://themicrobiomehome.com/sitemap.xml`. |
| Newsletter | Submit a test email; with Kit unset, response is `{ ok: true, mode: "placeholder" }` and the signup is logged server-side. |
| Affiliate redirects | Click a product CTA; expect a 302 through `/go/<slug>` to the fallback product URL, with a JSON `affiliate_click` record in Vercel logs. |

## Alternative: any Node host

```bash
npm run build
npm run start   # next start — serves the production build
```

Requirements: Node 18.18+ or 20+, and all env vars set in the host environment before `next build` (for `NEXT_PUBLIC_*`) and before `next start` (for server-only vars). The app uses server routes (`/go/[slug]`, `/api/newsletter`), so a pure static export is **not** supported.
