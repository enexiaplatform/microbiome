import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { siteConfig } from "@/lib/site";

const EXPLORE_LINKS = [
  ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.name })),
  { href: "/quiz", label: "Quiz" },
  { href: "/search", label: "Search" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/reset-guide", label: "7-Day Reset Guide" },
];

const LEGAL_LINKS = [
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/review-methodology", label: "Review Methodology" },
  { href: "/health-disclaimer", label: "Health Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink/75 transition-colors hover:text-pine">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">{siteConfig.tagline}</p>
        </div>
        <LinkColumn title="Explore" links={EXPLORE_LINKS} />
        <LinkColumn title="Company" links={COMPANY_LINKS} />
        <LinkColumn title="Legal" links={LEGAL_LINKS} />
      </div>
      <div className="border-t border-hairline">
        <div className="container-site flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Some links on this site are affiliate links. If you buy through them, we may earn a commission at no
            extra cost to you.{" "}
            <Link href="/affiliate-disclosure" className="underline decoration-sage-400 underline-offset-2 hover:text-pine">
              Learn more
            </Link>
            .
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
