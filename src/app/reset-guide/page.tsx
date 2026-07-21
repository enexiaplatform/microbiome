import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import ResetGuideGate from "@/components/ResetGuideGate";

export const metadata: Metadata = {
  title: "The 7-Day Microbiome-Friendly Home Reset — free guide",
  description:
    "A gentle, room-by-room plan for resetting your home's cleaning routine in seven days — what to keep, what to swap, and where probiotics actually fit. Free, no overwhelm.",
  alternates: { canonical: "/reset-guide" },
};

const BENEFITS = [
  {
    title: "30 minutes a day, max",
    body: "Each day tackles one zone with a short, focused checklist — no weekend-consuming deep cleans.",
  },
  {
    title: "Remove, replace, maintain",
    body: "A simple framework for deciding which products stay, which get swapped, and how to keep it effortless.",
  },
  {
    title: "Pet-aware by default",
    body: "Every step accounts for the animals in your home — their bowls, their bedding, their favorite nap spots.",
  },
  {
    title: "Honest about probiotics",
    body: "Where probiotic cleaners genuinely help, and where plain soap and water still win. No hype.",
  },
] as const;

const GUIDE_PATH = path.join(process.cwd(), "content", "lead-magnet", "reset-guide.md");

function readGuide(): string | null {
  try {
    if (!fs.existsSync(GUIDE_PATH)) return null;
    const raw = fs.readFileSync(GUIDE_PATH, "utf8").trim();
    return raw.length > 0 ? raw : null;
  } catch {
    return null;
  }
}

export default function ResetGuidePage() {
  const guideMarkdown = readGuide();

  return (
    <div className="container-site py-14 sm:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-pine">Free guide</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            The 7-Day Microbiome-Friendly Home Reset
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            A calm, room-by-room plan for resetting how your home gets clean — what to keep, what to
            swap, and where probiotics actually fit. Sign up and read it right here, right now.
          </p>

          <ul className="mt-8 space-y-5">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine">
                    <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-ink">{benefit.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{benefit.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24">
          <ResetGuideGate
            hasGuide={guideMarkdown !== null}
            guide={
              guideMarkdown !== null ? (
                <MDXRemote source={guideMarkdown} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
}
