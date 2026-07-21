"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SearchDoc } from "@/lib/search";

interface SearchClientProps {
  index: SearchDoc[];
  initialQuery?: string;
}

function score(doc: SearchDoc, query: string): number {
  const q = query.toLowerCase();
  let value = 0;
  if (doc.title.toLowerCase().includes(q)) value += 6;
  if (doc.keywords.some((k) => k.toLowerCase().includes(q))) value += 3;
  if (doc.categoryName.toLowerCase().includes(q)) value += 2;
  if (doc.description.toLowerCase().includes(q)) value += 1;
  return value;
}

/**
 * Accessible client-side search over the build-time index.
 * Keyboard: ArrowUp/ArrowDown move through results, Enter opens, Escape clears.
 */
export default function SearchClient({ index, initialQuery = "" }: SearchClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    return index
      .map((doc) => ({ doc, value: score(doc, trimmed) }))
      .filter((r) => r.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 12)
      .map((r) => r.doc);
  }, [index, query]);

  const showDropdown = query.trim().length >= 2;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((v) => Math.max(v - 1, -1));
    } else if (event.key === "Enter") {
      if (active >= 0 && results[active]) {
        event.preventDefault();
        router.push(results[active].url);
      }
    } else if (event.key === "Escape") {
      setQuery("");
      setActive(-1);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div role="search">
        <label htmlFor="site-search" className="sr-only">
          Search articles
        </label>
        <input
          id="site-search"
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-results"
          aria-activedescendant={active >= 0 ? `search-result-${active}` : undefined}
          autoComplete="off"
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Try “pet odors”, “probiotic cleaner”, “HEPA”…"
          className="w-full rounded-2xl border border-hairline bg-white px-5 py-4 text-base text-ink placeholder:text-ink/40 focus:border-pine-300"
        />
      </div>

      {showDropdown ? (
        <div className="mt-4" aria-live="polite">
          {results.length > 0 ? (
            <ul
              id="search-results"
              role="listbox"
              ref={listRef}
              aria-label="Search results"
              className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-card"
            >
              {results.map((doc, i) => (
                <li
                  key={doc.slug}
                  id={`search-result-${i}`}
                  role="option"
                  aria-selected={i === active}
                >
                  <Link
                    href={doc.url}
                    className={`block px-5 py-4 transition-colors ${i === active ? "bg-sage-100" : "hover:bg-sage-100"}`}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-pine">
                      {doc.categoryName}
                    </span>
                    <span className="mt-0.5 block font-semibold text-ink">{doc.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink/65">{doc.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-hairline bg-white p-8 text-center text-sm text-ink/60">
              Nothing matches “{query.trim()}” yet — try a broader term like “air”, “cleaning”, or
              “pets”.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink/55">
          {index.length > 0
            ? `Searching ${index.length} article${index.length === 1 ? "" : "s"}. Type at least two characters.`
            : "Our first articles are being written — search will light up as soon as they publish."}
        </p>
      )}
    </div>
  );
}
