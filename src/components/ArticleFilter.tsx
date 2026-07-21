"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

type IntentFilter = "all" | "commercial" | "informational";

const CHIPS: { value: IntentFilter; label: string }[] = [
  { value: "all", label: "All articles" },
  { value: "commercial", label: "Buying guides" },
  { value: "informational", label: "Explainers" },
];

interface ArticleFilterProps {
  articles: ArticleMeta[];
}

/** Search-intent filter chips + article grid for category hubs. */
export default function ArticleFilter({ articles }: ArticleFilterProps) {
  const [filter, setFilter] = useState<IntentFilter>("all");

  const visible = filter === "all" ? articles : articles.filter((a) => a.searchIntent === filter);

  return (
    <div>
      <div role="group" aria-label="Filter articles by type" className="flex flex-wrap gap-2">
        {CHIPS.map((chip) => {
          const active = filter === chip.value;
          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-pine bg-pine text-white"
                  : "border-hairline bg-white text-ink/70 hover:border-sage-400 hover:text-ink"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} showCategory={false} />
          ))}
        </div>
      ) : (
        <p role="status" className="mt-8 rounded-2xl border border-dashed border-hairline bg-white p-8 text-center text-sm text-ink/60">
          No articles in this group yet — try a different filter.
        </p>
      )}
    </div>
  );
}
