import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { SiteHeader } from "@/components/site-header";
import {
  getProductModel,
  getProductModelSeoKeywords,
  productModels,
} from "@/lib/product-models";

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

  const description = `${productModel.name} ${productModel.category} from SCR Robot. Payload ${productModel.payload}, reach ${productModel.reach}, repeatability ${productModel.repeatability}. Built for ${productModel.applications.join(", ").toLowerCase()}.`;

  return {
    title: `${productModel.name} Industrial Robot | ${productModel.payload} Payload | SCR Robot`,
    description,
    keywords: getProductModelSeoKeywords(productModel),
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

  return (
    <>
      <SiteHeader alternateHref={`/products/${productModel.seriesSlug}`} />
      <ProductModelDetail model={productModel} />
    </>
  );
}
