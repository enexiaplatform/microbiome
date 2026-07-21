"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

interface ArticleViewTrackerProps {
  slug: string;
  category: string;
  title: string;
}

/** Fires the `article_view` event once on mount. Renders nothing. */
export default function ArticleViewTracker({ slug, category, title }: ArticleViewTrackerProps) {
  useEffect(() => {
    trackEvent("article_view", { article: slug, category, title });
  }, [slug, category, title]);
  return null;
}
