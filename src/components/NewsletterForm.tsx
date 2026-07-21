"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/track";

interface NewsletterFormProps {
  /** Identifies the signup placement for tracking. */
  source: string;
  /** Called after a successful signup (used by the reset-guide page). */
  onSuccess?: () => void;
  compact?: boolean;
}

export default function NewsletterForm({ source, onSuccess, compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage("That email address doesn't look right — please check it and try again.");
        return;
      }
      trackEvent("email_signup", { source });
      setStatus("done");
      setMessage("You're in. Watch your inbox for a confirmation.");
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage("Something went wrong on our side — please try again in a moment.");
    }
  }

  if (status === "done" && !onSuccess) {
    return (
      <p role="status" className="rounded-xl border border-sage-300 bg-sage-100 px-4 py-3 text-sm text-pine-800">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "" : "w-full"} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full flex-1 rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-pine-300"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {message ? (
        <p role="status" className={`mt-3 text-sm ${status === "error" ? "text-clay-700" : "text-pine-700"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
