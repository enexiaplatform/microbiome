import AffiliateDisclosure from "./AffiliateDisclosure";
import ProductCard from "./ProductCard";
import ProductComparison from "./ProductComparison";
import ProsCons from "./ProsCons";
import EvidenceRating from "./EvidenceRating";
import Callout from "./Callout";
import CTA from "./CTA";

/**
 * Component map handed to MDXRemote for article rendering.
 * Names here are the exact tag names available inside article MDX.
 */
export const mdxComponents = {
  AffiliateDisclosure,
  ProductCard,
  ProductComparison,
  ProsCons,
  EvidenceRating,
  Callout,
  CTA,
};

export { AffiliateDisclosure, ProductCard, ProductComparison, ProsCons, EvidenceRating, Callout, CTA };
