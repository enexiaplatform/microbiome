import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data The Microbiome Home collects, why, and the choices you have — covering analytics, the newsletter, and affiliate outbound links.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      title="Privacy Policy"
      intro="What we collect, why we collect it, and the choices you have. Written to be read."
      updated="July 2026"
    >
      <p>
        This policy explains how {siteConfig.name} (“we”, “the site”) handles information when you
        visit {siteConfig.url}. It is provided for general information and does not constitute legal
        advice.
      </p>

      <h2>Information you give us</h2>
      <ul>
        <li>
          <strong>Email address (newsletter).</strong> If you subscribe, we collect your email
          address to send you the newsletter and any guide you requested. Our mailing list is
          managed by our email service provider (Kit). You can unsubscribe at any time via the link
          in every email, after which your address is no longer used for mailings.
        </li>
        <li>
          <strong>Correspondence.</strong> If you email us, we keep the conversation so we can
          respond and track corrections.
        </li>
      </ul>

      <h2>Information collected automatically</h2>
      <p>
        When analytics are enabled, we use privacy-respecting, cookie-based measurement tools
        (which may include Google Analytics 4, Microsoft Clarity, and PostHog) to understand which
        pages are read and how the site is used. These tools may collect your IP address (often
        truncated by the provider), device and browser type, pages visited, and interactions such as
        clicks on outbound links. We use this only in aggregate to improve the site — never to
        identify individual readers.
      </p>
      <p>
        Where analytics providers are not configured, no analytics scripts are loaded at all.
      </p>

      <h2>Outbound and affiliate links</h2>
      <p>
        Links to merchants route briefly through our redirect service (for example,{" "}
        <code>/go/…</code>) so we can count clicks and attribute commissions. The merchant you land
        on has its own privacy policy, which we encourage you to read; we are not responsible for
        third-party practices.
      </p>

      <h2>Cookies</h2>
      <p>
        We do not set first-party tracking cookies of our own. Analytics providers, when enabled,
        set their own cookies subject to their respective policies. Most browsers let you block or
        delete cookies; the site remains fully readable without them.
      </p>

      <h2>Data retention and security</h2>
      <p>
        Newsletter data is retained while your subscription is active. Server logs (including
        outbound-click records, which contain no email addresses) are retained for a limited period
        for operations and fraud prevention. We use HTTPS and limit access to any personal data to
        those who need it to operate the site. No method of transmission or storage is perfectly
        secure, but we work to protect your information.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for adults and is not directed at children under 13. We do not
        knowingly collect personal information from children.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Unsubscribe from email at any time via the link in any message.</li>
        <li>Request access to, or deletion of, your personal data by emailing us.</li>
        <li>Browse with analytics disabled using browser privacy features or extensions.</li>
      </ul>
      <p>
        Depending on your state of residence, you may have additional rights under laws such as the
        CCPA/CPRA. We honor verifiable requests to know, delete, or opt out of any “sale” or
        “sharing” of personal information — note that we do not sell personal information.
      </p>

      <h2>Changes and contact</h2>
      <p>
        If this policy changes, the updated version will be posted here with a new “last updated”
        date. Questions? Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or see
        our <Link href="/contact">contact page</Link>.
      </p>
    </ProsePage>
  );
}
