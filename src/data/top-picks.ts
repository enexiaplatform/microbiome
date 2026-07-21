/**
 * Homepage "Top picks" curation for the health & wellness audience.
 *
 * Display copy only — every product fact (price, specs, claims) comes from
 * src/data/products.ts. Only products with `verified: true` may appear here.
 */
export interface TopPick {
  /** Product slug from src/data/products.ts. */
  slug: string;
  /** Badge label shown on the card (e.g. "Best Overall"). */
  badge: string;
  /** One-line editorial rationale for the pick. */
  whyWePickedIt: string;
}

export const TOP_PICKS: readonly TopPick[] = [
  {
    slug: "biologic-mini",
    badge: "Best Overall",
    whyWePickedIt:
      "The easiest entry point into environmental probiotics — portable, quiet, and sized for the rooms you sleep in.",
  },
  {
    slug: "biotica-800",
    badge: "Best for Large Spaces",
    whyWePickedIt:
      "Continuous, automated coverage for open-plan living areas where a portable unit can't keep up.",
  },
  {
    slug: "purebiotics-all-purpose",
    badge: "Best Everyday Cleaner",
    whyWePickedIt:
      "A low-cost way to try probiotic cleaning on the surfaces you touch every day — no device required.",
  },
] as const;
