import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import ArticleCard from "@/components/ArticleCard";
import CategoryIcon from "@/components/CategoryIcon";
import HeroSearch from "@/components/HeroSearch";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/mdx/ProductCard";

export const metadata: Metadata = {
  title: "Science-backed guides to a microbiome-friendly home",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const TRUST_POINTS = [
  {
    title: "Every claim is sourced",
    body: "We cite the research behind each guide and link you straight to it.",
  },
  {
    title: "Manufacturer claims, labeled",
    body: "When a brand says it, we say they said it — phrased as “The manufacturer states…”.",
  },
  {
    title: "No medical promises",
    body: "We cover home environments, not health outcomes. Ever. See our health disclaimer.",
  },
  {
    title: "A published methodology",
    body: "Our review process is documented so you can judge our conclusions yourself.",
  },
] as const;

const FEATURED_PRODUCTS = ["biologic-mini", "biotica-800", "purebiotics-all-purpose"];

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="container-site grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-pine">
              Environmental probiotics · Probiotic cleaning · The science, translated
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl lg:mx-0">
              {siteConfig.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 lg:mx-0">
              Calm, evidence-first guides to environmental probiotic purifiers and probiotic cleaners —
              what they are, what the research supports, and which ones are worth your money.
            </p>
            <HeroSearch />
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline shadow-card">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/cover-probiotic-cleaning.jpg"
                aria-label="A person wiping a kitchen counter with a spray bottle and cloth"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/images/hero-cleaning.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center text-xs text-ink/50 lg:text-left">
              Probiotic cleaning in a real kitchen — biology doing the work, not harsh chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section aria-labelledby="categories-heading" className="container-site py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="categories-heading" className="font-display text-3xl font-semibold tracking-tight text-ink">
              Start where you are
            </h2>
            <p className="mt-2 text-ink/70">Five doors into a microbiome-friendlier home.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group rounded-2xl border border-hairline bg-white p-6 shadow-card transition-shadow hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-pine">
                <CategoryIcon slug={category.slug} />
              </span>
              <p className="mt-4 font-display text-xl font-semibold text-ink transition-colors group-hover:text-pine">
                {category.name}
              </p>
              <p className="mt-1 text-sm font-medium text-pine">{category.short}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{category.description}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
                Explore
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                  <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </Link>
          ))}
          {/* Quiz tile fills the 6th grid slot */}
          <Link
            href="/quiz"
            className="group rounded-2xl border border-pine-200 bg-pine-50 p-6 transition-shadow hover:shadow-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pine">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M9.5 9.3A2.6 2.6 0 0 1 12 7.5c1.5 0 2.6 1 2.6 2.3 0 1.8-2.3 2.1-2.3 3.7" />
                <circle cx="12" cy="16.8" r="0.4" fill="currentColor" />
              </svg>
            </span>
            <p className="mt-4 font-display text-xl font-semibold text-ink transition-colors group-hover:text-pine">
              Not sure where to begin?
            </p>
            <p className="mt-1 text-sm font-medium text-pine">Take the 60-second quiz</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Five questions about your home, your pets, and your budget — get a reading list and a
              shortlist of product categories to explore.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
              Start the quiz
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section aria-labelledby="featured-heading" className="border-y border-hairline bg-white">
        <div className="container-site py-16 sm:py-20">
          <h2 id="featured-heading" className="font-display text-3xl font-semibold tracking-tight text-ink">
            The products we get asked about most
          </h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Environmental probiotic purifiers and probiotic cleaners, summarized from our reviews.
            Manufacturer claims are labeled — commissions never change our conclusions.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-1 xl:grid-cols-1">
            {FEATURED_PRODUCTS.map((slug) => (
              <ProductCard key={slug} slug={slug} placement="home_featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section aria-labelledby="trust-heading" className="container-site py-16 sm:py-20">
        <h2 id="trust-heading" className="font-display text-3xl font-semibold tracking-tight text-ink">
          Why trust The Microbiome Home
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-hairline bg-white p-6">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100">
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine">
                  <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-4 font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      <section aria-labelledby="latest-heading" className="border-y border-hairline bg-white">
        <div className="container-site py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 id="latest-heading" className="font-display text-3xl font-semibold tracking-tight text-ink">
              Latest guides
            </h2>
          </div>
          {latestArticles.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-hairline bg-paper p-10 text-center">
              <p className="font-display text-xl font-semibold text-ink">Our first guides are in the works</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
                The editorial team is finishing our launch articles now. Subscribe below and we'll let
                you know the moment they go live — or take the quiz to find your starting point.
              </p>
              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
              >
                Take the quiz
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quiz banner */}
      <section aria-labelledby="quiz-banner-heading" className="container-site py-16 sm:py-20">
        <div className="grid items-center gap-10 rounded-2xl bg-pine px-6 py-12 text-center sm:px-12 lg:grid-cols-[1fr_18rem] lg:text-left">
          <div>
            <h2 id="quiz-banner-heading" className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:mx-0">
              Find your starting point in 60 seconds
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-sage-200 lg:mx-0">
              Answer five questions about your home, your pets, and your priorities. We'll point you to
              the guides and product categories that fit — no email required.
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
            >
              Start the quiz
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="relative mx-auto hidden aspect-[4/3] w-full overflow-hidden rounded-xl lg:block">
            <Image
              src="/images/home-dalmatian-sofa.jpg"
              alt="A person relaxing on a light sofa with their dalmatian, greenery outside the window"
              fill
              sizes="18rem"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Reset guide CTA */}
      <section aria-labelledby="reset-heading" className="container-site pb-16 sm:pb-20">
        <div className="grid items-center gap-8 rounded-2xl border border-hairline bg-white p-8 shadow-card sm:p-12 lg:grid-cols-2">
          <div>
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src="/images/reset-guide.jpg"
                alt="A woman tidying striped pillows on a neatly made bed in soft daylight"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-pine">Free guide</p>
            <h2 id="reset-heading" className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              The 7-Day Microbiome-Friendly Home Reset
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              A gentle, room-by-room plan for resetting your home's cleaning routine — what to keep,
              what to swap, and where probiotics actually fit. No overwhelm, no harsh chemistry.
            </p>
            <Link
              href="/reset-guide"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
            >
              Get the free guide
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <ul className="space-y-3">
            {[
              "Day-by-day room resets that take under 30 minutes",
              "A simple framework: remove, replace, maintain",
              "Where probiotic cleaners earn their place — and where they don't",
              "A pet-aware checklist for every room",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl bg-sage-100 px-4 py-3 text-sm text-ink/80">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-pine">
                  <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section aria-labelledby="newsletter-heading" className="border-t border-hairline bg-sage-100">
        <div className="container-site py-16 text-center sm:py-20">
          <div className="relative mx-auto mb-8 aspect-[16/9] max-w-md overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/images/cat-sunlight.jpg"
              alt="A cat resting in a patch of warm sunlight on a sofa"
              fill
              sizes="28rem"
              className="object-cover"
            />
          </div>
          <h2 id="newsletter-heading" className="font-display text-3xl font-semibold tracking-tight text-ink">
            One calm email, once a week
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink/70">
            New guides, review updates, and the occasional deep-dive into the science of the indoor
            microbiome. No spam, no hype — unsubscribe anytime.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <NewsletterForm source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
