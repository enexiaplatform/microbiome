"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import { getQuizRecommendation, quizQuestions } from "@/data/quiz";
import type { ArticleMeta } from "@/lib/content";
import { trackEvent } from "@/lib/track";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/mdx/ProductCard";

interface QuizClientProps {
  /** All published articles (build-time), used for recommendations. */
  articles: ArticleMeta[];
}

/**
 * Interactive quiz. Recommends CONTENT + PRODUCT CATEGORIES only — never
 * health advice. Tracks `quiz_start` on mount and `quiz_complete` when the
 * result screen is reached.
 */
export default function QuizClient({ articles }: QuizClientProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const trackedComplete = useRef(false);

  useEffect(() => {
    trackEvent("quiz_start");
  }, []);

  const question = quizQuestions[step];
  const total = quizQuestions.length;
  const selected = question ? answers[question.id] : undefined;

  const recommendation = useMemo(() => (done ? getQuizRecommendation(answers) : null), [done, answers]);

  useEffect(() => {
    if (done && recommendation && !trackedComplete.current) {
      trackedComplete.current = true;
      trackEvent("quiz_complete", {
        categories: recommendation.categories.join(","),
        products: recommendation.products.join(","),
      });
    }
  }, [done, recommendation]);

  const recommendedArticles = useMemo(() => {
    if (!recommendation) return [];
    const picked: ArticleMeta[] = [];
    for (const category of recommendation.categories) {
      for (const article of articles) {
        if (picked.length >= 3) break;
        if (article.category === category && !picked.some((p) => p.slug === article.slug)) {
          picked.push(article);
        }
      }
      if (picked.length >= 3) break;
    }
    return picked;
  }, [recommendation, articles]);

  function choose(value: string) {
    if (!question) return;
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    trackedComplete.current = false;
    trackEvent("quiz_start");
  }

  /* ------------------------------ Result ------------------------------ */
  if (done && recommendation) {
    return (
      <div>
        <div className="rounded-2xl bg-pine px-6 py-10 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sage-300">Your results</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white">
            {recommendation.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sage-200">{recommendation.blurb}</p>
        </div>

        <section aria-labelledby="quiz-read-heading" className="mt-12">
          <h3 id="quiz-read-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Start with these sections
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {recommendation.categories.map((slug) => {
              const category = getCategory(slug);
              if (!category) return null;
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-full border border-pine-300 bg-pine-50 px-5 py-2.5 text-sm font-semibold text-pine-800 transition-colors hover:bg-sage-200"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          {recommendedArticles.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-hairline bg-white p-6 text-sm text-ink/60">
              Our launch articles for these sections are being written right now — check back soon, or
              subscribe on the home page to hear when they land.
            </p>
          )}
        </section>

        {recommendation.products.length > 0 ? (
          <section aria-labelledby="quiz-products-heading" className="mt-12">
            <h3 id="quiz-products-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
              Product categories worth a look
            </h3>
            <p className="mt-2 text-sm text-ink/65">
              Matched to your space and budget. Manufacturer claims are labeled; we may earn a
              commission if you buy through our links.
            </p>
            <div className="mt-4">
              {recommendation.products.map((slug) => (
                <ProductCard key={slug} slug={slug} placement="quiz_result" />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={restart}
            className="rounded-xl border border-hairline bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-100"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ Questions ---------------------------- */
  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div aria-hidden="true" className="flex gap-1.5">
        {quizQuestions.map((q, index) => (
          <span
            key={q.id}
            className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-pine" : "bg-hairline"}`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-ink/55">
        Question {step + 1} of {total}
      </p>

      <fieldset className="mt-6">
        <legend className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {question.question}
        </legend>
        {question.helper ? <p className="mt-2 text-sm text-ink/60">{question.helper}</p> : null}

        <div className="mt-6 grid gap-3">
          {question.options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => choose(option.value)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition-colors ${
                  isSelected
                    ? "border-pine bg-pine-50 text-pine-800"
                    : "border-hairline bg-white text-ink/80 hover:border-sage-400 hover:bg-sage-100"
                }`}
              >
                {option.label}
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-ink/35">
                  <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            );
          })}
        </div>
      </fieldset>

      {step > 0 ? (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-6 text-sm font-medium text-ink/60 underline decoration-sage-400 underline-offset-2 hover:text-pine"
        >
          Back to previous question
        </button>
      ) : null}
    </div>
  );
}
