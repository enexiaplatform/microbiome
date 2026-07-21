import type { Metadata } from "next";
import { Suspense } from "react";
import { buildSearchIndex } from "@/lib/search";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every guide, review, and comparison on The Microbiome Home.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const raw = params.q;
  const initialQuery = typeof raw === "string" ? raw : "";
  const index = buildSearchIndex();

  return (
    <div className="container-site py-14 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Search the site
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          Every guide, review, and comparison — searchable by topic, product, or problem.
        </p>
      </header>
      <div className="mt-10">
        <Suspense>
          <SearchClient index={index} initialQuery={initialQuery} />
        </Suspense>
      </div>
    </div>
  );
}
