import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import { productSeriesZh } from "@/lib/catalog-zh";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const zhSpecHeadings = ["型号", "轴数", "最大负载", "臂展", "重复定位精度", "本体重量", "电源容量"];

export function generateStaticParams() {
  return productSeriesZh.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = productSeriesZh.find((item) => item.slug === slug);
  if (!series) return {};
  return {
    title: `${series.series} | ${series.title}`,
    description: `${series.summary} 负载范围：${series.payloadRange}，臂展范围：${series.reachRange}。`,
  };
}

export default async function ZhProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const series = productSeriesZh.find((item) => item.slug === slug);
  if (!series) notFound();

  return (
    <>
      <SiteHeader locale="zh" alternateHref={`/products/${series.slug}`} />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0">
            <Image src={series.image} alt={`${series.series} 工业机器人`} fill priority sizes="100vw" className="object-cover opacity-36" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.7),rgba(8,10,13,0.42))]" />
            <div className="absolute inset-0 industrial-grid opacity-40" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">{series.series}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{series.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{series.summary}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/zh/contact">索取规格与报价</CtaLink>
              <CtaLink href="/zh/products" variant="secondary">返回产品中心</CtaLink>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["类别", series.category],
              ["负载", series.payloadRange],
              ["臂展", series.reachRange],
              ["重复定位精度", series.repeatability],
            ].map(([label, value]) => (
              <div key={label} className="steel-panel p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/42">{label}</p>
                <p className="mt-3 text-xl font-semibold leading-7 text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="产品亮点"
                title="为工厂级自动化应用而设计。"
                description="具体规格需结合画册型号、项目工况、节拍、夹具和现场布局最终确认。"
              />
              <div className="grid gap-4">
                {series.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-lg border border-white/10 bg-black/22 p-5">
                    <div className="mb-4 h-1 w-12 bg-[#f5b41b]" />
                    <p className="leading-7 text-white/70">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <SectionHeading
            eyebrow="型号规格"
            title={`${series.series} 画册型号`}
            description="以下为产品画册参数整理，适合用于初步选型和方案沟通。"
          />
          <div className="mt-10">
            <SpecTable series={series} headings={zhSpecHeadings} />
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="适用场景"
                title="该系列适合的工况。"
                description="机器人选型需结合产品尺寸、负载、臂展、夹具类型、节拍、安全布局和上下游设备。"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {series.applications.map((application) => (
                  <div key={application} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                    <h3 className="font-semibold text-white">{application}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
