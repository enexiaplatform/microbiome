import { getAllArticles } from "./content";
import { getCategory } from "@/data/categories";

export interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  keywords: string[];
  url: string;
}

/**
 * Build-time search index. Called from the /search page (SSG), so the index
 * is frozen into the static page at build time and searched client-side.
 */
export function buildSearchIndex(): SearchDoc[] {
  return getAllArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    categoryName: getCategory(a.category)?.name ?? a.category,
    keywords: a.keywords,
    url: a.url,
  }));
}
