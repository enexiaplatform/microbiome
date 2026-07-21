import Image from "next/image";
import type { ReactNode } from "react";

interface ProsePageProps {
  title: string;
  intro?: string;
  updated?: string;
  /** Optional banner image shown between the intro and the body. */
  image?: { src: string; alt: string };
  children: ReactNode;
}

/** Shared shell for static prose pages (legal, policy, about, contact). */
export default function ProsePage({ title, intro, updated, image, children }: ProsePageProps) {
  return (
    <div className="container-site py-14 sm:py-20">
      <div className="mx-auto max-w-article">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 text-lg leading-relaxed text-ink/70">{intro}</p> : null}
        {updated ? <p className="mt-3 text-sm text-ink/55">Last updated: {updated}</p> : null}
        {image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-hairline">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 60rem, 100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="prose mt-10">{children}</div>
      </div>
    </div>
  );
}
