import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/ProsePage";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Microbiome Home is an independent, science-informed publication about environmental probiotic purifiers, probiotic cleaners, and calmer homes for people and pets.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ProsePage
      title="About The Microbiome Home"
      intro="An independent publication for people who want a fresher, calmer home — and want the evidence before the pitch."
      image={{
        src: "/images/hero-dog-sofa.jpg",
        alt: "A border collie sitting on a light sofa beside houseplants in soft daylight",
      }}
    >
      <h2>What we do</h2>
      <p>
        The Microbiome Home publishes science-informed guides, reviews, and comparisons about the
        indoor environment: environmental probiotic purifiers, probiotic surface cleaners, and the
        everyday routines that shape the microscopic life of a home shared with pets.
      </p>
      <p>
        Our readers are mostly US pet owners between 28 and 55 — people who love their animals, care
        about what they spray on their counters, and are tired of marketing that promises medical
        miracles. We write for them: calm, precise, and free of hype.
      </p>

      <h2>What we believe</h2>
      <p>
        Your home is an ecosystem. The products you bring into it — air purifiers, cleaners,
        fragrances — all shape that ecosystem, for better or worse. We think you deserve straight
        answers about what those products actually do, what the research supports, and what remains
        unproven.
      </p>
      <p>Three rules govern everything we publish:</p>
      <ul>
        <li>Every factual claim is sourced, and sources are linked so you can check them.</li>
        <li>
          Manufacturer statements are always attributed — phrased as “The manufacturer states…” —
          and never blended with our own findings.
        </li>
        <li>We make no medical or health claims. None. This is a home publication, not a clinic.</li>
      </ul>

      <h2>How we fund this work</h2>
      <p>
        Some links on this site are affiliate links. If you buy through them, we may earn a
        commission at no extra cost to you. Commissions never influence our conclusions, our
        rankings, or which products we cover. Read the full{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> and our{" "}
        <Link href="/editorial-policy">editorial policy</Link> for the details.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, corrections, or a product you think we should look at?{" "}
        <Link href="/contact">Contact us</Link> — we read everything.
      </p>
    </ProsePage>
  );
}
