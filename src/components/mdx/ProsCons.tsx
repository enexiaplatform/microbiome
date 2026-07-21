interface ProsConsProps {
  pros: string[];
  cons: string[];
}

/**
 * Two-column pros/cons panel. Used in MDX as
 * `<ProsCons pros={["…"]} cons={["…"]} />`.
 */
export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      <section aria-label="Pros" className="rounded-2xl border border-sage-300 bg-sage-100 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-pine-800">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-pine">
            <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          What we like
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
          {(pros ?? []).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-pine">
                <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Cons" className="rounded-2xl border border-clay-200 bg-clay-100 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-clay-700">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-clay-600">
            <path d="M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Worth knowing
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
          {(cons ?? []).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-clay-600">
                <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
