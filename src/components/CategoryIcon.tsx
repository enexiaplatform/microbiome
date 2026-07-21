import type { CategorySlug } from "@/data/categories";

interface CategoryIconProps {
  slug: CategorySlug | string;
  className?: string;
}

/**
 * Brand stroke icons for the five content categories. Purely decorative —
 * the adjacent category name always carries the meaning.
 */
export default function CategoryIcon({ slug, className = "h-5 w-5" }: CategoryIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className,
  } as const;

  switch (slug) {
    case "pet-home":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="16" rx="3.6" ry="2.8" />
          <circle cx="6.8" cy="11.2" r="1.7" />
          <circle cx="10.2" cy="8.4" r="1.7" />
          <circle cx="13.8" cy="8.4" r="1.7" />
          <circle cx="17.2" cy="11.2" r="1.7" />
        </svg>
      );
    case "probiotic-cleaning":
      return (
        <svg {...common}>
          <path d="M10 4h4v4h-4z" />
          <path d="M14 5.2h3.5" />
          <path d="M19.5 3.5v3.4" />
          <path d="M10.6 8 9.4 10.4v8.1a2 2 0 0 0 2 2h1.2a2 2 0 0 0 2-2v-8.1L13.4 8" />
          <path d="M9.4 13.5h5.2" />
        </svg>
      );
    case "reviews":
      return (
        <svg {...common}>
          <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />
        </svg>
      );
    case "comparisons":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="7" height="14" rx="1.5" />
          <rect x="13.5" y="5" width="7" height="14" rx="1.5" />
          <path d="M5.8 9.5h1.4M15.8 9.5h1.4" />
          <path d="M5.8 13h1.4M15.8 13h1.4" />
        </svg>
      );
    case "science":
      return (
        <svg {...common}>
          <path d="M5 19C5 9.5 11.5 4 20 4c0 8.5-5.5 15-15 15z" />
          <path d="M5 19c2.8-5.8 6.8-9.8 12-12" />
          <circle cx="9.2" cy="14.8" r="0.9" />
          <circle cx="12.4" cy="11.6" r="0.9" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
