import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import QuizClient from "@/components/QuizClient";

export const metadata: Metadata = {
  title: "Find your starting point — 60-second quiz",
  description:
    "Five questions about your home, your pets, and your budget. Get a personalized reading list and a shortlist of product categories to explore — no email required.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  const articles = getAllArticles();

  return (
    <div className="container-site py-14 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-pine">The 60-second quiz</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Where should you start?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          Answer five quick questions and we'll match you with the guides and product categories that
          fit your home. Reading guidance only — never health advice.
        </p>
      </header>

      <div className="mt-12">
        <QuizClient articles={articles} />
      </div>
    </div>
  );
}
