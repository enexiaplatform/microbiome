import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach The Microbiome Home editorial team by email — questions, corrections, and product suggestions welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ProsePage
      title="Contact us"
      intro="We read every message. Email is the fastest way to reach the editorial team."
    >
      <h2>Email</h2>
      <p>
        <a href={`mailto:${siteConfig.email}`} className="font-semibold">
          {siteConfig.email}
        </a>
      </p>
      <p>We aim to reply within two business days.</p>

      <h2>What to write about</h2>
      <ul>
        <li>
          <strong>Corrections.</strong> If we've gotten a fact wrong, tell us — include a source and
          we'll review it promptly. Substantive corrections are noted on the article.
        </li>
        <li>
          <strong>Product suggestions.</strong> Know a microbiome-friendly product we should
          research? Send it over. Coverage decisions rest with the editorial team; manufacturers
          cannot pay for reviews.
        </li>
        <li>
          <strong>Reader questions.</strong> Confused by a claim or a spec? Ask. Reader questions
          often become future guides.
        </li>
      </ul>

      <h2>What we can't help with</h2>
      <p>
        We can't provide medical advice, diagnose symptoms, or recommend products for health
        conditions. For anything health-related, please talk to a qualified professional — our{" "}
        <Link href="/health-disclaimer">health disclaimer</Link> explains why.
      </p>
      <p>
        We also can't offer customer support for products we review. For orders, warranties, and
        returns, please contact the manufacturer or retailer directly.
      </p>
    </ProsePage>
  );
}
