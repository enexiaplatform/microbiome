export const siteConfig = {
  name: "The Microbiome Home",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://themicrobiomehome.com").replace(/\/$/, ""),
  tagline: "Science-backed guides to a microbiome-friendly home — for you and your pets.",
  description:
    "The Microbiome Home publishes science-informed guides, reviews, and comparisons of microbiome-friendly products for your home and your pets — environmental probiotic purifiers, probiotic cleaners, and more. Every claim is sourced, manufacturer statements are labeled, and we never make medical claims.",
  email: "hello@themicrobiomehome.com",
  author: "The Microbiome Home Editorial Team",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
