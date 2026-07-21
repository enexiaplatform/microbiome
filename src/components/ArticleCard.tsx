import Image from "next/image";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-card transition-shadow hover:shadow-lg">
      {category ? (
        <Link href={article.url} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] overflow-hidden">
          <Image
            src={category.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </article>
  );
}
