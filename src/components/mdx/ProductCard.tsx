"use client";

import Image from "next/image";
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
        {/* Manufacturer product photo when on file, else brand illustration */}
        {product.image ? (
          <div className="relative flex min-h-32 items-center justify-center bg-white max-sm:min-h-24">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={176}
              height={176}
              className="h-full max-h-44 w-auto object-contain p-3"
            />
          </div>
        ) : (
        <div
          role="img"
          aria-label={product.imageAlt}
          className="flex min-h-32 items-center justify-center bg-sage-100 max-sm:min-h-24"
        >
          {product.category === "air-purification" ? (
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-16 w-16 text-pine">
              <rect x="22" y="8" width="20" height="44" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M22 44h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="18" r="2" fill="currentColor" />
              <circle cx="28" cy="26" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="36" cy="26" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="32" cy="33" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="28" cy="38" r="1.2" fill="currentColor" opacity="0.5" />
              <circle cx="36" cy="38" r="1.2" fill="currentColor" opacity="0.5" />
              <path d="M14 20c2.5-1.5 2.5-4.5 0-6M50 20c-2.5-1.5-2.5-4.5 0-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M12 32c3-1.8 3-5.2 0-7M52 32c-3-1.8-3-5.2 0-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            </svg>
          ) : (
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-16 w-16 text-pine">
              <path d="M26 10h12v10H26z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M38 13.5h9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 8v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M54 10.5v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
              <path d="M27.5 20 24 27v24a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V27l-3.5-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M24 37h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <circle cx="30" cy="45" r="1.5" fill="currentColor" opacity="0.7" />
              <circle cx="35" cy="49" r="1.5" fill="currentColor" opacity="0.5" />
            </svg>
          )}
        </div>
        )}

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

          {product.coupon ? (
            <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-clay-200 bg-clay-100 px-3 py-2 text-xs font-semibold text-clay-700">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h9A1.5 1.5 0 0 1 14 5.5v1a2 2 0 0 0 0 3v1a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 10.5v-1a2 2 0 0 0 0-3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 4v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>
              {product.coupon.note} — code{" "}
              <span className="rounded bg-white px-1.5 py-0.5 font-mono font-bold tracking-wider text-clay">
                {product.coupon.code}
              </span>
            </p>
          ) : null}

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
