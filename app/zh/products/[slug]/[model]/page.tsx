import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { productModels, getProductModel } from "@/lib/product-data";
import { localizedAlternates } from "@/lib/seo";
type Props = { params: Promise<{ slug: string; model: string }> };
export function generateStaticParams() { return productModels.map((item) => ({ slug: item.seriesSlug, model: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, model } = await params; const item = getProductModel(slug, model); if (!item) return {};
  const path = `/products/${slug}/${model}`;
  return { title: `${item.name} | ${item.categoryZh ?? "工业机器人参数"}`, description: item.positioningZh ?? `${item.name}，负载 ${item.payload}，臂展 ${item.reach}，查看完整技术参数和原始产品画册。`, alternates: localizedAlternates(`/zh${path}`, path, `/zh${path}`) };
}
export default async function Page({ params }: Props) {
  const { slug, model } = await params; const item = getProductModel(slug, model); if (!item) notFound();
  return <ProductModelDetail model={item} locale="zh" />;
}
