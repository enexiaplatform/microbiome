import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-semibold text-pine-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">This page has wandered off</h1>
      <p className="mt-3 max-w-md text-ink/70">
        The page you're looking for doesn't exist or may have moved. Let's get you back to solid ground.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="rounded-xl border border-hairline bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sage-100"
        >
          Search the site
        </Link>
      </div>
    </div>
  );
}
