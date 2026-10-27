import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import {
  getProductModel,
  getProductModelSeoKeywords,
  productModels,
} from "@/lib/product-data";
import {
  localizedAlternates,
  getFaqJsonLd,
  getProductModelFaqs,
  getProductModelMetaDescription,
  getProductModelMetaTitle,
  getProductModelStructuredData,
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
    alternates: localizedAlternates(
      `/products/${productModel.seriesSlug}/${productModel.slug}`,
      `/products/${productModel.seriesSlug}/${productModel.slug}`,
      `/zh/products/${productModel.seriesSlug}/${productModel.slug}`,
    ),
    openGraph: {
      title: getProductModelMetaTitle(productModel),
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

  const structuredData = getProductModelStructuredData(productModel);
  const faqJsonLd = getFaqJsonLd(getProductModelFaqs(productModel));

  return (
    <>
      {structuredData.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <ProductModelDetail model={productModel} />
    </>
  );
}
