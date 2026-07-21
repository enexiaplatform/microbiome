import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "Health Disclaimer",
  description:
    "The Microbiome Home writes about home environments, not health. We make no medical claims — read this disclaimer to understand what that means.",
  alternates: { canonical: "/health-disclaimer" },
};

export default function HealthDisclaimerPage() {
  return (
    <ProsePage
      title="Health Disclaimer"
      intro="We write about homes, not health. Please read this page — it applies to everything we publish."
      updated="July 2026"
    >
      <h2>No medical advice</h2>
      <p>
        The content on The Microbiome Home is provided for general informational and educational
        purposes only. It is not medical advice, it is not a substitute for professional medical
        advice, diagnosis, or treatment, and it should never be relied on as such.
      </p>
      <p>
        Always seek the advice of a physician, veterinarian, or other qualified health provider with
        any questions you may have about a medical condition — yours, your family's, or your pet's.
        Never disregard professional advice or delay seeking it because of something you read on
        this website.
      </p>

      <h2>No product health claims</h2>
      <p>
        We do not claim, and you should not infer, that any product discussed on this site —
        including environmental probiotic purifiers or probiotic cleaners — treats, cures,
        prevents, or mitigates any disease, allergy, asthma, or other health condition in humans or
        animals.
      </p>
      <p>
        Where a manufacturer makes statements about allergens, odors, or microbes, we attribute
        those statements to the manufacturer (phrased as “The manufacturer states…”) and report the
        state of the supporting evidence. Reporting a claim is not endorsing it.
      </p>

      <h2>Individual results vary</h2>
      <p>
        Homes differ. Occupants differ. Sensitivities differ. Any product's real-world performance
        in your home may differ from descriptions here or from the manufacturer's materials.
      </p>

      <h2>If you have health concerns</h2>
      <p>
        If you or a family member experiences allergies, asthma, or other respiratory symptoms —
        or your pet shows signs of illness — consult a qualified professional rather than changing
        products based on anything you read here.
      </p>

      <h2>Related policies</h2>
      <p>
        <Link href="/editorial-policy">Editorial policy</Link> ·{" "}
        <Link href="/review-methodology">Review methodology</Link> ·{" "}
        <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
      </p>
    </ProsePage>
  );
}
