import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/industry-page-template";
import { getIndustryPage } from "@/lib/industry-pages";
import { canonicalAlternates } from "@/lib/seo";

const page = getIndustryPage("plastics");

export const metadata: Metadata = {
  title: page?.seoTitle,
  description: page?.description,
  alternates: canonicalAlternates("/industries/plastics"),
};

export default function PlasticsIndustryPage() {
  if (!page) {
    return null;
  }

  return <IndustryPageTemplate page={page} />;
}
