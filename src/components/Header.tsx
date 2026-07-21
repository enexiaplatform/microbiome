"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.2 3.5h5.6M14.4 3.5v6.2l-6.9 11.6A4.4 4.4 0 0 0 11.3 28h9.4a4.4 4.4 0 0 0 3.8-6.7l-6.9-11.6V3.5"
        stroke="#245A3C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 24.5c0-4.2 2.6-6.8 6.2-7.2-.4 3.9-2.6 6.5-6.2 7.2Zm0 0c0-3-1.8-4.9-4.4-5.2.3 2.8 1.8 4.6 4.4 5.2Z"
        fill="#8FAF9B"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.name })),
  { href: "/quiz", label: "Quiz" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="The Microbiome Home — home"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            The Microbiome Home
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-sage-100 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="Search articles"
            className="ml-1 rounded-md p-2 text-ink/80 transition-colors hover:bg-sage-100 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/search"
            aria-label="Search articles"
            className="rounded-md p-2 text-ink/80 transition-colors hover:bg-sage-100"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-ink/80 transition-colors hover:bg-sage-100"
          >
            {open ? (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-hairline bg-paper lg:hidden">
          <ul className="container-site space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-ink/85 hover:bg-sage-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
