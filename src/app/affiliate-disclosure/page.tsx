import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How The Microbiome Home uses affiliate links, what we earn, and why commissions never influence our reviews or rankings.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <ProsePage
      title="Affiliate Disclosure"
      intro="Plain language, because the FTC prefers it that way — and so do we."
      updated="July 2026"
    >
      <h2>The short version</h2>
      <p>
        Some links on The Microbiome Home are affiliate links. If you click one and make a purchase,
        we may earn a commission from the merchant <strong>at no additional cost to you</strong>.
        The price you pay is the same whether you use our link or not.
      </p>

      <h2>Where affiliate links appear</h2>
      <p>
        Affiliate links appear in product cards, comparison tables, and call-to-action buttons
        across the site, including articles in our <Link href="/reviews">Reviews</Link> and{" "}
        <Link href="/comparisons">Comparisons</Link> sections. Articles that contain affiliate links
        display a disclosure box near the top, before any affiliate link can appear.
      </p>

      <h2>What commissions do — and don't do</h2>
      <ul>
        <li>
          Commissions <strong>do</strong> keep the site running: research time, writing, hosting,
          and maintenance.
        </li>
        <li>
          Commissions <strong>do not</strong> influence which products we cover, how we score them,
          what we say about them, or the order in which they appear.
        </li>
        <li>
          Manufacturers and merchants <strong>cannot</strong> pay for coverage, reviews, placement,
          or editorial changes of any kind.
        </li>
      </ul>

      <h2>How we label claims</h2>
      <p>
        Product performance statements made by manufacturers are always attributed — phrased as “The
        manufacturer states…” — so you can tell the difference between a brand's marketing and
        independently verifiable information. Where we could not verify a claim, certification, or
        price, we say so explicitly on the page.
      </p>

      <h2>FTC compliance</h2>
      <p>
        This disclosure is provided in accordance with the Federal Trade Commission's guidance on
        the use of endorsements and testimonials in advertising (16 CFR Part 255). Our goal is to
        meet both the letter and the spirit of that guidance: disclosures that are clear, prominent,
        and impossible to miss.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, ask us — see our <Link href="/contact">contact page</Link>. Related
        reading: <Link href="/editorial-policy">editorial policy</Link>,{" "}
        <Link href="/review-methodology">review methodology</Link>, and{" "}
        <Link href="/health-disclaimer">health disclaimer</Link>.
      </p>
    </ProsePage>
  );
}
