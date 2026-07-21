import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/content";
import { getCategory } from "@/data/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

interface OgImageProps {
  params: Promise<{ category: string; slug: string }>;
}

/** Per-article Open Graph image with brand styling. */
export default async function ArticleOgImage({ params }: OgImageProps) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "The Microbiome Home";
  const categoryName = getCategory(article?.category ?? category)?.name ?? "Guides";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF8F4",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "#245A3C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAF8F4",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#1C2B23" }}>The Microbiome Home</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#245A3C",
            }}
          >
            {categoryName}
          </span>
          <span
            style={{
              fontSize: title.length > 80 ? 44 : 56,
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#1C2B23",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 4, backgroundColor: "#C2713B", borderRadius: 2 }} />
          <span style={{ fontSize: 20, color: "#5C7A66" }}>
            Science-backed guides to a microbiome-friendly home
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
