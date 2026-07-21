import Link from "next/link";

interface AuthorBoxProps {
  author: string;
}

/** Editorial byline block shown at the end of every article. */
export default function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <section aria-label="About the author" className="mt-12 flex gap-4 rounded-2xl border border-hairline bg-white p-6">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine-50 font-display text-sm font-semibold text-pine"
      >
        MH
      </div>
      <div>
        <p className="font-semibold text-ink">{author}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">
          Our editorial team translates indoor-microbiome research into plain language. Every claim is
          sourced, manufacturer statements are labeled as such, and we never offer medical advice.
        </p>
        <p className="mt-2 text-sm">
          <Link href="/editorial-policy" className="font-medium text-pine hover:underline">
            Editorial policy
          </Link>
          <span aria-hidden="true" className="mx-2 text-ink/30">
            ·
          </span>
          <Link href="/review-methodology" className="font-medium text-pine hover:underline">
            How we review
          </Link>
        </p>
      </div>
    </section>
  );
}
