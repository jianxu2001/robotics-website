import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageTemplate } from "@/components/industry-page-template";
import { getIndustryPage, industryPages } from "@/lib/industry-pages";
import { canonicalAlternates } from "@/lib/seo";

type IndustryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: IndustryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: canonicalAlternates(`/industries/${page.slug}`),
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      images: [page.image],
      type: "website",
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: IndustryDetailPageProps) {
  const { slug } = await params;
  const page = getIndustryPage(slug);

  if (!page) {
    notFound();
  }

  return <IndustryPageTemplate page={page} />;
}
