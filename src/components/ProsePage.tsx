import type { ReactNode } from "react";

interface ProsePageProps {
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
}

/** Shared shell for static prose pages (legal, policy, about, contact). */
export default function ProsePage({ title, intro, updated, children }: ProsePageProps) {
  return (
    <div className="container-site py-14 sm:py-20">
      <div className="mx-auto max-w-article">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 text-lg leading-relaxed text-ink/70">{intro}</p> : null}
        {updated ? <p className="mt-3 text-sm text-ink/55">Last updated: {updated}</p> : null}
        <div className="prose mt-10">{children}</div>
      </div>
    </div>
  );
}
