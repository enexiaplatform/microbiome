import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { isCategorySlug, type CategorySlug } from "@/data/categories";

/* ------------------------------------------------------------------------ */
/* Types — this contract is load-bearing. Other agents write MDX against it. */
/* ------------------------------------------------------------------------ */

export interface ArticleSource {
  title: string;
  url: string;
  publisher?: string;
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: CategorySlug;
  searchIntent: "commercial" | "informational";
  publishedAt: string;
  updatedAt: string;
  lastReviewed: string;
  author: string;
  keywords: string[];
  products: string[];
  sources: ArticleSource[];
  faq: ArticleFaq[];
  draft: boolean;
}

export interface ArticleMeta extends ArticleFrontmatter {
  readingTimeMinutes: number;
  url: string;
}

export interface Article extends ArticleMeta {
  /** Raw MDX body (frontmatter stripped). */
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

/* ------------------------------------------------------------------------ */
/* Parsing                                                                    */
/* ------------------------------------------------------------------------ */

function parseArticleFile(fileName: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, fileName);
  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  // Minimal contract validation — skip files that can't be rendered safely.
  if (typeof data.title !== "string" || typeof data.slug !== "string") return null;
  if (typeof data.category !== "string" || !isCategorySlug(data.category)) return null;

  const frontmatter: ArticleFrontmatter = {
    title: data.title,
    description: typeof data.description === "string" ? data.description : "",
    slug: data.slug,
    category: data.category,
    searchIntent: data.searchIntent === "commercial" ? "commercial" : "informational",
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "1970-01-01",
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : String(data.publishedAt ?? "1970-01-01"),
    lastReviewed:
      typeof data.lastReviewed === "string" ? data.lastReviewed : String(data.updatedAt ?? data.publishedAt ?? "1970-01-01"),
    author: typeof data.author === "string" ? data.author : "The Microbiome Home Editorial Team",
    keywords: Array.isArray(data.keywords) ? data.keywords.filter((k): k is string => typeof k === "string") : [],
    products: Array.isArray(data.products) ? data.products.filter((p): p is string => typeof p === "string") : [],
    sources: Array.isArray(data.sources) ? (data.sources as ArticleSource[]) : [],
    faq: Array.isArray(data.faq) ? (data.faq as ArticleFaq[]) : [],
    draft: data.draft === true,
  };

  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return {
    ...frontmatter,
    readingTimeMinutes,
    url: `/${frontmatter.category}/${frontmatter.slug}`,
    content,
  };
}

function readAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  let files: string[] = [];
  try {
    files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
  return files
    .map(parseArticleFile)
    .filter((a): a is Article => a !== null)
    .filter((a) => !a.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/* ------------------------------------------------------------------------ */
/* Public API                                                                 */
/* ------------------------------------------------------------------------ */

/** All published articles, sorted by publishedAt desc. Empty dir => []. */
export function getAllArticles(): ArticleMeta[] {
  return readAllArticles().map(({ content, ...meta }) => meta);
}

/** Single published article with body, or null (missing / draft / invalid). */
export function getArticle(slug: string): Article | null {
  const article = parseArticleFile(`${slug}.mdx`);
  if (!article || article.draft) return null;
  return article;
}

export function getByCategory(category: CategorySlug): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

/** Same-category articles excluding the current one, max `max`. */
export function getRelatedArticles(article: ArticleMeta, max = 3): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, max);
}

/** Extract h2 headings from raw MDX for the table of contents. */
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCodeFence = false;
  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[1].replace(/\{#[^}]+\}$/, "").trim();
      items.push({ id: slugger.slug(text), text });
    }
  }
  return items;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
