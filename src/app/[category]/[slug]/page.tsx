import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getCategory, isCategorySlug } from "@/data/categories";
import { getProduct } from "@/data/products";
import {
  extractToc,
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { mdxComponents } from "@/components/mdx";
import AffiliateDisclosure from "@/components/mdx/AffiliateDisclosure";
import CTA from "@/components/mdx/CTA";
import ArticleCard from "@/components/ArticleCard";
import ArticleViewTracker from "@/components/ArticleViewTracker";
import AuthorBox from "@/components/AuthorBox";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import TableOfContents from "@/components/TableOfContents";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

async function getValidArticle(params: ArticlePageProps["params"]) {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) return null;
  const article = getArticle(slug);
  if (!article || article.category !== category) return null;
  return article;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getValidArticle(params);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: article.url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: absoluteUrl(article.url),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getValidArticle(params);
  if (!article) notFound();

  const category = getCategory(article.category);
  const toc = extractToc(article.content);
  const related = getRelatedArticles(article, 3);
  const hasProducts = article.products.length > 0;
  const endCtaProduct = hasProducts ? getProduct(article.products[0]) : undefined;

  return (
    <div className="container-site py-12 sm:py-16">
      <ArticleViewTracker slug={article.slug} category={article.category} title={article.title} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            author: { "@type": "Organization", name: article.author, url: siteConfig.url },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            mainEntityOfPage: absoluteUrl(article.url),
            image: absoluteUrl(`${article.url}/opengraph-image`),
            keywords: article.keywords.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: category?.name ?? article.category,
                item: absoluteUrl(`/${article.category}`),
              },
              { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(article.url) },
            ],
          },
          ...(article.faq.length > 0
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: article.faq.map((item) => ({
                    "@type": "Question",
                    name: item.q,
                    acceptedAnswer: { "@type": "Answer", text: item.a },
                  })),
                },
              ]
            : []),
        ]}
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <article className="min-w-0">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: category?.name ?? article.category, href: `/${article.category}` },
              { label: article.title },
            ]}
          />

          <header className="mt-8">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-ink/60">
              {article.author} · Last reviewed {formatDate(article.lastReviewed)} ·{" "}
              {article.readingTimeMinutes} min read
            </p>
            {category ? (
              <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl border border-hairline">
                <Image
                  src={category.cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 60rem, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </header>

          {hasProducts ? <AffiliateDisclosure /> : null}

          <TableOfContents items={toc} variant="mobile" />

          <div className="prose mt-8 max-w-article">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {article.faq.length > 0 ? (
            <section aria-labelledby="faq-heading" className="mt-12">
              <h2 id="faq-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
                Frequently asked questions
              </h2>
              <div className="mt-5 space-y-3">
                {article.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-hairline bg-white px-5 py-4"
                  >
                    <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {item.q}
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-open:rotate-45"
                        >
                          <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {article.sources.length > 0 ? (
            <section aria-labelledby="sources-heading" className="mt-12">
              <h2 id="sources-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
                Sources
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink/75">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-pine hover:underline"
                    >
                      {source.title}
                    </a>
                    {source.publisher ? <span className="text-ink/55"> — {source.publisher}</span> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <AuthorBox author={article.author} />

          {endCtaProduct ? (
            <section
              aria-labelledby="end-cta-heading"
              className="mt-12 rounded-2xl bg-pine px-6 py-10 text-center sm:px-10"
            >
              <h2 id="end-cta-heading" className="font-display text-2xl font-semibold tracking-tight text-white">
                Ready to explore {endCtaProduct.brand} {endCtaProduct.name}?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-sage-200">
                We may earn a commission if you buy through this link — it never changes our
                conclusions, and manufacturer claims are always labeled.
              </p>
              <div className="mt-6">
                <CTA product={endCtaProduct.slug} placement="end">
                  Check current price
                </CTA>
              </div>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section aria-labelledby="related-heading" className="mt-14">
              <h2 id="related-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
                Keep reading
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} showCategory={false} />
                ))}
              </div>
              <p className="mt-6 text-sm">
                <Link href={`/${article.category}`} className="font-medium text-pine hover:underline">
                  More in {category?.name ?? article.category} →
                </Link>
              </p>
            </section>
          ) : null}
        </article>

        <div className="mt-10 lg:mt-24">
          <TableOfContents items={toc} variant="sidebar" />
        </div>
      </div>
    </div>
  );
}
