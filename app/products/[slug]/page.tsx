import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/cta-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SpecTable } from "@/components/spec-table";
import { productSeries } from "@/lib/catalog";
import { getProductModelsBySeries } from "@/lib/product-models";
import { localizedAlternates } from "@/lib/seo";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productSeries.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = productSeries.find((item) => item.slug === slug);

  if (!series) {
    return {};
  }

  return {
    title: `${series.series} | ${series.title}`,
    description: `${series.summary} Payload range: ${series.payloadRange}. Reach range: ${series.reachRange}.`,
    alternates: localizedAlternates(
      `/products/${series.slug}`,
      `/products/${series.slug}`,
      `/zh/products/${series.slug}`,
    ),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const series = productSeries.find((item) => item.slug === slug);

  if (!series) {
    notFound();
  }

  return (
    <>
      <SiteHeader alternateHref={`/zh/products/${series.slug}`} />
      <main className="min-h-screen bg-[#080a0d] pt-40 text-white sm:pt-32 lg:pt-28">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src={series.image}
              alt={`${series.series} industrial robot`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-36"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.98),rgba(8,10,13,0.7),rgba(8,10,13,0.42))]" />
            <div className="absolute inset-0 industrial-grid opacity-40" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#f5b41b]">
              {series.series}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              {series.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {series.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Request Specification</CtaLink>
              <CtaLink href="/products" variant="secondary">
                Back to Products
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Category", series.category],
              ["Payload", series.payloadRange],
              ["Reach", series.reachRange],
              ["Repeatability", series.repeatability],
            ].map(([label, value]) => (
              <div key={label} className="steel-panel p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/42">
                  {label}
                </p>
                <p className="mt-3 text-xl font-semibold leading-7 text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0f1318]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <SectionHeading
                eyebrow="Product highlights"
                title="Engineered for factory-grade automation."
                description="Use this section as a starting point for overseas product pages. Final specifications should be confirmed against the exact catalog model and project application."
              />
              <div className="grid gap-4">
                {series.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-lg border border-white/10 bg-black/22 p-5"
                  >
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
            eyebrow="Model specifications"
            title={`${series.series} catalog models`}
            description="Representative technical data extracted from the product catalog and rewritten for international buyers."
          />
          <div className="mt-10">
            <SpecTable
              series={series}
              models={getProductModelsBySeries(series.slug)}
              enableModelLinks
            />
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0f13]">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Applications"
                title="Where this series fits."
                description="Robot selection depends on product dimensions, payload, reach, gripper type, required cycle time, safety layout, and upstream/downstream equipment."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {series.applications.map((application) => (
                  <div
                    key={application}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
                  >
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
