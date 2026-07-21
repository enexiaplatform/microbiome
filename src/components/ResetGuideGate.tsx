"use client";
import Link from "next/link";

import { useState, type ReactNode } from "react";
import NewsletterForm from "@/components/NewsletterForm";

interface ResetGuideGateProps {
  /** Server-rendered guide body, or null when the source file is absent. */
  guide: ReactNode;
  hasGuide: boolean;
}

/**
 * Email gate for the 7-Day Reset guide. After a successful signup the guide
 * is revealed inline (or a friendly placeholder when the file isn't ready).
 */
export default function ResetGuideGate({ guide, hasGuide }: ResetGuideGateProps) {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <div className="rounded-2xl border border-sage-300 bg-white p-6 sm:p-10">
        <p role="status" className="rounded-xl border border-sage-300 bg-sage-100 px-4 py-3 text-sm text-pine-800">
          You're in — here's your guide. A copy is also on its way to your inbox.
        </p>
        {hasGuide ? (
          <div className="prose mt-8">{guide}</div>
        ) : (
          <div className="mt-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              The 7-Day Reset is being polished right now
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              You're on the list, and the finished guide will land in your inbox the moment it ships.
              Here's a preview of what's inside:
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink/75">
              {[
                "Day 1–2: The kitchen and entryway — removing residue, not just dirt",
                "Day 3–4: Living spaces and pet zones — fabrics, floors, and the air between them",
                "Day 5–6: Bedrooms — where you spend a third of your life",
                "Day 7: Bathroom and maintenance rhythm — keeping the reset effortless",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-pine">
                    <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white p-6 shadow-card sm:p-10">
      <NewsletterForm source="reset-guide" onSuccess={() => setUnlocked(true)} />
      <p className="mt-4 text-xs leading-relaxed text-ink/55">
        We'll email you the guide and one calm newsletter a week. No spam — unsubscribe anytime. See
        our <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-pine">privacy policy</Link>.
      </p>
    </div>
  );
}
