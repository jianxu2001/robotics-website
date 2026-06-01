import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { SiteHeader } from "@/components/site-header";
import {
  getProductModel,
  productModels,
} from "@/lib/product-models";

type ZhProductModelPageProps = {
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
}: ZhProductModelPageProps): Promise<Metadata> {
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
    title: `${model.name} 机器人参数 | SCR Robot`,
    description: `${model.name} ${model.series} 机器人详情页，包含机器人参数与关节参数。最大负载 ${payload}，最大臂展 ${reach}。`,
    alternates: {
      canonical: `/zh/products/${model.seriesSlug}/${model.slug}`,
      languages: {
        en: `/products/${model.seriesSlug}/${model.slug}`,
      },
    },
  };
}

export default async function ZhProductModelPage({
  params,
}: ZhProductModelPageProps) {
  const { slug, model: modelSlug } = await params;
  const model = getProductModel(slug, modelSlug);

  if (!model) {
    notFound();
  }

  return (
    <>
      <SiteHeader
        locale="zh"
        alternateHref={`/products/${model.seriesSlug}/${model.slug}`}
      />
      <ProductModelDetail model={model} locale="zh" />
    </>
  );
}
