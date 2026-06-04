import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { SiteHeader } from "@/components/site-header";
import {
  getProductModel,
  getProductModelSeoKeywords,
  productModels,
} from "@/lib/product-models";
import {
  canonicalAlternates,
  getFaqJsonLd,
  getProductModelFaqs,
  getProductModelJsonLd,
  getProductModelMetaDescription,
  getProductModelMetaTitle,
  serializeJsonLd,
} from "@/lib/seo";

type ProductModelPageProps = {
  params: Promise<{ slug: string; model: string }>;
};

export function generateStaticParams() {
  return productModels.map((item) => ({
    slug: item.seriesSlug,
    model: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductModelPageProps): Promise<Metadata> {
  const { slug, model } = await params;
  const productModel = getProductModel(slug, model);

  if (!productModel) {
    return {};
  }

  const description = getProductModelMetaDescription(productModel);

  return {
    title: getProductModelMetaTitle(productModel),
    description,
    keywords: getProductModelSeoKeywords(productModel),
    alternates: canonicalAlternates(
      `/products/${productModel.seriesSlug}/${productModel.slug}`,
    ),
    openGraph: {
      title: `${productModel.name} Industrial Robot`,
      description,
      images: [productModel.image],
      type: "website",
    },
  };
}

export default async function ProductModelPage({ params }: ProductModelPageProps) {
  const { slug, model } = await params;
  const productModel = getProductModel(slug, model);

  if (!productModel) {
    notFound();
  }

  const productJsonLd = getProductModelJsonLd(productModel);
  const faqJsonLd = getFaqJsonLd(getProductModelFaqs(productModel));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <SiteHeader alternateHref={`/products/${productModel.seriesSlug}`} />
      <ProductModelDetail model={productModel} />
    </>
  );
}
