import { NextResponse, type NextRequest } from "next/server";
import { getAffiliateLink } from "@/data/affiliate-links";

export const dynamic = "force-dynamic";

/**
 * Affiliate redirect. 302s to the resolved destination for a known product
 * slug, passing through utm_* and subid params, and logs a server-side JSON
 * `affiliate_click` record. Unknown slugs 302 to the home page.
 */
export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const source = searchParams.get("source") ?? "unknown";
  const placement = searchParams.get("placement") ?? "unknown";
  const subid = searchParams.get("subid");

  const link = getAffiliateLink(slug);

  if (!link) {
    console.log(
      JSON.stringify({
        event: "affiliate_click_unknown_slug",
        product: slug,
        source,
        placement,
        subid: subid ?? null,
        ts: new Date().toISOString(),
      }),
    );
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  // Build destination, passing through utm_* and subid only.
  let destination: URL;
  try {
    destination = new URL(link.url);
  } catch {
    // Misconfigured env URL — fail safe to the home page.
    return NextResponse.redirect(new URL("/", request.url), 302);
  }
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("utm_") || key === "subid") {
      destination.searchParams.set(key, value);
    }
  }

  console.log(
    JSON.stringify({
      event: "affiliate_click",
      merchant: link.merchant,
      product: slug,
      source,
      placement,
      subid: subid ?? null,
      ts: new Date().toISOString(),
    }),
  );

  return NextResponse.redirect(destination, 302);
}
