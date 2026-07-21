import type { CategorySlug } from "./categories";

export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  helper?: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "household",
    question: "Who lives in your home?",
    helper: "Household size shapes how much traffic — and how much biology — your rooms see.",
    options: [
      { value: "solo", label: "Just me" },
      { value: "couple", label: "Me and a partner" },
      { value: "family", label: "Family with kids" },
      { value: "roommates", label: "Shared with roommates" },
    ],
  },
  {
    id: "pets",
    question: "Do any pets share your space?",
    options: [
      { value: "dogs", label: "Yes — dog(s)" },
      { value: "cats", label: "Yes — cat(s)" },
      { value: "multiple", label: "Yes — several pets" },
      { value: "none", label: "No pets" },
    ],
  },
  {
    id: "concern",
    question: "What bothers you most at home?",
    options: [
      { value: "odors", label: "Lingering pet or household odors" },
      { value: "allergens", label: "Dander, dust, and other airborne irritants" },
      { value: "cleaning", label: "Harsh chemicals in cleaning products" },
      { value: "freshness", label: "I just want a fresher-feeling home" },
    ],
  },
  {
    id: "space",
    question: "How much space do you want to improve?",
    options: [
      { value: "room", label: "A single room" },
      { value: "few", label: "A few rooms" },
      { value: "whole", label: "The whole home" },
    ],
  },
  {
    id: "budget",
    question: "What's a comfortable budget to start?",
    helper: "A starting point, not a commitment — we'll match options to it.",
    options: [
      { value: "under50", label: "Under $50" },
      { value: "50to150", label: "$50 – $150" },
      { value: "150to300", label: "$150 – $300" },
      { value: "over300", label: "Over $300" },
    ],
  },
];

export interface QuizRecommendation {
  headline: string;
  blurb: string;
  /** Category hubs worth reading first, in priority order (max 3). */
  categories: CategorySlug[];
  /** Product slugs worth a look, in priority order (max 2). */
  products: string[];
}

/**
 * Maps quiz answers to CONTENT + PRODUCT CATEGORIES.
 * This is reading guidance, not health advice — keep it that way.
 */
export function getQuizRecommendation(answers: Record<string, string>): QuizRecommendation {
  const hasPets = (answers.pets ?? "none") !== "none";
  const concern = answers.concern ?? "freshness";
  const space = answers.space ?? "room";
  const budget = answers.budget ?? "under50";

  const categories: CategorySlug[] = [];
  if (hasPets) categories.push("pet-home");
  if (concern === "cleaning") categories.push("probiotic-cleaning");
  if (concern === "allergens" || concern === "freshness") categories.push("science");
  categories.push("reviews");
  if (categories.length < 3) categories.push("comparisons");
  const uniqueCategories = Array.from(new Set(categories)).slice(0, 3);

  let products: string[];
  if (concern === "cleaning" || budget === "under50") {
    products = hasPets
      ? ["purebiotics-all-purpose", "biologic-mini"]
      : ["purebiotics-all-purpose"];
  } else if (space === "whole" && budget === "over300") {
    products = ["ba-2080", "biotica-800"];
  } else if (space === "whole") {
    products = ["biotica-800", "ba-2080"];
  } else if (space === "few") {
    products = ["biotica-800", "biologic-mini"];
  } else {
    products = budget === "over300" ? ["biotica-800", "biologic-mini"] : ["biologic-mini", "biotica-800"];
  }
  products = products.slice(0, 2);

  const headline = hasPets
    ? "Your microbiome-friendly starting point — pets included"
    : "Your microbiome-friendly starting point";

  const blurbParts: string[] = [];
  if (concern === "odors") blurbParts.push("odor control");
  if (concern === "allergens") blurbParts.push("airborne irritants like dander and dust");
  if (concern === "cleaning") blurbParts.push("gentler cleaning chemistry");
  if (concern === "freshness") blurbParts.push("an overall fresher home");
  const focus = blurbParts[0] ?? "a fresher home";
  const blurb = `Based on your answers, we'd start with ${focus}. The guides below explain the science in plain language, and the products match your space and budget. Manufacturer claims are always labeled — no medical promises, ever.`;

  return { headline, blurb, categories: uniqueCategories, products };
}
