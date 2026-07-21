import Link from "next/link";
/**
 * FTC affiliate disclosure box. Rendered automatically near the top of any
 * article whose frontmatter lists products, and available inside MDX as
 * `<AffiliateDisclosure />`. Plain language, visible before any affiliate
 * link can appear.
 */
export default function AffiliateDisclosure() {
  return (
    <aside
      aria-label="Affiliate disclosure"
      className="not-prose my-6 rounded-2xl border border-hairline bg-sage-100 px-5 py-4"
    >
      <p className="text-sm leading-relaxed text-ink/80">
        <span className="font-semibold text-ink">Disclosure:</span> this article contains affiliate
        links. If you buy through them, we may earn a commission at no extra cost to you. It never
        influences what we say — manufacturer claims are always labeled, and we never make medical
        promises.{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-pine underline decoration-sage-400 underline-offset-2 hover:text-pine-800"
        >
          Read our full affiliate disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
