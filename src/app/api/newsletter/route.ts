import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup. Validates the email; when KIT_API_KEY + KIT_FORM_ID are
 * configured, forwards to the Kit (ConvertKit) v3 forms API; otherwise logs
 * and reports placeholder mode. Never returns 5xx to the client.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    email = "";
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.KIT_API_KEY?.trim();
  const formId = process.env.KIT_FORM_ID?.trim();

  if (apiKey && formId) {
    try {
      const upstream = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, email }),
      });
      if (!upstream.ok) {
        console.error(
          JSON.stringify({
            event: "newsletter_upstream_error",
            status: upstream.status,
            ts: new Date().toISOString(),
          }),
        );
        // 200 + ok:false keeps 5xx away from the client while still signaling failure.
        return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 200 });
      }
      console.log(
        JSON.stringify({ event: "email_signup", mode: "kit", ts: new Date().toISOString() }),
      );
      return NextResponse.json({ ok: true, mode: "kit" });
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "newsletter_upstream_unreachable",
          message: error instanceof Error ? error.message : "unknown",
          ts: new Date().toISOString(),
        }),
      );
      return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 200 });
    }
  }

  console.log(
    JSON.stringify({
      event: "email_signup",
      mode: "placeholder",
      email,
      ts: new Date().toISOString(),
    }),
  );
  return NextResponse.json({ ok: true, mode: "placeholder" });
}
