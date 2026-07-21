import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, isCategorySlug } from "@/data/categories";
import { getByCategory } from "@/lib/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleFilter from "@/components/ArticleFilter";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      title: `${category.name} | The Microbiome Home`,
      description: category.description,
      url: `/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  if (!isCategorySlug(slug)) notFound();
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getByCategory(category.slug);

  return (
    <div className="container-site py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />

      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-pine">{category.short}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">{category.description}</p>
      </header>

      <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl border border-hairline">
        <Image
          src={category.cover}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-10">
        {articles.length > 0 ? (
          <ArticleFilter articles={articles} />
        ) : (
          <div className="rounded-2xl border border-dashed border-hairline bg-white p-10 text-center">
            <p className="font-display text-xl font-semibold text-ink">Articles are on the way</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
              We're writing this section now. In the meantime, take the quiz for a personalized
              reading list, or browse the rest of the site.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/quiz"
                className="rounded-xl bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
              >
                Take the quiz
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-hairline bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sage-100"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
