type EvidenceLevel = "strong" | "moderate" | "limited";

interface EvidenceRatingProps {
  level: EvidenceLevel;
  note?: string;
}

const LEVEL_STYLES: Record<EvidenceLevel, { label: string; classes: string; dot: string }> = {
  strong: {
    label: "Strong evidence",
    classes: "border-pine-300 bg-pine-50 text-pine-800",
    dot: "bg-pine",
  },
  moderate: {
    label: "Moderate evidence",
    classes: "border-clay-300 bg-clay-100 text-clay-700",
    dot: "bg-clay-500",
  },
  limited: {
    label: "Limited evidence",
    classes: "border-hairline bg-paper text-ink/60",
    dot: "bg-ink/40",
  },
};

/**
 * Inline evidence-strength badge. Used in MDX as
 * `<EvidenceRating level="strong|moderate|limited" note="…" />`.
 */
export default function EvidenceRating({ level, note }: EvidenceRatingProps) {
  const style = LEVEL_STYLES[level] ?? LEVEL_STYLES.limited;
  return (
    <span
      className={`not-prose mx-0.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 align-middle text-xs font-medium ${style.classes}`}
      title={note}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
      {note ? <span className="sr-only"> — {note}</span> : null}
    </span>
  );
}
