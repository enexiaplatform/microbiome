import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Review Methodology",
  description:
    "How The Microbiome Home researches and reviews products: documentation analysis, claim verification, spec comparison, and what we do and don't test.",
  alternates: { canonical: "/review-methodology" },
};

export default function ReviewMethodologyPage() {
  return (
    <ProsePage
      title="How We Review Products"
      intro="Our review process, published so you can judge our conclusions for yourself."
      updated="July 2026"
    >
      <h2>What a review here means</h2>
      <p>
        Our reviews combine documentation analysis, claim verification, and structured comparison.
        For each product we examine the manufacturer's published specifications, manuals,
        certifications, and marketing claims; we check claims against independent research and
        standards where they exist; and we compare coverage, consumables, formats, and total cost of
        ownership against alternatives.
      </p>

      <h2>Our five review stages</h2>
      <ol>
        <li>
          <strong>Documentation review.</strong> We read the manufacturer's specs, manuals, safety
          sheets, and certification claims end to end — including the footnotes.
        </li>
        <li>
          <strong>Claim verification.</strong> Each material claim is categorized: independently
          verified, plausible-but-unverified, or manufacturer-stated-only. Certifications are
          checked against the issuing body's public registry where one exists. Anything we cannot
          verify is labeled as unverified on the page.
        </li>
        <li>
          <strong>Specification comparison.</strong> Coverage area, format, noise, refill cadence,
          refill cost, and warranty are tabulated against comparable products so trade-offs are
          visible side by side.
        </li>
        <li>
          <strong>Cost-of-ownership estimate.</strong> We calculate approximate annual consumable
          costs from published refill prices and cadences, flagging any price we could not verify
          directly with the manufacturer.
        </li>
        <li>
          <strong>Fit assessment.</strong> We conclude with who the product suits — room size,
          household type, pets, and budget — and who should look elsewhere.
        </li>
      </ol>

      <h2>What we don't do</h2>
      <ul>
        <li>
          We do not perform laboratory testing. When we reference test results, they come from cited
          third parties and are attributed.
        </li>
        <li>
          We do not accept review units, loans, or compensation from manufacturers. Products
          discussed are selected by the editorial team.
        </li>
        <li>
          We do not score products on health outcomes. See our{" "}
          <Link href="/health-disclaimer">health disclaimer</Link>.
        </li>
      </ul>

      <h2>Ratings and updates</h2>
      <p>
        Reviews are living documents. Each displays a last-reviewed date; we revisit them when
        prices change, models are revised, or new evidence emerges. If you spot something stale,
        tell us via the <Link href="/contact">contact page</Link>.
      </p>

      <h2>Why affiliate links don't bend this</h2>
      <p>
        Our revenue comes partly from affiliate commissions, disclosed in our{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link>. The methodology above is applied
        identically whether or not a product has an affiliate program — and whether or not that
        program is one we participate in.
      </p>
    </ProsePage>
  );
}
