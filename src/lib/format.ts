/**
 * Client-safe date formatting. Kept separate from lib/content.ts (which uses
 * node:fs/node:path) so client components can format dates without pulling
 * Node builtins into the browser bundle.
 */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
