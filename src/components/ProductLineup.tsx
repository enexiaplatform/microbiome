import { PRODUCTS, formatPrice, type Product } from "@/data/products";

interface ProductLineupProps {
  /** Product slugs to render, in display order. */
  slugs: string[];
  /** Tracking placement label appended to the /go redirect. */
  placement?: string;
}

/**
 * Compact "pick by room size" lineup strip. Links go straight through the
 * /go redirect (which logs affiliate_click server-side), so this stays a
 * server component.
 */
export default function ProductLineup({ slugs, placement = "lineup" }: ProductLineupProps) {
  const products = slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <a
          key={product.slug}
          href={`/go/${product.slug}?source=/&placement=${placement}`}
          rel="nofollow sponsored"
          className="group flex flex-col rounded-2xl border border-hairline bg-paper p-5 transition-shadow hover:shadow-card"
        >
          <div className="flex items-center justify-between gap-2">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size product thumb
              <img src={product.image} alt={product.imageAlt} className="h-16 w-16 rounded-lg bg-white object-contain p-1" />
            ) : (
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-10 w-10 text-pine">
              <rect x="22" y="8" width="20" height="44" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M22 44h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="18" r="2" fill="currentColor" />
              <circle cx="28" cy="26" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="36" cy="26" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="32" cy="33" r="1.4" fill="currentColor" opacity="0.7" />
              <path d="M14 20c2.5-1.5 2.5-4.5 0-6M50 20c-2.5-1.5-2.5-4.5 0-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
            )}
            <p className="font-display text-lg font-semibold text-pine">{formatPrice(product)}</p>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/50">{product.brand}</p>
          <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-pine">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-pine">{product.coverage}</p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{product.bestFor}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
            Check current price
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
              <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </a>
      ))}
    </div>
  );
}
