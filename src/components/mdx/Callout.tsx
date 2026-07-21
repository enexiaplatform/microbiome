import type { ReactNode } from "react";

type CalloutType = "info" | "warning";

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const STYLES: Record<CalloutType, { wrapper: string; label: string; icon: ReactNode }> = {
  info: {
    wrapper: "border-pine-300 bg-pine-50",
    label: "text-pine-800",
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-pine">
        <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 7.2v3.6M8 4.9v.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    wrapper: "border-clay-300 bg-clay-100",
    label: "text-clay-700",
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-clay-600">
        <path d="M8 2.2 14.5 13h-13L8 2.2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 6.4v3.2M8 11.1v.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
};

/**
 * Highlighted note box. Used in MDX as
 * `<Callout type="info|warning">…</Callout>`.
 */
export default function Callout({ type = "info", children }: CalloutProps) {
  const style = STYLES[type] ?? STYLES.info;
  return (
    <aside
      aria-label={type === "warning" ? "Warning" : "Note"}
      className={`not-prose my-6 flex gap-3 rounded-2xl border px-5 py-4 ${style.wrapper}`}
    >
      {style.icon}
      <div className={`text-sm leading-relaxed text-ink/80 [&_strong]:${style.label}`}>{children}</div>
    </aside>
  );
}
