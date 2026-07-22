/**
 * Product ground truth for The Microbiome Home.
 *
 * Facts in this file come from the brand research brief (as of 2026-07-19).
 * - Manufacturer claims are ALWAYS phrased as "The manufacturer states…".
 * - Certifications are listed only when verified in the brief.
 * - `verified: false` marks products whose details still need confirmation;
 *   UI surfaces must surface that status instead of hiding it.
 */

export type ProductCategory = "air-purification" | "surface-cleaning";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  /** Numeric price in USD, or null when not published / unverified. */
  price: number | null;
  /** Short qualifier shown next to the price (e.g. unverified refill pricing). */
  priceNote?: string;
  /** Room-size coverage summary. */
  coverage: string;
  /** Physical format / installation style. */
  format: string;
  /** Consumable replacement cadence. */
  refillCadence: string;
  /** "Best for" guidance used in comparison tables. */
  bestFor: string;
  keyFeatures: string[];
  /** Claims phrased strictly as "The manufacturer states…". */
  manufacturerClaims: string[];
  /** Verified certifications only; empty array when none are verified. */
  certifications: string[];
  /** Accessible alt description used wherever product imagery appears. */
  imageAlt: string;
  /** Optional manufacturer product photo under public/images/products/. */
  image?: string;
  /** Environment variable that holds the affiliate URL override. */
  affiliateEnvKey: string;
  /** False = details unverified; UI must flag instead of assert. */
  verified: boolean;
  /** Required when verified is false. */
  verificationNote?: string;
}

const enviroBioticsClaims: string[] = [
  "The manufacturer states the device releases environmental probiotics that reduce common allergens — including dust mite allergen, pet dander, mold spores, and pollen — in the air and on surfaces.",
  "The manufacturer states it reduces organic odors in the air and on surfaces.",
  "The manufacturer states it is chemical-free, fragrance-free, and produces no ozone.",
];

export const PRODUCTS: Product[] = [
  {
    slug: "biologic-mini",
    name: "BioLogic Mini (Gen 2)",
    brand: "EnviroBiotics",
    category: "air-purification",
    price: 98,
    coverage: "Up to 300 sq ft",
    format: "Portable, battery-powered",
    refillCadence: "Probiotic cartridge, about every 90 days",
    bestFor: "Bedrooms, nurseries, and small rooms up to 300 sq ft",
    keyFeatures: [
      "Covers up to 300 sq ft per unit",
      "Portable and battery-powered — move it room to room",
      "Probiotic cartridge lasts roughly 90 days",
      "No filters to replace",
      "Ultra-quiet operation",
    ],
    manufacturerClaims: enviroBioticsClaims,
    certifications: [],
    imageAlt:
      "EnviroBiotics BioLogic Mini (Gen 2), a small portable environmental probiotic purifier for rooms up to 300 square feet.",
    image: "/images/products/biologic-mini.jpg",
    affiliateEnvKey: "AFFILIATE_BIOLOGIC_MINI",
    verified: true,
  },
  {
    slug: "biotica-800",
    name: "Biotica 800",
    brand: "EnviroBiotics",
    category: "air-purification",
    price: 299,
    priceNote: "Refill cartridges about $59.99 (price from reseller, UNVERIFIED)",
    coverage: "Up to 800 sq ft",
    format: "Plug-in; wall-mount or freestanding",
    refillCadence: "Probiotic cartridge, about every 3 months",
    bestFor: "Living rooms and open spaces up to 800 sq ft",
    keyFeatures: [
      "Covers up to 800 sq ft per unit",
      "Plug-in design — wall-mount or freestanding",
      "Probiotic cartridge lasts about 3 months",
      "Continuous, automated probiotic dispersal",
    ],
    manufacturerClaims: enviroBioticsClaims,
    certifications: [],
    imageAlt:
      "EnviroBiotics Biotica 800 environmental probiotic purifier, shown as a slim plug-in unit for rooms up to 800 square feet.",
    image: "/images/products/biotica-800.jpg",
    affiliateEnvKey: "AFFILIATE_BIOTICA_800",
    verified: true,
  },
  {
    slug: "ba-2080",
    name: "BA 2080",
    brand: "EnviroBiotics",
    category: "air-purification",
    price: 995,
    coverage: "Up to 2,600 sq ft",
    format: "HEPA + probiotic hybrid unit",
    refillCadence: "Probiotic cartridge and HEPA filter per manufacturer schedule",
    bestFor: "Large homes and open-plan spaces up to 2,600 sq ft",
    keyFeatures: [
      "Combines HEPA filtration with environmental probiotic dispersal",
      "Covers up to 2,600 sq ft",
      "Designed for large, open-plan living areas",
    ],
    manufacturerClaims: [
      "The manufacturer states its HEPA filtration captures fine airborne particles while environmental probiotics treat air and surfaces.",
      ...enviroBioticsClaims,
    ],
    certifications: [],
    imageAlt:
      "EnviroBiotics BA 2080, a hybrid HEPA and probiotic air treatment unit for spaces up to 2,600 square feet.",
    affiliateEnvKey: "AFFILIATE_BA_2080",
    verified: true,
  },
  {
    slug: "e-biotic-pro",
    name: "E-Biotic Pro",
    brand: "EnviroBiotics",
    category: "air-purification",
    price: null,
    priceNote: "Price not published — contact the manufacturer",
    coverage: "Whole-home or commercial, via HVAC",
    format: "HVAC-integrated system",
    refillCadence: "Per manufacturer service schedule",
    bestFor: "Whole-home or commercial coverage through existing ductwork",
    keyFeatures: [
      "Integrates with existing HVAC systems",
      "Whole-home or commercial-scale coverage",
      "Probiotic dispersal through ductwork",
    ],
    manufacturerClaims: [
      "The manufacturer states the system disperses environmental probiotics through existing HVAC ductwork for whole-home or commercial coverage.",
      ...enviroBioticsClaims,
    ],
    certifications: [],
    imageAlt:
      "EnviroBiotics E-Biotic Pro, an HVAC-integrated environmental probiotic system for whole-home or commercial use.",
    affiliateEnvKey: "AFFILIATE_E_BIOTIC_PRO",
    verified: true,
  },
  {
    slug: "purebiotics-all-purpose",
    name: "Probiotic All-Purpose Cleaner",
    brand: "PureBiotics",
    category: "surface-cleaning",
    price: 14.95,
    coverage: "Household surfaces",
    format: "Ready-to-use spray cleaner (scented)",
    refillCadence: "None — consumable cleaner",
    bestFor: "Everyday probiotic surface cleaning",
    keyFeatures: [
      "Probiotic surface cleaner for everyday messes",
      "Ready-to-use all-purpose spray",
      "Scented formula; an unscented version is also offered",
      "An unscented version is Green Seal certified, per the manufacturer",
    ],
    manufacturerClaims: [
      "The manufacturer states the cleaner uses probiotic bacteria to break down organic soils and keep working on surfaces after application.",
      "The manufacturer states an unscented version of the formula is Green Seal certified.",
    ],
    certifications: ["Green Seal (unscented version, per manufacturer)"],
    imageAlt:
      "PureBiotics Probiotic All-Purpose Cleaner spray bottle for everyday household surface cleaning.",
    affiliateEnvKey: "AFFILIATE_PUREBIOTICS_ALL_PURPOSE",
    verified: true,
  },
  {
    slug: "purebiotics-pet",
    name: "Probiotic Pet Cleaner",
    brand: "PureBiotics",
    category: "surface-cleaning",
    price: null,
    priceNote: "Price unverified — details to confirm",
    coverage: "Pet areas and household surfaces",
    format: "Pet-oriented probiotic cleaner",
    refillCadence: "None — consumable cleaner",
    bestFor: "Pet messes and pet-area cleaning (details to confirm)",
    keyFeatures: [
      "Pet-oriented probiotic cleaning formula",
      "Targets organic pet messes and odors",
      "Full specifications still being confirmed",
    ],
    manufacturerClaims: [
      "The manufacturer states the pet formula targets organic pet messes and odors at the source. (Details to confirm.)",
    ],
    certifications: [],
    imageAlt:
      "PureBiotics probiotic pet cleaner, a pet-oriented surface cleaner for organic messes and odors.",
    affiliateEnvKey: "AFFILIATE_PUREBIOTICS_PET",
    verified: false,
    verificationNote:
      "Price and product details are unverified — confirm with the manufacturer before publishing further claims.",
  },
];

/** Context notes for content editors (rebrand history, affiliate status). */
export const brandNotes = {
  envirobioticsRebrand:
    "EnviroBiotics rebranded from BetterAir in 2025; older reviews and forum threads may still reference the BetterAir name.",
  affiliateProgramsUnverified:
    "Whether EnviroBiotics or PureBiotics run public affiliate programs is unverified; all outbound product links use configurable, env-driven placeholders.",
} as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(product: Product): string {
  if (product.price === null) return "See price";
  return `$${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}`;
}
