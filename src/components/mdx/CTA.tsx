"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getProduct } from "@/data/products";
import { trackEvent } from "@/lib/track";

interface CTAProps {
  /** Product slug from src/data/products.ts. */
  product: string;
  /** Where the CTA sits; flows into the /go URL and tracking. */
  placement: "inline" | "end";
  children?: ReactNode;
}

/**
 * Clay affiliate button → /go/<slug>?source=<page>&placement=<placement>.
 * Tracks `affiliate_click` with merchant, product, source_page, placement.
 * Renders nothing for unknown product slugs.
 */
export default function CTA({ product, placement, children }: CTAProps) {
  const pathname = usePathname();
  const resolved = getProduct(product);
  if (!resolved) return null;

  const href = `/go/${resolved.slug}?source=${encodeURIComponent(pathname || "/")}&placement=${encodeURIComponent(
    placement,
  )}`;

  function handleClick() {
    if (!resolved) return;
    trackEvent("affiliate_click", {
      merchant: resolved.brand,
      product: resolved.slug,
      source_page: window.location.pathname,
      placement,
      subid: null,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      rel="nofollow sponsored"
      className="not-prose my-4 inline-flex items-center gap-2 rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
    >
      {children ?? "Check current price"}
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
