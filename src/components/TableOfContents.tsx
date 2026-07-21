import type { TocItem } from "@/lib/content";

/**
 * Table of contents built from h2 headings (ids match rehype-slug output).
 * `variant="sidebar"` for the sticky desktop rail, `variant="mobile"` for a
 * collapsible details block.
 */
export default function TableOfContents({
  items,
  variant = "sidebar",
}: {
  items: TocItem[];
  variant?: "sidebar" | "mobile";
}) {
  if (items.length === 0) return null;

  const list = (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-ink/65 transition-colors hover:text-pine"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <details className="my-8 rounded-2xl border border-hairline bg-white px-5 py-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-ink">On this page</summary>
        <div className="mt-3">{list}</div>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">On this page</p>
      <div className="mt-3 border-l border-hairline pl-4">{list}</div>
    </nav>
  );
}
