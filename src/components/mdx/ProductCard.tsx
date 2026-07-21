"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { formatPrice, getProduct } from "@/data/products";
import { trackEvent } from "@/lib/track";

interface ProductCardProps {
  /** Product slug from src/data/products.ts. */
  slug: string;
  /** Tracking placement label; the outbound URL always uses placement=card. */
  placement?: string;
}

/**
 * Product card driven by src/data/products.ts. Used in MDX as
 * `<ProductCard slug="biologic-mini" />` and reused on the quiz results and
 * home page. Tracks `product_card_view` once via IntersectionObserver and
 * `affiliate_click` on the CTA. Renders nothing for unknown slugs.
 */
export default function ProductCard({ slug, placement = "card" }: ProductCardProps) {
  const product = getProduct(slug);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (!product) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            trackEvent("product_card_view", {
              product: product.slug,
              merchant: product.brand,
              source_page: window.location.pathname,
              placement,
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product, placement]);

  if (!product) return null;

  const href = `/go/${product.slug}?source=${encodeURIComponent(pathname || "/")}&placement=${encodeURIComponent(
    placement,
  )}`;

  function handleClick() {
    if (!product) return;
    trackEvent("affiliate_click", {
      merchant: product.brand,
      product: product.slug,
      source_page: window.location.pathname,
      placement,
      subid: null,
    });
  }

  return (
    <div
      ref={rootRef}
      className="not-prose my-8 overflow-hidden rounded-2xl border border-hairline bg-white shadow-card"
    >
      <div className="grid sm:grid-cols-[11rem_1fr]">
        {/* Visual placeholder (no product photography on file) */}
        <div
          role="img"
          aria-label={product.imageAlt}
          className="flex min-h-32 items-center justify-center bg-sage-100 max-sm:min-h-24"
        >
          <span aria-hidden="true" className="font-display text-3xl font-semibold text-pine-300">
            {product.brand.slice(0, 1)}
            {product.name.slice(0, 1)}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{product.brand}</p>
              <h3 className="mt-0.5 font-display text-xl font-semibold text-ink">{product.name}</h3>
            </div>
            <div className="text-right">
              <p className="font-display text-xl font-semibold text-pine">{formatPrice(product)}</p>
              {product.priceNote ? <p className="mt-0.5 max-w-52 text-xs text-ink/55">{product.priceNote}</p> : null}
            </div>
          </div>

          {!product.verified && product.verificationNote ? (
            <p className="mt-3 rounded-lg border border-clay-200 bg-clay-100 px-3 py-2 text-xs leading-relaxed text-clay-700">
              {product.verificationNote}
            </p>
          ) : null}

          <ul className="mt-4 grid gap-1.5 text-sm text-ink/75 sm:grid-cols-2">
            {product.keyFeatures.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-pine">
                  <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {product.manufacturerClaims.length > 0 ? (
            <p className="mt-4 border-t border-hairline pt-3 text-xs italic leading-relaxed text-ink/60">
              {product.manufacturerClaims[0]}
            </p>
          ) : null}

          <div className="mt-5">
            <a
              href={href}
              onClick={handleClick}
              rel="nofollow sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-clay px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
            >
              Check current price
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
