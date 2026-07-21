"use client";

import { useEffect, useRef } from "react";
import { formatPrice, getProduct, type Product } from "@/data/products";
import { trackEvent } from "@/lib/track";

interface ProductComparisonProps {
  /** Comma-separated product slugs, e.g. "biologic-mini,biotica-800". */
  slugs: string;
}

/**
 * Responsive comparison table (price, coverage, format, refill cadence,
 * best for). Used in MDX as `<ProductComparison slugs="a,b" />`.
 * Tracks `comparison_view` once when scrolled into view.
 */
export default function ProductComparison({ slugs }: ProductComparisonProps) {
  const products = slugs
    .split(",")
    .map((s) => getProduct(s.trim()))
    .filter((p): p is Product => Boolean(p));

  const rootRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const joinedSlugs = products.map((p) => p.slug).join(",");

  useEffect(() => {
    const el = rootRef.current;
    if (!el || products.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            trackEvent("comparison_view", {
              products: joinedSlugs,
              source_page: window.location.pathname,
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [products.length, joinedSlugs]);

  if (products.length === 0) return null;

  return (
    <div ref={rootRef} className="not-prose my-8 overflow-x-auto rounded-2xl border border-hairline bg-white shadow-card">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <caption className="px-5 pt-4 text-left text-xs font-semibold uppercase tracking-wide text-ink/50">
          Side-by-side comparison
        </caption>
        <thead>
          <tr className="border-b border-hairline">
            <th scope="col" className="px-5 py-3 font-medium text-ink/50">
              <span className="sr-only">Attribute</span>
            </th>
            {products.map((p) => (
              <th key={p.slug} scope="col" className="px-5 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50">{p.brand}</span>
                <span className="mt-0.5 block font-display text-base font-semibold text-ink">{p.name}</span>
                {!p.verified ? (
                  <span className="mt-1 inline-block rounded-full bg-clay-100 px-2 py-0.5 text-[11px] font-medium text-clay-700">
                    Details unverified
                  </span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-ink/75">
          <tr className="border-b border-hairline">
            <th scope="row" className="px-5 py-3 align-top text-xs font-semibold uppercase tracking-wide text-ink/50">
              Price
            </th>
            {products.map((p) => (
              <td key={p.slug} className="px-5 py-3 align-top">
                <span className="font-semibold text-pine">{formatPrice(p)}</span>
                {p.priceNote ? <span className="mt-0.5 block text-xs text-ink/55">{p.priceNote}</span> : null}
              </td>
            ))}
          </tr>
          <tr className="border-b border-hairline">
            <th scope="row" className="px-5 py-3 align-top text-xs font-semibold uppercase tracking-wide text-ink/50">
              Coverage
            </th>
            {products.map((p) => (
              <td key={p.slug} className="px-5 py-3 align-top">
                {p.coverage}
              </td>
            ))}
          </tr>
          <tr className="border-b border-hairline">
            <th scope="row" className="px-5 py-3 align-top text-xs font-semibold uppercase tracking-wide text-ink/50">
              Format
            </th>
            {products.map((p) => (
              <td key={p.slug} className="px-5 py-3 align-top">
                {p.format}
              </td>
            ))}
          </tr>
          <tr className="border-b border-hairline">
            <th scope="row" className="px-5 py-3 align-top text-xs font-semibold uppercase tracking-wide text-ink/50">
              Refills
            </th>
            {products.map((p) => (
              <td key={p.slug} className="px-5 py-3 align-top">
                {p.refillCadence}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="px-5 py-3 align-top text-xs font-semibold uppercase tracking-wide text-ink/50">
              Best for
            </th>
            {products.map((p) => (
              <td key={p.slug} className="px-5 py-3 align-top">
                {p.bestFor}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
