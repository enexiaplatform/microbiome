# content/social/ — Social Content Index

> Operating rules: **`SOCIAL_MEDIA.md`** (repo root) — binding. Claims standard: **`CLAIMS_POLICY.md`**. Link mechanics: **`AFFILIATE_LINKS.md`**.

## Structure

| Folder | Contents |
|--------|----------|
| `launch/` | Pre-built launch packs covering the first batch of articles. Four packs: `video-scripts-tiktok-reels-shorts.md`, `instagram-pack.md`, `pinterest-pack.md`, `facebook-x-linkedin-pack.md` |
| `weekly/` | Cron-generated batches: `YYYY-MM-DD.md`. Each contains the next backlog article(s) expanded into the full derivative set (video script, carousel, 2 pins, X thread, FB post) with UTM-tagged article links |

## Rules reminder (non-negotiable)

- **Claims:** every post inherits CLAIMS_POLICY.md. Manufacturer claims stay attributed ("the brand says…"); hospital-study citations always carry the "studies were in hospitals, not homes — home-use evidence is limited" caveat. Social-banned: "detox", health testimonials, before/after health claims, "vet recommended", fear hooks.
- **FTC:** disclosure in the format itself (`#ad` / "affiliate link" before the fold) on any post mentioning linked products. Links always go to **site articles**, never raw affiliate or merchant URLs. No Amazon links in DMs, email, or closed groups.
- **UTM:** `utm_source=<platform>`, `utm_medium=social`, `utm_campaign=launch|weekly|evergreen`. See SOCIAL_MEDIA.md §6.

## Getting a new batch

Weekly batches are generated automatically by the scheduled cron task into `weekly/`. To request one manually: ask Kimi to "generate this week's social batch" — it pulls the next article(s) from the waterfall backlog (SOCIAL_MEDIA.md §2) and writes `weekly/YYYY-MM-DD.md`.

**Owner workflow:** review the batch (15 min) → edit for voice → paste into free native schedulers (Pinterest scheduler, Meta Business Suite, TikTok Studio) → mark done. Full cadence: SOCIAL_MEDIA.md §3.
