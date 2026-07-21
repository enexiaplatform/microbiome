import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/data/categories";

interface ArticleCardProps {
  article: ArticleMeta;
  /** Hides the category badge when the surrounding page already implies it. */
  showCategory?: boolean;
}

/** Editorial article card used on the home page, category hubs, and related lists. */
export default function ArticleCard({ article, showCategory = true }: ArticleCardProps) {
  const category = getCategory(article.category);
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 shadow-card transition-shadow hover:shadow-lg">
      {showCategory && category ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-pine">
          <Link href={`/${category.slug}`} className="hover:underline">
            {category.name}
          </Link>
        </p>
      ) : null}
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
        <Link href={article.url} className="transition-colors group-hover:text-pine">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{article.description}</p>
      <p className="mt-4 text-xs text-ink/55">
        {formatDate(article.publishedAt)} · {article.readingTimeMinutes} min read
      </p>
    </article>
  );
}
