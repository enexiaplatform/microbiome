"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

/** Hero search field that routes to /search?q=<query>. */
export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="mx-auto mt-8 flex w-full max-w-xl gap-2">
      <label htmlFor="hero-search" className="sr-only">
        Search guides and reviews
      </label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guides, reviews, comparisons…"
        className="w-full flex-1 rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-pine-300"
      />
      <button
        type="submit"
        className="rounded-xl bg-pine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
      >
        Search
      </button>
    </form>
  );
}
