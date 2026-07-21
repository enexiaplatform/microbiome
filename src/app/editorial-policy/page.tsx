import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "The standards behind every article on The Microbiome Home: sourcing, attribution, corrections, and the line between editorial and revenue.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <ProsePage
      title="Editorial Policy"
      intro="The standards every article on this site is held to — and how we enforce them."
      updated="July 2026"
    >
      <h2>1. Independence</h2>
      <p>
        Editorial decisions are made by the editorial team alone. Advertisers, affiliates,
        manufacturers, and merchants have no input into what we cover, what we conclude, or how we
        phrase it. We do not accept sponsored content, paid reviews, or “advertorials,” and we do
        not let brands preview or approve articles before publication.
      </p>

      <h2>2. Sourcing</h2>
      <p>
        Factual claims about science, product specifications, certifications, and pricing must be
        traceable to a source: peer-reviewed research, official documentation, standards bodies, or
        the manufacturer's own published materials. Sources are listed at the end of each article
        with links so readers can verify them independently.
      </p>

      <h2>3. Attribution of manufacturer claims</h2>
      <p>
        Statements that originate from a manufacturer are attributed in-line, typically as “The
        manufacturer states…”. We distinguish clearly between what a brand claims, what independent
        research supports, and what remains unverified. Unverified prices, certifications, and
        product details are flagged as such wherever they appear.
      </p>

      <h2>4. No medical claims</h2>
      <p>
        We write about home environments, not health outcomes. We do not claim or imply that any
        product treats, prevents, or cures any condition, and we do not offer medical advice. Our{" "}
        <Link href="/health-disclaimer">health disclaimer</Link> applies to every page of this site.
      </p>

      <h2>5. Evidence ratings</h2>
      <p>
        Where the strength of evidence matters, we label it: <strong>strong</strong> (multiple
        independent studies or broad scientific consensus), <strong>moderate</strong> (some
        independent support with open questions), or <strong>limited</strong> (early, small, or
        primarily manufacturer-funded evidence). Ratings reflect the evidence as of the article's
        last-reviewed date.
      </p>

      <h2>6. Reviews and updates</h2>
      <p>
        Every article shows its last-reviewed date. We re-check commercial articles periodically for
        price, availability, and spec changes, and we update science articles when the research
        landscape shifts. Our review process is described in detail on the{" "}
        <Link href="/review-methodology">review methodology</Link> page.
      </p>

      <h2>7. Corrections</h2>
      <p>
        When we get something wrong, we fix it. Factual corrections are made promptly and, where
        substantive, noted on the article itself. To request a correction, use our{" "}
        <Link href="/contact">contact page</Link> and include a source.
      </p>

      <h2>8. Conflicts of interest</h2>
      <p>
        Team members may not accept gifts, loans, trips, or compensation from brands we cover.
        Affiliate relationships are disclosed per our{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> and never shape editorial judgment.
      </p>
    </ProsePage>
  );
}
