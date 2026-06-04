import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/industry-page-template";
import { getIndustryPage } from "@/lib/industry-pages";
import { canonicalAlternates } from "@/lib/seo";

const page = getIndustryPage("building-materials");

export const metadata: Metadata = {
  title: page?.seoTitle,
  description: page?.description,
  alternates: canonicalAlternates("/industries/building-materials"),
};

export default function BuildingMaterialsIndustryPage() {
  if (!page) {
    return null;
  }

  return <IndustryPageTemplate page={page} />;
}
