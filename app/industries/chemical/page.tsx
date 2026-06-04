import type { Metadata } from "next";
import { IndustryPageTemplate } from "@/components/industry-page-template";
import { getIndustryPage } from "@/lib/industry-pages";

const page = getIndustryPage("chemical");

export const metadata: Metadata = {
  title: page?.seoTitle,
  description: page?.description,
};

export default function ChemicalIndustryPage() {
  if (!page) {
    return null;
  }

  return <IndustryPageTemplate page={page} />;
}
