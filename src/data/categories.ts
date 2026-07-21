export const CATEGORIES = [
  {
    slug: "pet-home",
    name: "Pet Home",
    short: "Fresher rooms, happier pets",
    description:
      "Guides to keeping a home that smells fresh and feels calm when you share it with animals — from odor control to dander-aware routines.",
    cover: "/images/cover-pet-home.jpg",
  },
  {
    slug: "probiotic-cleaning",
    name: "Probiotic Cleaning",
    short: "Clean with biology, not brute force",
    description:
      "How probiotic surface cleaners work, when they make sense, and how to use them around kids and pets.",
    cover: "/images/cover-probiotic-cleaning.jpg",
  },
  {
    slug: "reviews",
    name: "Reviews",
    short: "Deep dives on individual products",
    description:
      "In-depth, methodology-driven reviews of microbiome-friendly products, with manufacturer claims clearly labeled.",
    cover: "/images/cover-reviews.jpg",
  },
  {
    slug: "comparisons",
    name: "Comparisons",
    short: "Side-by-side, spec-by-spec",
    description:
      "Head-to-head comparisons that put coverage, refills, price, and use cases next to each other so you can choose confidently.",
    cover: "/images/cover-comparisons.jpg",
  },
  {
    slug: "science",
    name: "Science",
    short: "The evidence, translated",
    description:
      "Plain-language explainers on the indoor microbiome, environmental probiotics, and what the research actually supports.",
    cover: "/images/cover-science.jpg",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS: readonly string[] = CATEGORIES.map((c) => c.slug);

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.includes(slug);
}
