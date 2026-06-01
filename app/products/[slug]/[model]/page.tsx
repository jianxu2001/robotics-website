import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { SiteHeader } from "@/components/site-header";
import {
  getProductModel,
  productModels,
} from "@/lib/product-models";

type ProductModelPageProps = {
  params: Promise<{ slug: string; model: string }>;
};

export function generateStaticParams() {
  return productModels.map((model) => ({
    slug: model.seriesSlug,
    model: model.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductModelPageProps): Promise<Metadata> {
  const { slug, model: modelSlug } = await params;
  const model = getProductModel(slug, modelSlug);

  if (!model) {
    return {};
  }

  const payload = model.robotParameters.find(
    (row) => row.label === "Maximum Payload",
  )?.value;
  const reach = model.robotParameters.find(
    (row) => row.label === "Maximum Reach",
  )?.value;

  return {
    title: `${model.name} Robot Parameters | SCR Robot`,
    description: `${model.name} ${model.series} technical page with robot parameters and joint parameters. Payload ${payload}, reach ${reach}.`,
    alternates: {
      canonical: `/products/${model.seriesSlug}/${model.slug}`,
      languages: {
        zh: `/zh/products/${model.seriesSlug}/${model.slug}`,
      },
    },
  };
}

export default async function ProductModelPage({
  params,
}: ProductModelPageProps) {
  const { slug, model: modelSlug } = await params;
  const model = getProductModel(slug, modelSlug);

  if (!model) {
    notFound();
  }

  return (
    <>
      <SiteHeader alternateHref={`/zh/products/${model.seriesSlug}/${model.slug}`} />
      <ProductModelDetail model={model} />
    </>
  );
}
