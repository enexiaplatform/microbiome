import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/quiz", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reset-guide", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/search", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/affiliate-disclosure", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/editorial-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/review-methodology", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/health-disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: absoluteUrl(`/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: absoluteUrl(article.url),
    lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
