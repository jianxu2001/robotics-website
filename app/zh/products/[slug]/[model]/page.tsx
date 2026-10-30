import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductModelDetail } from "@/components/product-model-detail";
import { productModels, getProductModel } from "@/lib/product-data";
import { localizedAlternates, getProductModelMetaTitle, getProductModelMetaDescription, getProductModelStructuredData, getProductModelFaqs, getFaqJsonLd, serializeJsonLd } from "@/lib/seo";
type Props = { params: Promise<{ slug: string; model: string }> };
export function generateStaticParams() { return productModels.map((item) => ({ slug: item.seriesSlug, model: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, model } = await params; const item = getProductModel(slug, model); if (!item) return {};
  const path = `/products/${slug}/${model}`;
  const title = getProductModelMetaTitle(item, "zh");
  const description = getProductModelMetaDescription(item, "zh");
  return { title, description, alternates: localizedAlternates(`/zh${path}`, path, `/zh${path}`), openGraph: { title, description, images: [item.image], locale: "zh_CN", type: "website" } };
}
export default async function Page({ params }: Props) {
  const { slug, model } = await params; const item = getProductModel(slug, model); if (!item) notFound();
  const structuredData = [...getProductModelStructuredData(item, "zh"), getFaqJsonLd(getProductModelFaqs(item, "zh"))];
  return <>
    {structuredData.map((data, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />)}
    <ProductModelDetail model={item} locale="zh" />
  </>;
}
