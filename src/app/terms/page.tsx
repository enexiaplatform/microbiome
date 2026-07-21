import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern use of The Microbiome Home — content ownership, acceptable use, disclaimers, and limitations of liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ProsePage
      title="Terms of Use"
      intro="The ground rules for using this website. By using the site, you agree to them."
      updated="July 2026"
    >
      <p>
        These terms govern your use of {siteConfig.name} ({siteConfig.url}). They are provided for
        general information and do not constitute legal advice. If you do not agree with these
        terms, please don't use the site.
      </p>

      <h2>1. Our content</h2>
      <p>
        All content on this site — articles, guides, graphics, and design — is owned by or licensed
        to {siteConfig.name} and protected by applicable intellectual-property laws. You may read,
        share links to, and quote brief excerpts with attribution and a link. You may not republish
        articles in full, scrape the site systematically, or present our content as your own without
        written permission.
      </p>

      <h2>2. Informational purpose; no professional advice</h2>
      <p>
        Content is provided for general informational purposes only. It is not medical, veterinary,
        legal, or financial advice, and using the site creates no professional relationship of any
        kind. See our <Link href="/health-disclaimer">health disclaimer</Link>.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site in any way that violates applicable law or regulation;</li>
        <li>attempt to disrupt, probe, or gain unauthorized access to the site or its systems;</li>
        <li>misrepresent your identity or affiliation when contacting us;</li>
        <li>use automated means to access the site in a manner that imposes unreasonable load.</li>
      </ul>

      <h2>4. Third-party links and products</h2>
      <p>
        The site links to third-party merchants and resources. We do not control and are not
        responsible for third-party sites, products, prices, availability, warranties, or policies.
        Any transaction you make is solely between you and the merchant. Some outbound links are
        affiliate links; see our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>

      <h2>5. Accuracy</h2>
      <p>
        We work hard to keep information accurate and current — including prices, specifications,
        and evidence ratings — but we make no warranty that any content is complete, error-free, or
        up to date. Product prices and availability can change without notice; the merchant's site
        is authoritative.
      </p>

      <h2>6. Disclaimers and limitation of liability</h2>
      <p>
        The site is provided “as is” and “as available,” without warranties of any kind, express or
        implied. To the fullest extent permitted by law, {siteConfig.name} and its contributors
        disclaim liability for any indirect, incidental, consequential, or punitive damages arising
        from your use of, or inability to use, the site or reliance on its content.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms from time to time. The version posted here, with its “last
        updated” date, is the version in force. Continued use of the site after changes constitutes
        acceptance.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </ProsePage>
  );
}
