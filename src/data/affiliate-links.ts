/**
 * Affiliate link resolution.
 *
 * EnviroBiotics referral program is CONFIRMED (as of 2026-07-21):
 * 15% commission via ?ref=MICROBIOME, plus coupon code MICROBIOME for
 * 10% off at checkout. PureBiotics remains UNVERIFIED.
 * Every destination is still env-overridable: set AFFILIATE_<SLUG> to a
 * different affiliate URL when needed, otherwise the default is used.
 * Resolution happens server-side only (in /go/[slug]) so env values are
 * never exposed to the client bundle.
 */

export interface AffiliateLink {
  url: string;
  merchant: string;
}

const EB_REF = "?ref=MICROBIOME";

const DEFAULT_LINKS: Record<string, AffiliateLink> = {
  "biologic-mini": {
    url: `https://shop.envirobiotics.com/products/biologic-mini${EB_REF}`,
    merchant: "EnviroBiotics",
  },
  "biotica-800": {
    url: `https://shop.envirobiotics.com/products/biotica-800${EB_REF}`,
    merchant: "EnviroBiotics",
  },
  "ba-2080": {
    url: `https://shop.envirobiotics.com/collections/all${EB_REF}`,
    merchant: "EnviroBiotics",
  },
  "e-biotic-pro": {
    url: `https://shop.envirobiotics.com/collections/all${EB_REF}`,
    merchant: "EnviroBiotics",
  },
  "purebiotics-all-purpose": {
    url: "https://purebioticsusa.com",
    merchant: "PureBiotics",
  },
  "purebiotics-pet": {
    url: "https://purebioticsusa.com",
    merchant: "PureBiotics",
  },
};

const ENV_KEYS: Record<string, string> = {
  "biologic-mini": "AFFILIATE_BIOLOGIC_MINI",
  "biotica-800": "AFFILIATE_BIOTICA_800",
  "ba-2080": "AFFILIATE_BA_2080",
  "e-biotic-pro": "AFFILIATE_E_BIOTIC_PRO",
  "purebiotics-all-purpose": "AFFILIATE_PUREBIOTICS_ALL_PURPOSE",
  "purebiotics-pet": "AFFILIATE_PUREBIOTICS_PET",
};

/** Returns the resolved link for a product slug, or null for unknown slugs. */
export function getAffiliateLink(slug: string): AffiliateLink | null {
  const fallback = DEFAULT_LINKS[slug];
  if (!fallback) return null;
  const envKey = ENV_KEYS[slug];
  const envUrl = envKey ? process.env[envKey]?.trim() : undefined;
  return {
    url: envUrl && envUrl.length > 0 ? envUrl : fallback.url,
    merchant: fallback.merchant,
  };
}

export function hasAffiliateSlug(slug: string): boolean {
  return slug in DEFAULT_LINKS;
}
